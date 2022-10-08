import { useFirestore } from "../../hooks/useFirestore";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./Project.css";

const ProjectSummary = ({ document }) => {
  const { deleteDocument } = useFirestore("projects");
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleClick = () => {
    deleteDocument(document.id);
    navigate("/");
  };
  return (
    <div className="project-summary">
      <div>
        <h2>{document.name}</h2>
        <p className="due-date">
          created at {document.createdAt.toDate().toDateString()} by{" "}
          {document.createdBy.displayName}
        </p>
      </div>
      <div className="details">{document.details}</div>
      <div>
        <h4>Project is assigned to:</h4>
        <ul className="assigned-users">
          {document.assignedUsersList.map((user) => (
            <li key={user.photoURL}>
              <img src={user.photoURL} alt="user avatar" />
            </li>
          ))}
        </ul>
      </div>
      {document.createdBy.id === user.uid && (
        <button onClick={handleClick} className="auth-button">
          Finish project
        </button>
      )}
    </div>
  );
};

export default ProjectSummary;
