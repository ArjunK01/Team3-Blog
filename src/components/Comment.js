import React, { useState, useEffect, useContext } from "react";
import { setDefaultHandler } from "workbox-routing";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";
import { useHistory } from "react-router-dom";

export const Comment = ({
  comment,
  i,
  setForm,
  setUpdate,
  setCommentID,
  blogID,
  getComments
}) => {
  const [author, setAuthor] = useState("");
  const { user } = useContext(AuthContext);
  const history = useHistory();

  useEffect(async () => {
    let temp = await axios.get(
      "http://localhost:8000/user/get/" + comment.user_id
    );
    setAuthor(temp.data);
  }, []);

  const openEditForm = () => {
    setForm(true);
    setUpdate(comment.content);
    setCommentID(comment.id);
  };

  const deleteComment = async () => {
    await axios({
      method: "delete",
      url: "http://localhost:8000/blog/comments/delete/" + blogID,
      data: {
        id: comment.id
      }
    });
    setTimeout(() => {
      getComments();
    }, 500);
  };

  return (
    <div
      className="commentContainer"
      style={{ backgroundColor: i % 2 === 0 ? "#F3F4F6" : "white" }}
    >
      <div className="commentTop">
        <div
          className="commentUser"
          onClick={() =>
            comment.user_id && history.push("/user/" + comment.user_id)
          }
        >
          {author ? author.handle : "Author Not Found"}
        </div>

        {user ? (
          <div className="iconsBox">
            {user.id === comment.user_id && (
              <div className="icons pencilIcon" onClick={() => openEditForm()}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </div>
            )}
            {(user.id === comment.user_id || user.isAdmin) && (
              <div className="icons pencilIcon" onClick={() => deleteComment()}>
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
                    d="M20 12H4"
                  />
                </svg>
              </div>
            )}
          </div>
        ) : (
          "  "
        )}
      </div>

      <div className="commentContent">{comment.content}</div>
    </div>
  );
};
