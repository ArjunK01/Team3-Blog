import React from "react";
import { Button, Link } from "@material-ui/core";
import "../styles/blog-post.css";
import { useParams, useHistory } from "react-router-dom";

const BlogPost = ({ b }) => {
  const history = useHistory();

  return (
    <div
      className="post-container"
      onClick={() => history.push("/blogs/" + b.id)}
    >
      <div>{b && b.title}</div>
    </div>
  );
};

export default BlogPost;
