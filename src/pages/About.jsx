import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiArrowDown } from "react-icons/hi2";
import { profile } from "../data";
import CvButton from "../components/CvButton";
import portrait from "../assets/andiswa.jpg";

export default function About() {
  return (
    <section className="section about">
      <div className="container about__grid">
        <motion.div
          className="about__portrait"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="about__frame">
            <img
              className="about__photo"
              src={portrait}
              alt={`${profile.name} — professional portrait`}
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
