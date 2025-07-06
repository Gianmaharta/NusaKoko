import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Layout, Typography, notification } from "antd";

import ProductList from "../components/user/Product/ProductList";
import Navbar from "../components/user/Navbar";
import Footer from "../components/user/Footer";
import { productAPI } from "../services/apiService"; // Import API service

const { Content } = Layout;
const { Title } = Typography;

const Produk = () => {
  const location = useLocation();
  const [api, contextHolder] = notification.useNotification();
  const hasNotified = useRef(false);

  // State untuk produk dan loading
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil data produk dari backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productAPI.getAllProducts();
        if (Array.isArray(response)) {
          setProducts(response);
        } else if (response.success && Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Notifikasi
  useEffect(() => {
    const notifData = location.state?.notification;
    if (notifData && !hasNotified.current) {
      api[notifData.type]({
        message: notifData.message,
        description: notifData.description,
        duration: 2.5,
        placement: 'topRight',
      });
      window.history.replaceState({}, document.title);
      hasNotified.current = true;
    }
  }, [location, api]);

  return (
    <Layout style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {contextHolder}
      <Navbar />
      <Content style={{ padding: "36px", backgroundColor: "#4E342E" }}>
        <section className="section-container-pembelian section-scroll-margin">
          <Title level={2} className="section-title">Produk NusaKoko</Title>
          <ProductList products={products} loading={loading} />
        </section>
      </Content>
      <Footer />
    </Layout>
  );
};

export default Produk;