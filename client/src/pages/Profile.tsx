import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import FollowButton from "../components/FollowButton";
import FollowList from "../components/FollowList";
import ProfilePicture from "../components/ProfilePicture";
import SvgIcons from "../components/SvgIcons";
import useAuth from "../services/AuthContext";
import { updateUserData } from "../services/requests";
import "../styles/profile.css";

const icons = {
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
};

export default function Profile() {
  const data = useLoaderData() as ProfileData;
  const toggleBio = () => {
    setBioExpanded((prevState) => !prevState);
  };

  const bioText = data.user.bio || "Aucune biographie";

  const tabs = ["Récent", "Populaire", "Exposé"];

  const desktop = window.innerWidth >= 768;

  const [bioExpanded, setBioExpanded] = useState(false);
  const [choiceSelected, setChoiceSelected] = useState("Récent");

  const [user, setUser] = useState({
    profile_picture:
      data.user.profile_picture ||
      "https://www.vhv.rs/dpng/d/138-1383989_default-svg-icon-free-avatar-png-transparent-png.png",
    username: data.user.username,
    bio: data.user.bio || "Aucune biographie",
    portfolio: data.user.portfolio,
    website: data.user.website,
  } as UserData);

  const { currentUser } = useAuth();

  const [editing, setEditing] = useState(false);

  const [followers, setFollowers] = useState(data.user.followers);
  const following = data.user.following;

  const handleFollowerCountChange = (newCount: number) => {
    setFollowers(newCount);
  };

  const handleChangeEdited = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSave = async () => {
    const updatedUserData = { ...user };

    try {
      await updateUserData(updatedUserData);
      setEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const [showFollowList, setShowFollowList] = useState<
    "followers" | "following" | null
  >(null);

  return (
    <div className="profile">
      <div className={`left-part ${editing ? "editing" : ""}`}>
        <article className="profile-header">
          <img src={data.user.profile_picture ?? ""} alt="pdeprofil" />

          <div className="profile-header-edit">
            {editing ? (
              <form className="edit-form" onSubmit={handleSave}>
                <input
                  type="text"
                  name="profile_picture"
                  value={user.profile_picture ?? ""}
                  onChange={handleChangeEdited}
                  placeholder="URL photo de profil"
                />
                <input
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={handleChangeEdited}
                  placeholder="Username"
                  required
                />
                <textarea
                  name="bio"
                  value={user.bio ?? ""}
                  onChange={handleChangeEdited}
                  placeholder="Biographie"
                />
                <input
                  type="text"
                  name="portfolio"
                  value={user.portfolio ?? ""}
                  onChange={handleChangeEdited}
                  placeholder="Portfolio"
                />
                <input
                  type="text"
                  name="website"
                  value={user.website ?? ""}
                  onChange={handleChangeEdited}
                  placeholder="Site Web"
                />
                <button type="submit" className="save-button">
                  Sauvegarder
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="cancel-button"
                >
                  Annuler
                </button>
              </form>
            ) : (
              <div className="profile-header-text">
                <h1>{data.user.username}</h1>
                <div className="username-followers">
                  <button
                    type="button"
                    onClick={() => setShowFollowList("following")}
                    className="clickable"
                  >
                    {following} suivi(e)s
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowFollowList("followers")}
                    className="clickable"
                  >
                    {followers} followers
                  </button>
                  <FollowButton
                    userId={data.user.id}
                    initialFollowers={data.user.followers}
                    onFollowerCountChange={handleFollowerCountChange}
                  />
                  <button
                    type="button"
                    className="edit-button"
                    onClick={() => setEditing(true)}
                  >
                    Modifier
                  </button>

                  <p>{data.user.following} suivi(e)s</p>
                  <p>{data.user.followers} followers</p>
                  {currentUser.id === data.user.id && (
                    <button
                      type="button"
                      className="edit-button"
                      onClick={() => setEditing(true)}
                    >
                      Modifier
                    </button>
                  )}
                </div>
                <blockquote>
                  "Art is a journey without a destination, an invitation to
                  dream beyond the visible."
                </blockquote>
              </div>
            )}
          </div>
        </article>

        {!editing && <hr className="separation" />}

        {!editing && (
          <>
            <div className="biography">
              <h3>BIOGRAPHIE</h3>
              <div className={`bio ${bioExpanded ? "expanded" : "normal"}`}>
                <p>{bioText}</p>
                {(bioExpanded || desktop) &&
                  (data.user.portfolio || data.user.website) && (
                    <div className="links">
                      <h3>LIENS</h3>
                      <ul className="list">
                        {data.user.portfolio && (
                          <li className="svg-portfolio">
                            <SvgIcons {...icons.portfolio} />
                            <Link to={data.user.portfolio}>
                              {data.user.portfolio.replace(/^https?:\/\//, "")}
                            </Link>
                          </li>
                        )}
                        {data.user.website && (
                          <li className="svg-website">
                            <SvgIcons {...icons.website} />
                            <Link to={data.user.website}>
                              {data.user.website.replace(/^https?:\/\//, "")}
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
              </div>
            </div>

            <button type="button" className="read-more" onClick={toggleBio}>
              <span className={`arrow ${bioExpanded ? "left" : "right"}`}>
                ▼
              </span>
              {bioExpanded ? "Read Less" : "Read More"}
            </button>
          </>
        )}

        {!editing && <hr className="separation2" />}
      </div>

      {!editing && (
        <div className="right-part">
          <div className="order-choice">
            {tabs.map((tab) => (
              <button
                type="button"
                key={tab}
                className={choiceSelected === tab ? "active" : ""}
                onClick={() => setChoiceSelected(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <ProfilePicture artworks={data.artworks} userData={data.user} />
        </div>
      )}

      {showFollowList && (
        <FollowList
          id={data.user.id}
          type={showFollowList}
          onClose={() => setShowFollowList(null)}
        />
      )}
    </div>
  );
}
