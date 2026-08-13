import { motion } from "framer-motion";
import { projects } from "../data";

export default function Projects() {
  return (
    <section className="section projects">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">Projects</p>
          <h1 className="section-title">Selected work</h1>
          <p className="section-lead">
            Academic and personal builds. Add live links when you&apos;re ready.
          </p>
        </motion.div>

        <div className="projects__list">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              className="project"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08 + i * 0.08 }}
            >
              <div className="project__index" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="project__body">
                <p className="project__type">{p.type}</p>
                <h2 className="project__title">{p.title}</h2>
                <p className="project__desc">{p.description}</p>
                <ul className="project__tags">
                  {p.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
