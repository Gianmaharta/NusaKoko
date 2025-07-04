// ProductList.jsx
import React from 'react';
import { Row, Col } from 'antd';
import ProductCard from './ProductCard'; // pastikan path ini benar

const ProductList = ({ products }) => {
  return (
    <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: 0,
        margin: 0,
      }}>
        <Row gutter={[80, 56]} justify="center">
            {products.map((product) => (
                <Col
                key={product.id}
                xs={24}
                sm={12}
                md={8}
                lg={8}
                xl={8}
                xxl={8}
                className="purchase-card-wrapper"
                >
                <ProductCard
                    imageSrc={product.image}
                    title={product.title}
                    price={product.price}
                    style={{ width: 260 }}
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
