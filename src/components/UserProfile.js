import React, { useContext, useEffect, useState } from "react";
import "../styles/user-profile.css";
import BlogPost from "./BlogPost";
import FaceIcon from "@material-ui/icons/Face";
import { useParams, useHistory } from "react-router-dom";
import { ApiContext } from "../context/ApiProvider";
import axios from "axios";
import MerchItem from "./MerchItem";
import Loading from "./Loading";
import ForumItem from "./ForumItem";

const UserProfile = () => {
  const { id } = useParams();
  const { users, blog } = useContext(ApiContext);

  const [current, setCurrent] = useState(null);
  const [likedBlogs, setLikedBlogs] = useState([]);
  const [purchased, setPurched] = useState([]);
  const [forumPosts, setForumPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    setLoading(true);
    let u = await axios.get("http://localhost:8000/user/get/" + id);
    setCurrent(u.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    let temp = [];
    blog &&
      current &&
      blog.forEach(b => {
        console.log(b.likes);
        if (b.likes && b.likes.includes(current.id)) {
          temp.push(b);
        }
      });
    console.log("Temp:", temp);
    setLikedBlogs(temp);
  }, [blog, current]);
  useEffect(async () => {
    let temp = [];
    if (!current) return;
    current.purchasedMerch.forEach(async m => {
      temp.push({
        id: m.purchase[0].merch_id.id,
        title: m.purchase[0].merch_id.title
      });
    });
    setPurched(temp);
    console.log("MERCH:", temp);
  }, [current]);

  useEffect(async () => {
    setForumPosts([]);
    let temp = [];
    if (!current) return;
    current.forumPosts.forEach(async m => {
      let res = await axios.get("http://localhost:8000/forum/get/" + m.id);
      setForumPosts(t => [...t, { id: res.data.id, title: res.data.title }]);
    });

    console.log("Tmp:", temp);
  }, [current]);

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
            <p className="reset-padding">{current && current.name}</p>
          </div>
          {/* HANDLE */}
          <div className="name">
            <p className="reset-padding field-title">HANDLE&nbsp;</p>
            <p className="reset-padding">{current && current.handle}</p>
          </div>
          {/* BIRTHDAY FIELD */}
          <div className="birthday">
            <p className="reset-padding field-title">BIRTHDAY&nbsp;</p>
            <p className="reset-padding">{current && current.birthday}</p>
          </div>
          {/* ABOUT FIELD */}
        </div>
      </div>

      <div className="bottom-section">
        <div className="blog-posts-container">
          <div className="subheader">
            <h2>Liked Blog posts</h2>
            <hr />
          </div>
          <div className="blog-content">
            {/* <p className="blog-post">example item</p> */}
            {likedBlogs.length > 0 &&
              likedBlogs.map(b => {
                return <BlogPost b={b} />;
              })}
          </div>
        </div>

        <div className="forum-posts-container">
          <div className="subheader">
            <h2>Purchased Merch</h2>
            <hr />
          </div>
          <div className="forum-content">
            {purchased.length > 0 && purchased.map(m => <MerchItem m={m} />)}
          </div>
        </div>
        <div className="forum-posts-container">
          <div className="subheader">
            <h2>Forum Posts</h2>
            <hr />
          </div>
          <div className="forum-content">
            {forumPosts.length > 0 && forumPosts.map(m => <ForumItem m={m} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
