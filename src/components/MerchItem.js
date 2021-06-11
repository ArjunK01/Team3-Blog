import React from "react";
import "../styles/blog-post.css";

const MerchItem = ({ m }) => {
  return (
    <div className="post-container">
      <div>{m && m.title}</div>
    </div>
  );
};

export default MerchItem;
