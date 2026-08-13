import { motion } from "framer-motion";
import { HiOutlineAcademicCap, HiOutlineBriefcase } from "react-icons/hi2";
import { education, experience } from "../data";

export default function Journey() {
  return (
    <div className="journey">
      <section className="section education">
        <div className="container">
          <motion.div
            className="journey__intro"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <p className="section-label">Education</p>
            <h1 className="section-title">Academic path</h1>
            <p className="section-lead">
              Formal training in ICT and applications development at Mangosuthu
              University of Technology.
            </p>
          </motion.div>

          <div className="edu-list">
            {education.map((item, i) => (
              <motion.article
                key={item.title}
                className="edu-card"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08 + i * 0.08 }}
              >
                <div className="edu-card__icon" aria-hidden>
                  <HiOutlineAcademicCap size={22} />
                </div>
                <div className="edu-card__body">
                  <p className="edu-card__period">{item.period}</p>
                  <h2 className="edu-card__title">{item.title}</h2>
                  <p className="edu-card__school">{item.school}</p>
                  <p className="edu-card__detail">{item.detail}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section experience">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <p className="section-label">Experience</p>
            <h2 className="section-title">Internship</h2>
            <p className="section-lead">
              Practical work through MUT&apos;s Innovations Lab.
            </p>
          </motion.div>

          <div className="edu-list edu-list--tight">
            {experience.map((job, i) => (
              <motion.article
                key={job.title}
                className="edu-card"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
              >
                <div className="edu-card__icon" aria-hidden>
                  <HiOutlineBriefcase size={22} />
                </div>
                <div className="edu-card__body">
                  <p className="edu-card__period">{job.period}</p>
                  <h3 className="edu-card__title">{job.title}</h3>
                  <p className="edu-card__school">{job.org}</p>
                  <p className="edu-card__detail">{job.detail}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
