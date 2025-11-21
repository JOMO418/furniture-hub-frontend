import React from 'react';
import SectionTitle from '../../common/SectionTitle/SectionTitle';

const ShopByStyle = () => {
  const styles = [
    { name: 'Modern', slug: 'modern', icon: '🏢' },
    { name: 'Classic', slug: 'classic', icon: '👑' },
    { name: 'Minimalist', slug: 'minimalist', icon: '⚪' },
    { name: 'Rustic', slug: 'rustic', icon: '🪵' },
    { name: 'Industrial', slug: 'industrial', icon: '⚙️' },
    { name: 'Scandinavian', slug: 'scandinavian', icon: '❄️' }
  ];

  return (
    <section className="py-12 md:py-16 bg-pure-white">
      <div className="container-custom">
        <SectionTitle 
          title="Find Your Style"
          subtitle="Discover furniture that matches your aesthetic"
        />

        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {styles.map((style) => (
            <button
              key={style.slug}
              onClick={() => window.location.href = `/shop?style=${style.slug}`}
              className="group px-6 py-3 md:px-8 md:py-4 bg-ivory border-2 border-border-color rounded-full hover:border-deep-navy hover:bg-light-sand transition-all duration-300 flex items-center gap-2"
            >
              <span className="text-xl md:text-2xl group-hover:scale-110 transition-transform">
                {style.icon}
              </span>
              <span className="font-sans text-sm md:text-base font-medium text-charcoal group-hover:text-deep-navy">
                {style.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByStyle;