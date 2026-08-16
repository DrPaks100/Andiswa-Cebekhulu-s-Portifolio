const OWNER = "DrPaks100";
const REPO = "Andiswa-Cebekhulu-s-Portifolio";
const API = `https://api.github.com/repos/${OWNER}/${REPO}/contents`;

function headers(token) {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

export function utf8ToBase64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

export function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      const comma = result.indexOf(",");
      resolve(comma >= 0 ? result.slice(comma + 1) : result);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

export async function githubGet(token, path, branch) {
  const url = `${API}/${path}?ref=${encodeURIComponent(branch)}`;
  const res = await fetch(url, { headers: headers(token) });
  if (res.status === 404) return null;
  if (!res.ok) {
    const body = await res.text();
    throw new Error(githubError(res.status, body));
  }
  return res.json();
}

export async function githubPut(token, { path, branch, message, content, sha }) {
  const res = await fetch(`${API}/${path}`, {
    method: "PUT",
    headers: {
      ...headers(token),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      content,
      branch,
      ...(sha ? { sha } : {}),
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(githubError(res.status, body));
  }
  return res.json();
}

export async function githubDelete(token, { path, branch, message, sha }) {
  const res = await fetch(`${API}/${path}`, {
    method: "DELETE",
    headers: {
      ...headers(token),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, branch, sha }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(githubError(res.status, body));
  }
}

function githubError(status, body) {
  if (status === 401) return "GitHub token was rejected. Create a new token and try again.";
  if (status === 403) return "GitHub blocked this request. Check token permissions or wait and retry.";
  if (status === 409) return "This file changed on GitHub. Refresh Studio and try again.";
  return `GitHub error ${status}: ${body.slice(0, 180)}`;
}

export async function compressImage(file, maxWidth = 1400, quality = 0.82) {
  const source = await loadImageSource(file);
  const scale = Math.min(1, maxWidth / source.width);
  const width = Math.max(1, Math.round(source.width * scale));
  const height = Math.max(1, Math.round(source.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#050a14";
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(source.image, 0, 0, width, height);
  source.close?.();

  let q = quality;
  let blob = await canvasToJpeg(canvas, q);
  while (blob.size > 900_000 && q > 0.55) {
    q -= 0.08;
    blob = await canvasToJpeg(canvas, q);
  }
  return blob;
}

async function loadImageSource(file) {
  if (typeof createImageBitmap === "function") {
    try {
      const bitmap = await createImageBitmap(file);
      return {
        image: bitmap,
        width: bitmap.width,
        height: bitmap.height,
        close: () => bitmap.close(),
      };
    } catch {
      /* fall through */
    }
  }
  return new Promise((resolve, reject) => {
    const image = new Image();
    const url = URL.createObjectURL(file);
    image.onload = () =>
      resolve({
        image,
        width: image.naturalWidth,
        height: image.naturalHeight,
        close: () => URL.revokeObjectURL(url),
      });
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read that picture."));
    };
    image.src = url;
  });
}

function canvasToJpeg(canvas, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Could not prepare the image."))),
      "image/jpeg",
      quality
    );
  });
}

export function makeUploadId() {
  const stamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
  const rand = Math.random().toString(36).slice(2, 8);
  return `upl-${stamp}-${rand}`;
}
