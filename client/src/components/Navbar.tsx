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
        <NavLink
          to="#"
          className={`nav-item ${activeLink && activeLink !== "/" ? "inactive" : ""}`}
          onClick={() => setActiveLink("/")}
        >
          <li>■ Accueil</li>
        </NavLink>

        <NavLink
          to="#"
          className={`nav-item ${activeLink && activeLink !== "/evenements" ? "inactive" : ""}`}
          onClick={() => setActiveLink("/evenements")}
        >
          <li>■ Évènements</li>
        </NavLink>

        <NavLink
          to="#"
          className={`nav-item ${activeLink && activeLink !== "/a-propos" ? "inactive" : ""}`}
          onClick={() => setActiveLink("/a-propos")}
        >
          <li>■ À propos</li>
        </NavLink>

        <NavLink to="#" className="btn-connexion">
          <li>Connexion</li>
        </NavLink>
      </ul>
    </nav>
  );
}
