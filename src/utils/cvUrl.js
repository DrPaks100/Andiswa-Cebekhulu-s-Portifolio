const CV_FILE = "Andiswa-Cebekhulu-CV.pdf";

/** Same absolute CV URL on every device (origin + Vite base). */
export function getCvHref() {
  const base = import.meta.env.BASE_URL || "/";
  // Cache-bust so phones don’t keep an old CV / old app behaviour
  const file = `${CV_FILE}?v=6`;
  if (typeof window === "undefined") return `${base}${file}`;
  const baseAbs = new URL(base, window.location.origin);
  if (!baseAbs.pathname.endsWith("/")) baseAbs.pathname += "/";
  return new URL(file, baseAbs).href;
}
