import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { ApiContext } from "../context/ApiProvider";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Comment } from "./Comment";
import CommentForm from "./CommentForm";

const ForumCard = ({ f }) => {
  const { user } = useContext(AuthContext);
  const { getForum } = useContext(ApiContext);
  const history = useHistory();

  useEffect(() => {
    if (f) {
      let temp = f.createdDate
        .toString()
        .substring(0, 10)
        .split("-");
      temp.push(temp.shift());
      setDate(temp);
    }
  }, [f]);

  const deleteForum = async () => {
    await axios({
      method: "delete",
      url: "http://localhost:8000/forum/delete/",
      data: {
        id: f.id
      }
    });
    setTimeout(() => {
      getForum();
    }, 200);
  };

  const [date, setDate] = useState("");
  return (
    <div class="forumCard">
      <div 
        className="forumCardInfo"
        onClick={() => history.push("/forum/" + f.id)}
      >
        <div className="date">{date && date.join("/")}</div>
        <div className="title">{f.title}</div>
        <p className="contentPreview">{f.content}</p>
        <div className="forumCardBottom">
          <p className="channel">#{f.topic}</p>
          <div className="bottomRight">
            <div className="icons">
              <div className="likes">
                <div className="likesIcon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="likesNumber">{f.likes.length}</p>
              </div>
            </div>
            <div className="featuredBlogCardImageContainer">
              {user && user.isAdmin && (
                <div className="blogIconsContainer">
                  <div className="icons pencilIcon" onClick={() => deleteForum()}> Delete
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
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <br/>
    </div>
  );
};

export default ForumCard;