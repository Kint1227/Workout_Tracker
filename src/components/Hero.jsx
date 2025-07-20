import React from 'react';

const Hero = ({ title, subtitle, backgroundImage, children, height = '500px' }) => {
  const heroStyle = {
    background: backgroundImage 
      ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`
      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: height,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textAlign: 'center',
    position: 'relative'
  };

  const contentStyle = {
    maxWidth: '800px',
    padding: '0 20px',
    zIndex: 2
  };

  const titleStyle = {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
  };

  const subtitleStyle = {
    fontSize: '1.3rem',
    marginBottom: '2rem',
    opacity: 0.9,
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)'
  };

  return (
    <section style={heroStyle}>
      <div style={contentStyle}>
        <h1 style={titleStyle}>{title}</h1>
        {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
        {children}
      </div>
    </section>
  );
};

export default Hero;