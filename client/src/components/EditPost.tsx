import SvgIcons from "./SvgIcons";
import "../styles/EditPost.css";
import EditPostModal from "./EditPostModal";

const icons = {
  threeDots: {
    height: "21px",
    width: "21px",
    path: "M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z",
  },
};

export default function EditPost({
  artwork,
  category,
}: {
  artwork: Artwork;
  category: Category[];
}) {
  return (
    <details className="edit-post">
      <summary className="edit-post_sum">
        <SvgIcons {...icons.threeDots} />
      </summary>
      <ul className="edit-post_menu">
        <li>
          <button
            type="button"
            className="edit-post_btn"
            onClick={() => {
              const modal = document.getElementById(
                "edit-post-modal",
              ) as HTMLDialogElement;
              modal?.showModal();
            }}
          >
            Modifier
          </button>
        </li>
        <li>
          <button type="button" className="delete-post_btn">
            Supprimer
          </button>
        </li>
      </ul>

      {/* Edit post modal */}
      <EditPostModal artwork={artwork} category={category} />
    </details>
  );
}
