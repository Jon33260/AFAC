import { Link } from "react-router-dom";
import "../styles/PicturesHome.css";

interface Artwork {
  id: number;
  picture: string;
  title: string;
  description: string;
  username: string;
  category: string;
}

interface Artworks {
  artworks: Artwork[];
}

export default function PicturesHome({ artworks }: Artworks) {
  return (
    <section className="masonry-gallery">
      {artworks.length > 0 ? (
        artworks.map((artwork) => (
          <Link
            to={`/artwork/${artwork.id}`}
            key={artwork.id}
            className="masonry-item"
          >
            <img src={artwork.picture} alt={artwork.description} />
          </Link>
        ))
      ) : (
        <p>Aucune image disponible pour cette catégorie.</p>
      )}
    </section>
  );
}
