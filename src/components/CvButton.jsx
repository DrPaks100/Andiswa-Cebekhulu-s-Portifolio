import { useMemo } from "react";
import { HiArrowDown } from "react-icons/hi2";
import { getCvHref } from "../utils/cvUrl";

const CV_DOWNLOAD_NAME = "Andiswa_Cebekhulu_CV.pdf";

/**
 * Plain link to the PDF — works in Safari, Chrome, and LinkedIn’s in-app browser.
 * Avoid fetch/blob/preventDefault (those often fail inside LinkedIn WebViews).
 */
export default function CvButton({ className = "cv-chip", children }) {
  const cvHref = useMemo(() => getCvHref(), []);

  return (
    <a
      className={className}
      href={cvHref}
      download={CV_DOWNLOAD_NAME}
      target="_blank"
      rel="noopener noreferrer"
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
