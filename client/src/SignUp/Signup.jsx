import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");


  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{7,}$/;
    return passwordRegex.test(password);
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    let emailValid = validateEmail(email);
    let passwordValid = validatePassword(password);

    if (!emailValid) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }

    if (!passwordValid) {
      setPasswordError(
        "Password must be at least 7 characters long and contain both lowercase and uppercase letters."
      );
    } else {
      setPasswordError("");
    }

    if (emailValid && passwordValid) {
      axios
        .post("http://localhost:3001/signup", { email, password })
        .then((res) => {
          console.log(res);
          navigate("/");
        })
        .catch((err) => {
          alert("Account with this email is already created. Try logging in.")
          console.log(err)
        });
    }
  };

  return (
    <div className="signup-container">

      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <input
          type="email"
          placeholder="Email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p style={{ color: "red" }}>{emailError}</p>}
        
        <input
          type="password"
          placeholder="Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
        
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>

    </div>
  );
}

export default Signup;
