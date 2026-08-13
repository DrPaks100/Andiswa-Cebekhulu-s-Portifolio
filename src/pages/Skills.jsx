import { motion } from "framer-motion";
import { softSkills, techStack } from "../data";
import TechIcon from "../components/TechIcon";

export default function Skills() {
  return (
    <section className="section tech">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">Technologies</p>
          <h1 className="section-title">Tools I build with</h1>
          <p className="section-lead">
            Full-stack development, databases, and supporting IT skills from my
            CV and project work.
          </p>
        </motion.div>

        <ul className="tech__grid">
          {techStack.map((t, i) => (
            <motion.li
              key={t.name}
              className="tech__item"
              initial={{ opacity: 0, y: 22, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.03 + i * 0.04 }}
              whileHover={{ y: -6, scale: 1.03 }}
              style={{ "--tech-color": t.color, "--tech-delay": `${i * 0.12}s` }}
            >
              <span className="tech__icon tech__icon--float">
                <TechIcon name={t.icon} image={t.image} size={32} />
              </span>
              <span className="tech__name">{t.name}</span>
            </motion.li>
          ))}
        </ul>

        <div className="soft-skills">
          <h2 className="soft-skills__title">General strengths</h2>
          <ul className="soft-skills__list">
            {softSkills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
