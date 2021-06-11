import React from "react";
import "../styles/blog-post.css";
import { useHistory } from "react-router-dom";

const ForumItem = ({ m }) => {
  const history = useHistory();
  return (
    <div className="post-container" onClick={() => history.push("/forum")}>
      <div>{m && m.title}</div>
    </div>
  );
};

export default ForumItem;
