import React from 'react';
import { Typography } from 'antd';
import aboutLogo from '../../../assets/logo-nusakoko.png';
import './AboutSection.css'; // Pastikan kamu sudah buat file CSS-nya

const { Paragraph } = Typography;

const AboutSection = () => {
  return (
    <div className="about-section-container">
      <img src={aboutLogo} alt="NusaKoko Logo" className="about-logo" />

      <div className="about-text-container">
        <Paragraph className="about-paragraph">
          Di balik setiap produk NusaKoko, tersembunyi kisah sederhana namun kuat:
          kisah tentang alam, masyarakat lokal, dan masa depan yang lebih lestari.
        </Paragraph>
        <Paragraph className="about-paragraph">
          Kami adalah platform e-commerce yang lahir dari kecintaan pada bumi dan
          komitmen untuk memberdayakan potensi lokal. Berbasis di Bali, kami mengolah
          limbah serabut kelapa — yang selama ini sering terbuang sia-sia — menjadi
          produk bioplastik inovatif, fungsional, dan ramah lingkungan.
        </Paragraph>
      </div>
    </div>
  );
};

export default AboutSection;
