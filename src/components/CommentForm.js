import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";

const CommentForm = ({ update, blogID, commentID, getComments, setForm }) => {
  const [content, setContent] = useState("");
  const { user } = useContext(AuthContext);

  const createComment = async () => {
    await axios({
      method: "post",
      url: "http://localhost:8000/blog/comments/create/" + blogID,
      data: {
        content,
        user_id: user.id
      }
    });
    setTimeout(() => {
      getComments();
    }, 1000);

    setForm(false);
  };

  const updateComment = async () => {
    await axios({
      method: "put",
      url: "http://localhost:8000/blog/comments/edit/" + blogID,
      data: {
        id: commentID,
        content
      }
    });
    getComments();
    setForm(false);
  };

  useEffect(() => {
    update && setContent(update);
  }, []);

  return (
    <div className="commentFormContainer">
      <input
        placeholder="Comment"
        value={content}
        onChange={e => setContent(e.target.value)}
        class="form-control authInput mb-2"
      />
      <div
        className="commentSubmit"
        onClick={() => (update ? updateComment() : createComment())}
      >
        Submit
      </div>
    </div>
  );
};

export default CommentForm;
