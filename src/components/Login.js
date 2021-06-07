import React, { useState } from "react";
import { LoginForm } from "./LoginForm";
import "../styles/auth.css";

const Login = () => {
  const [login, setLogin] = useState(true);

  return (
    <div className="authContainer">
      <div className="authFormContainer">
        <LoginForm login={login} />
        <div className="loginSwitchBtn " onClick={() => setLogin(log => !log)}>
          {login
            ? "Don't have an account yet? Sign Up"
            : "Already have an account? Log In"}
        </div>
      </div>
    </div>
  );
};

export default Login;
