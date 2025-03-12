import "../styles/ArtworkPage.css";
import { Link, useLoaderData } from "react-router-dom";
import EditPost from "../components/EditPost";

export default function ArtworkPage() {
  const artwork = useLoaderData() as Artwork;

  return (
    <article className="artwork-page">
      <figure className="artwork-image">
        <div className="artwork-image-link-container">
          <Link to="/" className="artwork-image-link">
            Retour
          </Link>
          <EditPost />
        </div>
        <img src={artwork.picture} alt={artwork.description} />
      </figure>

      <section className="artwork-details">
        <div>
          <h1>{artwork.title}</h1>
          <span className="category">{artwork.category}</span>
        </div>

        <p className="description">{artwork.description}</p>

        <div>
          <Link to={`/profile/${artwork.user_id}`}>
            <p className="artist">Par {artwork.username}</p>
          </Link>
        </div>
        <hr className="separator" />
      </section>
    </article>
  );
}
