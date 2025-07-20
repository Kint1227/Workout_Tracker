import React from 'react';

const Footer = () => {
  const footerStyle = {
    background: 'linear-gradient(135deg, #2c3e50, #34495e)',
    color: '#ecf0f1',
    padding: '3rem 0 1rem',
    marginTop: 'auto'
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  };

  const footerContentStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem'
  };

  const footerSectionStyle = {
    marginBottom: '1rem'
  };

  const footerTitleStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#3498db'
  };

  const footerLinkStyle = {
    color: '#bdc3c7',
    textDecoration: 'none',
    display: 'block',
    marginBottom: '0.5rem',
    transition: 'color 0.3s ease'
  };

  const bottomStyle = {
    borderTop: '1px solid #34495e',
    paddingTop: '1rem',
    textAlign: 'center',
    color: '#95a5a6'
  };

  const socialLinksStyle = {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem'
  };

  const socialLinkStyle = {
    color: '#3498db',
    fontSize: '1.5rem',
    textDecoration: 'none',
    transition: 'color 0.3s ease'
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={footerContentStyle}>
          <div style={footerSectionStyle}>
            <h3 style={footerTitleStyle}>FitTrack</h3>
            <p style={{ color: '#bdc3c7', marginBottom: '1rem' }}>
              Your ultimate fitness companion. Track workouts, achieve goals, and transform your life.
            </p>
            <div style={socialLinksStyle}>
              <a href="#" style={socialLinkStyle}>📘</a>
              <a href="#" style={socialLinkStyle}>📷</a>
              <a href="#" style={socialLinkStyle}>🐦</a>
              <a href="#" style={socialLinkStyle}>💼</a>
            </div>
          </div>
          
          <div style={footerSectionStyle}>
            <h3 style={footerTitleStyle}>Quick Links</h3>
            <a href="/" style={footerLinkStyle}>Home</a>
            <a href="/about" style={footerLinkStyle}>About Us</a>
            <a href="/services" style={footerLinkStyle}>Services</a>
            <a href="/blog" style={footerLinkStyle}>Blog</a>
          </div>
          
          <div style={footerSectionStyle}>
            <h3 style={footerTitleStyle}>Services</h3>
            <a href="#" style={footerLinkStyle}>Personal Training</a>
            <a href="#" style={footerLinkStyle}>Group Classes</a>
            <a href="#" style={footerLinkStyle}>Nutrition Coaching</a>
            <a href="#" style={footerLinkStyle}>Online Programs</a>
          </div>
          
          <div style={footerSectionStyle}>
            <h3 style={footerTitleStyle}>Contact Info</h3>
            <p style={{ color: '#bdc3c7', marginBottom: '0.5rem' }}>
              📍 123 Fitness Street, Workout City, WC 12345
            </p>
            <p style={{ color: '#bdc3c7', marginBottom: '0.5rem' }}>
              📞 (555) 123-4567
            </p>
            <p style={{ color: '#bdc3c7', marginBottom: '0.5rem' }}>
              ✉️ info@fittrack.com
            </p>
          </div>
        </div>
        
        <div style={bottomStyle}>
          <p>&copy; 2025 FitTrack. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;