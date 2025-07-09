import React from 'react';

const ProductCardHorizontal = ({ imageSrc, title, description }) => {
  return (
    <div style={{
      display: 'flex',
      backgroundColor: '#fff',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      marginBottom: '24px',
    }}>
      <div style={{ flex: '0 0 220px' }}>
        <img
          src={imageSrc} 
          alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <div style={{ padding: '24px', flex: 1, textAlign: 'left' }}>
        <h2 style={{
          marginBottom: '12px',
          color: '#4E342E',
          fontWeight: 'bold'
        }}>
          {title}
        </h2>
        <p style={{
          color: '#444',
          textAlign: 'justify',
          lineHeight: '1.6',
        }}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default ProductCardHorizontal;
