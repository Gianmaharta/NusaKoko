import React, { useState, useEffect } from 'react';
import { Layout, Radio } from 'antd';
import Navbar from '../../components/user/Navbar';
import Footer from '../../components/user/Footer';
import { useCart } from '../../context/CartContext';
import bagImage from '../../assets/bag.png';
import foodPlasticImage from '../../assets/food-plastic.png';
import bowlImage from '../../assets/bowl.png';
import shopeepay from '../../assets/shopeepay.png';
import gopay from '../../assets/gopay.png';
import dana from '../../assets/dana.png';
import ovo from '../../assets/ovo.png';
import { CheckCircleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

const alamat = 'Jalan duren gang 7 no 21b kos guntur 21, banyuasri, singaraja, buleleng, bali. (kamar nomor 1), Buleleng, Kab. Buleleng, Bali.';

const metodePembayaran = [
  { value: 'shopeepay', label: 'Shopee pay', icon: shopeepay },
  { value: 'gopay', label: 'Gopay', icon: gopay },
  { value: 'dana', label: 'Dana', icon: dana },
  { value: 'ovo', label: 'Ovo', icon: ovo },
];

export default function Checkout() {
  const { cart } = useCart();
  const [metode, setMetode] = useState('shopeepay');
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const checkedCart = cart.filter(i => i.checked);
  const total = checkedCart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Content style={{ background: '#5B4036', paddingBottom: 40, minHeight: '100vh' }}>
        <div style={{ width: '100vw', padding: '32px 24px' }}>
          <h1 style={{ color: 'white', fontWeight: 700, fontSize: 40, marginBottom: 32 }}>Checkout</h1>
          <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
            <div style={{ flex: 2 }}>
              <div style={{ background: '#E5D6C5', borderRadius: 16, marginBottom: 32, padding: 32, textAlign: 'left' }}>
                <div style={{ fontWeight: 700, fontSize: 24, color: '#5B4036', marginBottom: 8 }}>ALAMAT PENGIRIMAN</div>
                <div style={{ color: '#5B4036', fontSize: 20 }}>{alamat}</div>
              </div>
              {checkedCart.map(item => (
                <div key={item.id} style={{ background: '#E5D6C5', borderRadius: 16, display: 'flex', alignItems: 'center', marginBottom: 24, padding: 24 }}>
                  <img src={item.image} alt={item.name} style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 8, marginRight: 32, background: '#fff' }} />
                  <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                    <div style={{ fontWeight: 700, fontSize: 32, color: '#5B4036' }}>{item.name}</div>
                    <div style={{ color: '#5B4036', fontSize: 20, marginTop: 8 }}>Jumlah: <b>x{item.qty}</b></div>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 28, color: '#5B4036', marginLeft: 24 }}>Rp {item.price.toLocaleString('id-ID')}</div>
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
                  onClick={() => navigate('/informasi-pesanan')}
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