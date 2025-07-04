import React, { useEffect, useRef } from "react"; // 1. Impor useRef
import { useLocation } from "react-router-dom";
import { Layout, Typography, notification } from "antd";

import ProductList from "../components/user/Product/ProductList";
import Navbar from "../components/user/Navbar";
import Footer from "../components/user/Footer";

// Dummy produk
import bagImage from "../assets/bag.png";
import bowlImage from "../assets/bowl.png";
import foodPlasticImage from "../assets/food-plastic.png";

const { Content } = Layout;
const { Title } = Typography;

const allProducts = [
  { id: 1, title: "Kantong Plastik", price: "10.000", image: bagImage },
  { id: 2, title: "Plastik Makanan", price: "8.000", image: foodPlasticImage },
  { id: 3, title: "Mangkok Plastik", price: "15.000", image: bowlImage },
  { id: 4, title: "Kantong Plastik Lain", price: "10.000", image: bagImage },
  { id: 5, title: "Plastik Makanan Lain", price: "8.000", image: foodPlasticImage },
  { id: 6, title: "Mangkok Plastik Lain", price: "15.000", image: bowlImage },
];

const Produk = () => {
  const location = useLocation();
  const [api, contextHolder] = notification.useNotification();
  
  // 2. Buat "penanda" untuk memastikan notifikasi hanya muncul sekali
  const hasNotified = useRef(false);

  useEffect(() => {
    const notifData = location.state?.notification;

    // 3. Tambahkan pengecekan penanda: !hasNotified.current
    if (notifData && !hasNotified.current) {
      api[notifData.type]({
        message: notifData.message,
        description: notifData.description,
        duration: 2.5,
        placement: 'topRight',
      });
      
      window.history.replaceState({}, document.title);
      
      // 4. Set penanda menjadi true agar tidak dijalankan lagi
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
          <ProductList products={allProducts} />
        </section>
      </Content>
      <Footer />
    </Layout>
  );
};

export default Produk;