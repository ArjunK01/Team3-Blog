import React from "react";
import { Button, Link } from "@material-ui/core";
import "../styles/blog-post.css";
// heart icon, filled
import FavoriteIcon from "@material-ui/icons/Favorite";
// // heart icon, unfilled
// import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
// comment bubbles icon
import ForumIcon from "@material-ui/icons/Forum";
// right arrow icon, unfilled
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const BlogPost = () => {
  return (
    <div className="post-container">
      <div className="blog-top-section">
        <h3>Post Header</h3>
      </div>
      <div className="bottom-section">
        <div className="read-more">
          <Link to="#" className="read-more" style={{ color: "#416788" }}>
            <p>Read More&nbsp;</p>
            <ArrowForwardIcon />
          </Link>
        </div>
        <div className="likes-and-comments" style={{ color: "#416788" }}>
          <p>300&nbsp;</p>
          <FavoriteIcon />
          <p>&nbsp;50&nbsp;</p>
          <ForumIcon />
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
