// src/pages/user/Profile/ProfileUser.jsx
import React, { useState } from 'react';
import { Button, Upload, Typography, Layout, Card, Drawer, Input, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Navbar from '../../../components/user/Navbar';
import Footer from '../../../components/user/Footer';
import './ProfileUser.css';
import defaultProfileImage from '../../../assets/default-user.jpg';

const { Content } = Layout;
const { TextArea } = Input;
const { Title, Text } = Typography;

const ProfileUser = () => {
  const [imageUrl, setImageUrl] = useState(null);

  const [nama, setNama] = useState('Udin Suka Nasi Padang');
  const [alamat, setAlamat] = useState(
    'Jalan duren gang 7 no 21b kos guntur 21, banyuasri, singaraja, buleleng, bali. (kamar nomor 1), Buleleng, Kab. Buleleng, Bali.'
  );

  const [drawerNamaOpen, setDrawerNamaOpen] = useState(false);
  const [drawerAlamatOpen, setDrawerAlamatOpen] = useState(false);

  const [inputNama, setInputNama] = useState(nama);
  const [inputAlamat, setInputAlamat] = useState(alamat);

  const maxNamaLength = 40;

  const handleSaveNama = () => {
    if (inputNama.trim().length === 0) {
      message.error('Nama tidak boleh kosong.');
      return;
    }
    setNama(inputNama.trim());
    setDrawerNamaOpen(false);
  };

  const handleSaveAlamat = () => {
    if (inputAlamat.trim().length === 0) {
      message.error('Alamat tidak boleh kosong.');
      return;
    }
    setAlamat(inputAlamat.trim());
    setDrawerAlamatOpen(false);
  };

  const props = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isImage) {
        alert('Hanya gambar yang diperbolehkan!');
        return Upload.LIST_IGNORE;
      }
      if (!isLt10M) {
        alert('Ukuran file terlalu besar (maks 10MB)');
        return Upload.LIST_IGNORE;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
      return false;
    },
    showUploadList: false,
  };

  return (
    <Layout className="profile-layout">
      <Navbar />
      <Content className="profile-content">
        <div className="section-wrapper">
          <div className="section-container profile-card">
            <div className="profile-left">
              <Card
                hoverable
                style={{ width: 280, backgroundColor: '#49322C', borderRadius: 12 }}
                bodyStyle={{ padding: 16 }}
                cover={
                  <div style={{ padding: '12px 16px 0 16px' }}>
                    <img
                      alt="Foto Profil"
                      src={imageUrl || defaultProfileImage}
                      style={{
                        width: '100%',
                        height: 240,
                        objectFit: 'cover',
                        borderRadius: 12,
                      }}
                    />
                  </div>
                }
              >
                <Upload {...props}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ transform: 'scale(1.2)', transformOrigin: 'top center' }}>
                      <Button
                        icon={<UploadOutlined />}
                        style={{
                          backgroundColor: '#4E342E',
                          color: 'white',
                          marginTop: 4,
                          textAlign: 'center',
                        }}
                      >
                        Pilih Foto
                      </Button>
                    </div>
                  </div>
                </Upload>

                <Text
                  style={{
                    display: 'block',
                    fontSize: 12,
                    color: '#fff',
                    textAlign: 'justify',
                    marginTop: 24,
                  }}
                >
                  Besar file maksimum 10MB. Format: JPG, JPEG, PNG.
                </Text>
              </Card>
            </div>

            <div className="profile-right" style={{ textAlign: 'left', paddingTop: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Title
                  level={2}
                  className="profile-name"
                  style={{
                    fontSize: '28px',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 600,
                    color: '#4E342E',
                    marginBottom: 0,
                  }}
                >
                  {nama}
                </Title>
                <Button
                  className="edit-button"
                  onClick={() => {
                    setInputNama(nama);
                    setDrawerNamaOpen(true);
                  }}
                  style={{
                    width: '55px',
                    backgroundColor: '#4E342E',
                    color: '#fff',
                    fontSize: '14px',
                    borderRadius: '6px',
                  }}
                >
                  Ubah
                </Button>
              </div>

              <div className="info-item" style={{ marginTop: 24 }}>
                <div className="info-text">
                  <Text strong style={{ fontSize: '18px', fontFamily: 'Poppins, sans-serif' }}>
                    Alamat
                  </Text>
                  <p
                    style={{
                      fontSize: '16px',
                      fontFamily: 'Poppins, sans-serif',
                      textAlign: 'justify',
                      marginTop: '4px',
                    }}
                  >
                    {alamat}
                  </p>
                </div>
                <Button className="edit-button" onClick={() => {
                  setInputAlamat(alamat);
                  setDrawerAlamatOpen(true);
                }}>
                  Ubah
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Content>

      {/* Drawer Nama */}
      <Drawer
        title="Edit Nama"
        placement="right"
        onClose={() => setDrawerNamaOpen(false)}
        open={drawerNamaOpen}
        width={360}
        bodyStyle={{ backgroundColor: '#E8D8C3' }}
        headerStyle={{ backgroundColor: '#E8D8C3' }}
      >
        <p style={{
          fontSize: '14px',
          fontWeight: 600,
          fontFamily: 'Poppins, sans-serif',
          color: '#4E342E',
          marginBottom: '8px'
        }}>
          Masukkan nama lengkap Anda:
        </p>
        <Input
          value={inputNama}
          onChange={(e) => {
            if (e.target.value.length <= maxNamaLength) {
              setInputNama(e.target.value);
            }
          }}
          placeholder="Nama lengkap"
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '14px',
            color: '#4E342E',
            marginBottom: 12,
          }}
        />
        <Text style={{ fontSize: '12px', color: '#4E342E' }}>
          Maks. {maxNamaLength} karakter
        </Text>
        <Button
          onClick={handleSaveNama}
          style={{
            width: '100%',
            marginTop: 16,
            backgroundColor: '#4E342E',
            color: '#fff',
            border: 'none',
          }}
        >
          Simpan
        </Button>
      </Drawer>

      {/* Drawer Alamat */}
      <Drawer
        title="Edit Alamat"
        placement="right"
        onClose={() => setDrawerAlamatOpen(false)}
        open={drawerAlamatOpen}
        width={360}
        bodyStyle={{ backgroundColor: '#E8D8C3' }}
        headerStyle={{ backgroundColor: '#E8D8C3' }}
      >
        <p style={{
          fontSize: '14px',
          fontWeight: 600,
          fontFamily: 'Poppins, sans-serif',
          color: '#4E342E',
          marginBottom: 6
        }}>
          Masukkan alamat lengkap Anda:
        </p>
        <TextArea
          rows={4}
          value={inputAlamat}
          onChange={(e) => setInputAlamat(e.target.value)}
          placeholder="Alamat lengkap"
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '14px',
            color: '#4E342E',
            marginBottom: 20,
          }}
        />
        <Button
          onClick={handleSaveAlamat}
          style={{
            width: '100%',
            backgroundColor: '#4E342E',
            color: '#fff',
            border: 'none',
          }}
        >
          Simpan
        </Button>
      </Drawer>

      <Footer />
    </Layout>
  );
};

export default ProfileUser;
