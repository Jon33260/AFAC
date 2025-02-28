import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Header from "../components/Header";
import PicturesHome from "../components/PicturesHome";

export default function Home() {
  const { artworks, category } = useLoaderData() as LoaderDataHome;
  const [filteredImages, setFilteredImages] = useState(artworks as Artwork[]);

  return (
    <>
      <Header
        setFilteredImages={setFilteredImages}
        artworks={artworks}
        category={category}
      />
      <PicturesHome artworks={filteredImages} />
    </>
  );
}
