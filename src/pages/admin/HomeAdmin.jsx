import React from "react";
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
  // Dummy data
  const salesData = [5, 7, 6, 8, 4, 2, 1];
  const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

  // Fungsi tombol
  const handlePesanan = () => {
    alert("Menuju halaman Pesanan (fitur belum diimplementasi)");
  };
  const handleStokProduk = () => {
    alert("Menuju halaman Stok Produk (fitur belum diimplementasi)");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#e9dbc7", fontFamily: 'Inter, Arial, sans-serif' }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", background: "#7ba05b", padding: 20, borderBottom: "3px solid #b6cfa3", position: 'relative' }}>
        <div style={{ width: 88, height: 88, borderRadius: '50%', background: '#fff', boxShadow: '0 2px 8px rgba(99,54,4,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '4px solid #fff', marginRight: 28, padding: 8, boxSizing: 'border-box' }}>
          <img src={logoNusaKoko} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%', display: 'block' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 36, color: "#4E342E", lineHeight: 1 }}>Dashboard Admin NusaKoko</div>
          <div style={{ color: "#6d5c4a", fontSize: 28, marginTop: 2 }}>{getTanggalIndo()}</div>
        </div>
        {/* Button profil dan logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginRight: 8 }}>
          <button
            onClick={() => alert('Menu Profil')}
            style={{
              width: 68,
              height: 68,
              borderRadius: '50%',
              background: '#4E342E',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
              transition: 'box-shadow 0.2s',
              outline: 'none',
            }}
            title="Profil"
          >
            {/* Ikon user bulat */}
            <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="16" fill="#4E342E" />
              <circle cx="16" cy="13" r="5" fill="#f5e7d6" />
              <ellipse cx="16" cy="24" rx="8" ry="6" fill="#f5e7d6" />
            </svg>
          </button>
          <button
            onClick={() => alert('Logout')}
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: 'transparent',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background 0.2s',
              outline: 'none',
            }}
            title="Logout"
          >
            {/* Ikon logout (SVG) */}
            <svg width="44" height="44" viewBox="0 0 32 32" fill="none">
              <path d="M20 24V26C20 27.1046 19.1046 28 18 28H8C6.89543 28 6 27.1046 6 26V6C6 4.89543 6.89543 4 8 4H18C19.1046 4 20 4.89543 20 6V8" stroke="#222" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M26 16L14 16" stroke="#222" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M22 12L26 16L22 20" stroke="#222" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ display: "flex", padding: 32, gap: 24, alignItems: 'flex-start' }}>
        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32, minWidth: 170 }}>
          <button onClick={handlePesanan} style={{ padding: "18px 0", width: 160, fontSize: 22, background: "#fff", border: "none", borderRadius: 12, boxShadow: "0 4px #7ba05b", color: "#4E342E", fontWeight: 500, marginBottom: 8, cursor: "pointer" }}>Pesanan</button>
          <button onClick={handleStokProduk} style={{ padding: "18px 0", width: 160, fontSize: 22, background: "#fff", border: "none", borderRadius: 12, boxShadow: "0 4px #7ba05b", color: "#4E342E", fontWeight: 500, cursor: "pointer" }}>Stok Produk</button>
        </div>

        {/* Dashboard Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 370px',
          gridTemplateRows: '140px 1fr 1fr',
          gap: 28,
          flex: 1,
          width: '100%',
          alignItems: 'stretch',
        }}>
          {/* Statistik Hari Ini */}
          <div style={{ background: "#4E342E", color: "#fff", borderRadius: 20, boxShadow: "0 6px #7ba05b", padding: 32, textAlign: 'left', gridColumn: '1/2', gridRow: '1/2', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: 22, marginBottom: 12 }}>Statistik hari ini</div>
            <div style={{ fontSize: 20, marginBottom: 4 }}>5 pesanan masuk</div>
            <div style={{ fontSize: 20 }}>Total Penjualan: Rp 500.000</div>
          </div>

          {/* Daftar Tugas Prioritas */}
          <div style={{ background: "#4E342E", color: "#fff", borderRadius: 20, boxShadow: "0 6px #7ba05b", padding: 32, textAlign: 'left', gridColumn: '2/3', gridRow: '1/2', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: 22, marginBottom: 12 }}>Daftar Tugas Prioritas</div>
            <ul style={{ fontSize: 18, margin: 0, paddingLeft: 20 }}>
              <li>Pesanan belum dikirim</li>
              <li>Stok produk segera habis</li>
              <li>3 pesanan baru</li>
            </ul>
          </div>

          {/* Grafik Penjualan */}
          <div style={{ background: "#4E342E", color: "#fff", borderRadius: 20, boxShadow: "0 6px #7ba05b", padding: 32, textAlign: 'left', gridColumn: '1/2', gridRow: '2/4', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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
          <div style={{ background: "#4E342E", color: "#fff", borderRadius: 20, boxShadow: "0 6px #7ba05b", padding: 32, textAlign: 'left', gridColumn: '2/3', gridRow: '2/3', minHeight: 120, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: 22, marginBottom: 12 }}>Panel Dampak Berkelanjutan</div>
            <ul style={{ fontSize: 18, margin: 0, paddingLeft: 20 }}>
              <li>Mengurangi Limbah Plastik</li>
              <li>Pemanfaatan Limbah Pertanian</li>
            </ul>
          </div>

          {/* Produk Terlaris Bulan Ini */}
          <div style={{ background: "#4E342E", color: "#fff", borderRadius: 20, boxShadow: "0 6px #7ba05b", padding: 32, textAlign: 'left', gridColumn: '2/3', gridRow: '3/4', minHeight: 120, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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