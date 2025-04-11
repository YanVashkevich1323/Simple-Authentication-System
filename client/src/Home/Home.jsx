import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../AuthContext";
import "./Home.css";


function Home() {

  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  

  useEffect(() => {

    const token = localStorage.getItem("token");
    if (!token) return navigate("/"); 

    const decoded = jwtDecode(token);
    setEmail(decoded.email);

    const expirationTime = decoded.exp * 1000;
    if (Date.now() >= expirationTime) {
      handleLogout();
    }

    const timer = setTimeout(() => {
      alert("Session expired");
      handleLogout();
    }, expirationTime - Date.now());

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  

  return (
    <div className="home-container">
      <h1>Hello, {email}</h1>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
}

export default Home;
