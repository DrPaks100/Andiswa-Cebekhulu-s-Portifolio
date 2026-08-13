import { useState } from "react";
import { HiArrowDown } from "react-icons/hi2";
import CvModal from "./CvModal";

export default function CvButton({ className = "cv-chip", children }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {children ?? (
          <>
            <span>Download my CV</span>
            <HiArrowDown size={16} aria-hidden />
          </>
        )}
      </button>
      <CvModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
