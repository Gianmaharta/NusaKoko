import React from 'react';
import { Row, Col, Spin } from 'antd';
import ProductCard from './ProductCard'; // pastikan path ini benar

const ProductList = ({ products, onShowLoginModal, loading = false, gutterSize = [32, 32] }) => {
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
        <p style={{ color: 'white', marginTop: '16px' }}>Memuat produk...</p>
      </div>
    );
  }

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center', // Mengatur row agar berada di tengah
      padding: '0 20px', // Memberi sedikit padding horizontal
      margin: 0,
      marginLeft: '3.5vw'
    }}>
      <Row gutter={gutterSize} justify="center" style={{ width: '100%', maxWidth: '1200px' }}>
        {products.map((product) => (
          <Col
            key={product.id}
            xs={24}  // 1 kolom di layar sangat kecil
            sm={12}  // 2 kolom di layar kecil
            md={8}   // 3 kolom di layar medium
            lg={6}   // 4 kolom di layar besar
            className="purchase-card-wrapper"
          >
            <ProductCard
              product={product}
              onShowLoginModal={onShowLoginModal}
              style={{ width: '100%' }}
              imgStyle={{ height: 210 }}
              className="purchase-card"
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductList;