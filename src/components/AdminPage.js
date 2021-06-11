import React, { useEffect, useContext } from "react";
import "../styles/admin.css";
import { ApiContext } from "../context/ApiProvider";
import { AuthContext } from "../context/AuthProvider";
import UserListRow from "./UserListRow";

const AdminPage = () => {
  const { users, blog, forum, merch } = useContext(ApiContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log(users);
    console.log(blog);
  }, [users, blog]);

  return (
    <div className="adminContainer">
      <div className="adminHeader">Admin</div>
      <div className="adminContent">
        <div className="adminListContainer">
          <div className="listHeader">User Control</div>
          <hr />
          <div className="adminList">
            {users.map((u, i) => (
              <UserListRow
                user={u}
                key={u.id}
                i={i}
                edit={u.id === user.id ? false : true}
              />
            ))}
          </div>
        </div>
        <div className="sideBar">
          <div className="sidebarHeader">Website Overview</div>
          <div className="statsContainer">
            <div className="count">{users.length}</div>
            <div className="label">Users</div>
            <div className="count">{blog.length}</div>
            <div className="label">Blog posts</div>
            <div className="count">{forum.length}</div>
            <div className="label">Forum Posts</div>
            <div className="count">{merch.length}</div>
            <div className="label">Merch Items</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
