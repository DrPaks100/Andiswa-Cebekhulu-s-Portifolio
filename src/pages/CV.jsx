import { Link } from "react-router-dom";
import { profile, education, experience, techStack } from "../data";
import { getCvHref } from "../utils/cvUrl";

export default function Cv() {
  const cvHref = typeof window !== "undefined" ? getCvHref() : profile.cvUrl;

  return (
    <section className="section cv-page">
      <div className="container cv-page__wrap">
        <div className="cv-page__actions no-print">
          <a
            className="btn btn--primary"
            href={cvHref}
            download="Andiswa_Cebekhulu_CV.pdf"
          >
            Download CV (PDF)
          </a>
          <button type="button" className="btn btn--ghost" onClick={() => window.print()}>
            Print this page
          </button>
          <Link className="btn btn--ghost" to="/">
            Back home
          </Link>
        </div>

        <article className="cv-sheet">
          <header className="cv-sheet__head">
            <h1>{profile.name}</h1>
            <p>{profile.role}</p>
            <p className="cv-sheet__meta">
              {profile.phone} · {profile.email}
              <br />
              {profile.address}
            </p>
          </header>

          <section>
            <h2>Profile</h2>
            <p>{profile.about[0]}</p>
          </section>

          <section>
            <h2>Education</h2>
            {education.map((e) => (
              <div key={e.title} className="cv-sheet__block">
                <strong>{e.title}</strong>
                <p>
                  {e.school} · {e.period}
                </p>
              </div>
            ))}
          </section>

          <section>
            <h2>Experience</h2>
            {experience.map((e) => (
              <div key={e.title} className="cv-sheet__block">
                <strong>{e.title}</strong>
                <p>
                  {e.org} · {e.period}
                </p>
                <p>{e.detail}</p>
              </div>
            ))}
          </section>

          <section>
            <h2>Technical skills</h2>
            <p>{techStack.map((t) => t.name).join(" · ")}</p>
          </section>
        </article>
      </div>
    </section>
  );
}
