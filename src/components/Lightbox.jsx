import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Lightbox({ open, item, onClose, onPrev, onNext, hasMany }) {
  const onKey = useCallback(
    (e) => {
      if (!open) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasMany) onPrev();
      if (e.key === "ArrowRight" && hasMany) onNext();
    },
    [open, onClose, onPrev, onNext, hasMany]
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
      {open && item && (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <button
            type="button"
            className="lightbox__close"
            aria-label="Close"
            onClick={onClose}
          >
            ×
          </button>

          {hasMany && (
            <>
              <button
                type="button"
                className="lightbox__nav lightbox__nav--prev"
                aria-label="Previous"
                onClick={(e) => {
                  e.stopPropagation();
                  onPrev();
                }}
              >
                ‹
              </button>
              <button
                type="button"
                className="lightbox__nav lightbox__nav--next"
                aria-label="Next"
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
              >
                ›
              </button>
            </>
          )}

          <motion.figure
            className="lightbox__figure"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={item.image} alt={item.title} />
            <figcaption>
              <strong>{item.title}</strong>
              {item.caption && <span>{item.caption}</span>}
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
