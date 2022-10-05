import React from "react";
import "./AllUsers.css";

function AllUsers() {
  return (
    <div className="users-sidebar">
      <div className="users-content">
        <div className="header">
          <p>All users</p>
        </div>
        <nav className="users">
          <ul>
            <li>gawcio</li>
            <li>ada</li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default AllUsers;
