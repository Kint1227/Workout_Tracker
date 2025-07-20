import React from 'react';
import Hero from '../components/Hero';
import Carousel from '../components/Carousel';

const About = () => {
  const teamMembers = [
    {
      name: 'Alex Thompson',
      role: 'Head Trainer & Founder',
      bio: 'Certified personal trainer with 15+ years of experience in fitness and nutrition.',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Maria Rodriguez',
      role: 'Nutrition Specialist',
      bio: 'Licensed nutritionist helping clients develop healthy eating habits for life.',
      image: 'https://images.pexels.com/photos/3760707/pexels-photo-3760707.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'David Kim',
      role: 'Strength Coach',
      bio: 'Former athlete specializing in strength training and sports performance.',
      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Sarah Williams',
      role: 'Yoga Instructor',
      bio: 'Certified yoga instructor bringing mindfulness and flexibility to your routine.',
      image: 'https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const teamCards = teamMembers.map((member, index) => (
    <div key={index} className="card" style={{ padding: '1.5rem', textAlign: 'center', height: '100%' }}>
      <img
        src={member.image}
        alt={member.name}
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          objectFit: 'cover',
          margin: '0 auto 1.5rem',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
        }}
      />
      <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: '#2c3e50' }}>{member.name}</h3>
      <p style={{ color: '#007bff', fontWeight: '600', marginBottom: '1rem' }}>{member.role}</p>
      <p style={{ color: '#6c757d', lineHeight: '1.6' }}>{member.bio}</p>
    </div>
  ));

  const sectionStyle = {
    padding: '4rem 2rem',
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center'
  };

  const cardStyle = {
    background: 'white',
    padding: '3rem',
    borderRadius: '12px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
    marginBottom: '3rem'
  };

  const headingStyle = {
    fontSize: '2.2rem',
    color: '#2c3e50',
    marginBottom: '1.5rem',
    fontWeight: '700'
  };

  const textStyle = {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    color: '#495057',
    marginBottom: '1.5rem'
  };

  return (
    <div>
      {/* Hero Section */}
      <Hero
        title="About FitTrack"
        subtitle="Empowering individuals to achieve their fitness goals through personalized training and unwavering support."
        height="400px"
      />

      {/* Mission */}
      <section className="section">
        <div style={sectionStyle}>
          <div style={cardStyle}>
            <h2 style={headingStyle}>Our Mission</h2>
            <p style={textStyle}>
              At FitTrack, we believe that fitness is not just about physical transformation – it's about 
              building confidence, creating healthy habits, and improving overall quality of life. Our mission 
              is to provide personalized, science-based fitness solutions that empower individuals to reach 
              their full potential.
            </p>
            <p style={textStyle}>
              We strive to create an inclusive environment where everyone feels supported, motivated, and 
              equipped with the tools they need to succeed on their fitness journey.
            </p>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="section" style={{ background: '#f8f9fa' }}>
        <div style={sectionStyle}>
          <div style={cardStyle}>
            <h2 style={headingStyle}>Our Vision</h2>
            <p style={textStyle}>
              We envision a world where fitness is accessible, enjoyable, and sustainable for everyone. 
              Through innovative training methods, cutting-edge technology, and compassionate coaching, 
              we aim to become the leading fitness platform that transforms lives globally.
            </p>
            <p style={textStyle}>
              Our vision extends beyond individual transformation – we want to build healthier communities 
              and inspire a generation that prioritizes wellness and active living.
            </p>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="section">
        <div style={sectionStyle}>
          <div style={cardStyle}>
            <h2 style={headingStyle}>Our Story</h2>
            <p style={textStyle}>
              Founded in 2018 by fitness enthusiast Alex Thompson, FitTrack began as a small personal 
              training studio with a simple goal: to make professional fitness coaching accessible to everyone. 
              What started with just one trainer and a handful of clients has grown into a comprehensive 
              fitness platform serving thousands worldwide.
            </p>
            <p style={textStyle}>
              Over the years, we've expanded our services to include nutrition coaching, group classes, 
              and online programs, always staying true to our core principle of personalized, results-driven fitness.
            </p>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
              gap: '2rem', 
              marginTop: '2rem' 
            }}>
              <div>
                <h3 style={{ fontSize: '2.5rem', color: '#007bff', margin: 0 }}>10K+</h3>
                <p style={{ margin: 0, color: '#6c757d' }}>Happy Clients</p>
              </div>
              <div>
                <h3 style={{ fontSize: '2.5rem', color: '#28a745', margin: 0 }}>500K+</h3>
                <p style={{ margin: 0, color: '#6c757d' }}>Workouts Completed</p>
              </div>
              <div>
                <h3 style={{ fontSize: '2.5rem', color: '#dc3545', margin: 0 }}>98%</h3>
                <p style={{ margin: 0, color: '#6c757d' }}>Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section" style={{ background: '#f8f9fa' }}>
        <div className="container">
          <h2 className="section-title">Meet Our Team</h2>
          <p className="section-subtitle">
            Our experienced trainers and specialists are here to guide you every step of the way
          </p>
          <Carousel items={teamCards} autoSlide={true} slideInterval={5000} />
        </div>
      </section>
    </div>
  );
};

export default About;