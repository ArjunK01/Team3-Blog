import React, { useState } from "react";
import "../styles/blogs.css";
import FeaturedBlogCard from "./FeaturedBlogCard";

const Blogs = () => {
  const [toggle, setToggle] = useState(true);
  return (
    <div clasName="blogContainer">
      <div className="blogHeaderContainer">
        <div className="blogHeader">Blog</div>
        <div className="blogChoice">
          <p className="blogMain">
            {toggle ? "Featured Blog Posts" : "All Blog Posts"}
          </p>
          <div className="blogRight" onClick={() => setToggle(tog => !tog)}>
            <p className="blogSecondary ">
              {toggle ? "See all blog posts" : "See featured blog posts"}
            </p>
            <div className="arrowIcon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>
          </div>
        </div>
        <hr style={{ marginTop: "-4px" }} />
        <div className="blogContentContainer">
          {toggle ? (
            <div>
              <FeaturedBlogCard /> <FeaturedBlogCard /> <FeaturedBlogCard />{" "}
            </div>
          ) : (
            "All Blogs"
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
