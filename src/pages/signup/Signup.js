//styles
import "./Signup.css";

import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isPending, error } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Signup</h2>
        <label>
          <input
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
        </label>
        <label>
          <input
            required
            type="text"
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="display name"
          />
        </label>
        <label>
          <input
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        </label>
        {/* <label>
          <input type="file" />
          <span>Add a avatar</span>
        </label> */}
        {isPending && <button className="auth-button">signing up...</button>}
        {!isPending && <button className="auth-button">Sign up</button>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
