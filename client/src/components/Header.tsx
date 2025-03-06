import "../styles/Header.css";
import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header({
  setFilteredImages,
  artworks,
  category,
}: HeaderProps) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleClick = (categoryName: string) => {
    setSelectedCategory(categoryName);

    const filteredArtworks = artworks.filter(
      (artwork) => artwork.category === categoryName,
    );

    setFilteredImages(filteredArtworks);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`search/${searchValue}`);
  };

  return (
    <section className="container">
      <div className="barre-filtre">
        <form className="barre" onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="Recherche"
            value={searchValue}
            onChange={(e) => setSearchValue(e.currentTarget.value)}
          />
        </form>

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
