import React from "react";
import ProductList from "../components/user/Product/ProductList";
import Navbar from "../components/user/Navbar";
import Footer from "../components/user/Footer";
import { Layout, Typography } from "antd";

const { Content } = Layout;
const { Title } = Typography;

// Dummy produk, bisa diganti dengan fetch dari API
import bagImage from "../assets/bag.png";
import bowlImage from "../assets/bowl.png";
import foodPlasticImage from "../assets/food-plastic.png";

const allProducts = [
  { id: 1, title: "Kantong Plastik", price: "10.000", image: bagImage },
  { id: 2, title: "Plastik Makanan", price: "8.000", image: foodPlasticImage },
  { id: 3, title: "Mangkok Plastik", price: "15.000", image: bowlImage },
  { id: 4, title: "Kantong Plastik", price: "10.000", image: bagImage },
  { id: 5, title: "Plastik Makanan", price: "8.000", image: foodPlasticImage },
  { id: 6, title: "Mangkok Plastik", price: "15.000", image: bowlImage },
  { id: 7, title: "Kantong Plastik", price: "10.000", image: bagImage },
  { id: 8, title: "Plastik Makanan", price: "8.000", image: foodPlasticImage },
  { id: 9, title: "Mangkok Plastik", price: "15.000", image: bowlImage },
  // ...tambahkan produk lain sesuai kebutuhan
];

const Produk = () => (
  <Layout style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
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

export default Produk;