import "../styles/ArtworkPage.css";
import { useEffect, useState } from "react";
import {
  Link,
  useLoaderData,
  useParams,
  useRevalidator,
} from "react-router-dom";
import { ToastContainer, Zoom, toast } from "react-toastify";
import CommentsList from "../components/CommentsList";
import EditPost from "../components/EditPost";
import SvgIcons from "../components/SvgIcons";
import useAuth from "../services/AuthContext";
import { addLike, checkIfLiked, removeLike } from "../services/requests";
import { addComment } from "../services/requests";

const likeIcon = {
  like: {
    width: "28px",
    height: "28px",
    path: "m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z",
  },
};

const baseUrl = import.meta.env.VITE_API_URL;

export default function ArtworkPage() {
  const { id } = useParams();
  const { artworkData, category } = useLoaderData() as {
    artworkData: ArtworkDataType;
    category: Category[];
  };

  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState("");

  const revalidator = useRevalidator();

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const isLiked = await checkIfLiked(Number(id));
        setLiked(!!isLiked);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLikeStatus();
  }, [id]);

  const handleLikeClick = async () => {
    try {
      if (liked) {
        await removeLike(Number(id));
        setLiked(false);
        toast.success("Vous avez enlevé votre like!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Zoom,
        });
        revalidator.revalidate();
      } else {
        await addLike(Number(id));
        setLiked(true);
        toast.success("Vous avez liké!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Zoom,
        });

        revalidator.revalidate();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentSubmit = async () => {
    if (commentText.trim() === "") {
      toast.error("Le commentaire ne peut pas être vide!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Zoom,
      });
      return;
    }

    try {
      await addComment(Number(id), commentText);
      setCommentText("");
      toast.success("Votre commentaire a été ajouté!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Zoom,
      });
      revalidator.revalidate();
    } catch (error) {
      console.error(error);
      toast.error(
        "Une erreur est survenue lors de l'ajout de votre commentaire.",
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Zoom,
        },
      );
    }
  };

  const { currentUser } = useAuth();

  return (
    <article className="artwork-page">
      <figure className="artwork-image">
        <div className="artwork-image-link-container">
          <Link to="/" className="artwork-image-link">
            Retour
          </Link>

          {currentUser.id === artworkData.artwork.user_id && (
            <EditPost artwork={artworkData.artwork} category={category} />
          )}
        </div>
        <img
          src={`${baseUrl}/uploads/${artworkData.artwork.picture}`}
          alt={artworkData.artwork.description}
        />
      </figure>

      <section className="artwork-details">
        <div>
          <h1>{artworkData.artwork.title}</h1>
          <span className="category">
            {artworkData.artwork.category}{" "}
            <p className="created-at">
              {new Date(artworkData.artwork.created_at).toLocaleDateString()}
            </p>
          </span>
        </div>

        <p className="description">{artworkData.artwork.description}</p>

        <div>
          <Link to={`/profile/${artworkData.artwork.user_id}`}>
            <p className="artist">Par {artworkData.artwork.username}</p>
          </Link>
        </div>

        <hr className="separator" />

        <div className="like-section">
          <button
            type="button"
            onClick={handleLikeClick}
            className={`like-button ${liked ? "liked" : ""}`}
          >
            <SvgIcons {...likeIcon.like} />

            <span>{artworkData.artwork.likeCount}</span>
          </button>
        </div>
        {currentUser.id !== 0 && (
          <form
            onSubmit={handleCommentSubmit}
            className="comment-input-section"
          >
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Écrivez un commentaire..."
              className="comment-input"
            />
            <button type="submit" className="submit-button">
              Envoyer
            </button>
          </form>
        )}

        <CommentsList artworkData={artworkData} />
      </section>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Zoom}
      />
    </article>
  );
}
