import React from 'react';
import { Row, Col, Spin } from 'antd';
import ProductCard from './ProductCard'; // pastikan path ini benar

const ProductList = ({ products, onShowLoginModal, loading = false }) => {
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
        justifyContent: 'center',
        padding: 0,
        margin: 0,
        marginLeft: '3vw',
      }}>
      {/* --- PERUBAHAN UTAMA ADA DI BARIS INI --- */}
      <Row gutter={[32, 32]} justify="left" style={{ maxWidth: '1200px' }}>
        {products.map((product) => (
          // Mengubah span kolom untuk menampilkan 4 item per baris di layar besar
          <Col
            key={product.id}
            xs={24}  // 1 kolom di layar sangat kecil (HP)
            sm={12}  // 2 kolom di layar kecil (HP landscape / tablet kecil)
            md={8}   // 3 kolom di layar medium (tablet)
            lg={6}   // 4 kolom di layar besar (desktop)
            className="purchase-card-wrapper"
          >
            <ProductCard
              product={product}
              onShowLoginModal={onShowLoginModal}
              style={{ width: '100%' }} // Buat lebar kartu fleksibel
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