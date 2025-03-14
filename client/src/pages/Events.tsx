import { useLoaderData } from "react-router-dom";
import CurrentEvents from "../components/CurrentEvents";
import UpcomingEvents from "../components/UpcomingEvents";
import "../styles/Events.css";

export default function Events() {
  const { currentEvents, upcomingEvents } = useLoaderData() as LoaderEvents;

  return (
    <>
      <div className="allevents-container">
        <section className="currents">
          <CurrentEvents currentEvents={currentEvents} />
        </section>
        <section className="upcoming">
          <UpcomingEvents upcomingEvents={upcomingEvents} />
        </section>
      </div>
    </>
  );
}
