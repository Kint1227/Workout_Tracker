import React, { useState } from 'react';
import Hero from '../components/Hero';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [openFAQ, setOpenFAQ] = useState(null);

  const services = [
    {
      id: 1,
      title: 'Personal Training',
      price: '$75/session',
      description: 'One-on-one coaching tailored to your specific goals',
      features: ['Customized workout plans', 'Form correction', 'Progress tracking', 'Nutrition guidance'],
      icon: '🏋️‍♂️',
      fullDescription: 'Our personal training service provides you with dedicated one-on-one attention from certified fitness professionals. Each session is carefully designed around your unique goals, current fitness level, and any physical limitations or preferences you may have.',
      benefits: [
        'Personalized workout routines designed specifically for your goals',
        'Proper form instruction to prevent injury and maximize results',
        'Ongoing support and motivation to keep you accountable',
        'Flexible scheduling to fit your busy lifestyle',
        'Regular progress assessments and plan adjustments'
      ]
    },
    {
      id: 2,
      title: 'Group Classes',
      price: '$25/class',
      description: 'Fun, energetic group workouts that build community',
      features: ['Various class types', 'All fitness levels', 'Social atmosphere', 'Expert instruction'],
      icon: '👥',
      fullDescription: 'Join our dynamic group fitness classes where motivation meets community. Our diverse class offerings ensure there\'s something for everyone, from high-intensity intervals to mind-body practices.',
      benefits: [
        'Wide variety of class types including HIIT, yoga, pilates, and dance',
        'Motivating group atmosphere that pushes you to do your best',
        'Cost-effective way to access professional instruction',
        'Meet like-minded individuals and build lasting friendships',
        'Classes designed for all fitness levels with modifications available'
      ]
    },
    {
      id: 3,
      title: 'Nutrition Coaching',
      price: '$60/session',
      description: 'Expert guidance on meal planning and healthy eating',
      features: ['Meal planning', 'Dietary analysis', 'Supplement guidance', 'Lifestyle integration'],
      icon: '🥗',
      fullDescription: 'Transform your relationship with food through our comprehensive nutrition coaching program. Our certified nutritionists work with you to develop sustainable eating habits that support your fitness goals and overall health.',
      benefits: [
        'Personalized meal plans based on your preferences and goals',
        'Education about macronutrients and portion control',
        'Strategies for dining out and social eating situations',
        'Supplement recommendations when appropriate',
        'Ongoing support for building lasting healthy habits'
      ]
    },
    {
      id: 4,
      title: 'Online Programs',
      price: '$29/month',
      description: 'Flexible workout programs you can follow anywhere',
      features: ['Video workouts', 'Progress tracking', '24/7 access', 'Mobile app'],
      icon: '💻',
      fullDescription: 'Access professional-quality workouts from anywhere with our comprehensive online program. Perfect for busy schedules, travel, or those who prefer working out at home.',
      benefits: [
        'Extensive library of workout videos for all fitness levels',
        'Structured programs designed by certified trainers',
        'Progress tracking and analytics to monitor improvement',
        'Community support through online forums and challenges',
        'Mobile app for convenient access on any device'
      ]
    }
  ];

  const faqs = [
    {
      question: 'What should I bring to my first session?',
      answer: 'Bring comfortable workout clothes, athletic shoes, a water bottle, and a towel. If you have any medical conditions or injuries, please bring relevant documentation.'
    },
    {
      question: 'How often should I train?',
      answer: 'This depends on your goals and current fitness level. Generally, 2-3 sessions per week is ideal for beginners, while more experienced individuals might benefit from 4-5 sessions.'
    },
    {
      question: 'Do you offer package deals?',
      answer: 'Yes! We offer various package options that provide significant savings. Contact us to learn about our monthly packages and long-term training programs.'
    },
    {
      question: 'Can I try a class before committing?',
      answer: 'Absolutely! We offer a free trial class for new members. This allows you to experience our training style and facility before making a commitment.'
    },
    {
      question: 'What if I need to cancel or reschedule?',
      answer: 'We require 24-hour notice for cancellations or rescheduling to avoid charges. We understand life happens and try to be as flexible as possible.'
    },
    {
      question: 'Do you provide nutrition guidance?',
      answer: 'Yes! All our trainers can provide basic nutrition guidance, and we also have certified nutritionists available for more comprehensive meal planning and dietary counseling.'
    }
  ];

  const cardStyle = {
    background: 'white',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  };

  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  };

  const modalContentStyle = {
    background: 'white',
    borderRadius: '12px',
    padding: '2rem',
    maxWidth: '600px',
    maxHeight: '80vh',
    overflow: 'auto',
    position: 'relative'
  };

  const faqItemStyle = {
    border: '1px solid #e9ecef',
    borderRadius: '8px',
    marginBottom: '1rem',
    overflow: 'hidden'
  };

  const faqQuestionStyle = {
    background: '#f8f9fa',
    padding: '1rem 1.5rem',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: '600',
    color: '#2c3e50'
  };

  const faqAnswerStyle = {
    padding: '1rem 1.5rem',
    background: 'white',
    color: '#6c757d',
    lineHeight: '1.6'
  };

  return (
    <div>
      {/* Hero Section */}
      <Hero
        title="Our Services"
        subtitle="Comprehensive fitness solutions designed to help you achieve your goals"
        height="400px"
      />

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            {services.map((service) => (
              <div
                key={service.id}
                style={cardStyle}
                onClick={() => setSelectedService(service)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{service.icon}</div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#2c3e50' }}>
                  {service.title}
                </h3>
                <p style={{ color: '#007bff', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '1rem' }}>
                  {service.price}
                </p>
                <p style={{ color: '#6c757d', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                  {service.description}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, marginTop: 'auto' }}>
                  {service.features.map((feature, index) => (
                    <li key={index} style={{ marginBottom: '0.5rem', color: '#495057' }}>
                      ✓ {feature}
                    </li>
                  ))}
                </ul>
                <button className="btn btn-primary" style={{ marginTop: '1.5rem', width: '100%' }}>
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section" style={{ background: '#f8f9fa' }}>
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Get answers to common questions about our services and policies
          </p>
          
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {faqs.map((faq, index) => (
              <div key={index} style={faqItemStyle}>
                <div
                  style={faqQuestionStyle}
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  <span>{faq.question}</span>
                  <span style={{ 
                    transform: openFAQ === index ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                  }}>
                    ▼
                  </span>
                </div>
                {openFAQ === index && (
                  <div style={faqAnswerStyle}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      {selectedService && (
        <div style={modalStyle} onClick={() => setSelectedService(null)}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <button
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#6c757d'
              }}
              onClick={() => setSelectedService(null)}
            >
              ✕
            </button>
            
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{selectedService.icon}</div>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#2c3e50' }}>
              {selectedService.title}
            </h2>
            <p style={{ color: '#007bff', fontWeight: 'bold', fontSize: '1.3rem', marginBottom: '1.5rem' }}>
              {selectedService.price}
            </p>
            
            <p style={{ color: '#495057', marginBottom: '2rem', lineHeight: '1.7' }}>
              {selectedService.fullDescription}
            </p>
            
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#2c3e50' }}>
              What's Included:
            </h3>
            <ul style={{ marginBottom: '2rem', paddingLeft: '1rem' }}>
              {selectedService.benefits.map((benefit, index) => (
                <li key={index} style={{ marginBottom: '0.5rem', color: '#495057', lineHeight: '1.5' }}>
                  {benefit}
                </li>
              ))}
            </ul>
            
            <button className="btn btn-primary" style={{ width: '100%' }}>
              Get Started
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;