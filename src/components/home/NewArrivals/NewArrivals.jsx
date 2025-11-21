import React from 'react';
import SectionTitle from '../../common/SectionTitle/SectionTitle';
import ProductCard from '../../products/ProductCard/ProductCard';
import Button from '../../common/Button/Button';
import { getNewArrivals } from '../../../data/mockProducts';

const NewArrivals = () => {
  const newArrivals = getNewArrivals().slice(0, 6);

  return (
    <section className="py-12 md:py-20 bg-ivory">
      <div className="container-custom">
        <SectionTitle title="Just In" subtitle="Fresh from Our Showroom" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Button variant="secondary" onClick={() => window.location.href = '/shop?filter=new'}>
            See All New Arrivals
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;