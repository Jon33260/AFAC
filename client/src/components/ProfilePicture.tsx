import { Link } from "react-router-dom";
import "../styles/profile.css";

export default function ProfilePicture({
  artworks,
  userData,
}: ProfilePictureProps) {
  return (
    <section className="profile-gallery">
      {artworks
        .filter((artwork) => artwork.user_id === userData.id)
        .map((artwork) => (
          <Link
            to={`/artwork/${artwork.id}`}
            key={artwork.id}
            className="profile-item"
          >
            <img src={artwork.picture} alt={artwork.description} />
          </Link>
        ))}
    </section>
  );
}
