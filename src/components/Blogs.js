import React, { useState, useContext } from "react";
import "../styles/blogs.css";
import FeaturedBlogCard from "./FeaturedBlogCard";
import AllBlogCard from "./AllBlogCard";
import { ApiContext } from "../context/ApiProvider";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

function getModalStyle() {
  const top = 50 + Math.random();
  const left = 50 + Math.random();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const Blogs = () => {
  const { blog } = useContext(ApiContext);
  const [toggle, setToggle] = useState(false);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [featured, setFeatured] = useState(false);
  const [photo, setPhoto] = useState("");

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const createBlog = () => {};
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        class="form-control authInput mb-2"
      />
      <input
        placeholder="City"
        value={city}
        onChange={e => setCity(e.target.value)}
        class="form-control authInput mb-2"
      />
      <input
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
        class="form-control authInput mb-2"
      />
      <input
        placeholder="Photo Url"
        value={photo}
        onChange={e => setPhoto(e.target.value)}
        class="form-control authInput mb-2"
      />
      <div
        className="featuredBtn"
        onClick={() => setFeatured(f => !f)}
        style={{
          backgroundColor: featured ? "#1d4270" : "white",
          color: featured ? "white" : "#6D757D"
        }}
      >
        Featured
      </div>
      <div className="submitAdd">Create Blog</div>
    </div>
  );
  return (
    <div clasName="blogContainer">
      <div className="blogHeaderContainer">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
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
        <div className="searchForm">
          <input
            placeholder="Search Blog Posts by Title"
            value={search}
            onChange={e => setSearch(e.target.value)}
            class="form-control mb-2 "
          />
          <div className="addBlogBtn" onClick={handleOpen}>
            Create Blog
          </div>
        </div>

        <div className="blogContentContainer">
          {toggle ? (
            <div style={{ marginTop: "-12px" }}>
              <FeaturedBlogCard />
              <FeaturedBlogCard />{" "}
            </div>
          ) : (
            <div className="allBlogContainer">
              <AllBlogCard />
              <AllBlogCard />
              <AllBlogCard />
              <AllBlogCard />
              <AllBlogCard />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
