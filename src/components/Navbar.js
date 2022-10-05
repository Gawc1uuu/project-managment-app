import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

//styles
import "./Navbar.css";
import AkadeLogo from "../assets/akade-logo.png";

export default function Navbar() {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <img src={AkadeLogo} alt="logo" />
        </li>
        {!user && (
          <>
            <li>
              <Link to="/signup">Sign up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
        <li>
          {user && (
            <button className="logout" onClick={() => logout()}>
              Logout
            </button>
          )}
        </li>
      </ul>
    </div>
  );
}
