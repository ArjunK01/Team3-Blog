import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./Login";
import { AuthContext } from "../context/AuthProvider";

const Navigation = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/about">about</Route>
          <Route path="/user">user</Route>
          <Route path="/blogs">Blogs</Route>
          <Route path="/forum">Forum</Route>
          <Route path="/shop">shop</Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">Landing</Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Navigation;
