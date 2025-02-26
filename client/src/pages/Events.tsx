import { useLoaderData } from "react-router-dom";
import CurrentEvents from "../components/CurrentEvents";
import UpcomingEvents from "../components/UpcomingEvents";

export default function Events() {
  const { currentEvents, upcomingEvents } = useLoaderData() as LoaderEvents;
  console.info("Loader Data :", { currentEvents, upcomingEvents });
  return (
    <>
      <section className="currents">
        <CurrentEvents currentEvents={currentEvents} />
      </section>
      <section className="upcoming">
        <UpcomingEvents upcomingEvents={upcomingEvents} />
      </section>
    </>
  );
}
