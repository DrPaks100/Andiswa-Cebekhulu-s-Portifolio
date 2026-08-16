import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { designSkills } from "../data";
import { designs as builtInDesigns } from "../designs";
import { loadDesignGallery } from "../utils/designGallery";
import TechIcon from "../components/TechIcon";
import Lightbox from "../components/Lightbox";

export default function Design() {
  const [pieces, setPieces] = useState(builtInDesigns);
  const [active, setActive] = useState(null);

  useEffect(() => {
    let ignore = false;
    loadDesignGallery().then((list) => {
      if (!ignore) setPieces(list);
    });
    return () => {
      ignore = true;
    };
  }, []);

  const openAt = (index) => setActive(index);
  const close = () => setActive(null);
  const prev = () =>
    setActive((i) => (i === null ? i : (i - 1 + pieces.length) % pieces.length));
  const next = () =>
    setActive((i) => (i === null ? i : (i + 1) % pieces.length));

  return (
    <section className="section design">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">Graphics</p>
          <h1 className="section-title">Visual craft</h1>
          <p className="section-lead">
            Brand visuals and social campaigns crafted in Photoshop, Canva, and
            CorelDRAW. Tap a poster to open it full size.
          </p>
        </motion.div>

        <ul className="design__skills">
          {designSkills.map((s, i) => (
            <motion.li
              key={s.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 + i * 0.06 }}
            >
              <TechIcon name={s.icon} size={26} />
              <span>{s.name}</span>
            </motion.li>
          ))}
        </ul>

        <div className="design__thumbs" role="list">
          {pieces.map((piece, i) => (
            <motion.button
              key={piece.id}
              type="button"
              className="design__thumb"
              role="listitem"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.08 + i * 0.05 }}
              onClick={() => openAt(i)}
              aria-label={`Open ${piece.title}`}
            >
              <img src={piece.image} alt="" loading="lazy" />
              <span className="design__thumb-title">{piece.title}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <Lightbox
        open={active !== null}
        item={active !== null ? pieces[active] : null}
        onClose={close}
        onPrev={prev}
        onNext={next}
        hasMany={pieces.length > 1}
      />
    </section>
  );
}
