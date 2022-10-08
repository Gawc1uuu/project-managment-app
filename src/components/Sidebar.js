//styles
import "./Sidebar.css";
import HomeIcon from "../assets/home-icon.svg";
import AddIcon from "../assets/add-icon.svg";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

import { useDocument } from "../hooks/useDocument";

const Sidebar = () => {
  const { user } = useAuthContext();
  const { document } = useDocument(user.uid, "users");
  return (
    <div className="sidebar">
      {document && (
        <div className="sidebar-content">
          <div className="user">
            <img
              className="user-avatar"
              src={document.photoURL}
              alt="user avatar"
            />
            <p>Hey, {document.displayName}!</p>
          </div>
          <nav className="links">
            <ul>
              <li>
                <NavLink to="/" end>
                  <img src={HomeIcon} alt="home icon" />
                  <span>Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/create">
                  <img src={AddIcon} alt="add icon" />
                  <span>New Project</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
