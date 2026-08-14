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
        <div className="about__portrait">
          <div className="about__stage">
            {/* Soft glow + smoke only — no ring/box outlines */}
            <div className="about__halo" aria-hidden />
            <div className="about__tornado about__tornado--1" aria-hidden />
            <div className="about__tornado about__tornado--2" aria-hidden />
            <div className="about__tornado about__tornado--3" aria-hidden />
            <div className="about__sparks" aria-hidden />
            <div className="about__ground-smoke" aria-hidden />

            <motion.div
              className="about__figure"
              style={{ transformStyle: "preserve-3d" }}
              initial={{
                opacity: 0,
                y: 140,
                scale: 0.15,
                rotate: -720,
                filter: "blur(18px) brightness(0.2)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                rotate: 0,
                filter: "blur(0px) brightness(1)",
              }}
              transition={{
                duration: 2.4,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
                opacity: { duration: 1.6, delay: 0.35 },
                filter: { duration: 1.8, delay: 0.5 },
              }}
            >
              <img
                className="about__photo"
                src={portrait}
                alt={`${profile.name} — professional portrait`}
              />
            </motion.div>
          </div>
        </div>

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
