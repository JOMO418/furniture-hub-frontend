import React, { useState, useEffect } from 'react';
import Button from '../../common/Button/Button';
import Badge from '../../common/Badge/Badge';
import { formatPrice, calculateDiscount } from '../../../utils/formatters';

const OfferOfTheDay = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  const offerProduct = {
    id: 2,
    name: "Milan Dining Table",
    price: 38000,
    salePrice: 32000,
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800",
    description: "Elegant solid wood dining table that seats 6 comfortably. Timeless design perfect for family gatherings."
  };

  const discount = calculateDiscount(offerProduct.price, offerProduct.salePrice);
  const endDate = new Date();
  endDate.setHours(23, 59, 59, 999);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endDate - new Date();
      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 md:py-20 bg-light-sand">
      <div className="container-custom">
        <div className="bg-pure-white rounded-2xl shadow-soft overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            
            <div className="relative aspect-[4/3] lg:aspect-auto">
              <img src={offerProduct.image} alt={offerProduct.name} className="w-full h-full object-cover" />
              <Badge variant="gold" size="lg" className="absolute top-4 right-4">
                Save {discount}%
              </Badge>
            </div>

            <div className="p-6 md:p-8 lg:p-12 flex flex-col justify-center">
              
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="text-xl">⚡</span>
                <Badge variant="gold">Today's Special</Badge>
              </div>

              <h3 className="font-serif text-3xl md:text-4xl text-soft-black mb-4">
                {offerProduct.name}
              </h3>

              <div className="flex items-center gap-4 mb-4">
                <span className="font-sans text-lg text-warm-gray line-through">
                  {formatPrice(offerProduct.price)}
                </span>
                <span className="font-sans text-3xl md:text-4xl font-bold text-soft-black">
                  {formatPrice(offerProduct.salePrice)}
                </span>
              </div>

              <p className="text-charcoal text-base leading-relaxed mb-6">
                {offerProduct.description}
              </p>

              <div className="mb-8">
                <p className="text-sm text-warm-gray mb-3 uppercase tracking-wide">Offer ends in:</p>
                <div className="flex gap-2 md:gap-3">
                  {['hours', 'minutes', 'seconds'].map((unit, index) => (
                    <React.Fragment key={unit}>
                      {index > 0 && <span className="text-2xl text-charcoal self-center">:</span>}
                      <div className="flex flex-col items-center">
                        <div className="bg-pure-white border border-border-color rounded px-3 py-2 md:px-4 md:py-3 min-w-[60px]">
                          <span className="font-sans font-bold text-2xl md:text-3xl text-soft-black">
                            {String(timeLeft[unit]).padStart(2, '0')}
                          </span>
                        </div>
                        <span className="text-xs text-warm-gray mt-1 uppercase tracking-wide">{unit}</span>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <Button variant="primary" size="lg" fullWidth onClick={() => window.location.href = `/product/milan-dining-table`}>
                Shop This Deal
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferOfTheDay;