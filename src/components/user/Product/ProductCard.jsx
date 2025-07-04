import React from 'react';
import { Card } from 'antd';
import './ProductCard.css';


const { Meta } = Card;

const ProductCard = ({ imageSrc, title, price }) => {
  return (
    <Card
      hoverable
      style={{
        width: 200,
        boxShadow: 'none',         // hilangkan shadow
        border: 'none',            // hilangkan border
        textAlign: 'center',
        backgroundColor: 'transparent', // biar matching sama section
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
