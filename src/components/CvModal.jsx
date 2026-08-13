import { useEffect, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowDown, HiOutlineXMark } from "react-icons/hi2";
import { profile } from "../data";
import { getCvHref } from "../utils/cvUrl";

export default function CvModal({ open, onClose }) {
  const [cvHref, setCvHref] = useState(profile.cvUrl);
  const [phoneUi, setPhoneUi] = useState(false);

  const onKey = useCallback(
    (e) => {
      if (!open) return;
      if (e.key === "Escape") onClose();
    },
    [open, onClose]
  );

  useEffect(() => {
    setCvHref(getCvHref());
    const mq = window.matchMedia("(max-width: 640px)");
    const sync = () => setPhoneUi(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onKey]);

  if (typeof document === "undefined") return null;

  return createPortal(
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
                  href={cvHref}
                  download="Andiswa_Cebekhulu_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
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
              {phoneUi ? (
                <div className="cv-modal__fallback">
                  <p>
                    This phone browser can’t preview PDFs inside the page. Use
                    the same CV file via Download or Open below.
                  </p>
                  <div className="cv-modal__fallback-actions">
                    <a
                      className="btn btn--primary"
                      href={cvHref}
                      download="Andiswa_Cebekhulu_CV.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download CV
                    </a>
                    <a
                      className="btn btn--ghost"
                      href={cvHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open CV
                    </a>
                  </div>
                </div>
              ) : (
                <iframe
                  title={`${profile.name} CV`}
                  src={cvHref}
                  className="cv-modal__iframe"
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
