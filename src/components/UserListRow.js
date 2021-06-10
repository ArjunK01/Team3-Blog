import React, { useContext } from "react";
import "../styles/admin.css";
import { ApiContext } from "../context/ApiProvider";
import axios from "axios";

const UserListRow = ({ user, i, edit }) => {
  const { getUsers } = useContext(ApiContext);

  const switchRole = async () => {
    let newRole = user.isAdmin ? false : true;
    await axios({
      method: "put",
      url: "http://localhost:8000/user/edit-admin",
      headers: {},
      data: {
        user_id: user.id,
        isAdmin: newRole
      }
    });
    getUsers();
  };
  return (
    <div
      className="userRow"
      style={{ backgroundColor: i % 2 === 0 ? "#f3f4f6" : "white" }}
    >
      <div className="email">{user.email}</div>
      <div className="role">{user.isAdmin ? "Admin" : "User"}</div>
      {}
      {edit && <div className="switchBtn" onClick={() => switchRole()}>
        {user.isAdmin ? "Make User" : "Make Admin"}
      </div>}
    </div>
  );
};

export default UserListRow;
