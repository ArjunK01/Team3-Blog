import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/">Landing</Route>
          <Route path="/about">about</Route>
          <Route path="/user">user</Route>
          <Route path="/blogs">Blogs</Route>
          <Route path="/forum">Forum</Route>
          <Route path="/shop">shop</Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Navigation;
