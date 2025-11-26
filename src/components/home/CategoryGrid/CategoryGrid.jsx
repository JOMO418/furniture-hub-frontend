import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../../common/SectionTitle/SectionTitle';
import Loader from '../../common/Loader/Loader';
import Button from '../../common/Button/Button';
import { categoryService } from '../../../services';

const CategoryGrid = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (err) {
      console.error('Failed to load categories:', err);
      setError(err.message || 'Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-12 md:py-20 bg-ivory">
        <div className="container-custom">
          <SectionTitle title="Shop by Space" subtitle="Find the perfect pieces for every room" />
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
          <SectionTitle title="Shop by Space" subtitle="Find the perfect pieces for every room" />
          <div className="text-center py-12">
            <p className="text-warm-gray mb-4">{error}</p>
            <Button variant="secondary" onClick={fetchCategories}>
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return null; // Don't show section if no categories
  }

  return (
    <section className="py-12 md:py-20 bg-ivory">
      <div className="container-custom">
        <SectionTitle title="Shop by Space" subtitle="Find the perfect pieces for every room" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category) => (
            <Link
              key={category._id}
              to={`/category/${category.slug}`}
              className="group relative overflow-hidden rounded-lg aspect-[4/3] bg-light-sand"
            >
              <img
                src={category.image?.url || ''}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-soft-black/60 via-soft-black/20 to-transparent group-hover:from-soft-black/70 transition-all duration-300" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-serif text-xl md:text-2xl text-pure-white mb-1">
                  {category.name}
                </h3>
                <p className="text-pure-white/80 text-sm">{category.description}</p>
              </div>

              <div className="absolute inset-0 border-2 border-transparent group-hover:border-brushed-gold transition-all duration-300 pointer-events-none" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;