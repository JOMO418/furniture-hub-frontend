import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: 'All Products', path: '/shop' },
      { name: 'Best Sellers', path: '/shop?filter=bestsellers' },
      { name: 'New Arrivals', path: '/shop?filter=new' },
      { name: 'Sale Items', path: '/shop?filter=sale' }
    ],
    about: [
      { name: 'About Us', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Delivery Information', path: '/delivery' },
      { name: 'Returns & Refunds', path: '/returns' }
    ],
    legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms & Conditions', path: '/terms' }
    ]
  };

  return (
    <footer className="bg-soft-black text-pure-white">
      <div className="container-custom py-12 md:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8">
          
          <div>
            <h3 className="font-serif text-xl md:text-2xl mb-4">Furniture Hub</h3>
            <p className="text-pure-white/70 text-sm mb-4 leading-relaxed">
              Where Art Meets Function
            </p>
            <p className="text-pure-white/70 text-sm leading-relaxed">
              Curating beautiful furniture for modern Kenyan homes.
            </p>
          </div>

          <div>
            <h4 className="font-sans text-sm uppercase tracking-wider text-pure-white/50 mb-4">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-pure-white/80 text-sm hover:text-pure-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-sm uppercase tracking-wider text-pure-white/50 mb-4">About</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-pure-white/80 text-sm hover:text-pure-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-sm uppercase tracking-wider text-pure-white/50 mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-pure-white/80">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+254700000000" className="hover:text-pure-white transition-colors">
                  +254 700 000 000
                </a>
              </li>
              <li className="flex items-start gap-2 text-pure-white/80">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:hello@furniturehub.co.ke" className="hover:text-pure-white transition-colors">
                  hello@furniturehub.co.ke
                </a>
              </li>
              <li className="flex items-start gap-2 text-pure-white/80">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Nairobi, Kenya</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-pure-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-pure-white/50 text-sm text-center md:text-left">
              © {currentYear} Furniture Hub. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {footerLinks.legal.map((link) => (
                <Link key={link.path} to={link.path} className="text-pure-white/50 text-sm hover:text-pure-white transition-colors">
                  {link.name}
                </Link>
              ))}
              <span className="text-pure-white/30">|</span>
              <div className="flex items-center gap-2">
                <span className="text-pure-white/50 text-sm">Powered by</span>
                <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 px-4 py-2 rounded-lg border border-yellow-500/20">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#jomo-gradient)" />
                    <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="url(#jomo-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <defs>
                      <linearGradient id="jomo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFD700"/>
                        <stop offset="100%" stopColor="#FFA500"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                    Jomo Software Solutions
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;