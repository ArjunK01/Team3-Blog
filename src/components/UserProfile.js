import React, { useState, useEffect } from "react";
// import "../App.css";
import FaceIcon from "@material-ui/icons/Face";

const UserProfile = () => {
  return (
    <div className="user-profile-container" style={{ padding: "20px" }}>
      <div
        className="top-section"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "left",
          alignItems: "center",
          paddingBottom: "20px",
        }}
      >
        <div className="pfp">
          <FaceIcon
            style={{ color: "black", fontSize: "15rem", paddingRight: "10px" }}
          />
        </div>
        <div
          className="personalInfo"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "left",
            alignItems: "flex-start",
            fontSize: "2rem",
          }}
        >
          <div className="name" style={{ flexDirection: "wrap" }}>
            <p>Name: </p>
            <p style={{ color: "grey" }}>Example name</p>
          </div>
          <div className="birthday" style={{ flexDirection: "row" }}>
            <p>Birthday: </p>
            <p style={{ color: "grey" }}>1/1/2000</p>
          </div>
        </div>
      </div>

      <div
        className="bottom-section"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "flex-start",
        }}
      >
        <div className="blog-post-list">
          <h2>Blog posts</h2>
          <ul style={{ listStyle: "none" }}>
            <li>item</li>
            <li>item</li>
            <li>item</li>
            <li>item</li>
          </ul>
        </div>
        <div className="forum-post-list">
          <h2>Forum posts</h2>
          <ul style={{ listStyle: "none" }}>
            <li>item</li>
            <li>item</li>
            <li>item</li>
            <li>item</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
