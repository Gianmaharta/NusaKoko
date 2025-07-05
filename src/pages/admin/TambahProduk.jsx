import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProduk } from "../../context/ProdukContext";
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

const initialForm = {
  name: "",
  price: "",
  desc: "",
  sku: "",
  stock: "",
  image: null,
};

const TambahProduk = () => {
  const [form, setForm] = useState(initialForm);
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();
  const { addProduk } = useProduk();

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm((f) => ({ ...f, image: files[0] }));
      setFileName(files[0]?.name || "");
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Untuk demo, gambar tidak diupload, hanya simpan nama file
    addProduk({
      ...form,
      image: form.image ? URL.createObjectURL(form.image) : null,
      status: "Tersedia",
    });
    navigate("/admin/stok-produk");
  }

  return (
    <div style={{ minHeight: '100vh', background: '#e9dbc7', fontFamily: 'Inter, Arial, sans-serif', padding: 0 }}>
      {/* Navbar Admin */}
      <div style={{ width: '100%', background: '#7ba05b', minHeight: 100, display: 'flex', alignItems: 'center', borderBottom: '2.5px solid #4E342E' }}>
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
          <button style={{ padding: '18px 0', width: 160, fontSize: 22, background: '#fff', border: 'none', borderRadius: 12, boxShadow: '0 4px #7ba05b', color: '#4E342E', fontWeight: 500, marginBottom: 8, cursor: 'pointer' }} onClick={() => navigate('/admin/stok-produk')}>Pesanan</button>
          <button style={{ padding: '18px 0', width: 160, fontSize: 22, background: '#7ba05b', border: 'none', borderRadius: 12, boxShadow: '0 4px #7ba05b', color: '#fff', fontWeight: 500, cursor: 'pointer' }}>Stok Produk</button>
        </div>
        {/* Konten utama */}
        <div style={{ flex: 1, padding: '40px 32px 0 32px', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ background: '#4E342E', borderRadius: 18, padding: '36px 36px 48px 36px', color: '#fff', marginBottom: 32, marginTop: 0, width: '100%' }}>
            <div style={{ fontWeight: 700, fontSize: 36, marginBottom: 32 }}>Tambah Produk Baru</div>
            <form onSubmit={handleSubmit} style={{ background: '#e9dbc7', borderRadius: 32, padding: 36, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24, textAlign: 'left' }}>
                <label style={{ color: '#6d5c4a', fontSize: 20, marginBottom: 4, textAlign: 'left' }}>Nama Produk
                  <input name="name" value={form.name} onChange={handleChange} required style={{ width: '100%', fontSize: 20, borderRadius: 16, border: 'none', padding: '12px 18px', marginTop: 8, boxShadow: '2px 4px #4E342E22', outline: 'none', background: '#fff' }} />
                </label>
                <label style={{ color: '#6d5c4a', fontSize: 20, marginBottom: 4, textAlign: 'left' }}>Harga Jual
                  <input name="price" value={form.price} onChange={handleChange} required style={{ width: '100%', fontSize: 20, borderRadius: 16, border: 'none', padding: '12px 18px', marginTop: 8, boxShadow: '2px 4px #4E342E22', outline: 'none', background: '#fff' }} />
                </label>
                <label style={{ color: '#6d5c4a', fontSize: 20, marginBottom: 4, textAlign: 'left' }}>Deskripsi Produk
                  <textarea name="desc" value={form.desc} onChange={handleChange} required rows={7} style={{ width: '100%', fontSize: 20, borderRadius: 16, border: 'none', padding: '12px 18px', marginTop: 8, boxShadow: '2px 4px #4E342E22', outline: 'none', resize: 'vertical', minHeight: 120, background: '#fff' }} />
                </label>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24, textAlign: 'left' }}>
                <label style={{ color: '#6d5c4a', fontSize: 20, marginBottom: 4, textAlign: 'left' }}>Stok
                  <input name="stock" value={form.stock} onChange={handleChange} required type="number" min={0} style={{ width: '100%', fontSize: 20, borderRadius: 16, border: 'none', padding: '12px 18px', marginTop: 8, boxShadow: '2px 4px #4E342E22', outline: 'none', background: '#fff' }} />
                </label>
                <label style={{ color: '#6d5c4a', fontSize: 20, marginBottom: 4, textAlign: 'left' }}>SKU
                  <input name="sku" value={form.sku} onChange={handleChange} required style={{ width: '100%', fontSize: 20, borderRadius: 16, border: 'none', padding: '12px 18px', marginTop: 8, boxShadow: '2px 4px #4E342E22', outline: 'none', background: '#fff' }} />
                </label>
                <label style={{ color: '#6d5c4a', fontSize: 20, marginBottom: 4, textAlign: 'left' }}>Foto Produk
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
                    <input
                      id="file-upload"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleChange}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="file-upload" style={{
                      background: '#7ba05b',
                      color: '#4E342E',
                      fontWeight: 700,
                      fontSize: 22,
                      borderRadius: 12,
                      padding: '8px 24px',
                      cursor: 'pointer',
                      boxShadow: '2px 4px #4E342E22',
                      border: 'none',
                      display: 'inline-block',
                      transition: 'background 0.2s',
                    }}>
                      Choose File
                    </label>
                    <span style={{ fontSize: 18, color: '#4E342E' }}>{fileName || 'No file chosen'}</span>
                  </div>
                </label>
                <button type="submit" style={{ marginTop: 32, background: '#7ba05b', color: '#fff', fontWeight: 600, fontSize: 24, border: 'none', borderRadius: 16, padding: '16px 0', cursor: 'pointer', width: '100%' }}>Simpan Produk</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TambahProduk; 