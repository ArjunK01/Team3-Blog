import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Redirect
} from "react-router-dom";
import Login from "./Login";
import { AuthContext } from "../context/AuthProvider";
import NavBar from "./NavBar";
import "../App.css";
import HomePage from "./HomePage";
import About from "./About";
import Blogs from "./Blogs";
import Forum from "./Forum";
import Shop from "./Shop";
import AdminPage from "./AdminPage";
import FullBlog from "./FullBlog";
import CartPage from "./CartPage";
import UserProfile from "./UserProfile";

const Navigation = () => {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  return (
    <div>
      <Router>
        <NavBar />
        <div className="appContainer">
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/user/:id">
              <UserProfile />
            </Route>
            <Route path="/blogs/:id">
              <FullBlog />
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
            <Route path="/cart">
              <CartPage />
            </Route>
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
