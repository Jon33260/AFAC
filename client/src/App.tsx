import { Outlet } from "react-router-dom";

import "./App.css";
import SignupForm from "./components/SignupForm";

function App() {
  return (
    <>
      <Outlet />

      <SignupForm />
    </>
  );
}

export default App;
