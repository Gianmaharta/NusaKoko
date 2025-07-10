import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoNusaKoko from "../../assets/logo-nusakoko.png";
import { orderAPI } from "../../services/apiService";

// Helper untuk format tanggal Indonesia
const hariIndo = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const bulanIndo = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
function getTanggalIndo() {
  const now = new Date();
  const hari = hariIndo[now.getDay()];
  const tanggal = now.getDate().toString().padStart(2, '0');
  const bulan = bulanIndo[now.getMonth()];
  return `${hari}, ${tanggal} ${bulan}`;
}

const DashboardAdmin = () => {
  const navigate = useNavigate();
  const [salesData, setSalesData] = useState([0,0,0,0,0,0,0]);
  const [topProducts, setTopProducts] = useState([]);
  const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
  const [weekStats, setWeekStats] = useState({ count: 0, total: 0 });

  useEffect(() => {
    // Ambil data order dari backend
    const fetchOrders = async () => {
      try {
        const orders = await orderAPI.getAllOrders();
        // Hitung jumlah order per hari (7 hari terakhir)
        const now = new Date();
        const counts = [0,0,0,0,0,0,0];
        // Hitung produk terlaris minggu ini
        const productCount = {};
        // Statistik minggu ini
        let weekCount = 0;
        let weekTotal = 0;
        orders.forEach(order => {
          const tgl = new Date(order.tanggal || order.created_at);
          const diff = Math.floor((now - tgl) / (1000*60*60*24));
          const isPaid = order.payment_status === 'paid' || order.payment_status === 'PAID';
          const isNotCancelled = order.order_status !== 'cancelled' && order.order_status !== 'CANCELLED';
          // Statistik minggu ini: 7 hari terakhir, payment_status 'paid', dan order_status bukan 'cancelled'
          if (
            diff >= 0 && diff < 7 &&
            isPaid &&
            isNotCancelled
          ) {
            weekCount++;
            weekTotal += Number(order.total_bayar || order.total_amount || 0);
          }
          // Grafik penjualan: hanya order paid (abaikan cancelled)
          if (diff >= 0 && diff < 7 && isPaid) {
            const dayIdx = (tgl.getDay() + 6) % 7; // Senin=0, Minggu=6
            counts[dayIdx]++;
          }
          // Produk terlaris minggu ini: hanya order paid & bukan cancelled
          if (diff >= 0 && diff < 7 && isPaid && isNotCancelled) {
            if (order.items && Array.isArray(order.items)) {
              order.items.forEach(item => {
                if (!productCount[item.name]) productCount[item.name] = 0;
                productCount[item.name] += item.quantity || 1;
              });
            } else if (order.produk) {
              if (!productCount[order.produk]) productCount[order.produk] = 0;
              productCount[order.produk] += 1;
            }
          }
        });
        setSalesData(counts);
        // Urutkan dan ambil top 3
        const top = Object.entries(productCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3);
        setTopProducts(top);
        setWeekStats({ count: weekCount, total: weekTotal });
      } catch (err) {
        // fallback dummy jika gagal
        setSalesData([5,7,6,8,4,2,1]);
        setTopProducts([]);
        setWeekStats({ count: 0, total: 0 });
      }
    };
    fetchOrders();
  }, []);

  // Fungsi tombol
  const handlePesanan = () => {
    navigate("/admin/pesanan");
  };
  const handleStokProduk = () => {
    navigate("/admin/stok-produk");
  };
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div style={{ minHeight: "100vh", background: "#e9dbc7", fontFamily: 'Inter, Arial, sans-serif' }}>
      {/* Header */}
      <div style={{ width: '100%', background: '#7ba05b', minHeight: 100, display: 'flex', alignItems: 'center', borderBottom: '2.5px solid #4E342E', padding: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', flex: 1, height: 100 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#fff', boxShadow: '0 2px 8px rgba(99,54,4,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '4px solid #fff', marginLeft: 32, marginRight: 24 }}>
            <img src={logoNusaKoko} alt="Logo" style={{ width: 64, height: 64, objectFit: 'contain', borderRadius: '50%' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ fontWeight: 700, fontSize: 28, color: "#222", lineHeight: 1 }}>Dashboard Admin NusaKoko</div>
            <div style={{ color: "#222", fontSize: 20, marginTop: 2 }}>{getTanggalIndo()}</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginRight: 32 }}>
          {/* Button Profil */}
          <button
            onClick={() => navigate('/admin/profile')}
            style={{ width: 56, height: 56, borderRadius: '50%', background: '#4E342E', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}
            title="Profil Admin"
          >
            <span role="img" aria-label="user" style={{ color: '#fff', fontSize: 32 }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="16" fill="#4E342E" />
                <circle cx="16" cy="13" r="6" fill="#f5e7d6" />
                <ellipse cx="16" cy="24" rx="9" ry="7" fill="#f5e7d6" />
              </svg>
            </span>
          </button>
          {/* Button Logout */}
          <button
            onClick={handleLogout}
            style={{ width: 72, height: 72, borderRadius: '50%', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: 'none' }}
            title="Logout"
          >
            <svg width="64" height="64" viewBox="0 0 28 28" fill="none">
              <rect x="4" y="4" width="14" height="20" rx="2" stroke="#222" strokeWidth="2.5" fill="none" />
              <path d="M18 14H8" stroke="#222" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M14 10L18 14L14 18" stroke="#222" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ display: "flex", alignItems: 'flex-start', minHeight: 'calc(100vh - 100px)', width: '100vw', boxSizing: 'border-box', background: 'none', padding: 0, margin: 0, marginTop: 36 }}>
        {/* Sidebar */}
        <div style={{ width: 180, background: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 40, gap: 24 }}>
          <button onClick={handlePesanan} style={{ padding: '18px 0', width: 160, fontSize: 22, background: '#fff', border: 'none', borderRadius: 12, boxShadow: '0 4px #7ba05b', color: '#4E342E', fontWeight: 500, cursor: 'pointer' }}>Pesanan</button>
          <button onClick={handleStokProduk} style={{ padding: '18px 0', width: 160, fontSize: 22, background: '#fff', border: 'none', borderRadius: 12, boxShadow: '0 4px #7ba05b', color: '#4E342E', fontWeight: 500, cursor: 'pointer' }}>Stok Produk</button>
        </div>

        {/* Dashboard Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gridTemplateRows: '120px 180px 1fr',
          gap: 28,
          flex: 1,
          width: '100%',
          alignItems: 'stretch',
          boxSizing: 'border-box',
          overflow: 'visible',
          paddingRight: 32,
        }}>
          {/* Statistik Minggu Ini */}
          <div style={{ background: "#4E342E", color: "#fff", borderRadius: 16, boxShadow: "0 6px #7ba05b", padding: 32, textAlign: 'left', gridColumn: '1/2', gridRow: '1/2', display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: 0 }}>
            <div style={{ fontSize: 22, marginBottom: 12 }}>Statistik Minggu Ini</div>
            <div style={{ fontSize: 20, marginBottom: 4 }}>{weekStats.count} pesanan masuk</div>
            <div style={{ fontSize: 20 }}>Total Penjualan: Rp {weekStats.total.toLocaleString('id-ID')}</div>
          </div>

          {/* Daftar Tugas Prioritas */}
          <div style={{ background: "#4E342E", color: "#fff", borderRadius: 16, boxShadow: "0 6px #7ba05b", padding: 32, textAlign: 'left', gridColumn: '2/3', gridRow: '1/2', display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: 0 }}>
            <div style={{ fontSize: 22, marginBottom: 12 }}>Daftar Tugas Prioritas</div>
            <ul style={{ fontSize: 18, margin: 0, paddingLeft: 20 }}>
              <li>Pesanan belum dikirim</li>
              <li>Stok produk segera habis</li>
              <li>3 pesanan baru</li>
            </ul>
          </div>

          {/* Grafik Penjualan */}
          <div style={{ background: "#4E342E", color: "#fff", borderRadius: 16, boxShadow: "0 6px #7ba05b", padding: 32, textAlign: 'left', gridColumn: '1/2', gridRow: '2/4', display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: 0 }}>
            <div style={{ fontSize: 22, marginBottom: 16 }}>Grafik Penjualan (7 Hari Terakhir)</div>
            <div style={{ width: '100%', height: '320px', background: 'none', position: 'relative' }}>
              <svg width="100%" height="100%" viewBox="0 0 600 320" preserveAspectRatio="none" style={{ display: 'block' }}>
                {/* Grid horizontal dan label Y */}
                {[...Array(9)].map((_, i) => (
                  <g key={i}>
                    <line x1={60} y1={40 + i * 30} x2={580} y2={40 + i * 30} stroke="#fff" strokeOpacity={0.25} strokeWidth={2} />
                    <text x={50} y={45 + i * 30} fill="#fff" fontSize={18} textAnchor="end">{8 - i}</text>
                  </g>
                ))}
                {/* Bar */}
                {salesData.map((val, idx) => {
                  const barCount = salesData.length;
                  const chartWidth = 520;
                  const barWidth = 48;
                  const gap = (chartWidth - barCount * barWidth) / (barCount - 1);
                  const x = 60 + idx * (barWidth + gap);
                  const y = 40 + (8 - val) * 30;
                  const height = val * 30;
                  return (
                    <rect
                      key={idx}
                      x={x}
                      y={y}
                      width={barWidth}
                      height={height}
                      rx={6}
                      fill="#7ba05b"
                    />
                  );
                })}
                {/* Sumbu X label hari */}
                {days.map((d, idx) => {
                  const barCount = salesData.length;
                  const chartWidth = 520;
                  const barWidth = 48;
                  const gap = (chartWidth - barCount * barWidth) / (barCount - 1);
                  const x = 60 + idx * (barWidth + gap) + barWidth / 2;
                  return (
                    <text
                      key={d}
                      x={x}
                      y={315}
                      fill="#fff"
                      fontSize={20}
                      textAnchor="middle"
                    >{d}</text>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Panel Dampak Berkelanjutan */}
          <div style={{ background: "#4E342E", color: "#fff", borderRadius: 16, boxShadow: "0 6px #7ba05b", padding: 32, textAlign: 'left', gridColumn: '2/3', gridRow: '2/3', minHeight: 120, display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: 0, boxSizing: 'border-box', overflow: 'visible' }}>
            <div style={{ fontSize: 22, marginBottom: 12 }}>Panel Dampak Berkelanjutan</div>
            <ul style={{ fontSize: 18, margin: 0, paddingLeft: 20 }}>
              <li>Mengurangi Limbah Plastik</li>
              <li>Pemanfaatan Limbah Pertanian</li>
            </ul>
          </div>

          {/* Produk Terlaris Minggu Ini */}
          <div style={{ background: "#4E342E", color: "#fff", borderRadius: 16, boxShadow: "0 6px #7ba05b", padding: 32, textAlign: 'left', gridColumn: '2/3', gridRow: '3/4', minHeight: 120, display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: 0 }}>
            <div style={{ fontSize: 22, marginBottom: 12 }}>Produk Terlaris Minggu Ini</div>
            <ol style={{ fontSize: 18, margin: 0, paddingLeft: 20 }}>
              {topProducts.length === 0 && <li>Tidak ada data</li>}
              {topProducts.map(([name, qty], idx) => (
                <li key={name}>{name} ({qty} pcs)</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;