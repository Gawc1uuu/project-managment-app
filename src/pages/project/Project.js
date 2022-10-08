import { useParams } from "react-router-dom";
import ProjectComments from "./ProjectComments";
import ProjectSummary from "./ProjectSummary";
import { useDocument } from "../../hooks/useDocument";
//styles

const Project = () => {
  const { id } = useParams();
  const { document, error } = useDocument(id, "projects");

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!document) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="project-details">
      <ProjectSummary document={document} />
      <ProjectComments document={document} />
    </div>
  );
};

export default Project;
