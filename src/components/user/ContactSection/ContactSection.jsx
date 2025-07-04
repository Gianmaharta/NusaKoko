import React from 'react';
import { Typography } from 'antd';
import './ContactSection.css';
import ContactCard from './ContactCard';

import waIcon from '../../../assets/wa-business.png';
import igIcon from '../../../assets/instagram.png';
import emailIcon from '../../../assets/gmail.png';

const { Title, Paragraph } = Typography;

const ContactSection = () => {
  return (
    <section id="kontak-kami" className="contact-section">
      {/* Kotak krem pembungkus judul + teks */}
      <div className="contact-header-box">
        <Title level={1} className="contact-title">Kontak Kami</Title>
        <Paragraph className="contact-description">
          Punya pertanyaan, ide, atau ingin tahu lebih banyak tentang produk kami?
        </Paragraph>
        <Paragraph className="contact-description">
          Kami senang bisa membantu Anda. Jangan ragu untuk menghubungi tim NusaKoko melalui kontak di bawah ini.
        </Paragraph>
        <Paragraph className="contact-description">
          Setiap pertanyaan, kritik, maupun masukan Anda sangat berarti bagi kami dalam membangun masa depan yang lebih lestari.
        </Paragraph>
      </div>

      {/* Bungkus card dengan container agar sejajar dengan header box */}
        <div className="contact-card-wrapper">
            <div className="contact-card-container">
                <ContactCard title="WA Bussiness" icon={waIcon} link="https://wa.me/6281234567890" />
                <ContactCard title="Instagram" icon={igIcon} link="https://www.instagram.com/prabowo/" />
                <ContactCard title="Email" icon={emailIcon} link="mailto:nusakoko@gmail.com" />
            </div>
        </div>
    </section>
  );
};

export default ContactSection;
