import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "../data";
import CvButton from "../components/CvButton";
import slidePortrait from "../assets/hero-grad-3.png";
import slideKeyboard from "../assets/hero-tech-1.png";
import iconAbout from "../assets/icons/about.png";
import iconSkills from "../assets/icons/skills.png";
import iconJourney from "../assets/icons/journey.png";
import iconProjects from "../assets/icons/projects.png";
import iconDesign from "../assets/icons/design.png";
import iconContact from "../assets/icons/contact.png";

const slides = [
  { src: slidePortrait, focus: "portrait" },
  { src: slideKeyboard, focus: "keyboard" },
];

const categories = [
  { to: "/about", label: "About", hint: "Who I am", tone: "a", icon: iconAbout },
  { to: "/skills", label: "Skills", hint: "Tech stack", tone: "b", icon: iconSkills },
  { to: "/journey", label: "Journey", hint: "Study & internship", tone: "c", icon: iconJourney },
  { to: "/projects", label: "Projects", hint: "Selected builds", tone: "d", icon: iconProjects },
  { to: "/design", label: "Design", hint: "Posters & graphics", tone: "e", icon: iconDesign },
  { to: "/contact", label: "Contact", hint: "Let’s talk", tone: "f", icon: iconContact },
];

const ease = [0.22, 1, 0.36, 1];

export default function Home() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4800);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="home">
      <div className="home-hero">
        <div className="home-hero__slides" aria-hidden>
          <AnimatePresence mode="sync">
            <motion.img
              key={index}
              src={slides[index].src}
              alt=""
              className={`home-hero__img home-hero__img--${slides[index].focus}`}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.25, ease }}
            />
          </AnimatePresence>
          <div className="home-hero__veil" />
        </div>

        <div className="home-hero__content container">
          <motion.p
            className="home-hero__eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            {profile.role}
          </motion.p>
          <motion.h1
            className="home-hero__title"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.06, ease }}
          >
            <span className="home-hero__name">{profile.shortName}</span>
            <span className="home-hero__surname">{profile.surname}</span>
          </motion.h1>
          <motion.p
            className="home-hero__tagline"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.14, ease }}
          >
            {profile.tagline}
          </motion.p>
          <motion.div
            className="home-hero__cta"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22, ease }}
          >
            <CvButton />
          </motion.div>
        </div>

        <div className="home-hero__dots" aria-label="Slideshow">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`home-hero__dot ${i === index ? "is-active" : ""}`}
              aria-label={`Show photo ${i + 1}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>

      <div className="home__explore container">
        <div className="home__explore-head">
          <p className="section-label">Explore</p>
          <h2 className="home__explore-title">Choose a section</h2>
        </div>

        <motion.div
          className="home__grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.05 } },
          }}
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.to}
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.45, ease },
                },
              }}
            >
              <Link to={cat.to} className={`cat-card cat-card--${cat.tone}`}>
                <span className="cat-card__glow" aria-hidden />
                <span className="cat-card__icon">
                  <img src={cat.icon} alt="" />
                </span>
                <span className="cat-card__label">{cat.label}</span>
                <span className="cat-card__hint">{cat.hint}</span>
                <span className="cat-card__arrow" aria-hidden>
                  →
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
