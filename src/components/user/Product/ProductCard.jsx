import React from 'react';
import { Card } from 'antd';
import './ProductCard.css';


const { Meta } = Card;

const ProductCard = ({ imageSrc, title, price, style = {}, imgStyle = {} }) => {
  return (
    <Card
      hoverable
      style={{
        width: 240,
        boxShadow: 'none',         // hilangkan shadow
        border: 'none',            // hilangkan border
        textAlign: 'center',
        backgroundColor: 'transparent', // biar matching sama section
        ...style,
      }}
      cover={
        <img
          alt={title}
          src={imageSrc}
          style={{
            borderRadius: 16,
            height: 200,
            objectFit: 'cover',
            ...imgStyle,
          }}
        />
      }
    >
      <Meta
        title={<span style={{ color: '#4E342E', fontSize: 20, fontWeight: 500 }}>{title}</span>}
        description={<span style={{ color: '#4E342E', fontSize: 18 }}>Rp. {price}</span>}
      />
    </Card>
  );
};

export default ProductCard;
