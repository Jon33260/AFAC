import "../styles/UpcomingEvents.css";

import { Link } from "react-router-dom";

interface CurrentEventsProps {
  currentEvents: Events;
}
export default function CurrentEvents({ currentEvents }: CurrentEventsProps) {
  return (
    <article>
      {currentEvents.length > 0 ? (
        <section className="events-container">
          <h2>Expositions en cours</h2>
          <div className="scroll">
            <ul className="event-list">
              {currentEvents.map((currentEvents) => (
                <li key={currentEvents.event_id} className="event-card">
                  <h3>{currentEvents.event_title}</h3>

                  <p>
                    {currentEvents.location} le {""}
                    {new Date(currentEvents.start_date).toLocaleDateString()} -{" "}
                    {new Date(currentEvents.end_date).toLocaleDateString()}
                  </p>
                  <img
                    src={currentEvents.picture}
                    alt={currentEvents.event_title}
                    className="event-image"
                  />
                  <p>{currentEvents.artists}</p>
                  <Link
                    to={`/events/${currentEvents.event_id}`}
                    className="ed-artist-name"
                  >
                    En savoir plus
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : (
        <p>Il n'y a pas d'événements en ce moment.</p>
      )}
    </article>
  );
}
