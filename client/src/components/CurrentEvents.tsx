interface CurrentEventsProps {
  currentEvents: Events;
}
export default function CurrentEvents({ currentEvents }: CurrentEventsProps) {
  return (
    <article>
      <h2>Current Events</h2>
      {currentEvents.length > 0 ? (
        currentEvents.map((currentEvent) => (
          <p key={currentEvent.event_id}>
            {currentEvent.event_title} lieu : {currentEvent.location}
          </p>
        ))
      ) : (
        <p>Il n'y a pas d'évènements en ce moment.</p>
      )}
    </article>
  );
}
