import React from 'react';
import { Card, Typography } from 'antd';
import './ContactSection.css';

const { Paragraph } = Typography;

const ContactCard = ({ title, icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer" className="contact-card-link">
    <Card
      hoverable
      className="contact-card"
      styles={{ body: { textAlign: 'center', padding: '24px 16px' } }}
    >
      <img src={icon} alt={title} style={{ width: 64, marginBottom: 16 }} />
      <Paragraph className="contact-card-title">{title}</Paragraph>
    </Card>
  </a>
);

export default ContactCard;
