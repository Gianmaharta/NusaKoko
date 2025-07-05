import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Typography, Button } from "antd";
import Navbar from "../Navbar";
import Footer from "../Footer";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const DetailItem = () => {
  const { state } = useLocation();
  const product = state?.product;
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const stok = 10;

  if (!product) {
    return (
      <Layout style={{ minHeight: "100vh", backgroundColor: "#D7CCC8" }}>
        <Navbar />
        <Content style={{ padding: "40px", backgroundColor: "#4E342E" }}>
          <Title level={3} style={{ color: "white" }}>
            Produk tidak ditemukan.
          </Title>
        </Content>
        <Footer />
      </Layout>
    );
  }

  const priceNum = parseInt(product.price.replace(".", ""));
  const subtotal = priceNum * quantity;

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#D7CCC8" }}>
      <Navbar />
      <Content style={{ padding: "40px", backgroundColor: "#4E342E" }}>
        <div
          style={{
            display: "flex",
            gap: "48px",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          {/* Gambar Produk */}
          <img
            src={product.image}
            alt={product.title}
            style={{
              width: 300,
              height: "auto",
              borderRadius: 12,
            }}
          />

          {/* Info Produk */}
          <div style={{ flex: 1, minWidth: 300 }}>
            <Title level={2} style={{ marginBottom: 0, color: "#fff", textAlign: 'left' }}>
              {product.title}
            </Title>
            <Title level={4} style={{ color: "#fff", marginTop: 8, textAlign: 'left' }}>
              Rp. {product.price}
            </Title>

            <div style={{ marginTop: 32 }}>
              <Title
                level={5}
                style={{ color: "#fff", marginBottom: 0, marginTop: 24, textAlign: 'left' }}
              >
                Deskripsi
              </Title>
              <div
                style={{
                  width: 70,
                  height: 3,
                  backgroundColor: "#fff",
                  marginTop: 8,
                  marginBottom: 16,
                  borderRadius: 2,
                }}
              />
              <Paragraph
                style={{ maxWidth: "600px", color: "#fff", lineHeight: 1.8, textAlign: 'left' }}
              >
                {product.description ??
                  "Produk ramah lingkungan ini terbuat dari serabut kelapa dan bahan biodegradable, sehingga lebih ramah lingkungan dibandingkan plastik konvensional. Serabut kelapa memberikan kekuatan tambahan, membuat kantong tidak mudah sobek namun tetap mudah terurai secara alami."}
              </Paragraph>
            </div>
          </div>

          {/* Panel Pembelian */}
          <div
            style={{
              backgroundColor: "#F5F5DC",
              padding: "20px",
              borderRadius: 12,
              minWidth: 240,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <Title level={5} style={{ marginBottom: 12, color: "#4E342E" }}>
              Jumlah Pembelian
            </Title>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <Button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                shape="circle"
                size="small"
              >
                -
              </Button>
              <span style={{ fontSize: 18 }}>{quantity}</span>
              <Button
                onClick={() => setQuantity((prev) => Math.min(stok, prev + 1))}
                shape="circle"
                size="small"
              >
                +
              </Button>
            </div>

            <p style={{ color: "#4E342E", marginBottom: 8 }}>Stok: {stok}</p>
            <p
              style={{
                fontWeight: "bold",
                marginBottom: 16,
                color: "#4E342E",
              }}
            >
              Subtotal<br />Rp. {subtotal.toLocaleString("id-ID")}
            </p>

            <Button
              type="primary"
              block
              style={{
                marginBottom: 10,
                backgroundColor: "#4CAF50",
                border: "none",
              }}
              onClick={() => navigate('/keranjang')}
            >
              Keranjang
            </Button>
            <Button
              block
              style={{ borderColor: "#4E342E", color: "#4E342E" }}
              onClick={() => navigate('/checkout')}
            >
              Beli Langsung
            </Button>
          </div>
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default DetailItem;