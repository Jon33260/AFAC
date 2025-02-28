import axios from "axios";
import "../styles/Header.css";
import { useEffect, useState } from "react";

interface Image {
  id: number;
  picture: string;
  title: string;
  description: string;
  username: string;
  category: string;
}

export default function Header() {
  const [selectedCategory, setSelectedCategory] = useState("" as string);
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3310/api/artworks")
      .then((response) => setImages(response.data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des données :", error),
      );
  }, []);

  const filteredImages = selectedCategory
    ? images.filter((image) => image.category === selectedCategory)
    : [];

  return (
    <>
      <section className="container">
        <div className="barre-filtre">
          <div className="barre">
            <input type="text" placeholder="Recherche" />
          </div>
          <div className="filtre-bouton">
            <div className="filtre">
              <select className="filtre">
                <option value="">Filtre</option>
                <option value="Populaire">Populaire</option>
                <option value="Date">Date</option>
              </select>
            </div>
          </div>
        </div>

        <div className="categories">
          <div className="blochorizontal">
            {[
              "Peintures",
              "Musique",
              "Photos",
              "Danse",
              "Street art",
              "Sculpture",
            ].map((category) => (
              <button
                key={category}
                className={`slide ${selectedCategory === category ? "selected" : ""}`}
                type="button"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        {selectedCategory && (
          <div className="image-gallery">
            {filteredImages.length > 0 ? (
              filteredImages.map((image) => (
                <div key={image.id} className="gallery-item">
                  <img
                    src={image.picture}
                    alt={image.title}
                    className="gallery-image"
                  />
                </div>
              ))
            ) : (
              <p>Aucune image trouvée pour cette catégorie.</p>
            )}
          </div>
        )}

        {/* Affichage d'un message si aucune catégorie n'est sélectionnée */}
        {!selectedCategory && (
          <p>Veuillez sélectionner une catégorie pour afficher les images.</p>
        )}
      </section>
    </>
  );
}
