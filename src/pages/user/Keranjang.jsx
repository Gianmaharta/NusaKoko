import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import Navbar from '../../components/user/Navbar';
import Footer from '../../components/user/Footer';
import '../../App.css';
import { useCart } from '../../context/CartContext';
import { useNavigate } from "react-router-dom";
import { cartAPI } from '../../services/apiService';
import BackButton from '../../components/user/BackButton';

const { Content } = Layout;

export default function Keranjang() {
  const { cart, setCart, removeFromCartContext, updateQtyContext } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // State untuk status loading

  // Ambil data keranjang dari backend saat halaman dimuat
  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      try {
        const response = await cartAPI.getCart();
        // Format data dari backend agar sesuai dengan state di frontend (checked, qty)
        const formattedCart = response.data.map(item => ({
          ...item,
          qty: item.quantity,
          checked: true, // Asumsikan semua item ter-checklist saat dimuat
        }));
        setCart(formattedCart);
      } catch (error) {
        console.error("Gagal memuat data keranjang:", error);
        // Jika error, set keranjang menjadi array kosong
        setCart([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [setCart]); // Dependency array memastikan ini hanya berjalan sekali saat mount

  const handleCheck = (id) => {
    setCart(cart.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  // Fungsi untuk mengubah kuantitas (sekarang dengan API)
  const handleQty = async (id, delta) => {
    const item = cart.find(i => i.id === id);
    if (!item) return;

    const newQty = Math.max(1, Math.min(item.qty + delta, item.stock));
    if (newQty === item.qty) return; // Tidak ada perubahan, tidak perlu panggil API

    try {
      // Panggil API untuk update di backend
      await cartAPI.updateCartItem(id, newQty);
      // Jika berhasil, update state di frontend melalui context
      updateQtyContext(id, newQty);
    } catch (error) {
      console.error("Gagal mengubah kuantitas:", error);
      alert("Gagal mengubah kuantitas, silakan coba lagi.");
    }
  };

  // Fungsi untuk menghapus item (sekarang dengan API)
  const handleDelete = async (id) => {
    try {
      // Panggil API untuk hapus di backend
      await cartAPI.removeFromCart(id);
      // Jika berhasil, hapus dari state di frontend melalui context
      removeFromCartContext(id);
    } catch (error) {
      console.error("Gagal menghapus item:", error);
      alert("Gagal menghapus item, silakan coba lagi.");
    }
  };

  const total = cart.filter(i => i.checked).reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Content style={{ background: '#5B4036', paddingBottom: 40, minHeight: '100vh' }}>
        <div style={{ width: '100vw', padding: '32px 24px' }}>
          <div style={{ 
            maxWidth: '1200px', // Atur lebar maksimal konten
            margin: '0',    // Ini akan membuat kontainer berada di tengah
            width: '90%',        // Lebar relatif
            textAlign: 'left'  // Pastikan semua isinya mulai dari kiri
            }}><BackButton />
          </div>
          <h1 style={{ color: 'white', fontWeight: 700, fontSize: 40, marginBottom: 32, textAlign: 'center' }}>Keranjang</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'flex-start' }}>
            <div style={{ flex: 2, minWidth: 0 }}>
              {loading ? (
                <p style={{ color: 'white', textAlign: 'center' }}>Memuat keranjang...</p>
              ) : cart.length > 0 ? (
                cart.map(item => (
                  <div key={item.id} style={{ background: '#E5D6C5', borderRadius: 20, display: 'flex', alignItems: 'center', marginBottom: 24, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                    <input type="checkbox" checked={item.checked} onChange={() => handleCheck(item.id)} style={{ width: 28, height: 28, accentColor: '#6BA368', marginRight: 20, cursor: 'pointer' }} />
                    {/* Sesuaikan sumber gambar ke item.image_url */}
                    <img src={item.image_url} alt={item.name} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 12, marginRight: 28, background: '#fff' }} />
                    <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                      <div style={{ fontWeight: 700, fontSize: 28, color: '#5B4036', marginBottom: 4 }}>{item.name}</div>
                      <div style={{ color: '#5B4036', opacity: 0.7, fontSize: 16, marginBottom: 8 }}>Stok : {item.stock}</div>
                      <div style={{ fontWeight: 700, fontSize: 22, color: '#5B4036' }}>Rp {Number(item.price).toLocaleString('id-ID')}</div>
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
                ))
              ) : (
                <div style={{ background: '#E5D6C5', borderRadius: 16, padding: '40px', textAlign: 'center', color: '#5B4036' }}>
                  <p style={{ fontSize: '18px', margin: 0 }}>Keranjang belanjamu masih kosong.</p>
                </div>
              )}
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
                  disabled={cart.filter(i => i.checked).length === 0} // Disable tombol jika tidak ada item yang dipilih
                >
                  Beli ({cart.filter(i => i.checked).length})
                </button>
              </div>
            </div>
          </div>
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};