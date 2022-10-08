import { useEffect, useState } from "react";
import { serverTimestamp, Timestamp, fromDate } from "firebase/firestore";
import Select from "react-select";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
//styles
import styles from "./CreateProject.css";

const categories = [
  { value: "electricity", label: "electricity" },
  { value: "windows", label: "Windows" },
  { value: "construction", label: "Construction" },
  { value: "plumbing", label: "plumbing" },
];

const CreateProject = () => {
  const { documents } = useCollection("users");
  const [users, setUsers] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        console.log(user);
        return { value: user, label: user.displayName };
      });
      setUsers(options);
    }
  }, [documents]);

  const [name, setName] = useState();
  const [details, setDetails] = useState();
  const [dueDate, setDueDate] = useState();
  const [category, setCategory] = useState();
  const [assignedUsers, setAssignedUsers] = useState();
  const [formError, setFormError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormError(null);
    if (!category) {
      setFormError("Choose a category!");
      return;
    }
    if (assignedUsers.length < 1) {
      setFormError("Please assign users");
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const assignedUsersList = assignedUsers.map((user) => {
      return {
        displayName: user.value.displayName,
        photoURL: user.value.photoURL,
        id: user.value.uid,
      };
    });

    const project = {
      name,
      details,
      category: category.value,
      comments: [],
      createdBy,
      createdAt: serverTimestamp(),
      assignedUsersList,
    };

    console.log(project);
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
          <span>Project category</span>
          <Select
            options={categories}
            onChange={(option) => setCategory(option)}
          />
        </label>
        <label>
          <span>Assign to</span>
          <Select
            options={users}
            isMulti="true"
            onChange={(option) => setAssignedUsers(option)}
          />
        </label>
        <button className="auth-button">Create project</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreateProject;
