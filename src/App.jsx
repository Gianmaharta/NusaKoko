import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/user/Home";
import Produk from "./pages/Produk";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Register";

import Keranjang from "./pages/user/Keranjang";
import Checkout from "./pages/user/Checkout";
import DetailItem from "./components/user/Product/DetailItem";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/HomeAdmin";
import UserDashboard from "./pages/user/Home";
import StokProduk from "./pages/admin/StokProduk";
import TambahProduk from "./pages/admin/TambahProduk";
import Pesanan from "./pages/admin/Pesanan";
 
import "antd/dist/reset.css";
import { CartProvider } from "./context/CartContext";
import { ProdukProvider } from "./context/ProdukContext";

function App() {
  return (

    <CartProvider>
      <ProdukProvider>
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
            {/* Tambahkan private route untuk admin */}
            <Route
              path="/admin"
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/stok-produk"
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <StokProduk />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/tambah-produk"
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <TambahProduk />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/pesanan"
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <Pesanan />
                </PrivateRoute>
              }
            />
            <Route
            path="/detail"
            element={
              <PrivateRoute>
                <DetailItem />
              </PrivateRoute>
            }
          />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </ProdukProvider>
    </CartProvider>


  );
}

export default App;
