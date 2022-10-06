import { useState } from "react";
//styles
import styles from "./CreateProject.css";

const CreateProject = () => {
  const [name, setName] = useState();
  const [details, setDetails] = useState();
  const [dueDate, setDueDate] = useState();
  const [category, setCategory] = useState();
  const [assignedUsers, setAssignedUsers] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, details, dueDate);
  };

  return (
    <div className="create-form">
      <h2>Create new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            placeholder="project name"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          <textarea
            placeholder="project details"
            onChange={(e) => setDetails(e.target.value)}
          />
        </label>
        <label>
          <span>Due Date</span>
          <input
            type="date"
            placeholder="due date"
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>
        {/* <label>
          <input placeholder="category" />
        </label>
        <label>
          <input placeholder="assigned users" />
        </label> */}
        <button className="auth-button">Create project</button>
      </form>
    </div>
  );
};

export default CreateProject;
