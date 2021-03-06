import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "../styles/navbar.css";
import { AuthContext } from "../context/AuthProvider";
import firebase from "../firebase";

const NavBar = () => {
  const history = useHistory();
  const { user } = useContext(AuthContext);

  return (
    <div className="navContainer">
      <div className="navWidth">
        <div className="navLeft">
          <div className="links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/blogs">Blog</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/forum">Forum</Link>
          </div>
        </div>
        <div className="navCenter">
          <div className="navCenterLogo">Camille's Corner</div>
        </div>
        <div className="navRight">
          <div className="cartIcon" onClick={() => history.push("/cart")}>
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
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          {user ? (
            <div className="signedIn">
              {user.isAdmin && (
                <div
                  className="cartIcon"
                  onClick={() => history.push("/admin")}
                >
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
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                </div>
              )}
              <div
                className="cartIcon"
                onClick={() => history.push("/user/" + user.id)}
              >
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div
                className="signOut"
                onClick={() => firebase.auth().signOut()}
              >
                Sign Out
              </div>
            </div>
          ) : (
            <div className="loginLink" onClick={() => history.push("/login")}>
              <Link className="loginLinkText" to="/login">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
