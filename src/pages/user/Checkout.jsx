import React, { useState, useEffect } from 'react';
import { Layout, Radio } from 'antd';
import Navbar from '../../components/user/Navbar';
import Footer from '../../components/user/Footer';
import { useCart } from '../../context/CartContext';
import shopeepay from '../../assets/shopeepay.png';
import gopay from '../../assets/gopay.png';
import dana from '../../assets/dana.png';
import ovo from '../../assets/ovo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { userAPI, orderAPI } from '../../services/apiService';
import BackButton from '../../components/user/BackButton';

const { Content } = Layout;

const metodePembayaran = [
  { value: 'shopeepay', label: 'Shopee pay', icon: shopeepay },
  { value: 'gopay', label: 'Gopay', icon: gopay },
  { value: 'dana', label: 'Dana', icon: dana },
  { value: 'ovo', label: 'Ovo', icon: ovo },
];

export default function Checkout() {
  const location = useLocation();
  const productFromDetail = location.state?.product;

  const { cart, setCart } = useCart();
  const [metode, setMetode] = useState('shopeepay');
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const [alamat, setAlamat] = useState('');
  const [editAlamat, setEditAlamat] = useState(false);

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  useEffect(() => {
    // Fetch alamat user dari backend
    const fetchProfile = async () => {
      try {
        const data = await userAPI.getProfile();
        setAlamat(data.address || '');
      } catch (err) {
        // handle error
      }
    };
    fetchProfile();
  }, []);

  const handleAlamatChange = (e) => setAlamat(e.target.value);

  const handleAlamatSave = async () => {
    try {
      await userAPI.updateAddress(alamat);
      setEditAlamat(false);
    } catch (err) {
      // handle error
    }
  };

  const checkedCart = productFromDetail
    ? [{ ...productFromDetail, checked: true }]
    : cart.filter(i => i.checked);

  const total = checkedCart.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);

  
  const handleBeli = async () => {
    try {
      const user_id = localStorage.getItem('user_id');
      const items = checkedCart.map(item => ({
        product_id: item.id,
        quantity: item.qty || 1, // Pastikan quantity selalu ada nilainya
        // Ambil harga dari state, bukan kirim ke backend
        // Backend akan mengambil harga dari database
      }));

      if (!user_id) {
          alert("Sesi Anda telah berakhir, silakan login kembali.");
          return;
      }
      if (items.length === 0) {
          alert("Keranjang Anda kosong.");
          return;
      }
      
      // Panggil API untuk membuat pesanan
      const res = await orderAPI.createOrder({
        user_id,
        items_json: JSON.stringify(items)
      });

      // Cek apakah order berhasil dibuat dan kita mendapat order_id
      if (res && res.order_id) {
          // 1. Tampilkan notifikasi sukses
          setShowSuccess(true);

          // Update payment_status menjadi 'paid'
          try {
            await orderAPI.updatePaymentStatus(res.order_id, 'paid');
          } catch (err) {
            console.error('Gagal update status pembayaran:', err);
          }

          // (Opsional tapi direkomendasikan) Bersihkan item yang sudah di-checkout dari keranjang
          const newCart = cart.filter(item => !item.checked);
          setCart(newCart);

          // 2. Tunggu 2 detik agar user bisa lihat notifikasi
          setTimeout(() => {
              // 3. Redirect ke halaman informasi pesanan dengan ID pesanan baru
              navigate(`/informasi-pesanan/${res.order_id}`);
          }, 2000); // 2000 milidetik = 2 detik

      } else {
          // Handle jika response dari backend tidak sesuai harapan
          console.error("Order creation failed, response:", res);
          alert("Terjadi kesalahan saat membuat pesanan, silakan coba lagi.");
      }

    } catch (err) {
      console.error("Order error:", err);
      alert("Terjadi kesalahan koneksi, silakan coba lagi.");
    }
  };

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
              }}>
            <BackButton />
          </div>
          <h1 style={{ color: 'white', fontWeight: 700, fontSize: 40, marginBottom: 32 }}>Checkout</h1>
          <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
            <div style={{ flex: 2 }}>
              <div style={{ background: '#E5D6C5', borderRadius: 16, marginBottom: 32, padding: 32, textAlign: 'left' }}>
                <div style={{ fontWeight: 700, fontSize: 24, color: '#5B4036', marginBottom: 8 }}>ALAMAT PENGIRIMAN</div>
                {editAlamat ? (
                  <>
                    <textarea value={alamat} onChange={handleAlamatChange} />
                    <button onClick={handleAlamatSave}>Simpan</button>
                  </>
                ) : (
                  <>
                    <div style={{ color: '#5B4036', fontSize: 20 }}>{alamat}</div>
                    <button onClick={() => setEditAlamat(true)}>Ubah Alamat</button>
                  </>
                )}
              </div>
              {checkedCart.map(item => (
                <div key={item.id} style={{ background: '#E5D6C5', borderRadius: 16, display: 'flex', alignItems: 'center', marginBottom: 24, padding: 24 }}>
                  <img src={item.image_url || item.image} alt={item.name} style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 8, marginRight: 32, background: '#fff' }} />
                  <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                    <div style={{ fontWeight: 700, fontSize: 32, color: '#5B4036' }}>{item.name}</div>
                    <div style={{ color: '#5B4036', fontSize: 20, marginTop: 8 }}>Jumlah: <b>x{item.qty || 1}</b></div>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 28, color: '#5B4036', marginLeft: 24 }}>Rp {(item.price * (item.qty || 1)).toLocaleString('id-ID')}</div>
                </div>
              ))}
            </div>
            <div style={{ flex: 1, minWidth: 320, maxWidth: 400 }}>
              <div style={{ background: '#E5D6C5', borderRadius: 16, padding: 28, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 20, color: '#5B4036', marginBottom: 16 }}>Metode Pembayaran</div>
                <Radio.Group onChange={e => setMetode(e.target.value)} value={metode} style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
                  {metodePembayaran.map(m => (
                    <Radio key={m.value} value={m.value} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 18, color: '#5B4036' }}>
                      <img src={m.icon} alt={m.label} style={{ width: 32, marginRight: 12 }} />
                      {m.label}
                    </Radio>
                  ))}
                </Radio.Group>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span style={{ color: '#5B4036', fontSize: 18 }}>Total</span>
                  <span style={{ color: '#5B4036', fontWeight: 700, fontSize: 20 }}>Rp {total.toLocaleString('id-ID')}</span>
                </div>
                <button
                  style={{ width: '100%', background: '#6BA368', color: 'white', fontWeight: 700, fontSize: 20, border: 'none', borderRadius: 8, padding: '14px 0', cursor: 'pointer', marginTop: 10 }}
                  onClick={handleBeli}
                >Beli</button>
              </div>
            </div>
          </div>
        </div>
      </Content>
      <Footer />
      {showSuccess && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.18)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            background: '#6BA368',
            borderRadius: 16,
            padding: '48px 64px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          }}>
            <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
              <circle cx="45" cy="45" r="40" stroke="#fff" strokeWidth="6" fill="none" />
              <path d="M28 48L41 61L62 36" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 32, marginTop: 24, textAlign: 'center' }}>Transaksi Berhasil</div>
          </div>
        </div>
      )}
    </Layout>
  );
}