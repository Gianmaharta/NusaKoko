import React from 'react';
import { Layout } from 'antd';
import Navbar from '../../components/user/Navbar';
import Footer from '../../components/user/Footer';
import '../../App.css';
import { useCart } from '../../context/CartContext';
import { useNavigate } from "react-router-dom";

import bagImage from '../../assets/bag.png';
import foodPlasticImage from '../../assets/food-plastic.png';
import bowlImage from '../../assets/bowl.png';

const { Content } = Layout;

export default function Keranjang() {
  const { cart, setCart, removeFromCart, updateQty } = useCart();
  const navigate = useNavigate();

  // Jika cart kosong, bisa isi dummy untuk demo (hapus di produksi)
  React.useEffect(() => {
    if (cart.length === 0) {
      setCart([
        {
          id: 4,
          name: "Kantong Plastik",
          title: "Kantong Plastik",
          price: 10000,
          image: bagImage,
          qty: 1,
          checked: true,
          stock: 10,
        },
        {
          id: 5,
          name: "Plastik Makanan",
          title: "Plastik Makanan",
          price: 8000,
          image: foodPlasticImage,
          qty: 1,
          checked: false,
          stock: 10,
        },
        {
          id: 6,
          name: "Mangkok Plastik",
          title: "Mangkok Plastik",
          price: 15000,
          image: bowlImage,
          qty: 1,
          checked: false,
          stock: 10,
        },
      ]);
    }
  }, [cart, setCart]);

  const handleCheck = (id) => {
    setCart(cart.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const handleQty = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, Math.min(item.qty + delta, item.stock));
        return { ...item, qty: newQty };
      }
      return item;
    }));
    // updateQty(id, newQty); // jika ingin updateQty dari context
  };

  const handleDelete = (id) => {
    removeFromCart(id);
  };

  const total = cart.filter(i => i.checked).reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Content style={{ background: '#5B4036', paddingBottom: 40, minHeight: '100vh' }}>
        <div style={{ width: '100vw', padding: '32px 24px' }}>
          <h1 style={{ color: 'white', fontWeight: 700, fontSize: 40, marginBottom: 32, textAlign: 'center' }}>Keranjang</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'flex-start' }}>
            <div style={{ flex: 2, minWidth: 0 }}>
              {cart.map(item => (
                <div key={item.id} style={{ background: '#E5D6C5', borderRadius: 20, display: 'flex', alignItems: 'center', marginBottom: 24, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <input type="checkbox" checked={item.checked} onChange={() => handleCheck(item.id)} style={{ width: 28, height: 28, accentColor: '#6BA368', marginRight: 20 }} />
                  <img src={item.image} alt={item.name} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 12, marginRight: 28, background: '#fff' }} />
                  <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                    <div style={{ fontWeight: 700, fontSize: 28, color: '#5B4036', marginBottom: 4 }}>{item.name}</div>
                    <div style={{ color: '#5B4036', opacity: 0.7, fontSize: 16, marginBottom: 8 }}>Stok : {item.stock}</div>
                    <div style={{ fontWeight: 700, fontSize: 22, color: '#5B4036' }}>Rp {item.price.toLocaleString('id-ID')}</div>
                  </div>
                  <button onClick={() => handleDelete(item.id)} style={{ background: 'none', border: 'none', color: '#5B4036', fontSize: 24, marginRight: 24, cursor: 'pointer', display: 'flex', alignItems: 'center' }} title="Hapus">
                    <span role="img" aria-label="delete">🗑️</span>
                  </button>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f5f5f5', borderRadius: 8, padding: '4px 10px' }}>
                    <button onClick={() => handleQty(item.id, -1)} style={{ width: 32, height: 32, borderRadius: 6, border: '1px solid #5B4036', background: 'none', fontSize: 18, cursor: 'pointer', color: '#5B4036', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>-</button>
                    <span style={{ fontSize: 18, minWidth: 24, textAlign: 'center', fontWeight: 600 }}>{item.qty}</span>
                    <button onClick={() => handleQty(item.id, 1)} style={{ width: 32, height: 32, borderRadius: 6, border: '1px solid #5B4036', background: 'none', fontSize: 18, cursor: 'pointer', color: '#5B4036', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ flex: 1, minWidth: 320, maxWidth: 400 }}>
              <div style={{ background: '#E5D6C5', borderRadius: 20, padding: 28, minWidth: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ fontWeight: 700, fontSize: 22, color: '#5B4036', marginBottom: 18, textAlign: 'center' }}>Ringkasan</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
                  <span style={{ color: '#5B4036', fontSize: 18 }}>Total</span>
                  <span style={{ color: '#5B4036', fontWeight: 700, fontSize: 20 }}>Rp {total.toLocaleString('id-ID')}</span>
                </div>
                <button
                  style={{ width: '100%', background: '#6BA368', color: 'white', fontWeight: 700, fontSize: 20, border: 'none', borderRadius: 8, padding: '14px 0', cursor: 'pointer', marginTop: 10 }}
                  onClick={() => navigate('/checkout')}
                >
                  Beli
                </button>
              </div>
            </div>
          </div>
        </div>
      </Content>
      <Footer />
    </Layout>
  );
} 