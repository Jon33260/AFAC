import "../styles/ArtworkPage.css";
import { Link, useLoaderData } from "react-router-dom";
import SvgIcons from "../components/SvgIcons";
import { addLike } from "../services/requests";

const likeIcon = {
  like: {
    width: "28px",
    height: "28px",
    path: "m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z",
  },
};

export default function ArtworkPage() {
  const artwork = useLoaderData() as Artwork;

  const submitLike = async () => {
    await addLike(Number(artwork.id));
  };

  return (
    <article className="artwork-page">
      <figure className="artwork-image">
        <Link to="/" className="artwork-image-link">
          Retour
        </Link>
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

        <div className="like-section">
          <button type="button" onClick={submitLike}>
            <SvgIcons {...likeIcon.like} />
          </button>
        </div>
      </section>
    </article>
  );
}
