import "../styles/EventsDashboard.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { deleteEvent } from "../services/requests";

interface EventsDashboardProps {
  currentEvents: Events;
  upcomingEvents: Events;
}

export default function EventsDashboard({
  currentEvents: initialCurrentEvents,
  upcomingEvents: initialUpcomingEvents,
}: EventsDashboardProps) {
  const [currentEvents, setCurrentEvents] = useState(initialCurrentEvents);
  const [upcomingEvents, setUpcomingEvents] = useState(initialUpcomingEvents);

  const handleDelete = async (id: number) => {
    try {
      await deleteEvent(id);
      setCurrentEvents(currentEvents.filter((event) => event.event_id !== id));
      setUpcomingEvents(
        upcomingEvents.filter((event) => event.event_id !== id),
      );
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

  return (
    <>
      <div className="allevents-container">
        <section className="current-container">
          <h2>Expositions en cours</h2>
          <div className="cardevent-container">
            {currentEvents.map((event) => (
              <article key={event.event_id}>
                <h3>{event.event_title}</h3>
                <Link
                  to={`/events/${event.event_id}`}
                  className="see-event-link"
                >
                  voir
                </Link>
                <button
                  type="button"
                  className="delete-event-button"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Voulez-vous vraiment supprimer cet événement ?",
                      )
                    ) {
                      handleDelete(event.event_id);
                    }
                  }}
                >
                  delete
                </button>
              </article>
            ))}
          </div>
        </section>
        <section className="upcoming-container">
          <h2>Expositions à venir</h2>
          <div className="cardevent-container">
            {upcomingEvents.map((event) => (
              <article key={event.event_id}>
                <h3>{event.event_title}</h3>
                <Link
                  to={`/events/${event.event_id}`}
                  className="see-event-link"
                >
                  voir
                </Link>
                <button
                  type="button"
                  className="delete-event-button"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Voulez-vous vraiment supprimer cet événement ?",
                      )
                    ) {
                      handleDelete(event.event_id);
                    }
                  }}
                >
                  delete
                </button>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
