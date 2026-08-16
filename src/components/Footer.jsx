import { Link } from "react-router-dom";
import { profile } from "../data";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>
          © {year} {profile.name}
        </p>
        <p className="footer__note">
          Navy · Black · White · Pebble
          <Link className="footer__studio" to="/studio">
            Studio
          </Link>
        </p>
      </div>
    </footer>
  );
}
