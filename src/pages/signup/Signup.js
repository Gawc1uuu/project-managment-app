//styles
import "./Signup.css";

import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarError, setAvatarError] = useState(null);
  const { signup, isPending, error } = useSignup();

  const handleFileChange = (e) => {
    setAvatar(null);
    let selected = e.target.files[0];
    if (!selected) {
      setAvatarError("Please choose an avatar!");
      return;
    }
    if (!selected.type.includes("image")) {
      setAvatarError("Avatar must be an image!");
      return;
    }
    if (selected.size > 100000) {
      setAvatarError("Image too large! must be less than 100kb");
      return;
    }
    setAvatarError(null);
    setAvatar(selected);
    console.log("avatar updated");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName, avatar);
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
        <label>
          <input type="file" onChange={handleFileChange} />
          <span>Add a avatar</span>
        </label>
        {isPending && <button className="auth-button">signing up...</button>}
        {!isPending && <button className="auth-button">Sign up</button>}
        {error && <p className="error">{error}</p>}
        {avatarError && <p className="error">{avatarError}</p>}
      </form>
    </div>
  );
};

export default Signup;
