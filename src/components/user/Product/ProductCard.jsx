import React from 'react';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const { Meta } = Card;

const ProductCard = ({ imageSrc, title, price }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/detail', {
      state: {
        product: {
          title,
          price,
          image: imageSrc,
          description:
            "Kantong plastik ini terbuat dari serabut kelapa dan bahan biodegradable, sehingga lebih ramah lingkungan dibandingkan plastik konvensional. Serabut kelapa memberikan kekuatan tambahan, membuat kantong tidak mudah sobek namun tetap mudah terurai secara alami.",
        },
      },
    });
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
          alt={title}
          src={imageSrc}
          style={{
            borderRadius: 12,
            height: 180,
            objectFit: 'cover',
          }}
        />
      }
    >
      <Meta
        title={<span style={{ color: '#4E342E' }}>{title}</span>}
        description={<span style={{ color: '#4E342E' }}>Rp. {price}</span>}
      />
    </Card>
  );
};

export default ProductCard;
