import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockProducts } from '../../../data/mockProducts';
import { formatPrice } from '../../../utils/formatters';

const SearchBar = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim().length > 1) {
      const filtered = mockProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query)}`);
      setIsOpen(false);
      setQuery('');
      if (onClose) onClose();
    }
  };

  const handleProductClick = (slug) => {
    navigate(`/product/${slug}`);
    setIsOpen(false);
    setQuery('');
    if (onClose) onClose();
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for furniture..."
          className="w-full px-6 py-4 pr-12 border-2 border-border-color rounded-full focus:outline-none focus:border-deep-navy transition-colors text-base"
          autoFocus
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-charcoal hover:text-deep-navy transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-pure-white border border-border-color rounded-lg shadow-elevated overflow-hidden z-50">
          <div className="p-2">
            <p className="text-xs text-warm-gray uppercase tracking-wide px-3 py-2">
              Products ({results.length})
            </p>
            {results.map((product) => (
              <button
                key={product.id}
                onClick={() => handleProductClick(product.slug)}
                className="w-full flex items-center gap-3 p-3 hover:bg-light-sand rounded transition-colors text-left"
              >
                <div className="w-12 h-12 flex-shrink-0 rounded overflow-hidden bg-light-sand border border-border-color">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-charcoal line-clamp-1">
                    {product.name}
                  </p>
                  <p className="text-sm font-bold text-soft-black">
                    {formatPrice(product.salePrice || product.price)}
                  </p>
                </div>
              </button>
            ))}
          </div>
          
          {query.trim() && (
            <button
              onClick={handleSearch}
              className="w-full p-3 text-sm text-deep-navy hover:bg-light-sand transition-colors border-t border-border-color text-center font-medium"
            >
              View all results for "{query}"
            </button>
          )}
        </div>
      )}

      {isOpen && results.length === 0 && query.trim().length > 1 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-pure-white border border-border-color rounded-lg shadow-elevated p-6 text-center z-50">
          <svg className="w-12 h-12 text-warm-gray mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-charcoal">No products found for "{query}"</p>
          <p className="text-xs text-warm-gray mt-1">Try different keywords</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;