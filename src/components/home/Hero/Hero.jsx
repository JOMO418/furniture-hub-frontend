import React, { useState, useEffect } from 'react';
import Button from '../../common/Button/Button';

// Import your images from assets
import hero1 from '../../../assets/images/hero1.jpg';
import hero2 from '../../../assets/images/hero2.jpg';
import hero3 from '../../../assets/images/hero3.jpg';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: hero1,
      alt: 'Modern living room furniture'
    },
    {
      image: hero2,
      alt: 'Elegant dining collection'
    },
    {
      image: hero3,
      alt: 'Contemporary bedroom sets'
    }
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      
      {/* Carousel Background */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-soft-black/20" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-pure-white mb-4 md:mb-6 drop-shadow-lg">
          Furniture Hub
        </h1>
        <p className="font-sans text-lg md:text-xl lg:text-2xl text-pure-white/90 mb-8 md:mb-12 tracking-wide drop-shadow">
          Where Art Meets Function
        </p>
        <Button variant="primary" size="lg" onClick={() => window.location.href = '/shop'}>
          Explore Collection
        </Button>
      </div>

      {/* Elegant Carousel Indicators */}
      <div className="absolute bottom-24 md:bottom-20 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 rounded-full transition-all duration-500 ${
              index === currentSlide 
                ? 'w-8 bg-pure-white' 
                : 'w-1 bg-pure-white/40 hover:bg-pure-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-pure-white/80 hover:text-pure-white transition-colors"
        aria-label="Scroll to content"
      >
        <span className="text-sm tracking-wider hidden md:block">Scroll to explore</span>
        <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>
    </section>
  );
};

export default Hero;