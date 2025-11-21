import React from 'react';
import { useParams } from 'react-router-dom';
import SectionTitle from '../../components/common/SectionTitle/SectionTitle';
import ProductGrid from '../../components/products/ProductGrid/ProductGrid';
import { getProductsByCategory } from '../../data/mockProducts';
import { categories } from '../../data/categories';

const CategoryPage = () => {
  const { slug } = useParams();
  const products = getProductsByCategory(slug);
  const category = categories.find(c => c.slug === slug);

  if (!category) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="font-serif text-4xl text-soft-black mb-4">Category Not Found</h1>
        <p className="text-warm-gray">This category doesn't exist.</p>
      </div>
    );
  }

  return (
    <section className="py-12 md:py-20 bg-ivory min-h-screen">
      <div className="container-custom">
        
        <div className="mb-12">
          <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-soft-black/70 via-soft-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h1 className="font-serif text-4xl md:text-5xl text-pure-white mb-2">
                {category.name}
              </h1>
              <p className="text-pure-white/90 text-lg">
                {category.description}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-warm-gray">
            Showing <span className="font-semibold text-charcoal">{products.length}</span> products
          </p>
        </div>

        <ProductGrid products={products} />
      </div>
    </section>
  );
};

export default CategoryPage;