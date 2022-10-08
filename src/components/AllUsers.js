import React from "react";
import "./AllUsers.css";
import { useCollection } from "../hooks/useCollection";

function AllUsers() {
  const { documents, error } = useCollection("users");
  return (
    <div className="users-sidebar">
      <div className="users-content">
        <div className="header">
          <h2>All users</h2>
        </div>
        <nav className="users">
          {error && <p className="error">{error}</p>}
          <ul>
            {documents &&
              documents.map((doc) => (
                <li key={doc.id}>
                  {doc.online && <span className="online"></span>}
                  {doc.displayName}
                  <img className="avatar" src={doc.photoURL} alt="user" />
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default AllUsers;
