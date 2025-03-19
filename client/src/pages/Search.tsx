import { useLoaderData } from "react-router-dom";
import PicturesHome from "../components/PicturesHome";

export default function Search() {
  const artworks = useLoaderData() as Artwork[];

  if (!artworks) {
    return <h1>Pas de résultat</h1>;
  }

  return (
    <>
      <h1 style={{ marginTop: "5rem", marginLeft: "2rem" }}>
        Résultat de la recherche
      </h1>
      <PicturesHome artworks={artworks} />
    </>
  );
}
