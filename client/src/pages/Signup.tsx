import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import "../styles/Signup.css";

export default function Signup() {
  const [isSignup, setIsSignup] = useState(true);
  const toggleForm = () => {
    setIsSignup(!isSignup);
  };
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  } as UserTypes);

  const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  return (
    <div className="signup-page-container">
      <section className="form-section">
        <div className="visual-title">
          <h1>Explorez nos</h1>
          <h2>galeries.</h2>
        </div>
        {isSignup ? (
          <SignupForm user={user} handleChangeForm={handleChangeForm} />
        ) : (
          <LoginForm user={user} handleChangeForm={handleChangeForm} />
        )}
        <button type="button" className="login-link" onClick={toggleForm}>
          {isSignup ? "Déjà un compte ?" : "Pas encore de compte ?"}
        </button>
      </section>
      <section className="img-section">
        <div className="visual-image">
          <img src="/images/form_image.jpg" alt="Peinture abstraite" />
        </div>
      </section>
    </div>
  );
}
