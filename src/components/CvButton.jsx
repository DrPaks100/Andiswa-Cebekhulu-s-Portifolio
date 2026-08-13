import { HiArrowDown } from "react-icons/hi2";
import { getCvHref } from "../utils/cvUrl";

const CV_DOWNLOAD_NAME = "Andiswa_Cebekhulu_CV.pdf";

async function downloadCv(event) {
  event.preventDefault();
  const href = getCvHref();

  try {
    const res = await fetch(href, { cache: "no-store" });
    if (!res.ok) throw new Error(`CV fetch failed: ${res.status}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = CV_DOWNLOAD_NAME;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } catch {
    // Fallback: navigate to the PDF (same tab — no popup / new window)
    window.location.assign(href);
  }
}

export default function CvButton({ className = "cv-chip", children }) {
  return (
    <a
      className={className}
      href={getCvHref()}
      download={CV_DOWNLOAD_NAME}
      onClick={downloadCv}
    >
      {children ?? (
        <>
          <span>Download my CV</span>
          <HiArrowDown size={16} aria-hidden />
        </>
      )}
    </a>
  );
}
