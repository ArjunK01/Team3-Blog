import React, { createContext, useState, useEffect } from "react";
import firebase from "../firebase";
import axios from "axios";
import Loading from "../components/Loading";
import { assertJSXClosingElement } from "@babel/types";

const ApiContext = createContext();

const ApiProvider = ({ children }) => {
  const [blog, setBlog] = useState([]);
  const [users, setUsers] = useState([]);
  const [forum, setForum] = useState([]);
  const [merch, setMerch] = useState([]);

  const getBlog = async () => {
    let returnedBlogs = await axios.get("http://localhost:8000/blog/get");
    setBlog(returnedBlogs.data);
  };

  const getForum = async () => {
    let returnedForum = await axios.get("http://localhost:8000/forum/get");
    setBlog(returnedForum.data);
  };

  const getMerch = async () => {
    let returnedMerch = await axios.get("http://localhost:8000/merch/getall");
    setMerch(returnedMerch.data);
  };

  const getUsers = async () => {
    let returnedUsers = await axios.get("http://localhost:8000/user/getall");
    setUsers(returnedUsers.data);
  };

  useEffect(() => {
    getMerch();
    getUsers();
    getBlog();
    getForum();
  }, []);

  return (
    <ApiContext.Provider
      value={{
        users,
        forum,
        merch,
        blog,
        getMerch,
        getUsers,
        getBlog,
        getForum
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;

export { ApiContext };
