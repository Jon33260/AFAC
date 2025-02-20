import { useLoaderData } from "react-router-dom";
import PicturesHome from "../components/PicturesHome";

export default function Home() {
  const artworks = useLoaderData() as Artwork[];
  return (
    <>
      <PicturesHome artworks={artworks} />
    </>
  );
}
