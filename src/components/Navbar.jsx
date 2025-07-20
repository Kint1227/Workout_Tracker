import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navStyle = {
    background: 'linear-gradient(135deg, #2c3e50, #34495e)',
    padding: '1rem 0',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const logoStyle = {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#fff',
    textDecoration: 'none'
  };

  const navLinksStyle = {
    display: 'flex',
    listStyle: 'none',
    gap: '2rem',
    margin: 0,
    padding: 0
  };

  const linkStyle = {
    color: '#ecf0f1',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'color 0.3s ease',
    padding: '0.5rem 1rem',
    borderRadius: '4px'
  };

  const activeLinkStyle = {
    ...linkStyle,
    color: '#3498db',
    background: 'rgba(52, 152, 219, 0.1)'
  };

  const mobileMenuStyle = {
    display: 'none',
    flexDirection: 'column',
    cursor: 'pointer'
  };

  const hamburgerLineStyle = {
    width: '25px',
    height: '3px',
    background: '#fff',
    margin: '3px 0',
    transition: '0.3s'
  };

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <Link to="/" style={logoStyle}>
          FitTrack
        </Link>
        
        <ul style={{
          ...navLinksStyle,
          ...(window.innerWidth <= 768 && isOpen ? {
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: '#2c3e50',
            flexDirection: 'column',
            padding: '1rem 0',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
          } : {}),
          ...(window.innerWidth <= 768 && !isOpen ? { display: 'none' } : {})
        }}>
          <li>
            <Link 
              to="/" 
              style={location.pathname === '/' ? activeLinkStyle : linkStyle}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              style={location.pathname === '/about' ? activeLinkStyle : linkStyle}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              to="/services" 
              style={location.pathname === '/services' ? activeLinkStyle : linkStyle}
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
          </li>
          <li>
            <Link 
              to="/blog" 
              style={location.pathname === '/blog' ? activeLinkStyle : linkStyle}
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
          </li>
        </ul>

        <div 
          style={{
            ...mobileMenuStyle,
            ...(window.innerWidth <= 768 ? { display: 'flex' } : {})
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div style={hamburgerLineStyle}></div>
          <div style={hamburgerLineStyle}></div>
          <div style={hamburgerLineStyle}></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;