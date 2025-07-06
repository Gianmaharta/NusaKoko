import React from 'react';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const { Meta } = Card;

// Ganti sesuai alamat backend Anda
const BACKEND_URL = "http://localhost:5000";

const ProductCard = ({ product, onShowLoginModal }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      if (onShowLoginModal) onShowLoginModal();
      return;
    }
    // Kirim seluruh data produk ke halaman detail
    navigate('/detail', {
      state: { product }
    });
  };

  // Gambar
  const getImageUrl = (src) => {
    if (!src) return '';
    if (src.startsWith('http://') || src.startsWith('https://')) {
      return src;
    }
    return `${BACKEND_URL}/static/uploads/products/${src}`;
  };

  return (
    <Card
      hoverable
      onClick={handleClick}
      style={{
        width: 200,
        boxShadow: 'none',
        border: 'none',
        textAlign: 'center',
        backgroundColor: 'transparent',
        cursor: 'pointer',
      }}
      cover={
        <img
          alt={product.name || product.title}
          src={getImageUrl(product.image_url || product.image)}
          style={{
            borderRadius: 12,
            height: 180,
            objectFit: 'cover',
          }}
        />
      }
    >
      <Meta
        title={<span style={{ color: '#4E342E' }}>{product.name || product.title}</span>}
        description={<span style={{ color: '#4E342E' }}>Rp. {Number(product.price).toLocaleString("id-ID")}</span>}
      />
    </Card>
  );
};

export default ProductCard;
