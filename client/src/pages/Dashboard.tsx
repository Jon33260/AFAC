import { useLoaderData } from "react-router-dom";
import CreateExposure from "../components/CreateExposure";
import EventsDashboard from "../components/EventsDashboard";

export default function Dashboard() {
  const { currentEvents, upcomingEvents } = useLoaderData() as LoaderEvents;

  return (
    <>
      <h1>Dashboard</h1>
      <CreateExposure />
      <EventsDashboard
        currentEvents={currentEvents}
        upcomingEvents={upcomingEvents}
      />
    </>
  );
}
