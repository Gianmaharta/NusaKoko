import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

// Komponen tombol kembali yang bisa dipakai ulang
const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/produk')}
      style={{
        display: 'inline-flex', // Menggunakan inline-flex agar ukurannya pas
        alignItems: 'center',
        gap: '8px',
        background: 'rgba(229, 214, 197, 0.2)', // Warna cream transparan
        border: '1px solid #E5D6C5',
        color: '#E5D6C5', // Warna teks cream
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        padding: '8px 16px',
        borderRadius: '20px', // Membuatnya melengkung
        marginBottom: '24px', // Memberi jarak ke konten di bawahnya
        transition: 'background 0.3s',
      }}
      // Efek hover sederhana
      onMouseOver={(e) => e.currentTarget.style.background = 'rgba(229, 214, 197, 0.4)'}
      onMouseOut={(e) => e.currentTarget.style.background = 'rgba(229, 214, 197, 0.2)'}
    >
      <ArrowLeftOutlined />
      Kembali ke Produk
    </button>
  );
};

export default BackButton;