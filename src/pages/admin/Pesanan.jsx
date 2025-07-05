import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoNusaKoko from "../../assets/logo-nusakoko.png";

const hariIndo = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const bulanIndo = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
function getTanggalIndo() {
  const now = new Date();
  const hari = hariIndo[now.getDay()];
  const tanggal = now.getDate().toString().padStart(2, '0');
  const bulan = bulanIndo[now.getMonth()];
  return `${hari}, ${tanggal} ${bulan}`;
}

const dummyPesanan = [
  {
    id: "NKK-250702-003",
    tanggal: "02-07-2025",
    pelanggan: "Dede Mahendra",
    produk: "Mangkok Plastik",
    total: "Rp. 45.000,00",
    statusPembayaran: "Lunas",
    statusPesanan: "Menunggu Proses",
    resi: "JN231334546"
  }
];

const Pesanan = () => {
  const navigate = useNavigate();
  const [pesanan, setPesanan] = useState(dummyPesanan);
  const [dropdownIdx, setDropdownIdx] = useState(null);

  const handleStatusUpdate = (idx, status) => {
    setPesanan(prev => prev.map((p, i) => i === idx ? { ...p, statusPesanan: status } : p));
    setDropdownIdx(null);
    // Simpan status ke localStorage
    localStorage.setItem('statusPesananTerakhir', status);
  };

  function handleLogout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <div style={{ minHeight: "100vh", background: "#e9dbc7", fontFamily: 'Inter, Arial, sans-serif', width: '100vw', overflowX: 'hidden' }}>
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
          <button style={{ padding: '18px 0', width: 160, fontSize: 22, background: '#7ba05b', border: 'none', borderRadius: 12, boxShadow: '0 4px #7ba05b', color: '#fff', fontWeight: 500, cursor: 'pointer' }}>Pesanan</button>
          <button onClick={() => navigate("/admin/stok-produk") } style={{ padding: '18px 0', width: 160, fontSize: 22, background: '#fff', border: 'none', borderRadius: 12, boxShadow: '0 4px #7ba05b', color: '#4E342E', fontWeight: 500, cursor: 'pointer' }}>Stok Produk</button>
        </div>
        {/* Panel utama pesanan */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', minHeight: 'calc(100vh - 100px)', padding: '24px 0 0 0', background: 'none', width: '100%', margin: 0, paddingRight: 32 }}>
          <div style={{ width: '100%', background: '#4E342E', borderRadius: 0, boxShadow: 'none', padding: '48px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 520 }}>
            {/* Search Bar */}
            <div style={{ width: '96%', background: '#e9dbc7', borderRadius: 20, padding: '18px 0', marginBottom: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(99,54,4,0.06)' }}>
              <div style={{ width: '60%', position: 'relative' }}>
                <input type="text" placeholder="Cari pesanan..." style={{ width: '100%', padding: '14px 22px', borderRadius: 18, border: 'none', fontSize: 22, background: '#4E342E', color: '#fff', outline: 'none', fontWeight: 400 }} />
                <span style={{ position: 'absolute', right: 18, top: '50%', transform: 'translateY(-50%)', color: '#fff', pointerEvents: 'none' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="#fff" strokeWidth="2.5"/><path d="M20 20L16.65 16.65" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/></svg>
                </span>
              </div>
            </div>
            {/* Table */}
            <div style={{ width: '96%', background: 'transparent', borderRadius: 16, padding: 0, overflow: 'hidden', minHeight: 340 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16, background: 'none' }}>
                <thead>
                  <tr style={{ background: '#e9dbc7', color: '#4E342E', fontWeight: 700 }}>
                    <th style={{ padding: '16px 8px', borderRight: '2px solid #4E342E', borderBottom: '2px solid #4E342E', borderTopLeftRadius: 10 }}>ID Pesanan</th>
                    <th style={{ padding: '16px 8px', borderRight: '2px solid #4E342E', borderBottom: '2px solid #4E342E' }}>Tanggal</th>
                    <th style={{ padding: '16px 8px', borderRight: '2px solid #4E342E', borderBottom: '2px solid #4E342E' }}>Pelanggan</th>
                    <th style={{ padding: '16px 8px', borderRight: '2px solid #4E342E', borderBottom: '2px solid #4E342E' }}>Produk</th>
                    <th style={{ padding: '16px 8px', borderRight: '2px solid #4E342E', borderBottom: '2px solid #4E342E' }}>Total Bayar</th>
                    <th style={{ padding: '16px 8px', borderRight: '2px solid #4E342E', borderBottom: '2px solid #4E342E' }}>Status Pembayaran</th>
                    <th style={{ padding: '16px 8px', borderRight: '2px solid #4E342E', borderBottom: '2px solid #4E342E' }}>Status Pesanan</th>
                    <th style={{ padding: '16px 8px', borderBottom: '2px solid #4E342E', borderTopRightRadius: 10 }}>Tindakan</th>
                  </tr>
                </thead>
                <tbody>
                  {pesanan.map((p, idx) => (
                    <tr key={p.id} style={{ background: '#e9dbc7', color: '#4E342E', fontWeight: 500 }}>
                      <td style={{ padding: '14px 8px', borderRight: '2px solid #4E342E', borderBottom: '1.5px solid #4E342E', textAlign: 'left' }}>{p.id}</td>
                      <td style={{ padding: '14px 8px', borderRight: '2px solid #4E342E', borderBottom: '1.5px solid #4E342E', textAlign: 'left' }}>{p.tanggal}</td>
                      <td style={{ padding: '14px 8px', borderRight: '2px solid #4E342E', borderBottom: '1.5px solid #4E342E', textAlign: 'left' }}>{p.pelanggan}</td>
                      <td style={{ padding: '14px 8px', borderRight: '2px solid #4E342E', borderBottom: '1.5px solid #4E342E', textAlign: 'left' }}>{p.produk}</td>
                      <td style={{ padding: '14px 8px', borderRight: '2px solid #4E342E', borderBottom: '1.5px solid #4E342E', textAlign: 'left' }}>{p.total}</td>
                      <td style={{ padding: '14px 8px', borderRight: '2px solid #4E342E', borderBottom: '1.5px solid #4E342E', textAlign: 'left' }}>{p.statusPembayaran}</td>
                      <td style={{ padding: '14px 8px', borderRight: '2px solid #4E342E', borderBottom: '1.5px solid #4E342E', textAlign: 'left' }}>{p.statusPesanan}</td>
                      <td style={{ padding: '14px 8px', borderBottom: '1.5px solid #4E342E', textAlign: 'left' }}>
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                          <button style={{ background: '#7ba05b', border: 'none', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} title="Edit Status" onClick={() => setDropdownIdx(dropdownIdx === idx ? null : idx)}>
                            {/* Ikon pensil */}
                            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" style={{ position: 'absolute' }}>
                              <path d="M14.7 7.1C15.1 6.7 15.1 6.1 14.7 5.7L14.3 5.3C13.9 4.9 13.3 4.9 12.9 5.3L12.1 6.1L13.9 7.9L14.7 7.1Z" stroke="#fff" strokeWidth="1.5"/>
                              <path d="M6 14H7.5L13.1 8.4C13.3 8.2 13.3 7.9 13.1 7.7L12.3 6.9C12.1 6.7 11.8 6.7 11.6 6.9L6 12.5V14Z" stroke="#fff" strokeWidth="1.5"/>
                            </svg>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <rect width="20" height="20" rx="4" fill="#7ba05b"/>
                              <path d="M6 14H7.5L13.1 8.4C13.3 8.2 13.3 7.9 13.1 7.7L12.3 6.9C12.1 6.7 11.8 6.7 11.6 6.9L6 12.5V14ZM14.7 7.1C15.1 6.7 15.1 6.1 14.7 5.7L14.3 5.3C13.9 4.9 13.3 4.9 12.9 5.3L12.1 6.1L13.9 7.9L14.7 7.1Z" fill="#fff"/>
                            </svg>
                          </button>
                          {dropdownIdx === idx && (
                            <div style={{ position: 'absolute', top: 40, left: 0, background: '#7ba05b', borderRadius: 8, boxShadow: '0 2px 8px rgba(99,54,4,0.10)', minWidth: 140, zIndex: 10, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                              {['Diproses', 'Kirim Pesanan', 'Batalkan'].map(opt => (
                                <button key={opt} onClick={() => handleStatusUpdate(idx, opt)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 16, padding: '12px 18px', textAlign: 'left', cursor: 'pointer', borderBottom: opt !== 'Batalkan' ? '1px solid #e9dbc7' : 'none', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background='#68994c'} onMouseOut={e => e.currentTarget.style.background='none'}>
                                  {opt}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        <button
                          style={{ marginLeft: 8, background: '#4E342E', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 12px', cursor: 'pointer' }}
                          onClick={() => navigate('/informasi-pesanan')}
                        >
                          Lihat Detail
                        </button>
                        <span style={{ color: '#4E342E', fontWeight: 500, fontSize: 16, marginLeft: 8 }}>No. Resi : {p.resi}</span>
                      </td>
                    </tr>
                  ))}
                  {/* Baris kosong untuk layout */}
                  {[...Array(4)].map((_, i) => (
                    <tr key={i} style={{ background: '#e9dbc7', height: 60 }}>
                      <td style={{ borderRight: '2px solid #4E342E', borderBottom: i === 3 ? '1.5px solid #4E342E' : 'none', borderBottomLeftRadius: i === 3 ? 12 : 0 }}></td>
                      <td style={{ borderRight: '2px solid #4E342E', borderBottom: i === 3 ? '1.5px solid #4E342E' : 'none' }}></td>
                      <td style={{ borderRight: '2px solid #4E342E', borderBottom: i === 3 ? '1.5px solid #4E342E' : 'none' }}></td>
                      <td style={{ borderRight: '2px solid #4E342E', borderBottom: i === 3 ? '1.5px solid #4E342E' : 'none' }}></td>
                      <td style={{ borderRight: '2px solid #4E342E', borderBottom: i === 3 ? '1.5px solid #4E342E' : 'none' }}></td>
                      <td style={{ borderRight: '2px solid #4E342E', borderBottom: i === 3 ? '1.5px solid #4E342E' : 'none' }}></td>
                      <td style={{ borderRight: '2px solid #4E342E', borderBottom: i === 3 ? '1.5px solid #4E342E' : 'none' }}></td>
                      <td style={{ borderBottom: i === 3 ? '1.5px solid #4E342E' : 'none', borderBottomRightRadius: i === 3 ? 12 : 0 }}></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pesanan; 