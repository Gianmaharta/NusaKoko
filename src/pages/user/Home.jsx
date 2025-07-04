import React, { useState } from 'react';
import './Home.css';
import { Layout, Typography, FloatButton, Row, Col } from 'antd';

import Navbar from '../../components/user/Navbar';
import Footer from '../../components/user/Footer';
import ContactSection from '../../components/user/ContactSection/ContactSection';
import ProductCardHorizontal from '../../components/user/ProductCardHorizontal';
import ProductCard from '../../components/user/Product/ProductCard'; // komponen produk vertikal
import ProductList from '../../components/user/Product/ProductList';
import AboutSection from '../../components/user/AboutSection/AboutSection';


import dashboardImage from '../../assets/dashboard-image.png';
import bagImage from '../../assets/bag.png';
import bowlImage from '../../assets/bowl.png';
import mangkokImage from '../../assets/mangkok.png';
import foodPlasticImage from '../../assets/food-plastic.png';



const { Content } = Layout;
const { Title, Paragraph } = Typography;

const dummyProducts = [
  {
    id: 1,
    title: 'Kantong Plastik',
    price: '10.000',
    image: bagImage,
  },
  {
    id: 2,
    title: 'Plastik Makanan',
    price: '8.000',
    image: foodPlasticImage,
  },
  {
    id: 3,
    title: 'Mangkok Plastik',
    price: '15.000',
    image: bowlImage,
  },
  {
    id: 1,
    title: 'Kantong Plastik',
    price: '10.000',
    image: bagImage,
  },
  {
    id: 2,
    title: 'Plastik Makanan',
    price: '8.000',
    image: foodPlasticImage,
  },
  {
    id: 3,
    title: 'Mangkok Plastik',
    price: '15.000',
    image: bowlImage,
  },
  {
    id: 1,
    title: 'Kantong Plastik',
    price: '10.000',
    image: bagImage,
  },
  {
    id: 2,
    title: 'Plastik Makanan',
    price: '8.000',
    image: foodPlasticImage,
  },
  {
    id: 3,
    title: 'Mangkok Plastik',
    price: '15.000',
    image: bowlImage,
  },
  {
    id: 1,
    title: 'Kantong Plastik',
    price: '10.000',
    image: bagImage,
  },
  {
    id: 2,
    title: 'Plastik Makanan',
    price: '8.000',
    image: foodPlasticImage,
  },
  {
    id: 3,
    title: 'Mangkok Plastik',
    price: '15.000',
    image: bowlImage,
  },
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      {/* Tombol Scroll ke Atas */}
      <FloatButton.BackTop
        visibilityHeight={300}
        style={{
          right: 24,
          bottom: 24,
          backgroundColor: '#8B5E3C',
          color: '#fff',
        }}
      />

      <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar onSearch={setSearchQuery} />

        <Content style={{ padding: 0, backgroundColor: '#4E342E' }}>
          {/* Banner */}
          <div style={{ width: '100%', paddingTop: 8 }}>
            <img
              src={dashboardImage}
              alt="Banner"
              style={{
                width: '100%',
                maxWidth: '900px',
                height: 'auto',
                display: 'block',
                margin: '0 auto',
              }}
            />
          </div>


          {/* Konten Utama */}
          <div style={{ padding: '36px' }}>
            {/* === Tentang Produk === */}
            <div className="section-wrapper">
              <section id="tentang-produk" className="section-container section-scroll-margin" style={{ marginTop: '-12px' }}>
                <Title level={2} className="section-title">Tentang Produk</Title>

                <ProductCardHorizontal
                  imageSrc={mangkokImage}
                  title="Mangkok Serabut Kelapa NusaKoko"
                  description="Mangkok Serabut Kelapa dari NusaKoko adalah jawaban kami untuk kebutuhan wadah makanan yang tidak hanya praktis, tetapi juga berkontribusi bagi kelestarian bumi. Terbuat dari campuran bioplastik dan serabut kelapa alami, mangkok ini hadir dengan desain modern, kuat, dan tentu saja ramah lingkungan."
                />
                <ProductCardHorizontal
                  imageSrc={mangkokImage}
                  title="Mangkok Serabut Kelapa NusaKoko"
                  description="Mangkok Serabut Kelapa dari NusaKoko adalah jawaban kami untuk kebutuhan wadah makanan yang tidak hanya praktis, tetapi juga berkontribusi bagi kelestarian bumi. Terbuat dari campuran bioplastik dan serabut kelapa alami, mangkok ini hadir dengan desain modern, kuat, dan tentu saja ramah lingkungan."
                />
                <ProductCardHorizontal
                  imageSrc={mangkokImage}
                  title="Mangkok Serabut Kelapa NusaKoko"
                  description="Mangkok Serabut Kelapa dari NusaKoko adalah jawaban kami untuk kebutuhan wadah makanan yang tidak hanya praktis, tetapi juga berkontribusi bagi kelestarian bumi. Terbuat dari campuran bioplastik dan serabut kelapa alami, mangkok ini hadir dengan desain modern, kuat, dan tentu saja ramah lingkungan."
                />
              </section>
            </div>

            {/* === Pembelian === */}
            <div className="section-wrapper">
              <section id="pembelian" className="section-container-pembelian section-scroll-margin">
                <Title level={2} className="section-title">Produk NusaKoko</Title>

                <ProductList products={dummyProducts} />

                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                  <button
                    style={{
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      padding: '10px 24px',
                      borderRadius: '24px',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '16px',
                    }}
                  >
                    View All →
                  </button>
                </div>
              </section>
            </div>

            <div className="section-wrapper">
              <section id="kontak-kami" className="section-scroll-margin">
                <ContactSection />
              </section>
            </div>


            {/* === Tentang Kami === */}
            <div className="section-wrapper" style={{ marginTop: '150px', marginBottom: '80px'}}>
              <section id="tentang-kami" className="section-scroll-margin">
                <AboutSection />
              </section>
            </div>


          </div>
        </Content>

        <Footer />
      </Layout>
    </>
  );
};

export default Home;
