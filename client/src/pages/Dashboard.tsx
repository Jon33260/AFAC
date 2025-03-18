import { useLoaderData } from "react-router-dom";
import CreateExposure from "../components/CreateExposure";
import EventsDashboard from "../components/EventsDashboard";
import useAuth from "../services/AuthContext";

export default function Dashboard() {
  const { currentEvents, upcomingEvents } = useLoaderData() as LoaderEvents;
  const { currentUser } = useAuth();

  if (!currentUser.is_admin) {
    return (
      <h1 style={{ marginTop: "5rem", marginLeft: "2rem" }}>Accès refusé !</h1>
    );
  }

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
