import { Link, useLoaderData } from "react-router-dom";

import "../styles/EventDetails.css";

export default function EventDetails() {
  const eventDetails = useLoaderData() as EventDetails;

  if (!eventDetails.length) {
    return <div>Aucun détail trouvé pour cet événement.</div>;
  }

  return (
    <section className="ed-container">
      <h1 className="ed-title">{eventDetails[0].event_title}</h1>
      <p className="ed-desc">{eventDetails[0].event_description}</p>
      <p className="ed-location">Lieu : {eventDetails[0].location}</p>
      <p className="ed-dates">
        Du {new Date(eventDetails[0].start_date).toLocaleDateString()} au{" "}
        {new Date(eventDetails[0].end_date).toLocaleDateString()}{" "}
      </p>
      <h2 className="ed-artworks-title">Oeuvres exposées :</h2>
      <div className="scroll">
        {eventDetails.map((detail) => (
          <article key={detail.artwork_id} className="ed-artwork-container">
            <h3 className="ed-artwork-name">{detail.artwork_title}</h3>
            <div className="ed-artwork-img-container">
              <img
                className="ed-img"
                src={detail.picture}
                alt={detail.artwork_title}
              />
            </div>
            <p className="ed-artwork-desc">"{detail.artwork_description}"</p>
            <Link to={`/profile/${detail.user_id}`} className="ed-artist-name">
              {detail.artist_name}
            </Link>
          </article>
        ))}
      </div>
      <Link to={"/events"} className="ed-return">
        retour
      </Link>
    </section>
  );
}
