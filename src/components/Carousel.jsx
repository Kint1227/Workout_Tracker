import React, { useState, useEffect } from 'react';

const Carousel = ({ items, autoSlide = true, slideInterval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (autoSlide && items.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === items.length - 1 ? 0 : prevIndex + 1
        );
      }, slideInterval);

      return () => clearInterval(interval);
    }
  }, [autoSlide, slideInterval, items.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? items.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === items.length - 1 ? 0 : currentIndex + 1);
  };

  const carouselStyle = {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
  };

  const slidesContainerStyle = {
    display: 'flex',
    transform: `translateX(-${currentIndex * 100}%)`,
    transition: 'transform 0.5s ease-in-out'
  };

  const slideStyle = {
    minWidth: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const navButtonStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(255, 255, 255, 0.9)',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    zIndex: 2
  };

  const dotsContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '15px'
  };

  const dotStyle = {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  if (!items || items.length === 0) {
    return <div>No items to display</div>;
  }

  return (
    <div>
      <div style={carouselStyle}>
        <button 
          style={{ ...navButtonStyle, left: '10px' }}
          onClick={goToPrevious}
          onMouseEnter={(e) => e.target.style.background = 'white'}
          onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.9)'}
        >
          ❮
        </button>
        
        <div style={slidesContainerStyle}>
          {items.map((item, index) => (
            <div key={index} style={slideStyle}>
              {item}
            </div>
          ))}
        </div>
        
        <button 
          style={{ ...navButtonStyle, right: '10px' }}
          onClick={goToNext}
          onMouseEnter={(e) => e.target.style.background = 'white'}
          onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.9)'}
        >
          ❯
        </button>
      </div>
      
      {items.length > 1 && (
        <div style={dotsContainerStyle}>
          {items.map((_, index) => (
            <button
              key={index}
              style={{
                ...dotStyle,
                background: index === currentIndex ? '#007bff' : '#ddd'
              }}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;