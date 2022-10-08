import ProjectFilter from "../../components/ProjectFilter";
import ProjectList from "../../components/ProjectList";
import { useCollection } from "../../hooks/useCollection";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
//styles

const Dashboard = () => {
  const { documents, error } = useCollection("projects");
  const [newFilter, setNewFilter] = useState("all");
  const { user } = useAuthContext();

  const changeFilter = (newFilter) => {
    setNewFilter(newFilter);
  };

  const projects = documents
    ? documents.filter((document) => {
        switch (newFilter) {
          case "all":
            return true;
          case "mine":
            let assignedToMe = false;
            document.assignedUsersList.forEach((u) => {
              if (user.uid === u.id || user.uid === document.createdBy.id) {
                assignedToMe = true;
              }
            });
            return assignedToMe;
          case "electricity":
          case "windows":
          case "construction":
          case "plumbing":
            console.log(document.category, newFilter);
            return document.category === newFilter;
          default:
            return true;
        }
      })
    : null;

  return (
    <div>
      <h2>All Projects</h2>
      {documents && (
        <ProjectFilter newFilter={newFilter} changeFilter={changeFilter} />
      )}
      <div>{projects && <ProjectList projects={projects} />}</div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Dashboard;
