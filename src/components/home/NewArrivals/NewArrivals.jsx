import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionTitle from '../../common/SectionTitle/SectionTitle';
import ProductCard from '../../products/ProductCard/ProductCard';
import Button from '../../common/Button/Button';
import Loader from '../../common/Loader/Loader';
import { productService } from '../../../services';

const NewArrivals = () => {
  const navigate = useNavigate();
  
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  const fetchNewArrivals = async () => {
    try {
      const products = await productService.getNewArrivals(6);
      setNewArrivals(products);
    } catch (err) {
      console.error('Failed to load new arrivals:', err);
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-12 md:py-20 bg-ivory">
        <div className="container-custom">
          <SectionTitle title="Just In" subtitle="Fresh from Our Showroom" />
          <div className="flex justify-center py-12">
            <Loader size="lg" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 md:py-20 bg-ivory">
        <div className="container-custom">
          <SectionTitle title="Just In" subtitle="Fresh from Our Showroom" />
          <div className="text-center py-12">
            <p className="text-warm-gray mb-4">{error}</p>
            <Button variant="secondary" onClick={fetchNewArrivals}>
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  if (newArrivals.length === 0) {
    return null; // Don't show section if no products
  }

  return (
    <section className="py-12 md:py-20 bg-ivory">
      <div className="container-custom">
        <SectionTitle title="Just In" subtitle="Fresh from Our Showroom" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {newArrivals.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Button variant="secondary" onClick={() => navigate('/shop?sort=-createdAt')}>
            See All New Arrivals
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;