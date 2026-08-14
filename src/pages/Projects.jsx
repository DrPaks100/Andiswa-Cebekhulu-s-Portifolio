import { motion } from "framer-motion";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { projects } from "../data";
import bestBrightnessLogo from "../assets/projects/best-brightness-pos.png";

const projectImages = {
  "best-brightness": bestBrightnessLogo,
};

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
            Live builds and practical systems from study, WIL, and personal work.
          </p>
        </motion.div>

        <div className="projects__list">
          {projects.map((p, i) => {
            const thumb = p.image ? projectImages[p.image] : null;

            return (
              <motion.article
                key={p.title}
                className={`project${p.url ? " project--link" : ""}`}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.08 + i * 0.08 }}
              >
                <div className="project__index" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div className="project__main">
                  {thumb && (
                    <img
                      className="project__thumb"
                      src={thumb}
                      alt=""
                      width={44}
                      height={44}
                    />
                  )}

                  <div className="project__body">
                    <div className="project__topline">
                      <p className="project__type">{p.type}</p>
                      {p.url && (
                        <a
                          className="project__open"
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${p.title}`}
                        >
                          Open
                          <HiArrowTopRightOnSquare size={15} aria-hidden />
                        </a>
                      )}
                    </div>

                    <h2 className="project__title">{p.title}</h2>
                    <p className="project__desc">{p.description}</p>
                    <ul className="project__tags">
                      {p.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>

                    {p.url && (
                      <a
                        className="project__open project__open--block"
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit live project
                        <HiArrowTopRightOnSquare size={16} aria-hidden />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
