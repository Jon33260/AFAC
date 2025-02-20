import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Profile() {
  interface UserData {
    id: number;
    username: string;
    email: string;
    password: string;
    profile_picture: string | null;
    following: number;
    followers: number;
    bio: string | null;
    portfolio: string | null;
    website: string | null;
  }

  const { id } = useParams();
  const [userData, setUserData] = useState<UserData | null>(null);

  const baseUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/user/${id}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
      }
    };

    fetchUserData();
  }, [id]);

  if (!userData) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="profile">
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
          {userData.portfolio && (
            <li>
              <a
                href={userData.portfolio}
                target="_blank"
                rel="noopener noreferrer"
              >
                Portfolio
              </a>
            </li>
          )}
          {userData.website && (
            <li>
              <a
                href={userData.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                Website
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
