import { useState } from "react";
import { editArtwork } from "../services/requests";
import "../styles/NewPost.css";

export default function EditPostModal({ artwork, category }: EditPostProps) {
  console.info(artwork);
  const [formValues, setFormValues] = useState<Partial<Artwork>>({
    title: artwork.title,
    description: artwork.description,
    category_id: artwork.category_id,
    user_id: artwork.user_id,
  });

  const handleChangeForm = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setFormValues({
      ...formValues,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSubmit = () => {
    try {
      editArtwork(artwork.id, formValues);
      const modal = document.getElementById(
        "edit-post-modal",
      ) as HTMLDialogElement;
      modal?.close();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <dialog id="edit-post-modal" className="modal">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titre"
          name="title"
          value={formValues.title}
          onChange={handleChangeForm}
        />
        <textarea
          placeholder="Description"
          name="description"
          value={formValues.description}
          onChange={handleChangeForm}
        />
        <select
          name="category_id"
          id="category_id"
          value={formValues.category_id}
          onChange={handleChangeForm}
        >
          {category.map((categorie) => (
            <option key={categorie.id} value={categorie.id}>
              {categorie.name}
            </option>
          ))}
        </select>
        <button type="submit">Éditer</button>
      </form>
      <button
        type="button"
        className="btn-closeModal"
        onClick={() => {
          const modal = document.getElementById(
            "edit-post-modal",
          ) as HTMLDialogElement;
          modal?.close();
        }}
      >
        ✕
      </button>
    </dialog>
  );
}
