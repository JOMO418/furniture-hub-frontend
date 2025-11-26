import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { productService } from '../../../services';
import { formatPrice } from '../../../utils/formatters';

const SearchBar = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
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

  // Optimized search with faster debounce
  useEffect(() => {
    const searchProducts = async () => {
      const trimmedQuery = query.trim();
      
      // Search starts from 1 character instead of 2
      if (trimmedQuery.length >= 1) {
        setLoading(true);
        try {
          // Search products from backend - increased limit to 8 for better results
          const products = await productService.search(trimmedQuery, 8);
          
          // Sort results by relevance for better UX
          const sortedResults = products.sort((a, b) => {
            const aName = a.name.toLowerCase();
            const bName = b.name.toLowerCase();
            const searchTerm = trimmedQuery.toLowerCase();
            
            // Prioritize: starts with > includes in name > includes in description
            const aStartsWith = aName.startsWith(searchTerm);
            const bStartsWith = bName.startsWith(searchTerm);
            const aIncludes = aName.includes(searchTerm);
            const bIncludes = bName.includes(searchTerm);
            
            if (aStartsWith && !bStartsWith) return -1;
            if (!aStartsWith && bStartsWith) return 1;
            if (aIncludes && !bIncludes) return -1;
            if (!aIncludes && bIncludes) return 1;
            
            return 0;
          });
          
          setResults(sortedResults);
          setIsOpen(true);
        } catch (error) {
          console.error('Search error:', error);
          setResults([]);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
        setIsOpen(false);
        setLoading(false);
      }
    };

    // Faster debounce: 150ms instead of 300ms
    const timeoutId = setTimeout(searchProducts, 150);
    return () => clearTimeout(timeoutId);
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

  // Highlight matching text in search results
  const highlightMatch = (text, query) => {
    if (!query.trim()) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() 
        ? <mark key={index} className="bg-yellow-200 text-charcoal">{part}</mark>
        : part
    );
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for furniture... (e.g. 'c' for chairs, sofas...)"
          className="w-full px-6 py-4 pr-12 border-2 border-border-color rounded-full focus:outline-none focus:border-deep-navy transition-colors text-base"
          autoFocus
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-charcoal hover:text-deep-navy transition-colors"
        >
          {loading ? (
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </button>
      </form>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-pure-white border border-border-color rounded-lg shadow-elevated overflow-hidden z-50">
          <div className="p-2 max-h-[400px] overflow-y-auto">
            <p className="text-xs text-warm-gray uppercase tracking-wide px-3 py-2">
              {results.length} {results.length === 1 ? 'Result' : 'Results'} found
            </p>
            {results.map((product) => (
              <button
                key={product._id}
                onClick={() => handleProductClick(product.slug)}
                className="w-full flex items-center gap-3 p-3 hover:bg-light-sand rounded transition-colors text-left"
              >
                <div className="w-12 h-12 flex-shrink-0 rounded overflow-hidden bg-light-sand border border-border-color">
                  <img
                    src={product.images?.[0]?.url || '/placeholder.jpg'}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-charcoal line-clamp-1">
                    {highlightMatch(product.name, query)}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-sm font-bold text-soft-black">
                      {formatPrice(product.salePrice || product.price)}
                    </p>
                    {product.category && (
                      <span className="text-xs text-warm-gray">
                        · {product.category.replace('-', ' ')}
                      </span>
                    )}
                  </div>
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

      {/* No Results Found */}
      {isOpen && results.length === 0 && query.trim().length >= 1 && !loading && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-pure-white border border-border-color rounded-lg shadow-elevated p-6 text-center z-50">
          <svg className="w-12 h-12 text-warm-gray mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-charcoal font-medium mb-1">No products found for "{query}"</p>
          <p className="text-xs text-warm-gray">Try different keywords or browse our categories</p>
        </div>
      )}

      {/* Search Tips - Show when empty */}
      {!query.trim() && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-pure-white border border-border-color rounded-lg shadow-elevated p-4 z-50">
          <p className="text-xs text-warm-gray uppercase tracking-wide mb-2">Popular Searches</p>
          <div className="flex flex-wrap gap-2">
            {['Sofa', 'Chair', 'Table', 'Bed', 'Desk', 'Mirror'].map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="px-3 py-1 text-xs bg-light-sand hover:bg-deep-navy hover:text-pure-white rounded-full transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;