import "../styles/profile.css";
import { useLoaderData } from "react-router-dom";

export default function Profile() {
  const userData = useLoaderData() as UserData;

  return (
    <div className="profile">
      <>
        <img
          src={
            userData.profile_picture ||
            "https://www.vhv.rs/dpng/d/138-1383989_default-svg-icon-free-avatar-png-transparent-png.png"
          }
          alt="pdeprofil"
        />
        <div className="username-followers">
          <h1>{userData.username}</h1>
          <p>Following: {userData.following}</p>
          <p>Followers: {userData.followers}</p>
        </div>
        <p>Citations</p>
        <div className="biography">
          <h3>Biographie</h3>
          <p>{userData.bio || "Aucune biographie renseignée."}</p>
        </div>
        <div className="links">
          <h3>Liens</h3>
          <ul className="list-none">
            <li>
              <a
                href={userData.portfolio ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
              >
                Portfolio
              </a>
            </li>
            <li>
              <a
                href={userData.website ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
              >
                Website
              </a>
            </li>
          </ul>
        </div>
      </>
    </div>
  );
}
