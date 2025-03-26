import "../styles/CommentList.css";
import { Link } from "react-router-dom";

const baseUrl = import.meta.env.VITE_API_URL;

export default function CommentList({
  artworkData,
}: { artworkData: ArtworkDataType }) {
  return (
    <>
      <article className="comment-section">
        {artworkData.comments.map((comment) => (
          <div key={comment.id} className="comment">
            <Link to={`/profile/${comment.user_id}`} className="head-comment">
              <img
                src={`${baseUrl}/uploads/${comment.user_picture}`}
                alt={comment.username}
              />
            </Link>
            <Link to={`/profile/${comment.user_id}`} className="head-comment">
              <h3>{comment.username} :</h3>
            </Link>
            <p>{comment.comment_text}</p>
          </div>
        ))}
      </article>
    </>
  );
}
