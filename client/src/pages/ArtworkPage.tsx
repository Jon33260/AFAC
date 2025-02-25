import "../styles/ArtworkPage.css";
import { useLoaderData } from "react-router-dom";

export default function ArtworkPage() {
  const artwork = useLoaderData() as Artwork;
  console.info(artwork);

  return (
    <div className="artwork-container">
      <div className="artwork-header">
        <h1 className="artwork-title">{artwork.title}</h1>
        <p className="artwork-artist">{artwork.user_name}</p>
      </div>
      <img
        src={artwork.picture}
        alt={artwork.title}
        className="artwork-image"
      />
      <p className="artwork-description">{artwork.description}</p>
    </div>
  );
}
