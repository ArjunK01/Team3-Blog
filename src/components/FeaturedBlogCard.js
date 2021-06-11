import React, { useContext, useEffect, useState } from "react";
import image from "../images/beach.jpg";
import { AuthContext } from "../context/AuthProvider";
import { ApiContext } from "../context/ApiProvider";
import axios from "axios";
import { useHistory } from "react-router-dom";

const FeaturedBlogCard = ({ b, updateBlog }) => {
  const { user } = useContext(AuthContext);
  const { getBlog } = useContext(ApiContext);
  const history = useHistory();

  useEffect(() => {
    if (b) {
      let temp = b.createdDate
        .toString()
        .substring(0, 10)
        .split("-");
      temp.push(temp.shift());
      setDate(temp);
    }
  }, [b]);

  const deleteBlog = async () => {
    await axios({
      method: "delete",
      url: "http://localhost:8000/blog/delete/",
      data: {
        id: b.id
      }
    });
    setTimeout(() => {
      getBlog();
    }, 200);
  };

  const [date, setDate] = useState("");
  return (
    <div class="featuredBlogCard">
      <div className="featuredBlogCardImageContainer">
        {user && user.isAdmin && (
          <div className="blogIconsContainer">
            <div
              className="icons pencilIcon"
              style={{ marginLeft: "0px" }}
              onClick={() => updateBlog(b)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </div>
            <div className="icons pencilIcon" onClick={() => deleteBlog()}>
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
        <img className="featuredBlogCardImage" src={b.image} />
      </div>
      <div
        className="featuredBlogCardInfo"
        onClick={() => history.push("/blogs/" + b.id)}
      >
        <div className="date">{date && date.join("/")}</div>
        <div className="title">{b.title}</div>
        <p className="contentPreview">{b.content}</p>
        <div className="featureBlogCardBottom">
          <p className="location">{b.city}</p>
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
                <p className="likesNumber">{b.likes.length}</p>
              </div>
            </div>
            <div className="readMore">Read More</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlogCard;
