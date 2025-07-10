import React, { useState, useEffect } from 'react';
import { Button, Upload, Typography, Layout, Card, Drawer, Input, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import defaultProfileImage from '../../../assets/default-user.jpg';
import { userAPI } from '../../../services/apiService';
import './ProfileAdmin.css';
import BackButton from '../../../components/user/BackButton';

const { Content } = Layout;
const { TextArea } = Input;
const { Title, Text } = Typography;

const ProfileAdmin = () => {
  const [api, contextHolder] = notification.useNotification();

  const [imageUrl, setImageUrl] = useState(null);
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [alamat, setAlamat] = useState('');

  const [drawerNamaOpen, setDrawerNamaOpen] = useState(false);
  const [drawerAlamatOpen, setDrawerAlamatOpen] = useState(false);
  const [drawerEmailOpen, setDrawerEmailOpen] = useState(false);

  const [inputNama, setInputNama] = useState(nama);
  const [inputAlamat, setInputAlamat] = useState(alamat);
  const [inputEmail, setInputEmail] = useState(email);

  const maxNamaLength = 40;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await userAPI.getProfile();
        setNama(data.username || '');
        setEmail(data.email || '');
        setAlamat(data.address || '');
        setImageUrl(data.profile_photo_url || null);
      } catch (err) {
        api.error({
          message: 'Gagal Mengambil Profil',
          description: 'Terjadi kesalahan saat memuat data profil Anda.',
          placement: 'topRight',
        });
      }
    };
    fetchProfile();
  }, [api]);

  const handleSaveNama = async () => {
    if (inputNama.trim().length === 0) {
      api.error({ message: 'Nama tidak boleh kosong.', placement: 'topRight' });
      return;
    }
    try {
      await userAPI.updateProfile({ username: inputNama });
      setNama(inputNama.trim());
      setDrawerNamaOpen(false);
      api.success({ message: 'Nama berhasil diupdate!', placement: 'topRight' });
    } catch (err) {
      api.error({ message: 'Gagal update nama', description: err.response?.data?.error || 'Silakan coba lagi.', placement: 'topRight' });
    }
  };

  const handleSaveAlamat = async () => {
    if (inputAlamat.trim().length === 0) {
      api.error({ message: 'Alamat tidak boleh kosong.', placement: 'topRight' });
      return;
    }
    try {
      await userAPI.updateProfile({ address: inputAlamat });
      setAlamat(inputAlamat.trim());
      setDrawerAlamatOpen(false);
      api.success({ message: 'Alamat berhasil diupdate!', placement: 'topRight' });
    } catch (err) {
      api.error({ message: 'Gagal update alamat', description: err.response?.data?.error || 'Silakan coba lagi.', placement: 'topRight' });
    }
  };

  const handleSaveEmail = async () => {
    if (!inputEmail.includes('@') || inputEmail.trim().length === 0) {
      api.error({ message: 'Format email tidak valid', placement: 'topRight' });
      return;
    }
    try {
      await userAPI.updateProfile({ email: inputEmail });
      setEmail(inputEmail.trim());
      setDrawerEmailOpen(false);
      api.success({ message: 'Email berhasil diupdate!', placement: 'topRight' });
    } catch (err) {
      api.error({ message: 'Gagal update email', description: err.response?.data?.error || 'Silakan coba lagi.', placement: 'topRight' });
    }
  };

  const props = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isImage) {
        api.error({ message: 'Hanya file gambar yang diperbolehkan!', placement: 'topRight' });
        return Upload.LIST_IGNORE;
      }
      if (!isLt10M) {
        api.error({ message: 'Ukuran file terlalu besar (maks 10MB)', placement: 'topRight' });
        return Upload.LIST_IGNORE;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setProfilePhotoFile(file);
      handleUploadPhoto(file);
      return false;
    },
    showUploadList: false,
  };

  const handleUploadPhoto = async (file) => {
    try {
      await userAPI.updateProfile({ profile_photo: file });
      api.success({ message: 'Foto profil berhasil diupdate!', placement: 'topRight' });
    } catch (err) {
      api.error({ message: 'Gagal update foto profil', placement: 'topRight' });
    }
  };

  return (
    <Layout className="profile-layout">
      {contextHolder}
      <Content className="profile-content">
        <div style={{ 
          maxWidth: '1200px',
          margin: '0 6.5vw',
          width: '90%',
          textAlign: 'left'
        }}>
          <BackButton label="Kembali" />
        </div>
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
                    Email
                  </Text>
                  <p
                    style={{
                      fontSize: '16px',
                      fontFamily: 'Poppins, sans-serif',
                      textAlign: 'justify',
                      marginTop: '4px',
                    }}
                  >
                    {email}
                  </p>
                </div>
                <Button className="edit-button" onClick={() => {
                  setInputEmail(email);
                  setDrawerEmailOpen(true);
                }}>
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
      {/* Drawer Email */}
      <Drawer
        title="Edit Email"
        placement="right"
        onClose={() => setDrawerEmailOpen(false)}
        open={drawerEmailOpen}
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
          Masukkan email Anda:
        </p>
        <Input
          value={inputEmail}
          onChange={(e) => setInputEmail(e.target.value)}
          placeholder="Email"
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '14px',
            color: '#4E342E',
            marginBottom: 20,
          }}
        />
        <Button
          onClick={handleSaveEmail}
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
    </Layout>
  );
};

export default ProfileAdmin; 