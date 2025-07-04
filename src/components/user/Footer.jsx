// src/components/user/Footer.jsx
import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E8D8C3',
        color: '#4E342E',
        height: 86,
        marginTop: 'auto',
        textAlign: 'center',
      }}
    >
      © {new Date().getFullYear()} NusaKoko. Semua Hak Dilindungi.
    </Footer>
  );
};

export default AppFooter;
