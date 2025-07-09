import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Layout, Typography, notification } from "antd";

import ProductList from "../components/user/Product/ProductList";
import Navbar from "../components/user/Navbar";
import Footer from "../components/user/Footer";
import { productAPI } from "../services/apiService";

const { Content } = Layout;
const { Title } = Typography;

const Produk = () => {
  const location = useLocation();
  const [api, contextHolder] = notification.useNotification();
  const hasNotified = useRef(false);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <Content style={{ padding: "40px", backgroundColor: "#4E342E" }}>
        <div
          style={{
            maxWidth: 1200,      // Lebar maksimal konten
            margin: '0 auto',    // Center horizontal
            width: '100%',
            background: '#E8D8C3',
            borderRadius: 12,
            padding: '32px 32px 48px 32px',
            minHeight: 500,
          }}
        >
          <section 
            className="section-container-pembelian section-scroll-margin"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'transparent', padding: 0 }}
          >
            <Title level={2} className="section-title">Produk NusaKoko</Title>
            <ProductList products={products} loading={loading} />
          </section>
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default Produk;