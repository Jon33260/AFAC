import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../services/AuthContext";
import "../styles/navbar.css";
import Logo from "../assets/images/LogoAFAC.png";
import { Logout } from "../services/requests";

export default function Navbar() {
  const [showLinks, setShowLinks] = useState(false);
  const navigate = useNavigate();
  const { role, setRole, currentUser, setCurrentUser } = useAuth();

  const disconnet = () => {
    Logout();
    setRole("anonymous");
    setCurrentUser({
      id: 0,
      username: "",
      picture: "",
      email: "",
      is_admin: false,
    });
    navigate("/");
  };

  const links = [
    {
      name: "■ Accueil",
      path: "/",
      role: ["anonymous", "user", "admin"],
    },
    {
      name: "■ Evènements",
      path: "/events",
      role: ["anonymous", "user", "admin"],
    },
    {
      name: "■ Dashboard",
      path: "/dashboard",
      role: ["admin"],
    },
    {
      name: "■ Profil",
      path: `/profile/${currentUser.id}`,
      role: ["user", "admin"],
    },
    {
      name: "Connexion",
      path: "/auth",
      role: ["anonymous"],
    },
  ];

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
        {links
          .filter((link) => link.role.includes(role))
          .map((link) => (
            <li key={link.name}>
              <NavLink
                className={
                  link.name === "Connexion" ? "btn-connexion" : "nav-item"
                }
                to={link.path}
                onClick={() => {
                  setShowLinks(!showLinks);
                }}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        {role !== "anonymous" ? (
          <li>
            <button type="button" onClick={disconnet}>
              Se déconnecter
            </button>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}
