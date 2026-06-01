import { useState, useCallback } from "react";
import { loginUser, registerUser, googleAuth } from "../../api/endpoints";

export default function AuthContainer() {
  const [showForm, setShowForm] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleGoogle = useCallback(async () => {
    setLoading(true);
    setMessage("");
    try {
      const result = await googleAuth();
      setMessage(result.message);
    } catch (e) {
      setMessage("Google Auth is not yet available.");
    }
    setLoading(false);
  }, []);

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      if (!username || !password) {
        setMessage("Please enter both fields.");
        return;
      }
      setLoading(true);
      setMessage("");
      try {
        const result = await loginUser(username, password);
        setMessage(result.message);
      } catch (e) {
        setMessage("Login is not yet available.");
      }
      setLoading(false);
    },
    [username, password]
  );

  const handleRegister = useCallback(
    async (e) => {
      e.preventDefault();
      if (!username || !password) {
        setMessage("Please enter both fields.");
        return;
      }
      setLoading(true);
      setMessage("");
      try {
        const result = await registerUser({
          username,
          password,
          role: "owner",
        });
        setMessage(result.message);
      } catch (e) {
        setMessage("Registration is not yet available.");
      }
      setLoading(false);
    },
    [username, password]
  );

  return (
    <div className="auth-container">
      {/* Primary: Continue with Google */}
      <button
        className="auth-google"
        onClick={handleGoogle}
        disabled={loading}
        id="auth-google-btn"
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Continue with Google
      </button>


      {!showForm ? (
        /* Stacked buttons */
        <div className="auth-stacked-buttons">
          <button
            className="auth-stacked-btn"
            onClick={() => setShowForm(true)}
            id="auth-email-btn"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            Continue with Email
          </button>
          <button
            className="auth-stacked-btn"
            onClick={() => setShowForm(true)}
            id="auth-phone-btn"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
              <path d="M12 18h.01" />
            </svg>
            Continue with Phone
          </button>
        </div>
      ) : (
        /* Login / Register Form */
        <div className="auth-form-panel">
          <form className="auth-form" onSubmit={handleLogin}>
            <input
              className="auth-input"
              type="text"
              placeholder="Username or Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="auth-username"
              autoComplete="username"
            />
            <input
              className="auth-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="auth-password"
              autoComplete="current-password"
            />
            <div className="auth-buttons">
              <button
                type="submit"
                className="auth-btn-login"
                disabled={loading}
                id="auth-login-btn"
              >
                {loading ? "..." : "Login"}
              </button>
              <button
                type="button"
                className="auth-btn-register"
                onClick={handleRegister}
                disabled={loading}
                id="auth-register-btn"
              >
                Register
              </button>
            </div>
          </form>
          <button
            className="auth-form-back"
            onClick={() => setShowForm(false)}
          >
            ← Back to options
          </button>
        </div>
      )}

      {/* Status Message */}
      {message && <p className="auth-message">{message}</p>}

      {/* Legal */}
      <p className="auth-legal">
        By continuing, you agree to our{" "}
        <a href="#terms">Terms of Service</a> and{" "}
        <a href="#privacy">Privacy Policy</a>.
      </p>
    </div>
  );
}
