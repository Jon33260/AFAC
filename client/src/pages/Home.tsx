import { useLoaderData } from "react-router-dom";
import Header from "../components/Header";
import PicturesHome from "../components/PicturesHome";

export default function Home() {
  const artworks = useLoaderData() as Artwork[];
  return (
    <>
      <Header />
      <PicturesHome artworks={artworks} />
    </>
  );
}
