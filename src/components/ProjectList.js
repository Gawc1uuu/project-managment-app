import { Link } from "react-router-dom";
//styles
import "./ProjectList.css";

import React from "react";

const ProjectList = ({ projects }) => {
  return (
    <div className="project-list">
      {projects.length === 0 && <p>No projects yet</p>}

      {projects.map((project) => (
        <Link to={`/projects/${project.id}`} key={project.id}>
          <h4>{project.name}</h4>
          <p>
            created at {project.createdAt.toDate().toDateString()} by{" "}
            {project.createdBy.displayName}
          </p>
          <div className="desc">{project.details.substring(0, 100)}</div>
          <div className="assigned-to">
            <ul>
              {project.assignedUsersList.map((user) => (
                <li key={user.photoURL}>
                  <img
                    className="assigned-user-photo"
                    src={user.photoURL}
                    alt="user avatar"
                  />
                </li>
              ))}
            </ul>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProjectList;
