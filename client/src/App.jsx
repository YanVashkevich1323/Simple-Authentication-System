import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import Home from "./Home/Home";
import { AuthContext } from "./AuthContext";


function App() {

  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={isAuthenticated ? <Home /> : <Login />} />
    </Routes>
  );
}

export default App;
