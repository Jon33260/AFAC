import { Link } from "react-router-dom";
import "../styles/PicturesHome.css";

export default function PicturesHome({ artworks }: Artworks) {
  return (
    <section className="masonry-gallery">
      {artworks.map((artwork) => (
        <Link
          to={`/artwork/${artwork.id}`}
          key={artwork.id}
          className="masonry-item"
        >
          <img src={artwork.picture} alt={artwork.description} />
        </Link>
      ))}
    </section>
  );
}
