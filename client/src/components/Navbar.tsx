import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";
import Logo from "../assets/images/LogoAFAC.png";

export default function Navbar() {
  const [showLinks, setShowLinks] = useState(false);

  return (
    <nav className="navbar">
      <button
        type="button"
        className="burger-nav"
        onClick={() => setShowLinks(!showLinks)}
      >
        <span> </span>
        <span> </span>
        <span> </span>
      </button>

      <NavLink to="/" className="logo">
        <img src={Logo} alt="AFAC Logo" />
      </NavLink>

      <ul className={`link-nav ${showLinks ? "show" : ""}`}>
        <li>
          <NavLink to="/" className="nav-item">
            ■ Accueil
          </NavLink>
        </li>
        <li>
          <NavLink to="/events" className="nav-item">
            ■ Évènements
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard" className="nav-item">
            ■ Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="#" className="nav-item">
            ■ À propos
          </NavLink>
        </li>
      </ul>

      <NavLink to="/auth" className="btn-connexion">
        Connexion
      </NavLink>
    </nav>
  );
}
