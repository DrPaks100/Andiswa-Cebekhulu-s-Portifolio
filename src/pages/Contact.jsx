import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineMapPin,
} from "react-icons/hi2";
import { profile } from "../data";

const details = [
  {
    label: "Phone",
    value: profile.phone,
    href: profile.phoneHref,
    icon: HiOutlinePhone,
  },
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: HiOutlineEnvelope,
  },
  {
    label: "Location",
    value: profile.address,
    href: null,
    icon: HiOutlineMapPin,
  },
];

export default function Contact() {
  return (
    <section className="section contact">
      <div className="container contact__panel">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">Contact</p>
          <h1 className="section-title">Let&apos;s connect</h1>
          <p className="section-lead contact__lead">
            Available for roles, collaborations, and freelance design or web
            work.
          </p>

          <ul className="contact__details">
            {details.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  <span className="contact__icon" aria-hidden>
                    <Icon size={20} />
                  </span>
                  <div>
                    <span className="contact__label">{item.label}</span>
                    {item.href ? (
                      <a href={item.href}>{item.value}</a>
                    ) : (
                      <p>{item.value}</p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="contact__actions">
            <a className="btn btn--primary" href={profile.phoneHref}>
              <HiOutlinePhone size={16} aria-hidden />
              Call me
            </a>
            <a className="btn btn--ghost" href={`mailto:${profile.email}`}>
              <HiOutlineEnvelope size={16} aria-hidden />
              Email
            </a>
            <Link className="btn btn--ghost" to="/">
              Back home
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
