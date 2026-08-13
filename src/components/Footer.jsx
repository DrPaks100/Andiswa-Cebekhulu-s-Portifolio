import { profile } from "../data";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>
          © {year} {profile.name}
        </p>
        <p className="footer__note">Navy · Black · White · Pebble</p>
      </div>
    </footer>
  );
}
