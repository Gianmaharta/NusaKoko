import React from "react";
import { useNavigate } from "react-router-dom";
import logoNusaKoko from "../../assets/logo-nusakoko.png";
//test
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
  // Dummy data
  const salesData = [5, 7, 6, 8, 4, 2, 1];
  const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

  // Fungsi tombol
  const handlePesanan = () => {
    navigate("/admin/pesanan");
  };
  const handleStokProduk = () => {
    navigate("/admin/stok-produk");
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
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#4E342E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span role="img" aria-label="user" style={{ color: '#fff', fontSize: 32 }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="16" fill="#4E342E" />
                <circle cx="16" cy="13" r="6" fill="#f5e7d6" />
                <ellipse cx="16" cy="24" rx="9" ry="7" fill="#f5e7d6" />
              </svg>
            </span>
          </div>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M20 24V26C20 27.1046 19.1046 28 18 28H8C6.89543 28 6 27.1046 6 26V6C6 4.89543 6.89543 4 8 4H18C19.1046 4 20 4.89543 20 6V8" stroke="#222" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M26 16L14 16" stroke="#222" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M22 12L26 16L22 20" stroke="#222" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
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
          {/* Statistik Hari Ini */}
          <div style={{ background: "#4E342E", color: "#fff", borderRadius: 16, boxShadow: "0 6px #7ba05b", padding: 32, textAlign: 'left', gridColumn: '1/2', gridRow: '1/2', display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: 0 }}>
            <div style={{ fontSize: 22, marginBottom: 12 }}>Statistik hari ini</div>
            <div style={{ fontSize: 20, marginBottom: 4 }}>5 pesanan masuk</div>
            <div style={{ fontSize: 20 }}>Total Penjualan: Rp 500.000</div>
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

          {/* Produk Terlaris Bulan Ini */}
          <div style={{ background: "#4E342E", color: "#fff", borderRadius: 16, boxShadow: "0 6px #7ba05b", padding: 32, textAlign: 'left', gridColumn: '2/3', gridRow: '3/4', minHeight: 120, display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: 0 }}>
            <div style={{ fontSize: 22, marginBottom: 12 }}>Produk Terlaris Bulan Ini</div>
            <ol style={{ fontSize: 18, margin: 0, paddingLeft: 20 }}>
              <li>Mangkuk (200 pcs)</li>
              <li>Gelas (190 pcs)</li>
              <li>Piring (100 pcs)</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;