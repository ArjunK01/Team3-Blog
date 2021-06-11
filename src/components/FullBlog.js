import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ApiContext } from "../context/ApiProvider";
import { AuthContext } from "../context/AuthProvider";
import { Comment } from "./Comment";
import image from "../images/beach.jpg";
import CommentForm from "./CommentForm";

const FullBlog = () => {
  let { id } = useParams();
  const { blog, getBlog } = useContext(ApiContext);

  const { user } = useContext(AuthContext);
  const [b, setB] = useState(null);
  const [comments, setComments] = useState(null);
  const [liked, setLiked] = useState(false);
  const [form, setForm] = useState(false);
  const [update, setUpdate] = useState(null);
  const [commentID, setCommentID] = useState(null);

  useEffect(() => {
    let temp = [...blog];
    temp = temp.filter(x => x.id === id);
    if (temp.length === 0) {
      return "No Blog Found";
    }
    setB(temp[0]);
  }, [blog]);

  useEffect(async () => {
    getComments();
    if (b && b.likes && user && b.likes.includes(user.id)) {
      setLiked(true);
    }
  }, [b]);

  const likePost = async () => {
    await axios({
      method: "put",
      url: "http://localhost:8000/blog/like",
      headers: {},
      data: {
        blog_id: b.id,
        user_id: user.id
      }
    });
    setTimeout(() => getBlog(), 300);
  };

  const getComments = async () => {
    if (b) {
      let c = null;
      try {
        c = await axios.get("http://localhost:8000/blog/comments/get/" + b.id);
      } catch (error) {
        console.error(error);
      }
      console.log("Comments:", c);
      setComments(c.data);
    }
  };

  const [date, setDate] = useState("");

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

  return (
    <div className="fullBlogContainer">
      {b && (
        <div>
          <div className="fullHeader">
            <div className="fullHeaderRight">
              <div className="fullHeaderRightContainer">
                <div className="allDate fullDate">{date && date.join("/")}</div>
                <div className="allTitle fullTitle">{b.title}</div>
                <div className="allLocation fullLocation">{b.city}</div>
              </div>
            </div>
            <div className=" fullImage">
              <img src={b.image} />
            </div>
          </div>
          <div className="fullContent">{b.content}</div>
          <div className="likesContainer">
            {user ? (
              <div className="addComment" onClick={() => setForm(f => !f)}>
                Add Comment
              </div>
            ) : (
              <span></span>
            )}
            <div className="icons">
              <div className="likes ">
                <div
                  className="likesIcon hoverRed"
                  style={{ color: liked ? "red" : "#4D5154" }}
                  onClick={() => !liked && user && likePost()}
                >
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
              <div className="comments">
                <div className="likesIcon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="likesNumber">{comments && comments.length}</p>
              </div>
            </div>
          </div>
          <hr
            style={{
              margin: "32px auto",
              marginTop: "12px"
            }}
          />
          <div className="commentsContainer">
            {form && (
              <CommentForm
                commentID={commentID}
                update={update}
                blogID={id}
                comment={null}
                getComments={getComments}
                setForm={setForm}
              />
            )}
            {comments &&
              comments.length > 0 &&
              comments.map((comment, i) => (
                <Comment
                  setForm={setForm}
                  setUpdate={setUpdate}
                  comment={comment}
                  setCommentID={setCommentID}
                  i={i}
                  key={comment.id}
                  blogID={id}
                  getComments={getComments}
                />
              ))}
            {comments && comments.length === 0 && (
              <p style={{ marginBottom: "128px" }}>No Comments</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FullBlog;
