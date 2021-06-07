import React, { useState } from "react";
import { LoginForm } from "./LoginForm";
import "../styles/auth.css";
import hero from "../images/sf.jpeg";

const Login = () => {
  const [login, setLogin] = useState(true);

  return (
    <div className="authContainer">
      <div className="loginHeroContainer">
        <img className="heroImg" src={hero} />
      </div>
      <div className="authFormContainer">
        <LoginForm login={login} />
        <div
          className="loginSwitchBtn text-secondary "
          onClick={() => setLogin(log => !log)}
        >
          {login
            ? "Don't have an account yet? Sign Up"
            : "Already have an account? Log In"}
        </div>
      </div>
    </div>
  );
};

export default Login;
