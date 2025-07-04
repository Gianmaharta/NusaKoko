import React, { useEffect, useState } from 'react';
import { Input, Menu, Button } from 'antd';
import {
  UserOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import logo from '../../assets/logo-nusakoko.png';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';


const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'auto' }); // Lebih cepat, langsung lompat
  }
};


const Navbar = ({ onSearch }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
    // Optional: listen to storage event for multi-tab logout
    const handleStorage = () => setIsLoggedIn(!!localStorage.getItem("token"));
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  const menuItems = [
    {
      key: '1',
      label: (
        <span
          onClick={() => scrollToSection('tentang-produk')}
          style={{ color: '#4E342E', cursor: 'pointer' }}
        >
          Tentang Produk
        </span>
      ),
    },
    {
      key: '2',
      label: (
        <span
          onClick={() => scrollToSection('pembelian')}
          style={{ color: '#4E342E', cursor: 'pointer' }}
        >
          Pembelian
        </span>
      ),
    },
    {
      key: '3',
      label: (
        <span
          onClick={() => scrollToSection('kontak-kami')}
          style={{ color: '#4E342E', cursor: 'pointer' }}
        >
          Kontak
        </span>
      ),
    },
    {
      key: '4',
      label: (
        <span
          onClick={() => scrollToSection('tentang-kami')}
          style={{ color: '#4E342E', cursor: 'pointer' }}
        >
          Tentang Kami
        </span>
      ),
    },
  ];

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1001,
        backgroundColor: '#E8D8C3',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 24px',
        borderBottom: '1px solid #e0d5c0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      {/* Kiri: Logo & Brand */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
        <img
          src={logo}
          alt="Logo NusaKoko"
          style={{
            width: '42px',
            height: '42px',
            objectFit: 'contain',
            padding: '6px',
            borderRadius: '50%',
            backgroundColor: '#fff',
            border: '2px solid #4E342E',
            boxShadow: '0 2px 3px rgba(0,0,0,0.8)',
          }}
        />
        <span style={{ color: '#4E342E', fontSize: 20, fontWeight: 'bold' }}>
          NusaKoko
        </span>
      </Link>

      {/* Tengah: Menu Navigasi */}
      <Menu
        mode="horizontal"
        theme="light"
        items={menuItems}
        className="custom-navbar-menu"
        style={{
          backgroundColor: 'transparent',
          borderBottom: 'none',
          flex: 1,
          justifyContent: 'center',
        }}
      />

      {/* Kanan: Search + Ikon */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Input
          placeholder="Cari Produk..."
          onChange={(e) => onSearch?.(e.target.value)}
          suffix={
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                backgroundColor: '#8B5E3C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SearchOutlined style={{ color: '#fff', fontSize: 16 }} />
            </div>
          }
          style={{
            width: 400,
            borderRadius: 20,
            backgroundColor: '#fff',
            color: '#8B5E3C',
            border: 'none',
            padding: '4px 12px',
          }}
        />

        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            backgroundColor: '#8B5E3C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#E8D8C3',
            fontSize: 18,
            cursor: 'pointer',
          }}
        >
          <UserOutlined />
        </div>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            backgroundColor: '#8B5E3C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#E8D8C3',
            fontSize: 18,
            cursor: 'pointer',
          }}
        >
          <ShoppingCartOutlined />
        </div>
        {isLoggedIn && (
          <Button onClick={handleLogout}>Logout</Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
