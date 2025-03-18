import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
      <div className="fixed-navbar">
        <Navbar />
      </div>
      <main>
        <Outlet />
      </main>
    </>
  );
}
