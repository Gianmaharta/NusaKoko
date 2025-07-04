import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/user/Home";
import Produk from "./pages/Produk";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Register";
import Keranjang from "./pages/user/Keranjang";
import Checkout from "./pages/user/Checkout";
import "antd/dist/reset.css";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
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
          <Route
            path="/keranjang"
            element={
              <PrivateRoute>
                <Keranjang />
              </PrivateRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
