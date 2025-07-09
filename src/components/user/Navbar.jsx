import React, { useEffect, useState, useRef } from 'react';
import { Input, Menu, Button, Spin } from 'antd';
import {
  UserOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import logo from '../../assets/logo-nusakoko.png';
import { productAPI } from '../../services/apiService'; 
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onSearch, onShowLoginModal }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isHomePage = location.pathname === '/';
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const searchTimeoutRef = useRef(null);
  const navbarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [navbarRef]);  

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
    const handleStorage = () => setIsLoggedIn(!!localStorage.getItem("token"));
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleNavClick = (sectionId) => {
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleCartClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/keranjang");
    } else {
      if (onShowLoginModal) onShowLoginModal();
    }
  };

  const handleAvatarClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/profile");
    } else {
      if (onShowLoginModal) onShowLoginModal();
    }
  };

  const handleDaftarPesananClick = () => {
    navigate("/daftar-pesanan");
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Hanya tampilkan dropdown jika ada query
    if (query.length > 0) {
        setIsDropdownVisible(true);
    } else {
        setIsDropdownVisible(false);
    }

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    if (query.length > 0) {
      setIsSearching(true);
      searchTimeoutRef.current = setTimeout(async () => {
        const results = await productAPI.searchProducts(query);
        setSearchResults(results);
        setIsSearching(false);
      }, 500);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }

  const menuItems = [
    {
      key: '1',
      label: (
        <span onClick={() => handleNavClick('tentang-produk')} style={{ color: '#4E342E', cursor: 'pointer' }}>
          Beranda
        </span>
      ),
    },
    {
      key: '2',
      label: (
        <span
          onClick={() => {
            if (isLoggedIn) {
              navigate('/produk');
            } else {
              handleNavClick('pembelian');
            }
          }}
          style={{ color: '#4E342E', cursor: 'pointer' }}
        >
          Produk
        </span>
      ),
    },
    {
      key: '3',
      label: (
        <span onClick={() => handleNavClick('kontak-kami')} style={{ color: '#4E342E', cursor: 'pointer' }}>
          Kontak
        </span>
      ),
    },
    {
      key: '4',
      label: (
        <span onClick={() => handleNavClick('tentang-kami')} style={{ color: '#4E342E', cursor: 'pointer' }}>
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

      {/* Tengah: Tampilkan Menu Navigasi HANYA di halaman utama */}
      {isHomePage ? (
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
      ) : (
        // Beri ruang kosong agar ikon di kanan tetap di posisi yang sama
        <div style={{ flex: 1 }}></div>
      )}
      

      {/* Kanan: Search + Ikon */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative' }}>
        
        {!isHomePage && (
          <div>
            <Input
              placeholder="Cari Produk..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => { if(searchQuery) setIsDropdownVisible(true); }}
              suffix={
                <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: '#8B5E3C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <SearchOutlined style={{ color: '#fff', fontSize: 16 }} />
                </div>
              }
              style={{ width: 400, borderRadius: 20, backgroundColor: '#fff', color: '#8B5E3C', border: 'none', padding: '4px 12px' }}
            />

            {isDropdownVisible && (
              <div style={{
                position: 'absolute', top: '120%', left: 0, width: '400px', background: '#fff',
                borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 1002,
                maxHeight: '400px', overflowY: 'auto', border: '1px solid #E8D8C3'
              }}>
                {isSearching ? (
                  <div style={{ padding: '20px', textAlign: 'center' }}><Spin /></div>
                ) : searchResults.length > 0 ? (
                  searchResults.map(product => (
                      <Link to={'/detail'} state={{ product: product }} key={product.id} 
                            onClick={() => setIsDropdownVisible(false)}
                            style={{ textDecoration: 'none', color: 'inherit' }}>
                        
                        <div style={{ display: 'flex', alignItems: 'center', padding: '12px', borderBottom: '1px solid #f0f0f0', cursor: 'pointer', justifyContent: 'space-between' }} className="search-result-item">
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={product.image_url} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px', marginRight: '12px' }}/>
                            <div style={{ fontWeight: 600, color: '#4E342E', textAlign: 'left' }}>
                              {product.name}
                            </div>
                          </div>
                          <div style={{ fontSize: '14px', color: '#8B5E3C', fontWeight: 500, whiteSpace: 'nowrap' }}>
                            Rp {Number(product.price).toLocaleString('id-ID')}
                          </div>
                        </div>

                      </Link>
                  ))
                ) : (
                  <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>Produk tidak ditemukan.</div>
                )}
              </div>
            )}
          </div>
        )}
        {/* Ikon-ikon di kanan */}
        <div style={{ width: 38, height: 38, borderRadius: '50%', backgroundColor: '#8B5E3C', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E8D8C3', fontSize: 18, cursor: 'pointer' }} onClick={handleAvatarClick} title="Profil">
          <UserOutlined />
        </div>
        <div style={{ width: 38, height: 38, borderRadius: '50%', backgroundColor: '#8B5E3C', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E8D8C3', fontSize: 18, cursor: 'pointer' }} onClick={handleCartClick} title="Keranjang">
          <ShoppingCartOutlined />
        </div>

        {isLoggedIn && (
          <>
            <div style={{ width: 38, height: 38, borderRadius: '50%', backgroundColor: '#8B5E3C', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E8D8C3', fontSize: 18, cursor: 'pointer' }} onClick={handleDaftarPesananClick} title="Daftar Pesanan">
              <FileTextOutlined />
            </div>
            <Button onClick={handleLogout}>Logout</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;