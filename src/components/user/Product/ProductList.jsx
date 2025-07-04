// ProductList.jsx
import React from 'react';
import { Row, Col } from 'antd';
import ProductCard from './ProductCard'; // pastikan path ini benar

const ProductList = ({ products }) => {
  return (
    <div style={{
        maxWidth: '100%', // Gunakan seluruh lebar
        padding: '0 48px', // Atur padding kiri-kanan agar seimbang
      }}>
        <Row gutter={[24, 32]} justify="center">
            {products.map((product) => (
                <Col
                key={product.id}
                xs={24}
                sm={12}
                md={8}
                lg={6}
                xl={6}
                xxl={4}
                className="purchase-card-wrapper"
                >
                <ProductCard
                    imageSrc={product.image}
                    title={product.title}
                    price={product.price}
                    className="purchase-card"
                />
                </Col>
            ))}
        </Row>
    </div>
  );
};

export default ProductList;
