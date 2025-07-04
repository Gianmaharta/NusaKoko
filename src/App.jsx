import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/user/Home";
import Produk from "./pages/Produk";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Register";
import "antd/dist/reset.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/produk"
          element={
            <PrivateRoute>
              <Produk />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
