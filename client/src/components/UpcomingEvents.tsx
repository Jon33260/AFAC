import "../styles/UpcomingEvents.css";

interface UpcomingEventsProps {
  upcomingEvents: Events;
}

export default function UpcomingEvents({
  upcomingEvents,
}: UpcomingEventsProps) {
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
                    src={
                      upcomingEvents.picture ||
                      "https://www.adobe.com/fr/creativecloud/illustration/discover/digital-art/media_18ad62d9c62b3ae63f9a7d138df2613a820602a70.jpeg?width=750&format=jpeg&optimize=medium"
                    }
                    alt={upcomingEvents.event_title}
                    className="event-image"
                  />

                  <p>Artistes : {upcomingEvents.artists}</p>
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
