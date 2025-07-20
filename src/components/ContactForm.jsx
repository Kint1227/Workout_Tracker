import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const formStyle = {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    margin: '0 auto'
  };

  const titleStyle = {
    fontSize: '1.8rem',
    marginBottom: '1.5rem',
    textAlign: 'center',
    color: '#2c3e50',
    fontWeight: '600'
  };

  return (
    <div style={formStyle}>
      <h3 style={titleStyle}>Get Started Today</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="form-textarea"
            placeholder="Tell us about your fitness goals..."
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;