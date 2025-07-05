import React from "react";
import { useProduk } from "../../context/ProdukContext";
import logoNusaKoko from "../../assets/logo-nusakoko.png";
import { useNavigate } from "react-router-dom";

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

const StokProduk = () => {
  const { produk } = useProduk();
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', background: '#e9dbc7', fontFamily: 'Inter, Arial, sans-serif', padding: 0 }}>
      {/* Navbar Admin */}
      <div style={{ width: '100%', background: '#7ba05b', padding: '0 0 0 0', minHeight: 100, display: 'flex', alignItems: 'center', borderBottom: '2.5px solid #4E342E' }}>
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
      {/* Layout utama: sidebar dan konten */}
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 100px)' }}>
        {/* Sidebar */}
        <div style={{ width: 180, background: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 40, gap: 24 }}>
          <button onClick={() => navigate('/admin/pesanan')} style={{ padding: '18px 0', width: 160, fontSize: 22, background: '#fff', border: 'none', borderRadius: 12, boxShadow: '0 4px #7ba05b', color: '#4E342E', fontWeight: 500, marginBottom: 8, cursor: 'pointer' }}>Pesanan</button>
          <button style={{ padding: '18px 0', width: 160, fontSize: 22, background: '#7ba05b', border: 'none', borderRadius: 12, boxShadow: '0 4px #7ba05b', color: '#fff', fontWeight: 500, cursor: 'pointer' }}>Stok Produk</button>
        </div>
        {/* Konten utama */}
        <div style={{ flex: 1, padding: '40px 32px 0 32px', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Card utama */}
          <div style={{ background: '#4E342E', borderRadius: 18, padding: 28, color: '#fff', marginBottom: 32, marginTop: 0, width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 24 }}>
              <button 
                style={{ background: '#7ba05b', color: '#fff', fontWeight: 600, fontSize: 22, border: 'none', borderRadius: 10, padding: '12px 32px', cursor: 'pointer' }}
                onClick={() => navigate('/admin/tambah-produk')}
              >
                + Tambah Produk Baru
              </button>
              <div style={{ flex: 1 }} />
              <div style={{ background: '#e9dbc7', borderRadius: 10, display: 'flex', alignItems: 'center', padding: '0 18px', height: 48 }}>
                <input placeholder="Cari produk..." style={{ background: 'transparent', border: 'none', color: '#4E342E', fontSize: 18, outline: 'none', width: 220 }} />
                <svg width="22" height="22" fill="#4E342E" viewBox="0 0 24 24"><path d="M21 21l-4.35-4.35m2.1-5.4a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" stroke="#4E342E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
            {/* Tabel produk */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', background: 'none', color: '#4E342E', fontSize: 18, borderRadius: 12, overflow: 'hidden' }}>
                <thead>
                  <tr style={{ background: '#e9dbc7', color: '#4E342E' }}>
                    <th style={{ padding: 12, border: '1px solid #4E342E' }}>ID</th>
                    <th style={{ padding: 12, border: '1px solid #4E342E' }}>Gambar</th>
                    <th style={{ padding: 12, border: '1px solid #4E342E' }}>Nama Produk</th>
                    <th style={{ padding: 12, border: '1px solid #4E342E' }}>Deskripsi</th>
                    <th style={{ padding: 12, border: '1px solid #4E342E' }}>SKU</th>
                    <th style={{ padding: 12, border: '1px solid #4E342E' }}>Harga Jual</th>
                    <th style={{ padding: 12, border: '1px solid #4E342E' }}>Stok</th>
                    <th style={{ padding: 12, border: '1px solid #4E342E' }}>Status</th>
                    <th style={{ padding: 12, border: '1px solid #4E342E' }}>Tindakan</th>
                  </tr>
                </thead>
                <tbody>
                  {produk.map((p, i) => (
                    <tr key={p.id} style={{ background: i % 2 === 0 ? '#f5e7d6' : '#e9dbc7' }}>
                      <td style={{ padding: 10, border: '1px solid #4E342E', textAlign: 'left' }}>{p.id}</td>
                      <td style={{ padding: 10, border: '1px solid #4E342E', textAlign: 'center' }}>
                        <div style={{ width: 60, height: 60, borderRadius: 12, background: '#7ba05b', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                          <img src={p.image} alt={p.name} style={{ width: 44, height: 44, objectFit: 'contain' }} />
                        </div>
                      </td>
                      <td style={{ padding: 10, border: '1px solid #4E342E', textAlign: 'left' }}>{p.name}</td>
                      <td style={{ padding: 10, border: '1px solid #4E342E', textAlign: 'left' }}>{p.desc}</td>
                      <td style={{ padding: 10, border: '1px solid #4E342E', textAlign: 'left' }}>{p.sku}</td>
                      <td style={{ padding: 10, border: '1px solid #4E342E', textAlign: 'left' }}>{p.price}</td>
                      <td style={{ padding: 10, border: '1px solid #4E342E', textAlign: 'left' }}>{p.stock}</td>
                      <td style={{ padding: 10, border: '1px solid #4E342E', textAlign: 'left' }}>{p.status}</td>
                      <td style={{ padding: 10, border: '1px solid #4E342E', textAlign: 'center', minWidth: 90 }}>
                        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                          {/* Tombol Edit */}
                          <button style={{ background: '#7ba05b', border: 'none', borderRadius: 12, width: 48, height: 48, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: 0 }} title="Edit">
                            {/* Ikon pensil outline diagonal */}
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                              <path d="M22.5 10.5L21.5 9.5L9 22V25H12L24.5 12.5L22.5 10.5Z" stroke="#fff" strokeWidth="2.5" strokeLinejoin="round"/>
                              <path d="M20.5 8.5L23.5 11.5" stroke="#fff" strokeWidth="2.5" strokeLinejoin="round"/>
                            </svg>
                          </button>
                          {/* Tombol Delete */}
                          <button style={{ background: '#e53935', border: 'none', borderRadius: 12, width: 48, height: 48, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: 0 }} title="Hapus">
                            {/* Ikon trash custom */}
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                              <rect x="8" y="13" width="16" height="12" rx="2.5" stroke="#fff" strokeWidth="2.5" fill="none" />
                              <rect x="12" y="17" width="2.5" height="6" rx="1.25" fill="#fff" />
                              <rect x="17.5" y="17" width="2.5" height="6" rx="1.25" fill="#fff" />
                              <rect x="6" y="9" width="20" height="4" rx="2" fill="#fff" />
                              <rect x="13" y="5" width="6" height="2.5" rx="1.25" fill="#fff" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {/* Baris kosong untuk contoh */}
                  <tr style={{ background: '#f5e7d6' }}>
                    <td colSpan={9} style={{ height: 60, border: '1px solid #4E342E' }}></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StokProduk; 