import "../styles/Header.css";
import { useState } from "react";

export default function Header() {
  const [selectedCategory, setSelectedCategory] = useState("" as string);

  return (
    <>
      <section className="container">
        <div className="barre-filtre">
          <div className="barre">
            <input type="text" placeholder="Recherche" />
          </div>
          <div className="filtre-bouton">
            <div className="filtre">
              <option value="">Filtre</option>
              <option value="Peintures">Populaire</option>
              <option value="Tableaux">Date</option>
            </div>
          </div>
        </div>

        <div className="categories">
          <div className="blochorizontal">
            <button
              className={`slide one ${selectedCategory === "Peintures" ? "selected" : ""}`}
              type="button"
              onClick={() => setSelectedCategory("Peintures")}
            >
              Peintures
            </button>
            <button
              className={`slide two ${selectedCategory === "Musique" ? "selected" : ""}`}
              type="button"
              onClick={() => setSelectedCategory("Musique")}
            >
              Musique
            </button>
            <button
              className={`slide three ${selectedCategory === "Photos" ? "selected" : ""}`}
              type="button"
              onClick={() => setSelectedCategory("Photos")}
            >
              Photos
            </button>
            <button
              className={`slide four ${selectedCategory === "Danse" ? "selected" : ""}`}
              type="button"
              onClick={() => setSelectedCategory("Danse")}
            >
              Danse
            </button>
            <button
              className={`slide five ${selectedCategory === "Street art" ? "selected" : ""}`}
              type="button"
              onClick={() => setSelectedCategory("Street art")}
            >
              Street art
            </button>
            <button
              className={`slide six ${selectedCategory === "Sculpture" ? "selected" : ""}`}
              type="button"
              onClick={() => setSelectedCategory("Sculpture")}
            >
              Sculpture
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
