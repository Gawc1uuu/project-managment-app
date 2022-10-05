import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
//styles
import "./UserAvatar.css";

const UserAvatar = () => {
  const { user } = useAuthContext();
  return <img className="user-avatar" src={user.photoURL} alt="user avatar" />;
};

export default UserAvatar;
