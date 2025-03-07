import { useLoaderData } from "react-router-dom";
import EventsDashboard from "../components/EventsDashboard";

export default function Dashboard() {
  const { currentEvents, upcomingEvents } = useLoaderData() as LoaderEvents;

  return (
    <>
      <h1>Dashboard</h1>
      <EventsDashboard
        currentEvents={currentEvents}
        upcomingEvents={upcomingEvents}
      />
    </>
  );
}
