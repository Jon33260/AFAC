import "../styles/UpcomingEvents.css";
import { useNavigate } from "react-router-dom";

interface UpcomingEventsProps {
  upcomingEvents: Events;
}

export default function UpcomingEvents({
  upcomingEvents,
}: UpcomingEventsProps) {
  const navigate = useNavigate();

  return (
    <article>
      {upcomingEvents.length > 0 ? (
        <section className="events-container">
          <h2>Expositions à venir</h2>
          <div className="scroll">
            <ul className="event-list">
              {upcomingEvents.map((upcomingEvents) => (
                <li key={upcomingEvents.event_id} className="event-card">
                  <h3>{upcomingEvents.event_title}</h3>

                  <p>
                    {upcomingEvents.location} le {""}
                    {new Date(upcomingEvents.start_date).toLocaleDateString()} -{" "}
                    {new Date(upcomingEvents.end_date).toLocaleDateString()}
                  </p>
                  <img
                    src={upcomingEvents.picture}
                    alt={upcomingEvents.event_title}
                    className="event-image"
                  />
                  <p>{upcomingEvents.artists}</p>
                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/events/${upcomingEvents.event_id}`)
                    }
                  >
                    En savoir plus
                  </button>
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
