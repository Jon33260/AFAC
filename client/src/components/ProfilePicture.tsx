import { Link } from "react-router-dom";
import "../styles/profile.css";

export default function ProfilePicture({ artworks }: ProfilePictureProps) {
  console.info(artworks);

  if (!Array.isArray(artworks) || artworks.length === 0) {
    return <p>Aucune publication</p>;
  }
  return (
    <section className="profile-gallery">
      {artworks.map((artwork) => (
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
