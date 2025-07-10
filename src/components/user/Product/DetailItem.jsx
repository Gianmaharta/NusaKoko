import React, { useState, useEffect } from "react";
  import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Typography, Button, notification } from "antd"; // Impor notification
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useCart } from '../../../context/CartContext';
import { cartAPI } from "../../../services/apiService"; // Impor cartAPI
import { productAPI } from '../../../services/apiService';
import BackButton from '../BackButton'; // Path mungkin berbeda

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const DetailItem = () => {
  const { state } = useLocation();
  const productFromNav = state?.product;
  const navigate = useNavigate();
  const { addToCartContext } = useCart();

  const [product, setProduct] = useState(productFromNav || null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const productId = productFromNav?.id;

  // Ambil data produk dari database jika ada id
  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        setLoading(true);
        try {
          const data = await productAPI.getProductById(productId);
          console.log('Data produk hasil fetch:', data); // Debug
          setProduct(data);
        } catch (err) {
          // handle error
        } finally {
          setLoading(false);
        }
      }
    };
    fetchProduct();
  }, [productId]);

  // Ambil stok dari hasil fetch (stock_quantity atau stock), default 10 jika tidak ada
  const stok = product && typeof product.stock_quantity !== 'undefined'
    ? product.stock_quantity
    : (product && typeof product.stock !== 'undefined'
      ? product.stock
      : 10);

  if (loading) {
    return (
      <Layout style={{ minHeight: "100vh", backgroundColor: "#D7CCC8" }}>
        <Navbar />
        <Content style={{ padding: "40px", backgroundColor: "#4E342E" }}>
          <Title level={3} style={{ color: "white" }}>
            Memuat data produk...
          </Title>
        </Content>
        <Footer />
      </Layout>
    );
  }

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
  
  // --- FUNGSI BARU UNTUK MENAMBAHKAN KE KERANJANG ---
  const handleAddToCart = async () => {
    try {
      // Panggil API untuk menambahkan item ke keranjang di backend
      await cartAPI.addToCart(product.id, quantity);

      // Update state keranjang di frontend melalui context
      if (addToCartContext) {
        addToCartContext({ ...product, qty: quantity, id: product.id });
      }

      // Tampilkan notifikasi sukses
      notification.success({
        message: 'Berhasil Ditambahkan',
        description: `${product.name} telah ditambahkan ke keranjang.`,
        placement: 'topRight',
        duration: 2.5,
      });

      // Arahkan pengguna ke halaman keranjang
      navigate('/keranjang');

    } catch (error) {
      // Tampilkan notifikasi jika gagal
      notification.error({
        message: 'Gagal Menambahkan',
        description: 'Terjadi kesalahan saat menambahkan produk ke keranjang.',
        placement: 'topRight',
      });
      console.error("Failed to add to cart:", error);
    }
  };


  const priceNum = typeof product.price === 'number'
    ? product.price
    : parseFloat(product.price);
  const subtotal = priceNum * quantity;

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#D7CCC8" }}>
      <Navbar />
      <Content style={{ padding: "40px", backgroundColor: "#4E342E" }}>
        <div style={{ 
          maxWidth: '1200px', // Atur lebar maksimal konten
          margin: '0',    // Ini akan membuat kontainer berada di tengah
          width: '90%',        // Lebar relatif
          textAlign: 'left'  // Pastikan semua isinya mulai dari kiri
        }}>
          <BackButton />
        </div>
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
            src={product.image_url || product.image}
            alt={product.name || product.title}
            style={{
              width: 300,
              height: "auto",
              borderRadius: 12,
            }}
          />

          {/* Info Produk */}
          <div style={{ flex: 1, minWidth: 300 }}>
            <Title level={2} style={{ marginBottom: 0, color: "#fff", textAlign: 'left' }}>
              {product.name || product.title}
            </Title>
            <Title level={4} style={{ color: "#fff", marginTop: 8, textAlign: 'left' }}>
              Rp. {priceNum.toLocaleString("id-ID")}
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
                {product.description ?? "Produk ramah lingkungan ini terbuat dari serabut kelapa dan bahan biodegradable, sehingga lebih ramah lingkungan dibandingkan plastik konvensional. Serabut kelapa memberikan kekuatan tambahan, membuat kantong tidak mudah sobek namun tetap mudah terurai secara alami."}
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

            {/* Ganti onClick pada tombol "Keranjang" */}
            <Button
              type="primary"
              block
              style={{
                marginBottom: 10,
                backgroundColor: "#4CAF50",
                border: "none",
              }}
              onClick={handleAddToCart}
            >
              Keranjang
            </Button>
            
            <Button
              block
              style={{ borderColor: "#4E342E", color: "#4E342E" }}
              onClick={() => navigate('/checkout', {
                state: {
                  product: {
                    ...product,
                    qty: quantity
                  }
                }
              })}
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