import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";
import Logo from "../assets/images/LogoAFAC.png";

export default function Navbar() {
  const [activeLink, setActiveLink] = useState<string | null>(null);

  return (
    <nav className="navbar">
      <NavLink to="/" className="logo">
        <img src={Logo} alt="AFAC Logo" />
      </NavLink>

      <ul className="link-nav">
        <li>
          <NavLink
            to="#"
            className={`nav-item ${activeLink && activeLink !== "/" ? "inactive" : ""}`}
            onClick={() => setActiveLink("/")}
          >
            ■ Accueil
          </NavLink>
        </li>

        <li>
          <NavLink
            to="#"
            className={`nav-item ${activeLink && activeLink !== "/events" ? "inactive" : ""}`}
            onClick={() => setActiveLink("/events")}
          >
            ■ Évènements
          </NavLink>
        </li>

        <li>
          <NavLink
            to="#"
            className={`nav-item ${activeLink && activeLink !== "/about" ? "inactive" : ""}`}
            onClick={() => setActiveLink("/about")}
          >
            ■ À propos
          </NavLink>
        </li>

        <li>
          <NavLink to="#" className="btn-connexion">
            Connexion
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
