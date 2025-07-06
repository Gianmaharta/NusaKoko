import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/user/Navbar';
import Footer from '../../components/user/Footer';
import { orderAPI } from '../../services/apiService';

// Komponen untuk satu kartu pesanan
const OrderCard = ({ order }) => {
  const navigate = useNavigate();

  // Fungsi untuk navigasi ke halaman detail
  const handleViewDetails = () => {
    navigate(`/informasi-pesanan/${order.id}`);
  };

  // Styling untuk badge status
  const getStatusStyle = (status) => {
    const styles = {
      padding: '4px 12px',
      borderRadius: '12px',
      color: 'white',
      fontWeight: 500,
      fontSize: '14px',
    };
    switch (status) {
      case 'completed':
        return { ...styles, background: '#6BA368' }; // Hijau
      case 'shipped':
        return { ...styles, background: '#29B6F6' }; // Biru
      case 'processing':
        return { ...styles, background: '#FFA726' }; // Oranye
      case 'cancelled':
        return { ...styles, background: '#E53935' }; // Merah
      default:
        return { ...styles, background: '#78909C' }; // Abu-abu
    }
  };

  return (
    <div 
      style={{ 
        background: '#E5D6C5', 
        borderRadius: 16, 
        padding: '24px', 
        marginBottom: '20px',
        color: '#5B4036',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 700, fontSize: '20px' }}>Pesanan #{order.order_number}</span>
        <span style={getStatusStyle(order.order_status)}>{order.order_status}</span>
      </div>
      <div style={{ fontSize: '16px', color: '#6D4C41' }}>
        Tanggal: {new Date(order.tanggal).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
      </div>
      <div style={{ borderTop: '1px solid #D7CCC8', paddingTop: '12px' }}>
        <p style={{ margin: 0, fontWeight: 500 }}>Produk: {order.produk || '-'}</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
        <div>
          <span style={{ fontSize: '16px' }}>Total Pembayaran</span>
          <p style={{ fontWeight: 700, fontSize: '18px', margin: 0 }}>Rp {Number(order.total_bayar).toLocaleString('id-ID')}</p>
        </div>
        <button
          onClick={handleViewDetails}
          style={{
            background: '#8B5E3C',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Lihat Detail
        </button>
      </div>
    </div>
  );
};


// Komponen Halaman Utama
export default function DaftarPesanan() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderAPI.getMyOrders();
        setOrders(data);
      } catch (error) {
        console.error("Gagal mengambil daftar pesanan:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#4E342E', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 1, padding: '40px 24px', background: '#4E342E' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ color: 'white', fontWeight: 700, fontSize: 40, marginBottom: 32, textAlign: 'center' }}>
            Daftar Pesanan Saya
          </h1>
          {loading ? (
            <p style={{ color: 'white', textAlign: 'center' }}>Memuat pesanan...</p>
          ) : orders.length > 0 ? (
            orders.map(order => <OrderCard key={order.id} order={order} />)
          ) : (
            <div style={{ background: '#E5D6C5', borderRadius: 16, padding: '40px', textAlign: 'center', color: '#5B4036' }}>
              <p style={{ fontSize: '18px', margin: 0 }}>Anda belum memiliki riwayat pesanan.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}