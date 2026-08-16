import { designs as builtInDesigns } from "../designs";

export function designsJsonUrl() {
  const base = import.meta.env.BASE_URL || "/";
  return `${base}designs.json`;
}

export function fileToPublicUrl(filePath) {
  const base = import.meta.env.BASE_URL || "/";
  const clean = String(filePath || "").replace(/^\//, "");
  return `${base}${clean}`;
}

export function normalizeUploaded(item) {
  return {
    id: item.id,
    title: item.title || "Untitled design",
    caption: item.caption || "",
    tool: item.tool || "Photoshop",
    image: fileToPublicUrl(item.file),
    file: item.file,
    uploaded: true,
  };
}

export async function fetchUploadedDesigns() {
  const res = await fetch(`${designsJsonUrl()}?t=${Date.now()}`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data.items) ? data.items.map(normalizeUploaded) : [];
}

export async function loadDesignGallery() {
  try {
    const extra = await fetchUploadedDesigns();
    return [...extra, ...builtInDesigns];
  } catch {
    return [...builtInDesigns];
  }
}
