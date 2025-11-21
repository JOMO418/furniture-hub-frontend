import React, { useState, useMemo } from 'react';
import SectionTitle from '../../components/common/SectionTitle/SectionTitle';
import ProductGrid from '../../components/products/ProductGrid/ProductGrid';
import Button from '../../components/common/Button/Button';
import { mockProducts } from '../../data/mockProducts';
import { useSearchParams } from 'react-router-dom';

const ShopPage = () => {
  const [sortBy, setSortBy] = useState('popular');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'living-room', label: 'Living Room' },
    { value: 'bedroom', label: 'Bedroom' },
    { value: 'dining-room', label: 'Dining Room' },
    { value: 'office', label: 'Office' },
    { value: 'outdoor', label: 'Outdoor' },
    { value: 'decor', label: 'Decor' }
  ];

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-20000', label: 'Under Ksh 20,000' },
    { value: '20000-50000', label: 'Ksh 20,000 - 50,000' },
    { value: '50000-100000', label: 'Ksh 50,000 - 100,000' },
    { value: '100000+', label: 'Over Ksh 100,000' }
  ];

  const sortOptions = [
    { value: 'popular', label: 'Popular' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' }
  ];

  const filteredProducts = useMemo(() => {
    let filtered = [...mockProducts];
  
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }
  
    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
  
    // Price range filter
    if (priceRange !== 'all') {
      if (priceRange === '100000+') {
        filtered = filtered.filter(p => (p.salePrice || p.price) >= 100000);
      } else {
        const [min, max] = priceRange.split('-').map(Number);
        filtered = filtered.filter(p => {
          const price = p.salePrice || p.price;
          return price >= min && price <= max;
        });
      }
    }
  
    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case 'price-high':
        filtered.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        filtered.sort((a, b) => {
          if (a.bestSeller && !b.bestSeller) return -1;
          if (!a.bestSeller && b.bestSeller) return 1;
          return 0;
        });
    }
  
    return filtered;
  }, [selectedCategory, priceRange, sortBy, searchQuery]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setPriceRange('all');
    setSortBy('popular');
  };

  const hasActiveFilters = selectedCategory !== 'all' || priceRange !== 'all' || sortBy !== 'popular';

  return (
    <section className="py-12 md:py-20 bg-ivory min-h-screen">
      <div className="container-custom">
        
        <SectionTitle 
          title="Shop All Furniture"
          subtitle="Discover our complete collection of beautiful furniture"
        />

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          
          <aside className="lg:col-span-1 mb-8 lg:mb-0">
            <div className="bg-pure-white rounded-lg border border-border-color p-6 sticky top-24">
              
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-sans text-lg font-semibold text-charcoal">Filters</h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-deep-navy hover:text-charcoal transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="space-y-6">
                
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-3 uppercase tracking-wide">
                    Category
                  </label>
                  <div className="space-y-2">
                    {categories.map(cat => (
                      <button
                        key={cat.value}
                        onClick={() => setSelectedCategory(cat.value)}
                        className={`w-full text-left px-3 py-2 rounded transition-colors ${
                          selectedCategory === cat.value
                            ? 'bg-deep-navy text-pure-white'
                            : 'text-charcoal hover:bg-light-sand'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-border-color">
                  <label className="block text-sm font-semibold text-charcoal mb-3 uppercase tracking-wide">
                    Price Range
                  </label>
                  <div className="space-y-2">
                    {priceRanges.map(range => (
                      <button
                        key={range.value}
                        onClick={() => setPriceRange(range.value)}
                        className={`w-full text-left px-3 py-2 rounded transition-colors ${
                          priceRange === range.value
                            ? 'bg-deep-navy text-pure-white'
                            : 'text-charcoal hover:bg-light-sand'
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-3">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                {searchQuery ? (
                  <p className="text-warm-gray">
                    Search results for <span className="font-semibold text-charcoal">"{searchQuery}"</span> - 
                    <span className="font-semibold text-charcoal"> {filteredProducts.length}</span> products found
                  </p>
                ) : (
                  <p className="text-warm-gray">
                    Showing <span className="font-semibold text-charcoal">{filteredProducts.length}</span> products
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm text-charcoal">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-border-color rounded bg-pure-white text-charcoal focus:outline-none focus:ring-2 focus:ring-deep-navy"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <ProductGrid products={filteredProducts} />
          </main>
        </div>
      </div>
    </section>
  );
};

export default ShopPage;