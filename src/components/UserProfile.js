import React from "react";
import "../styles/user-profile.css";
import BlogPost from "./BlogPost";
import FaceIcon from "@material-ui/icons/Face";

const UserProfile = () => {
  return (
    <div className="container">
      <div className="profile-header">Profile</div>
      <div className="user-top-section">
        <div className="pfp-container">
          <FaceIcon style={{ color: "grey", fontSize: "10rem" }} />
          {/* <div className="handle pfp-container">
            <p style={{ color: "grey", padding: "0", margin: "0" }}>HANDLE</p>
            <p>@user12345</p>
          </div> */}
        </div>
        <div className="personal-info">
          {/* NAME FIELD */}
          <div className="name">
            <p className="reset-padding field-title">NAME&nbsp;</p>
            <p className="reset-padding">Full Name</p>
          </div>
          {/* HANDLE */}
          <div className="name">
            <p className="reset-padding field-title">HANDLE&nbsp;</p>
            <p className="reset-padding">@user12345</p>
          </div>
          {/* BIRTHDAY FIELD */}
          <div className="birthday">
            <p className="reset-padding field-title">BIRTHDAY&nbsp;</p>
            <p className="reset-padding">1/1/2000</p>
          </div>
          {/* LOCATION FIELD */}
          <div className="location">
            <p className="reset-padding field-title">LOCATION</p>
            <p className="reset-padding">San Francisco, CA</p>
          </div>
          {/* ABOUT FIELD */}
          <div className="about">
            <p className="reset-padding field-title">ABOUT</p>
            <p className="reset-padding">I am a sample user</p>
          </div>
        </div>
      </div>

      <div className="bottom-section">
        <div className="blog-posts-container">
          <div className="subheader">
            <h2>Blog posts</h2>
            <hr />
          </div>
          <div className="blog-content">
            {/* <p className="blog-post">example item</p> */}
            <BlogPost />
          </div>
        </div>
        <div className="forum-posts-container">
          <div className="subheader">
            <h2>Forum posts</h2>
            <hr />
          </div>
          <div className="forum-content">
            {/* <p className="forum-post">example item</p> */}
            <BlogPost />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
