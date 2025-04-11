import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import "./Login.css"

function Login() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext); 

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/login", { email, password })
      .then((res) => {
        if (res.data.message === "Success") {
          login(res.data.token); 
          navigate("/home");
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => console.error("Login error", err));
  };

  const navigateToSignUp = () => {
    navigate("/signup")
  }
  


  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="input-field"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="input-field"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="login-button">
          Login
        </button>

        <div className="signup-prompt">
          <p>Don't have an account?</p>
          <button
            type="button"
            className="signup-button"
            onClick={navigateToSignUp}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;