import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./Login";
import { AuthContext } from "../context/AuthProvider";
import NavBar from "./NavBar";
import "../App.css";
import HomePage from "./HomePage";
import Blogs from "./Blogs";
import Forum from "./Forum";
import Shop from "./Shop";

const Navigation = () => {
  return (
    <div>
      <Router>
        <NavBar />
        <div className="appContainer">
          <Switch>
            <Route path="/about">about</Route>
            <Route path="/user">user</Route>
            <Route path="/blogs">
              <Blogs />
            </Route>
            <Route path="/forum">
              <Forum />
            </Route>
            <Route path="/shop">
              <Shop />
            </Route>
            <Route path="/cart">cart</Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default Navigation;
