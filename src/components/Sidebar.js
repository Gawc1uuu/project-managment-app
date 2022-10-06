//styles
import "./Sidebar.css";
import HomeIcon from "../assets/home-icon.svg";
import AddIcon from "../assets/add-icon.svg";
import { NavLink } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import { useAuthContext } from "../hooks/useAuthContext";

const Sidebar = () => {
  const { user } = useAuthContext();
  return (
    <div className="sidebar">
      {user && (
        <div className="sidebar-content">
          <div className="user">
            <UserAvatar />
            <p>Hey, {user.displayName}!</p>
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
