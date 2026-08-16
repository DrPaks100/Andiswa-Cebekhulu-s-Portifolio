const SALT = "ac-studio-v1";
const EMAIL = "andiswacebekhulu17@gmail.com";
const CREDENTIAL_HASH =
  "528939b0ec200261b060bd5c8874b50fe7b75b47352f5a2065da0f1e69aadfff";

const SESSION_KEY = "ac-studio-ok";
const TOKEN_KEY = "ac-studio-gh-token";

async function sha256hex(text) {
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(buf)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function verifyStudioLogin(email, password) {
  const normalized = String(email || "").trim().toLowerCase();
  if (normalized !== EMAIL) return false;
  const digest = await sha256hex(`${SALT}|${EMAIL}|${password}`);
  return digest === CREDENTIAL_HASH;
}

export function isStudioSignedIn() {
  return localStorage.getItem(SESSION_KEY) === "1";
}

export function setStudioSignedIn(on) {
  if (on) localStorage.setItem(SESSION_KEY, "1");
  else localStorage.removeItem(SESSION_KEY);
}

export function getGithubToken() {
  return localStorage.getItem(TOKEN_KEY) || "";
}

export function setGithubToken(token) {
  const value = String(token || "").trim();
  if (value) localStorage.setItem(TOKEN_KEY, value);
  else localStorage.removeItem(TOKEN_KEY);
}

export function studioEmailHint() {
  return EMAIL;
}
