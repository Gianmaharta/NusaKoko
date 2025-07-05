import React from 'react';
import Navbar from '../../components/user/Navbar';
import Footer from '../../components/user/Footer';

export default function InformasiPesanan() {
  // Ambil status pesanan dari localStorage
  const statusPesanan = localStorage.getItem('statusPesananTerakhir') || 'Menunggu Proses';
  const statusToStep = {
    'Menunggu Proses': 0,
    'Diproses': 1,
    'Kirim Pesanan': 2,
    'Batalkan': 3,
  };
  const activeStep = statusToStep[statusPesanan] ?? 0;

  // DEKLARASIKAN isBatal SEBELUM steps
  const isBatal = statusPesanan === 'Batalkan';

  const steps = [
    {
      label: 'Dikemas',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none"><rect x="3" y="7" width="18" height="10" rx="2" stroke="#fff" strokeWidth="2.5"/><path d="M3 7l9 5 9-5" stroke="#fff" strokeWidth="2.5"/></svg>
      ),
    },
    {
      label: 'Menunggu Kurir',
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ display: 'block', margin: '0 auto' }}>
          {/* Ikon kurir duduk di box */}
          <circle cx="20" cy="20" r="20" fill="none" />
          <g>
            <rect x="15" y="26" width="10" height="6" rx="2" stroke="#fff" strokeWidth="2.5" fill="none" />
            <circle cx="20" cy="18" r="4" stroke="#fff" strokeWidth="2.5" fill="none" />
            <rect x="18" y="22" width="4" height="4" rx="2" stroke="#fff" strokeWidth="2.5" fill="none" />
          </g>
        </svg>
      ),
    },
    {
      label: 'Dikirim',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none"><rect x="3" y="10" width="13" height="7" rx="2" stroke="#fff" strokeWidth="2.5"/><rect x="16" y="13" width="5" height="4" rx="1.5" stroke="#fff" strokeWidth="2.5"/><circle cx="7.5" cy="19" r="2" stroke="#fff" strokeWidth="2.5"/><circle cx="18.5" cy="19" r="2" stroke="#fff" strokeWidth="2.5"/></svg>
      ),
    },
    {
      label: isBatal ? 'Dibatalkan' : 'Sampai',
      icon: isBatal ? (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="18" stroke="#e53935" strokeWidth="3.5" fill="none" />
          <path d="M14 14L26 26" stroke="#e53935" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M26 14L14 26" stroke="#e53935" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" stroke="#fff" strokeWidth="3.5" fill="none" /><path d="M13 21l5 5 9-11" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      ),
      isBatal: isBatal,
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#4E342E', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 1, padding: '0 0 40px 0', background: '#4E342E' }}>
        <div style={{ padding: '48px 0 0 0', maxWidth: 1200, margin: '0 auto' }}>
          <h1 style={{ color: 'white', fontWeight: 700, fontSize: 40, marginBottom: 32, textAlign: 'center' }}>Informasi Pesanan</h1>
          <div style={{ background: '#E5D6C5', borderRadius: 16, padding: '32px 40px', marginBottom: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 32, color: '#5B4036', marginBottom: 8 }}>Status Pesanan</div>
              <div style={{ color: isBatal ? '#e53935' : '#5B4036', fontSize: 28, textAlign: 'left' }}>{isBatal ? 'Dibatalkan' : statusPesanan}</div>
            </div>
            <div style={{ color: '#5B4036', fontSize: 22, fontWeight: 500 }}>Estimasi Tiba : 3 Hari</div>
          </div>
          <div style={{ background: '#E5D6C5', borderRadius: 16, padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '100%', maxWidth: 900, margin: '0 auto', position: 'relative', minHeight: 140, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              {/* Garis stepper di bawah step, proporsional */}
              <div style={{
                position: 'absolute',
                top: '40%', // atau top: 44, dst
                left: 60,
                right: 60,
                height: 6,
                background: 'none',
                zIndex: 0,
                display: 'flex',
                alignItems: 'center',
                transform: 'translateY(-50%)',
              }}>
                {steps.map((step, idx) => idx < steps.length - 1 && (
                  <div
                    key={idx}
                    style={{
                      flex: 1,
                      height: 6,
                      background: idx < activeStep ? '#fff' : '#222',
                      marginLeft: idx === 0 ? 40 : 0,
                      marginRight: idx === steps.length - 2 ? 40 : 0,
                      borderRadius: 3,
                      transition: 'background 0.3s',
                    }}
                  />
                ))}
              </div>
              {/* Stepper item */}
              <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1, marginTop: 0 }}>
                {steps.map((step, idx) => (
                  <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 120, justifyContent: 'flex-start' }}>
                    <div style={{
                      position: 'relative',
                      width: 92,
                      height: 92,
                      marginBottom: 8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {/* Frame bulat putih tebal untuk semua step yang sudah dilalui (idx <= activeStep) */}
                      {(idx <= activeStep) && (
                        <div style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: 92,
                          height: 92,
                          borderRadius: '50%',
                          border: '6px solid #fff',
                          background: 'transparent',
                          zIndex: 2,
                          pointerEvents: 'none',
                        }} />
                      )}
                      <div style={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        background: step.isBatal ? '#e53935' : '#6BA368',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxSizing: 'border-box',
                        zIndex: 3,
                        position: 'relative',
                      }}>
                        {step.icon}
                      </div>
                    </div>
                    <div style={{ color: step.isBatal ? '#e53935' : '#5B4036', fontWeight: 700, fontSize: 20, textAlign: 'center' }}>{step.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
} 