import React from 'react';
import Hero from '../components/Hero';
import ContactForm from '../components/ContactForm';
import Carousel from '../components/Carousel';

const Home = () => {
  const services = [
    {
      title: 'Personal Training',
      description: 'One-on-one coaching tailored to your specific goals and fitness level.',
      icon: '🏋️‍♂️'
    },
    {
      title: 'Group Classes',
      description: 'Fun, energetic group workouts that build community and motivation.',
      icon: '👥'
    },
    {
      title: 'Nutrition Coaching',
      description: 'Expert guidance on meal planning and healthy eating habits.',
      icon: '🥗'
    },
    {
      title: 'Online Programs',
      description: 'Flexible workout programs you can follow from anywhere.',
      icon: '💻'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      text: 'FitTrack transformed my fitness journey. I\'ve never been stronger or more confident!',
      rating: 5
    },
    {
      name: 'Mike Chen',
      text: 'The personal trainers are amazing. They helped me achieve goals I never thought possible.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      text: 'Love the group classes! Great energy and supportive community.',
      rating: 5
    }
  ];

  const serviceCards = services.map((service, index) => (
    <div key={index} className="card" style={{ padding: '2rem', textAlign: 'center', height: '100%' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{service.icon}</div>
      <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#2c3e50' }}>{service.title}</h3>
      <p style={{ color: '#6c757d', lineHeight: '1.6' }}>{service.description}</p>
    </div>
  ));

  const testimonialCards = testimonials.map((testimonial, index) => (
    <div key={index} className="card" style={{ padding: '2rem', textAlign: 'center', height: '100%' }}>
      <div style={{ fontSize: '2rem', marginBottom: '1rem', color: '#f39c12' }}>
        {'★'.repeat(testimonial.rating)}
      </div>
      <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', fontSize: '1.1rem', color: '#495057' }}>
        "{testimonial.text}"
      </p>
      <h4 style={{ color: '#2c3e50', fontWeight: '600' }}>- {testimonial.name}</h4>
    </div>
  ));

  const sellingPointStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    marginBottom: '3rem',
    padding: '2rem',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
  };

  const iconStyle = {
    fontSize: '4rem',
    minWidth: '80px'
  };

  const contentStyle = {
    flex: 1
  };

  return (
    <div>
      {/* Hero Section */}
      <Hero
        title="Transform Your Body, Transform Your Life"
        subtitle="Join thousands who have achieved their fitness goals with FitTrack's personalized training programs and expert guidance."
        height="600px"
      >
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#contact" className="btn btn-primary">Start Your Journey</a>
          <a href="/services" className="btn btn-outline">View Services</a>
        </div>
      </Hero>

      {/* Services Carousel */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Comprehensive fitness solutions designed to help you reach your goals
          </p>
          <Carousel items={serviceCards} autoSlide={true} slideInterval={3000} />
        </div>
      </section>

      {/* Key Selling Points */}
      <section className="section" style={{ background: '#f8f9fa' }}>
        <div className="container">
          <h2 className="section-title">Why Choose FitTrack?</h2>
          
          <div style={sellingPointStyle}>
            <div style={{ ...iconStyle, color: '#007bff' }}>🎯</div>
            <div style={contentStyle}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2c3e50' }}>
                Personalized Approach
              </h3>
              <p style={{ color: '#6c757d', fontSize: '1.1rem', lineHeight: '1.7' }}>
                Every workout plan is customized to your unique goals, fitness level, and lifestyle. 
                Our expert trainers work with you to create a program that fits your needs and ensures lasting results.
              </p>
            </div>
          </div>

          <div style={sellingPointStyle}>
            <div style={{ ...iconStyle, color: '#28a745' }}>📈</div>
            <div style={contentStyle}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2c3e50' }}>
                Proven Results
              </h3>
              <p style={{ color: '#6c757d', fontSize: '1.1rem', lineHeight: '1.7' }}>
                With over 10,000 successful transformations, our methods are time-tested and scientifically backed. 
                Track your progress with our advanced metrics and see real results in as little as 4 weeks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">
            Real stories from real people who transformed their lives with FitTrack
          </p>
          <Carousel items={testimonialCards} autoSlide={true} slideInterval={4000} />
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="section" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="container">
          <ContactForm />
        </div>
      </section>
    </div>
  );
};

export default Home;