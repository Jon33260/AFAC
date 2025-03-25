import { useState } from "react";
import "../styles/CreateExposure.css";
import { ToastContainer, toast } from "react-toastify";
import { getArtworksBySearch, postArtworkToEvent } from "../services/requests";
import { postEvent } from "../services/requests";

const baseUrl = import.meta.env.VITE_API_URL;

export default function CreateExposure() {
  const [showDateOptions, setShowDateOptions] = useState(false);
  const [checked, setChecked] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    location: "",
  } as FormDataCreateEvent);

  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [selectedArtworks, setSelectedArtworks] = useState<Artwork[]>([]);

  const handleAddArtwork = (artwork: Artwork) => {
    if (selectedArtworks.some((a) => a.id === artwork.id)) {
      setSelectedArtworks(selectedArtworks.filter((a) => a.id !== artwork.id));
      toast.error("Cette oeuvre a été retirée de la liste");
      return;
    }
    setSelectedArtworks((prevSelected) => [...prevSelected, artwork]);
    toast.success("Cette oeuvre a été ajoutée à la liste");
  };

  const handleChangeArtworks = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.currentTarget.value;
    const artworks = await getArtworksBySearch(value);
    setArtworks(artworks);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const event = await postEvent(formData);
    for (const artwork of selectedArtworks) {
      await postArtworkToEvent(artwork.id, event.insertId);
    }
    toast.success("Exposition créée avec succès");
  };

  return (
    <section className="create-exposure">
      <form className="search" onSubmit={handleSubmit}>
        <div className="container">
          <h1>Créer Exposition</h1>
          <button className="create" type="submit">
            + Créer
          </button>
        </div>
        <div className="event-container">
          <article className="info-event">
            <label htmlFor="title">Nom de l'évènement</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />

            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            <label htmlFor="startDate">Date de début</label>
            <input
              type="date"
              id="startDate"
              value={formData.start_date}
              onChange={(e) =>
                setFormData({ ...formData, start_date: e.target.value })
              }
              onFocus={() => setShowDateOptions(true)}
              onBlur={() => setShowDateOptions(false)}
            />

            <label htmlFor="endDate">Date de fin</label>
            <input
              type="date"
              id="endDate"
              value={formData.end_date}
              onChange={(e) =>
                setFormData({ ...formData, end_date: e.target.value })
              }
            />

            {showDateOptions && (
              <div className="date-options">
                <p>Format: JJ/MM/AAAA</p>
                <p>Exemple: 10/03/2025</p>
              </div>
            )}
          </article>
          <div className="details-event">
            <div className="lieu-container">
              <label htmlFor="lieu">Lieu</label>
              <div className="toggle-btn">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => {
                    setChecked(!checked);
                    setFormData({ ...formData, location: "En ligne" });
                  }}
                />
                {checked ? "En ligne" : "Hors ligne"}
              </div>
            </div>
            <input
              type="text"
              className="lieu-input"
              disabled={checked}
              value={formData.location}
              id="lieu"
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
            <div className="select-artworks">
              <label htmlFor="artworks">Choix des arts à exposer</label>
              <input
                type="text"
                id="artworks"
                placeholder="Nom de l'oeuvre etc..."
                onChange={handleChangeArtworks}
              />
              <div className="artwork-container">
                {artworks.map((artwork) => (
                  <div key={artwork.id} className="artwork-item">
                    <img
                      src={`${baseUrl}/uploads/${artwork.picture}`}
                      alt={artwork.title}
                      className="search-artwork"
                    />
                    <span className="artist-name">{artwork.username}</span>
                    <input
                      type="checkbox"
                      className="add-artwork"
                      value="Add"
                      onChange={() => handleAddArtwork(artwork)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer />
    </section>
  );
}
