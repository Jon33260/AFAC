interface UpcomingEventsProps {
  upcomingEvents: Events;
}

export default function UpcomingEvents({
  upcomingEvents,
}: UpcomingEventsProps) {
  return (
    <article>
      <h2>Upcoming Events</h2>
      {upcomingEvents.length > 0 ? (
        upcomingEvents.map((upcomingEvent) => (
          <p key={upcomingEvent.event_id}>
            {upcomingEvent.event_title} lieu : {upcomingEvent.location}
          </p>
        ))
      ) : (
        <p>Aucun évènement à venir.</p>
      )}
    </article>
  );
}
