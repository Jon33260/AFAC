import "../styles/profile.css";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import SvgIcons from "../components/SvgIcons";

const icon = [
  {
    portfolio: {
      width: "21px",
      height: "21px",
      path: "M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-40-82v-78q-33 0-56.5-23.5T360-320v-40L168-552q-3 18-5.5 36t-2.5 36q0 121 79.5 212T440-162Zm276-102q41-45 62.5-100.5T800-480q0-98-54.5-179T600-776v16q0 33-23.5 56.5T520-680h-80v80q0 17-11.5 28.5T400-560h-80v80h240q17 0 28.5 11.5T600-440v120h40q26 0 47 15.5t29 40.5Z",
    },
    website: {
      width: "21px",
      height: "21px",
      path: "M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q146 0 255.5 91.5T872-559h-82q-19-73-68.5-130.5T600-776v16q0 33-23.5 56.5T520-680h-80v80q0 17-11.5 28.5T400-560h-80v80h80v120h-40L168-552q-3 18-5.5 36t-2.5 36q0 131 92 225t228 95v80Zm364-20L716-228q-21 12-45 20t-51 8q-75 0-127.5-52.5T440-380q0-75 52.5-127.5T620-560q75 0 127.5 52.5T800-380q0 27-8 51t-20 45l128 128-56 56ZM620-280q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Z",
    },
  },
];

export default function Profile() {
  const userData = useLoaderData() as UserData;

  const [bioExpanded, setBioExpanded] = useState(false);

  const toggleBio = () => {
    setBioExpanded((prevState) => !prevState);
  };

  const bioText = userData.bio || "Aucune biographie";

  return (
    <div className="profile">
      <article className="profile-header">
        <img
          src={
            userData.profile_picture ||
            "https://www.vhv.rs/dpng/d/138-1383989_default-svg-icon-free-avatar-png-transparent-png.png"
          }
          alt="pdeprofil"
        />
        <div className="profile-header-text">
          <h1>{userData.username}</h1>
          <div className="username-followers">
            <p>{userData.following} suivi(e)s</p>
            <p>{userData.followers} followers</p>
          </div>
          <blockquote>
            Art is a journey without a destination, an invitation to dream
            beyond the visible.
          </blockquote>
        </div>
      </article>
      <hr className="separation" />
      <div className="biography">
        <h3>BIOGRAPHIE</h3>
        <div className={`bio ${bioExpanded ? "expanded" : "normal"}`}>
          <p>{bioText}</p>
          {bioExpanded && (
            <div className="links">
              <h3>LIENS</h3>
              <ul className="list">
                <li className="svg-portfolio">
                  <SvgIcons
                    path={icon[0].portfolio.path}
                    height={icon[0].portfolio.height}
                    width={icon[0].portfolio.width}
                  />
                  <a
                    href={userData.portfolio ?? undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    Portfolio
                  </a>
                </li>
                <li className="svg-website">
                  <SvgIcons
                    path={icon[0].website.path}
                    height={icon[0].website.height}
                    width={icon[0].website.width}
                  />
                  <a
                    href={userData.website ?? undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    Website
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <button type="button" className="read-more" onClick={toggleBio}>
        <span className={`arrow ${bioExpanded ? "left" : "right"}`}>▼</span>
        {bioExpanded ? "Read Less" : "Read More"}
      </button>
    </div>
  );
}
