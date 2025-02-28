import "../styles/Header.css";
import { useState } from "react";

export default function Header({
  setFilteredImages,
  artworks,
  category,
}: HeaderProps) {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleClick = (categoryName: string) => {
    setSelectedCategory(categoryName);

    const filteredArtworks = artworks.filter(
      (artwork) => artwork.category === categoryName,
    );

    setFilteredImages(filteredArtworks);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.currentTarget.value.toLowerCase();

    const filteredArtworks = artworks.filter(
      (artwork) =>
        artwork.title.toLowerCase().includes(searchTerm) ||
        artwork.username.toLowerCase().includes(searchTerm),
    );

    setFilteredImages(filteredArtworks);
  };

  return (
    <section className="container">
      <div className="barre-filtre">
        <div className="barre">
          <input
            type="text"
            placeholder="Recherche"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="filtre">
          <select className="filtre">
            <option value="">Filtre</option>
            <option value="Populaire">Populaire</option>
            <option value="Date">Date</option>
          </select>
        </div>
      </div>

      <div className="categories">
        {category.map((categorie) => (
          <button
            key={categorie.name}
            className={`slide ${selectedCategory === categorie.name ? "selected" : ""}`}
            type="button"
            onClick={() => handleClick(categorie.name)}
          >
            {categorie.name}
          </button>
        ))}
      </div>
    </section>
  );
}
