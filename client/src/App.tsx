import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { useDarkTheme } from "./services/DarkThemeContext";

export default function App() {
  const { darkTheme } = useDarkTheme();
  const root = document.querySelector("#root");

  if (root) {
    root.className = darkTheme ? "dark" : "light";
  }

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
