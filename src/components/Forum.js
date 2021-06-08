import React from "react";
import "../styles/forum.css";
import { Button } from "@material-ui/core";
import FeaturedBlogCard from "./FeaturedBlogCard";

const Forum = () => {
  return (
    <div>
      <div className="forum-page-title">Forum</div>
      <div className="forum-container">
        <div className="left-container">
          <div className="popular-channels-container">
            <p className="sidebar-titles">Popular Channels</p>
            <ul style={{ listStyle: "none" }}>
              <li className="temp-style">#buckethats</li>
              <li className="temp-style">#summervibes</li>
              <li className="temp-style">#skincare</li>
              <li className="temp-style">#routine</li>
              <li className="temp-style">#sunscreen</li>
            </ul>
          </div>
          <p className="sidebar-titles">Create new channel</p>
          <p
            className="sidebar-titles"
            onClick={() => {
              //some action
            }}
          >
            FAQ
          </p>
        </div>
        <div className="right-container">
          <div className="featured-header">
            <div className="header-title">
              <p className="featured-posts-title">Featured Posts</p>
            </div>
            <div className="header-filter-sort">
              <Button>Filter</Button>
              <Button>Sort</Button>
            </div>
          </div>
          <hr style={{ marginTop: "-4px" }} />
          <div className="content-container">
            <FeaturedBlogCard />
            <FeaturedBlogCard />
            <FeaturedBlogCard />
            {/* <BlogPost /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;
