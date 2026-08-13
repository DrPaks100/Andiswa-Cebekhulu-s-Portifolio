import { Link, useLocation } from "react-router-dom";
import { profile } from "../data";

function formatHeaderDate(date = new Date()) {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function Navbar() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const today = formatHeaderDate();

  return (
    <header className="nav nav--minimal">
      <div className="nav__inner container">
        <Link to="/" className="nav__brand">
          <span className="nav__mark" aria-hidden />
          <span className="nav__fullname">
            <span className="nav__firstname">{profile.shortName}</span>
            <span className="nav__surname">{profile.surname}</span>
          </span>
        </Link>

        <div className="nav__right">
          {!isHome && (
            <Link className="nav__home" to="/">
              ← Home
            </Link>
          )}
          <time
            className="nav__date"
            dateTime={new Date().toISOString().slice(0, 10)}
          >
            {today}
          </time>
        </div>
      </div>
    </header>
  );
}
