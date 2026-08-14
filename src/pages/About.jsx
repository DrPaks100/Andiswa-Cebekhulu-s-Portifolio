import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiArrowDown } from "react-icons/hi2";
import { profile } from "../data";
import CvButton from "../components/CvButton";
import portrait from "../assets/andiswa-cutout.png";

export default function About() {
  return (
    <section className="section about">
      <div className="container about__grid">
        <motion.div
          className="about__portrait"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="about__stage" aria-hidden={false}>
            <div className="about__mist about__mist--back" aria-hidden />
            <div className="about__mist about__mist--mid" aria-hidden />
            <div className="about__mist about__mist--front" aria-hidden />
            <div className="about__embers" aria-hidden />
            <div className="about__aura" aria-hidden />

            <motion.div
              className="about__figure"
              initial={{
                opacity: 0,
                y: 56,
                scale: 0.88,
                filter: "blur(22px) brightness(0.35)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px) brightness(1)",
              }}
              transition={{
                duration: 1.65,
                delay: 0.28,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <img
                className="about__photo"
                src={portrait}
                alt={`${profile.name} — professional portrait`}
              />
              <span className="about__rim" aria-hidden />
            </motion.div>

            <motion.div
              className="about__veil"
              aria-hidden
              initial={{ opacity: 0.95 }}
              animate={{ opacity: 0.18 }}
              transition={{ duration: 2.1, delay: 0.45, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="section-label">About</p>
          <h1 className="section-title">Code, systems &amp; visual craft</h1>
          {profile.about.map((p) => (
            <p key={p.slice(0, 24)} className="about__text">
              {p}
            </p>
          ))}
          <div className="about__actions">
            <CvButton className="btn btn--primary">
              View / Download CV
              <HiArrowDown size={16} aria-hidden />
            </CvButton>
            <Link className="btn btn--ghost" to="/skills">
              Skills stack
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
