import { useState } from "react";
import "../styles/SignupForm.css";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Ici logique pour traiter l'inscription
    console.info("Formulaire soumis:", {
      username,
      email,
      password,
      confirmPassword,
    });
    // verifie si les mots de passes sont identiques et prévient l'utilisateur qu'il y a une erreur de mdp
    if (password !== confirmPassword) {
      setError(true);
      setShowTooltip(true);
    } else {
      setError(false);
      setShowTooltip(false);
    }
  };

  //permet à l'utilisateur de voir ou non son mdp
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="signup-container">
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Entrez un nom d'utilisateur"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse mail"
              required
            />
          </div>
          <div className={`form-group ${error ? "error" : ""}`}>
            <label htmlFor="password">Mot de passe</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Veuillez entrer un mot de passe"
                required
              />
              <span
                className="password-toggle"
                onClick={togglePassword}
                onKeyDown={togglePassword}
              >
                👁️
              </span>
            </div>
          </div>
          <div className={`form-group ${error ? "error" : ""}`}>
            <label htmlFor="confirmPassword">Confirmez le mot de passe</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Veuillez entrer un mot de passe"
                required
              />
              <span
                className="password-toggle"
                onClick={togglePassword}
                onKeyDown={togglePassword}
              >
                👁️
              </span>
            </div>
          </div>
          {showTooltip && (
            <div className="tooltip">Entrez des mots de passe identiques</div>
          )}
          <button type="submit" className="signup-button">
            S'inscrire
          </button>
          <a href="test" className="login-link">
            Se connecter
          </a>
        </form>
      </div>
    </>
  );
}
