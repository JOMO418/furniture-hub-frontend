import React from 'react';
import Button from '../../components/common/Button/Button';

const AboutPage = () => {
  const stats = [
    { number: '5000+', label: 'Happy Customers' },
    { number: '3000+', label: 'Furniture Pieces Sold' },
    { number: '24/7', label: 'Customer Support' },
    { number: '100%', label: 'Quality Guaranteed' }
  ];

  const values = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      title: 'Quality First',
      description: 'Every piece carefully curated for lasting beauty and durability'
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Fast Delivery',
      description: 'Quick delivery across Nairobi and beyond, right to your doorstep'
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Fair Prices',
      description: 'Premium furniture at prices that make sense for every Kenyan home'
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Happy Customers',
      description: 'Your satisfaction is our pride. We don\'t rest until you smile'
    }
  ];

  return (
    <div className="bg-ivory">
      
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1920&q=80"
            alt="Furniture Hub Store"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-soft-black/60 via-soft-black/40 to-soft-black/60" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="font-serif text-4xl md:text-6xl text-pure-white mb-4">
            Where Art Meets Function
          </h1>
          <p className="text-lg md:text-xl text-pure-white/90 mb-8">
            Transforming Kenyan homes, one beautiful piece at a time
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            
            <div>
              <span className="inline-block px-4 py-2 bg-brushed-gold/10 text-brushed-gold text-sm font-semibold rounded-full mb-6">
                Our Story
              </span>
              
              <h2 className="font-serif text-3xl md:text-5xl text-soft-black mb-6">
                Making Beautiful Homes Accessible to Every Kenyan
              </h2>
              
              <div className="space-y-4 text-charcoal text-lg leading-relaxed">
                <p>
                  Furniture Hub is Kenya's leading online furniture destination, proudly located on Ngong Road. 
                  We exist for one simple reason: <span className="font-semibold text-deep-navy">to see every Kenyan home fully furnished with quality furniture.</span>
                </p>
                
                <p>
                  We've transformed the traditional furniture shopping experience. No more endless showroom hopping, no more pushy salespeople. 
                  <span className="font-semibold text-deep-navy"> Just beautiful furniture, honest prices, and delivery to your door.</span>
                </p>
                
                <p>
                  As a digital-first innovative enterprise, we've streamlined everything from browsing to delivery. 
                  What used to take weeks now takes minutes. What used to be stressful is now exciting.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button variant="primary" size="lg" onClick={() => window.location.href = '/shop'}>
                  Shop Now
                </Button>
                <Button variant="secondary" size="lg" onClick={() => window.location.href = '/contact'}>
                  Visit Our Showroom
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-elevated">
                <img
                  src="https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&q=80"
                  alt="Our Showroom"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="absolute -bottom-8 -left-8 bg-deep-navy text-pure-white p-6 rounded-lg shadow-high max-w-xs">
                <p className="text-4xl font-bold mb-1">5+ Years</p>
                <p className="text-pure-white/80">Furnishing Kenyan homes with pride</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-deep-navy">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="font-serif text-4xl md:text-5xl text-brushed-gold mb-2">
                  {stat.number}
                </p>
                <p className="text-pure-white/80 text-sm md:text-base">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24 bg-pure-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-brushed-gold/10 text-brushed-gold text-sm font-semibold rounded-full mb-4">
              What Makes Us Different
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-soft-black mb-4">
              Why Kenyans Trust Us
            </h2>
            <p className="text-warm-gray text-lg max-w-2xl mx-auto">
              We're not just selling furniture. We're building trust, one delivery at a time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center text-deep-navy group-hover:text-brushed-gold transition-colors">
                  {value.icon}
                </div>
                <h3 className="font-sans text-xl font-semibold text-charcoal mb-3">
                  {value.title}
                </h3>
                <p className="text-warm-gray leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 md:py-24 bg-light-sand">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="order-2 lg:order-1">
              <div className="bg-pure-white rounded-2xl p-8 shadow-soft">
                <h3 className="font-serif text-2xl md:text-3xl text-soft-black mb-6">
                  Visit Our Showroom
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-deep-navy/5 rounded-lg">
                      <svg className="w-6 h-6 text-deep-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal mb-1">Location</p>
                      <p className="text-warm-gray">Ngong Road, Nairobi, Kenya</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-deep-navy/5 rounded-lg">
                      <svg className="w-6 h-6 text-deep-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal mb-1">Opening Hours</p>
                      <p className="text-warm-gray">Monday - Saturday: 8AM - 6PM</p>
                      <p className="text-warm-gray">Sunday: 10AM - 4PM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-deep-navy/5 rounded-lg">
                      <svg className="w-6 h-6 text-deep-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal mb-1">Contact</p>
                      <p className="text-warm-gray">+254 700 000 000</p>
                      <p className="text-warm-gray">hello@furniturehub.co.ke</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Button variant="primary" fullWidth onClick={() => window.location.href = '/contact'}>
                    Get Directions
                  </Button>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-elevated h-96 lg:h-[500px]">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                  alt="Modern showroom interior"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-deep-navy text-pure-white">
        <div className="container-custom text-center">
          <h2 className="font-serif text-3xl md:text-5xl mb-6">
            Ready to Transform Your Home?
          </h2>
          <p className="text-pure-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Browse our collection online or visit our showroom on Ngong Road. 
            Your dream furniture is just a click away.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="gold" size="lg" onClick={() => window.location.href = '/shop'}>
              Start Shopping
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-pure-white text-pure-white hover:bg-pure-white hover:text-deep-navy"
              onClick={() => window.location.href = '/contact'}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;