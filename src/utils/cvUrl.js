const CV_FILE = "Andiswa-Cebekhulu-CV.pdf";

/** Same absolute CV URL on every device (origin + Vite base). */
export function getCvHref() {
  const base = import.meta.env.BASE_URL || "/";
  if (typeof window === "undefined") return `${base}${CV_FILE}`;
  const baseAbs = new URL(base, window.location.origin);
  if (!baseAbs.pathname.endsWith("/")) baseAbs.pathname += "/";
  return new URL(CV_FILE, baseAbs).href;
}
