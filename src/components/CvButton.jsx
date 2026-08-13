import { useEffect, useState } from "react";
import { HiArrowDown } from "react-icons/hi2";
import { profile } from "../data";
import { getCvHref } from "../utils/cvUrl";

export default function CvButton({ className = "cv-chip", children }) {
  const [cvHref, setCvHref] = useState(profile.cvUrl);

  useEffect(() => {
    setCvHref(getCvHref());
  }, []);

  return (
    <a
      className={className}
      href={cvHref}
      download="Andiswa_Cebekhulu_CV.pdf"
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
