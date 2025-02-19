import "../styles/PicturesHome.css";

export default function PicturesHome({ artworks }: Artworks) {
  return (
    <section className="masonry-gallery">
      {artworks.map((artwork) => (
        <img
          src={artwork.picture}
          alt={artwork.description}
          key={artwork.id}
          className="masonry-item"
        />
      ))}
    </section>
  );
}
