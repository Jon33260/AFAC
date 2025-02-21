import SignupForm from "../components/SignupForm";
import "../styles/Signup.css";

export default function Signup() {
  return (
    <div className="signup-page-container">
      <section className="form-section">
        <div className="visual-title">
          <h1>Explorez nos</h1>
          <h2>galeries.</h2>
        </div>
        <SignupForm />
      </section>
      <section className="img-section">
        <div className="visual-image">
          <img src="/images/form_image.jpg" alt="Peinture abstraite" />
        </div>
      </section>
    </div>
  );
}
