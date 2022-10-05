//styles
import "./Login.css";

import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isPending } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Login</h2>
        <label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="email"
          />
        </label>
        <label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="password"
          />
        </label>
        {isPending && <button className="auth-button">logging in...</button>}
        {!isPending && <button className="auth-button">Login</button>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
