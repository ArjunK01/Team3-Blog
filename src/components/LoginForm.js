import firebase from "../firebase";
import React, { useState } from "react";
import axios from "axios";
import "../styles/auth.css";

export const LoginForm = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [birthday, setBirthday] = useState("");
  const [error, setError] = useState(null);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setName("");
    setHandle("");
    setBirthday("");
    setError("");
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
    if (!email || !password || !name || !birthday || !handle) return;
    let b = birthday.split("-");
    b.push(b.shift());
    b = b.join("/");
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(newUser => {
        axios({
          method: "post",
          url: "http://localhost:8000/user/create",
          headers: {},
          data: {
            email: newUser.user.email,
            name,
            id: newUser.user.uid,
            handle,
            birthday: b
          }
        });
      })
      .then(() => resetForm())
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
      <input
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="text"
        class="form-control authInput mb-2"
      />
      {!login && (
        <div>
          <input
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            class="form-control authInput mb-2"
          />
          <input
            placeholder="Handle"
            value={handle}
            onChange={e => setHandle(e.target.value)}
            class="form-control authInput mb-3"
          />
          <p style={{ margin: "0", fontSize: "14px" }}>Birthday: </p>
          <input
            placeholder="Last"
            value={birthday}
            onChange={e => setBirthday(e.target.value)}
            type="date"
            class="form-control mb-2"
          />
        </div>
      )}

      <div className="submitContainer mt-2">
        <div
          className="authSubmitBtn"
          onClick={() => (login ? logIn() : signUp())}
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
