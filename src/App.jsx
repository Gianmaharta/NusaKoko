import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { FloatButton } from 'antd';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/user/Home";
import "antd/dist/reset.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;

// Test asoka1
// Test asoka2
// Test asoka3
