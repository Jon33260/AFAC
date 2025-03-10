import { useState } from "react";
import "../styles/CreateExposure.css";

export default function CreateExposure() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showDateOptions, setShowDateOptions] = useState(false);
  const [checked, setChecked] = useState(false);

  return (
    <section className="create-exposure">
      <div className="container">
        <h1>Créer Exposition</h1>
        <button className="create" type="button">
          + Créer
        </button>
      </div>
      <section className="event-container">
        <section className="info-event">
          <p>Nom de l'évènement</p>
          <input type="text" />

          <p>Description</p>
          <input type="text" />

          <p>Date de début</p>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            onFocus={() => setShowDateOptions(true)}
            onBlur={() => setShowDateOptions(false)}
          />

          <p>Date de fin</p>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          {showDateOptions && (
            <div className="date-options">
              <p>Format: JJ/MM/AAAA</p>
              <p>Exemple: 10/03/2025</p>
            </div>
          )}
        </section>
        <section className="details-event">
          <div className="lieu-container">
            <p>Lieu</p>
            <button
              className={`toggle-btn ${checked ? "checked" : ""}`}
              onClick={() => setChecked(!checked)}
              type="button"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
              {checked ? "En ligne" : "Hors ligne"}
            </button>
          </div>
          <input type="text" className="lieu-input" disabled={checked} />
          <div className="select-artworks">
            <h2>Choix des arts à exposer</h2>
            <form className="search">
              <input type="text" placeholder="Nom de l'oeuvre etc..." />
            </form>
          </div>
        </section>
      </section>
    </section>
  );
}
