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
            const body = (
              <>
                {thumb && (
                  <img
                    className="project__thumb"
                    src={thumb}
                    alt=""
                    width={40}
                    height={40}
                  />
                )}
                <div className="project__body">
                  <p className="project__type">{p.type}</p>
                  <h2 className="project__title">
                    {p.title}
                    {p.url && (
                      <HiArrowTopRightOnSquare
                        className="project__ext"
                        size={16}
                        aria-hidden
                      />
                    )}
                  </h2>
                  <p className="project__desc">{p.description}</p>
                  <ul className="project__tags">
                    {p.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </>
            );

            return (
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
                {p.url ? (
                  <a
                    className="project__link"
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {body}
                  </a>
                ) : (
                  body
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
