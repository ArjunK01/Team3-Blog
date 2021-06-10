import React, { useContext, useEffect, useState } from "react";
import image from "../images/beach.jpg";
import { AuthContext } from "../context/AuthProvider";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ApiContext } from "../context/ApiProvider";

const AllBlogCard = ({ b, updateBlog }) => {
  const { user } = useContext(AuthContext);
  const history = useHistory();

  const { getBlog } = useContext(ApiContext);
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

  const [date, setDate] = useState("");

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
  const editBlog = () => {
    updateBlog(b);
  };

  return (
    <div className="allBlogCardContainer">
      {user && user.isAdmin && (
        <div className="blogIconsContainer">
          <div
            className="icons pencilIcon"
            style={{ marginLeft: "0px" }}
            onClick={() => editBlog()}
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
      <div
        className="imageContainer"
        style={{
          backgroundImage: `url(${b.image})`
        }}
      ></div>
      <div
        className="infoContainer"
        onClick={() => history.push("/blogs/" + b.id)}
      >
        <div className="allTop">
          <div className="allDate">{date && date.join("/")}</div>
          <div className="allLocation">{b.city}</div>
        </div>
        <div className="allTitle">{b.title}</div>
        <div className="allContent">{b.content}</div>
        <div className="allCardBottom">
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
  );
};

export default AllBlogCard;
