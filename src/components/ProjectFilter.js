//styles
import "./ProjectFilter.css";

const filterList = [
  "all",
  "mine",
  "electricity",
  "windows",
  "plumbing",
  "construction",
];

const ProjectFilter = ({ newFilter, changeFilter }) => {
  const handleClick = (f) => {
    changeFilter(f);
  };

  return (
    <div className="project-filter">
      <p>Filter by: </p>
      {filterList.map((f) => (
        <button
          className={newFilter === f ? "active" : ""}
          onClick={() => handleClick(f)}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

export default ProjectFilter;
