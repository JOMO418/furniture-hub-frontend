import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionTitle from '../../common/SectionTitle/SectionTitle';
import ProductCard from '../../products/ProductCard/ProductCard';
import Button from '../../common/Button/Button';
import Loader from '../../common/Loader/Loader';
import { productService } from '../../../services';

const BestSellers = () => {
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();
  
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBestSellers();
  }, []);

  const fetchBestSellers = async () => {
    try {
      const products = await productService.getBestSellers(8);
      setBestSellers(products);
    } catch (err) {
      console.error('Failed to load best sellers:', err);
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = direction === 'left' ? -400 : 400;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <section className="py-12 md:py-20 bg-pure-white">
        <div className="container-custom">
          <SectionTitle title="Best Sellers" subtitle="What Our Customers Love" />
          <div className="flex justify-center py-12">
            <Loader size="lg" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 md:py-20 bg-pure-white">
        <div className="container-custom">
          <SectionTitle title="Best Sellers" subtitle="What Our Customers Love" />
          <div className="text-center py-12">
            <p className="text-warm-gray mb-4">{error}</p>
            <Button variant="secondary" onClick={fetchBestSellers}>
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  if (bestSellers.length === 0) {
    return null; // Don't show section if no products
  }

  return (
    <section className="py-12 md:py-20 bg-pure-white">
      <div className="container-custom">
        <SectionTitle title="Best Sellers" subtitle="What Our Customers Love" />

        <div className="relative">
          
          <button
            onClick={() => scroll('left')}
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 w-12 h-12 items-center justify-center bg-pure-white rounded-full shadow-elevated hover:bg-light-sand transition-all"
            aria-label="Previous products"
          >
            <svg className="w-6 h-6 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => scroll('right')}
            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 w-12 h-12 items-center justify-center bg-pure-white rounded-full shadow-elevated hover:bg-light-sand transition-all"
            aria-label="Next products"
          >
            <svg className="w-6 h-6 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {bestSellers.map((product) => (
              <div key={product._id} className="flex-none w-[280px] md:w-[320px] snap-start">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <Button variant="secondary" onClick={() => navigate('/shop?sort=-sales')}>
            View All Best Sellers
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;