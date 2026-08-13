import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowDown, HiOutlineXMark } from "react-icons/hi2";
import { profile } from "../data";

export default function CvModal({ open, onClose }) {
  const onKey = useCallback(
    (e) => {
      if (!open) return;
      if (e.key === "Escape") onClose();
    },
    [open, onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onKey]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="cv-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Curriculum Vitae"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="cv-modal__panel"
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <header className="cv-modal__bar">
              <h2 className="cv-modal__heading">
                <span>{profile.name}</span>
                <span className="cv-modal__badge">CV</span>
              </h2>
              <div className="cv-modal__actions">
                <a
                  className="cv-modal__download"
                  href={profile.cvUrl}
                  download="Andiswa_Cebekhulu_CV.pdf"
                >
                  <HiArrowDown size={15} aria-hidden />
                  Download
                </a>
                <button
                  type="button"
                  className="cv-modal__close"
                  aria-label="Close CV"
                  onClick={onClose}
                >
                  <HiOutlineXMark size={18} />
                </button>
              </div>
            </header>

            <div className="cv-modal__frame">
              <iframe
                title={`${profile.name} CV`}
                src={`${profile.cvUrl}#toolbar=0&navpanes=0&view=FitH`}
                className="cv-modal__iframe"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
