import "../styles/Header.css";
import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../services/AuthContext";
import NewPost from "./NewPost";
import SvgIcons from "./SvgIcons";

const searchIcon = {
  height: "26px",
  width: "26px",
  path: "M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z",
};

export default function Header({
  setFilteredImages,
  artworks,
  category,
}: HeaderProps) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const { currentUser } = useAuth();

  const handleClick = (categoryName: string) => {
    setSelectedCategory(categoryName);

    const filteredArtworks = artworks.filter(
      (artwork) => artwork.category === categoryName,
    );

    setFilteredImages(filteredArtworks);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (searchValue) {
      e.preventDefault();
      navigate(`search/${searchValue}`);
    }
  };

  return (
    <section className="header-container">
      <div className="barre-filtre">
        <form className="barre" onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="Recherche"
            value={searchValue}
            onChange={(e) => setSearchValue(e.currentTarget.value)}
          />
          <button type="submit" className="btn-search">
            <SvgIcons
              path={searchIcon.path}
              height={searchIcon.height}
              width={searchIcon.width}
            />
          </button>
        </form>

        <div className="filtre">
          <select className="filtre">
            <option value="">Filtre</option>
            <option value="Populaire">Populaire</option>
            <option value="Date">Date</option>
          </select>
        </div>
      </div>
      {currentUser.id !== 0 && <NewPost category={category} />}

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
