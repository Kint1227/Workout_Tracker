import React, { useState } from 'react';
import Hero from '../components/Hero';
import Carousel from '../components/Carousel';

const Blog = () => {
  const [email, setEmail] = useState('');

  const blogPosts = [
    {
      id: 1,
      title: '10 Essential Exercises for Beginners',
      excerpt: 'Start your fitness journey with these fundamental movements that build strength and confidence.',
      author: 'Alex Thompson',
      date: 'March 15, 2025',
      category: 'Training Tips',
      image: 'https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=400',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'Nutrition Myths Debunked',
      excerpt: 'Separate fact from fiction with these common nutrition misconceptions that might be holding you back.',
      author: 'Maria Rodriguez',
      date: 'March 12, 2025',
      category: 'Nutrition',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      readTime: '7 min read'
    },
    {
      id: 3,
      title: 'Building Mental Resilience Through Fitness',
      excerpt: 'Discover how regular exercise can improve your mental health and build psychological strength.',
      author: 'David Kim',
      date: 'March 10, 2025',
      category: 'Wellness',
      image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400',
      readTime: '6 min read'
    },
    {
      id: 4,
      title: 'The Science of Recovery',
      excerpt: 'Learn why rest days are crucial for progress and how to optimize your recovery for better results.',
      author: 'Sarah Williams',
      date: 'March 8, 2025',
      category: 'Recovery',
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400',
      readTime: '8 min read'
    },
    {
      id: 5,
      title: 'Home Workout Equipment Essentials',
      excerpt: 'Create an effective home gym on any budget with these versatile and space-efficient equipment picks.',
      author: 'Alex Thompson',
      date: 'March 5, 2025',
      category: 'Equipment',
      image: 'https://images.pexels.com/photos/4162451/pexels-photo-4162451.jpeg?auto=compress&cs=tinysrgb&w=400',
      readTime: '4 min read'
    },
    {
      id: 6,
      title: 'Meal Prep Strategies for Busy Professionals',
      excerpt: 'Save time and eat healthier with these practical meal preparation techniques and recipes.',
      author: 'Maria Rodriguez',
      date: 'March 3, 2025',
      category: 'Nutrition',
      image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
      readTime: '6 min read'
    }
  ];

  const featuredPosts = blogPosts.slice(0, 3);
  const recentPosts = blogPosts.slice(3);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
    setEmail('');
  };

  const createBlogCard = (post) => (
    <div className="card" style={{ height: '100%', overflow: 'hidden' }}>
      <img
        src={post.image}
        alt={post.title}
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover'
        }}
      />
      <div style={{ padding: '1.5rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.5rem'
        }}>
          <span style={{
            background: '#007bff',
            color: 'white',
            padding: '0.25rem 0.75rem',
            borderRadius: '15px',
            fontSize: '0.8rem',
            fontWeight: '600'
          }}>
            {post.category}
          </span>
          <span style={{ color: '#6c757d', fontSize: '0.9rem' }}>{post.readTime}</span>
        </div>
        
        <h3 style={{
          fontSize: '1.3rem',
          marginBottom: '0.75rem',
          color: '#2c3e50',
          lineHeight: '1.4'
        }}>
          {post.title}
        </h3>
        
        <p style={{
          color: '#6c757d',
          marginBottom: '1rem',
          lineHeight: '1.6',
          fontSize: '0.95rem'
        }}>
          {post.excerpt}
        </p>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '1rem',
          borderTop: '1px solid #e9ecef'
        }}>
          <div>
            <p style={{ 
              margin: 0, 
              fontWeight: '600', 
              color: '#495057',
              fontSize: '0.9rem'
            }}>
              {post.author}
            </p>
            <p style={{ 
              margin: 0, 
              color: '#6c757d',
              fontSize: '0.8rem'
            }}>
              {post.date}
            </p>
          </div>
          <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
            Read More
          </button>
        </div>
      </div>
    </div>
  );

  const featuredCards = featuredPosts.map(createBlogCard);

  const newsletterStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '4rem 2rem',
    borderRadius: '12px',
    textAlign: 'center',
    color: 'white',
    margin: '3rem 0'
  };

  const formStyle = {
    display: 'flex',
    gap: '1rem',
    maxWidth: '400px',
    margin: '2rem auto 0',
    flexWrap: 'wrap'
  };

  const inputStyle = {
    flex: 1,
    padding: '12px 16px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    minWidth: '200px'
  };

  return (
    <div>
      {/* Hero Section */}
      <Hero
        title="FitTrack Blog"
        subtitle="Expert insights, tips, and inspiration for your fitness journey"
        height="400px"
      />

      {/* Featured Posts Carousel */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Featured Articles</h2>
          <p className="section-subtitle">
            Our most popular and impactful content to help you reach your goals
          </p>
          <Carousel items={featuredCards} autoSlide={true} slideInterval={5000} />
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={newsletterStyle}>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem', fontWeight: '700' }}>
              Stay Updated
            </h2>
            <p style={{ fontSize: '1.1rem', marginBottom: 0, opacity: 0.9 }}>
              Get the latest fitness tips, workout routines, and nutrition advice delivered straight to your inbox
            </p>
            <form onSubmit={handleNewsletterSubmit} style={formStyle}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
                required
              />
              <button type="submit" className="btn btn-secondary" style={{ whiteSpace: 'nowrap' }}>
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="section" style={{ background: '#f8f9fa' }}>
        <div className="container">
          <h2 className="section-title">Recent Posts</h2>
          <p className="section-subtitle">
            Fresh content to keep you motivated and informed
          </p>
          <div className="grid grid-3">
            {recentPosts.map((post) => createBlogCard(post))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Browse by Category</h2>
          <div className="grid grid-4">
            {[
              { name: 'Training Tips', count: 15, icon: '💪', color: '#007bff' },
              { name: 'Nutrition', count: 12, icon: '🥗', color: '#28a745' },
              { name: 'Wellness', count: 8, icon: '🧘‍♀️', color: '#6f42c1' },
              { name: 'Recovery', count: 6, icon: '😴', color: '#20c997' }
            ].map((category, index) => (
              <div key={index} className="card" style={{ 
                padding: '2rem', 
                textAlign: 'center', 
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ 
                  fontSize: '3rem', 
                  marginBottom: '1rem',
                  filter: 'grayscale(20%)'
                }}>
                  {category.icon}
                </div>
                <h3 style={{ 
                  fontSize: '1.3rem', 
                  marginBottom: '0.5rem', 
                  color: category.color,
                  fontWeight: '600'
                }}>
                  {category.name}
                </h3>
                <p style={{ 
                  color: '#6c757d',
                  margin: 0,
                  fontSize: '0.9rem'
                }}>
                  {category.count} articles
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;