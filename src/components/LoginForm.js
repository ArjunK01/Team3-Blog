import firebase from "../firebase";
import React, { useState } from "react";
import axios from "axios";
import "../styles/auth.css";

export const LoginForm = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setName("");
  };

  const logIn = async () => {
    setError(null);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => resetForm())
      .catch(err => setError(err));
  };

  const signUp = async () => {
    setError(null);
    if (!email || !password || !name) return;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(newUser => {
        axios({
          method: "post",
          url: "http://localhost:8000/users/create",
          headers: {},
          data: {
            email: newUser.user.email,
            name,
            docId: newUser.user.uid // This is the body part
          }
        });
      })
      .catch(err => setError(err));
  };

  return (
    <div className="authForm">
      <p className="logInHeader">
        {login ? "Welcome Back!" : "Create an Account"}
      </p>

      <div class="input-group mb-2">
        <input
          type="text"
          class="form-control authInput"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      {!login && (
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          class="form-control authInput mb-2"
        />
      )}

      <input
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="text"
        class="form-control authInput mb-3"
      />
      <div className="submitContainer">
        <div
          className="authSubmitBtn"
          //onClick={() => (login ? logIn() : signUp())}
        >
          {login ? "Log In" : "Sign Up"}
        </div>
      </div>
      {error ? (
        <p className="errorMessage text-danger ">{error.message}</p>
      ) : null}
    </div>
  );
};
