import React, { useState, useContext, useEffect } from "react";
import "../styles/forum.css";
import { Button } from "@material-ui/core";
import ForumCard from "./ForumCard";
import { ApiContext } from "../context/ApiProvider";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { getBindingIdentifiers } from "@babel/types";
import { AuthContext } from "../context/AuthProvider";

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

const Forum = () => {
  const { user } = useContext(AuthContext);
  const { forum, getForum } = useContext(ApiContext);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [update, setUpdate] = useState(null);
  const [currentID, setCurrentID] = useState(null);
  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const createForum = async () => {
    await axios({
      method: "post",
      url: "http://localhost:8000/forum/create",
      data: {
        forum_id: uuidv4(),
        title,
        content,
        topic,
        likes: [],
        user_id: user.id
      }
    });
    handleClose();
    getForum();
  };

  const updateForum = f => {
    setTitle(f.title);
    setTopic(f.topic);
    setContent(f.content);
    setUpdate(true);
    setCurrentID(f.id);
    handleOpen();
  };

  const submitUpdate = async () => {
    await axios({
      method: "put",
      url: "http://localhost:8000/forum/edit/",
      data: {
        id: currentID,
        title,
        content,
        topic,
      }
    });
    setTimeout(() => {
      getForum();
    }, 300);
    handleClose();
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setContent("");
    setTopic("");
    setUpdate(false);
    setCurrentID("");
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
        placeholder="Topic"
        value={topic}
        onChange={e => setTopic(e.target.value)}
        class="form-control authInput mb-2"
      />
      <input
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
        class="form-control authInput mb-2"
      />
      <div
        className="submitAdd"
        onClick={() => (update ? submitUpdate() : createForum())}
      >
        {update ? "Update Forum" : "Create Forum"}
      </div>
    </div>
  );

  return (
    <div>
      <div className="forum-page-title">Forum</div>
      <div className="forum-container">
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
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
          <p className="sidebar-titles"
             onClick={handleOpen}
          >
            Create New  Post
          </p>
        </div>
        <div className="right-container">
          <div className="featured-header">
            <div className="header-title">
              <p className="featured-posts-title">All Posts</p>
            </div>
            <div className="header-filter-sort">
              <Button>Filter</Button>
              <Button>Sort</Button>
            </div>
          </div>
          <hr style={{ marginTop: "-4px" }} />
          <div className="content-container">
            {forum.map(f => (
              <ForumCard updateForum={updateForum} f={f}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;
