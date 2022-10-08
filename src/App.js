import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

//pages components
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Project from "./pages/project/Project";
import Create from "./pages/create/CreateProject";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
//styles
import "./App.css";
import AllUsers from "./components/AllUsers";

function App() {
  const { user, auth_is_ready } = useAuthContext();
  return (
    <div className="App">
      {auth_is_ready && (
        <BrowserRouter>
          {user && <Sidebar />}
          <div className="container">
            <Navbar />
            <Routes>
              {user && <Route path="/" element={<Dashboard />} />}
              {!user && <Route path="/" element={<Navigate to="/login" />} />}

              {!user && <Route path="/login" element={<Login />} />}
              {user && <Route path="/login" element={<Navigate to="/" />} />}

              {!user && <Route path="/signup" element={<Signup />} />}
              {user && <Route path="/signup" element={<Navigate to="/" />} />}

              {user && <Route path="/projects/:id" element={<Project />} />}
              {!user && (
                <Route
                  path="/projects/:id"
                  element={<Navigate to="/login" />}
                />
              )}

              {user && <Route path="/create" element={<Create />} />}
              {!user && (
                <Route path="/create" element={<Navigate to="/login" />} />
              )}
            </Routes>
          </div>
          {user && <AllUsers />}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
