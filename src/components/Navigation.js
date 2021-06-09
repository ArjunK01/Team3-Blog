import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Redirect,
} from "react-router-dom";
import Login from "./Login";
import { AuthContext } from "../context/AuthProvider";
import NavBar from "./NavBar";
import "../App.css";
import HomePage from "./HomePage";
import Blogs from "./Blogs";
import Forum from "./Forum";
import Shop from "./Shop";
import AdminPage from "./AdminPage";

const Navigation = () => {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  return (
    <div>
      <Router>
        <NavBar />
        <div className="appContainer">
          <Switch>
            <Route path="/about">about</Route>
            <Route path="/user">
              {user
                ? `${user.name}, ${user.email}, ${user.handle}, ${user.birthday}`
                : "Not Signed In"}
            </Route>
            <Route path="/blogs">
              <Blogs />
            </Route>
            <Route path="/admin">
              {user ? (
                user.isAdmin ? (
                  <AdminPage />
                ) : (
                  <Redirect to="/" />
                )
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route path="/forum">
              <Forum />
            </Route>
            <Route path="/shop">
              <Shop />
            </Route>
            <Route path="/cart">cart</Route>
            <Route path="/login">
              {user ? <Redirect to="/" /> : <Login />}
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
