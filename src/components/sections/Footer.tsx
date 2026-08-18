import { ArrowUp, Mail } from "lucide-react";
import { LinkedInIcon } from "../ui/icons";
import { profile } from "../../data/profile";
import { navItems } from "../../data/nav";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <a href="#home" className="nav__logo" aria-label="Back to top">
            <span className="nav__logo-mark" aria-hidden="true">
              DP
            </span>
            <span className="nav__logo-dot" aria-hidden="true" />
          </a>

          <nav aria-label="Footer">
            <ul className="footer__links">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="footer__link">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__social">
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email Dipayan Pramanik"
              className="footer__social-btn"
            >
              <Mail size={17} strokeWidth={1.6} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="footer__social-btn"
            >
              <LinkedInIcon size={17} />
            </a>
            <a href="#home" aria-label="Back to top" className="footer__social-btn">
              <ArrowUp size={17} strokeWidth={1.6} />
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="mono">
            © {year} {profile.name}. All rights reserved.
          </p>
          <p className="mono footer__location">
            {profile.location} · Engineered with React, Three.js &amp; care
          </p>
        </div>
      </div>
    </footer>
  );
}
