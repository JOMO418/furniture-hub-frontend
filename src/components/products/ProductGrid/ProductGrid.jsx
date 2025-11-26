import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import Loader from '../../common/Loader/Loader';

const ProductGrid = ({ products, loading = false }) => {
  if (loading) {
    return (
      <div className="py-20">
        <Loader size="lg" color="navy" />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="py-20 text-center">
        <svg className="w-24 h-24 text-warm-gray mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <h3 className="font-serif text-2xl text-charcoal mb-2">No products found</h3>
        <p className="text-warm-gray">Try adjusting your filters or browse all products</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;