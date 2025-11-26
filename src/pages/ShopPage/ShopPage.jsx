import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SectionTitle from '../../components/common/SectionTitle/SectionTitle';
import ProductGrid from '../../components/products/ProductGrid/ProductGrid';
import Loader from '../../components/common/Loader/Loader';
import { productService } from '../../services';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);
  
  const [sortBy, setSortBy] = useState('popular');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'living-room', label: 'Living Room' },
    { value: 'bedroom', label: 'Bedroom' },
    { value: 'dining', label: 'Dining' },
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

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Build filters object
        const filters = {
          page: 1,
          limit: 50
        };

        // Add category filter
        if (selectedCategory !== 'all') {
          filters.category = selectedCategory;
        }

        // Add price range filter
        if (priceRange !== 'all') {
          if (priceRange === '100000+') {
            filters.minPrice = 100000;
          } else {
            const [min, max] = priceRange.split('-').map(Number);
            filters.minPrice = min;
            filters.maxPrice = max;
          }
        }

        // Add search query
        if (searchQuery) {
          filters.search = searchQuery;
        }

        // Add sorting
        switch (sortBy) {
          case 'price-low':
            filters.sort = 'price';
            break;
          case 'price-high':
            filters.sort = '-price';
            break;
          case 'newest':
            filters.sort = '-createdAt';
            break;
          default:
            filters.sort = '-featured,-bestSeller';
        }

        // Fetch from backend
        const response = await productService.getAll(filters);
        setProducts(response.products);
        setPagination(response.pagination);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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
          
          {/* Sidebar Filters */}
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
                
                {/* Category Filter */}
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

                {/* Price Range Filter */}
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

          {/* Main Content */}
          <main className="lg:col-span-3">
            
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                {searchQuery ? (
                  <p className="text-warm-gray">
                    Search results for <span className="font-semibold text-charcoal">"{searchQuery}"</span> - 
                    <span className="font-semibold text-charcoal"> {products.length}</span> products found
                  </p>
                ) : (
                  <p className="text-warm-gray">
                    Showing <span className="font-semibold text-charcoal">{products.length}</span> products
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

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-20">
                <Loader />
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-lg text-center">
                <p className="font-semibold mb-1">Error loading products</p>
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Products Grid */}
            {!loading && !error && products.length > 0 && (
              <ProductGrid products={products} />
            )}

            {/* Empty State */}
            {!loading && !error && products.length === 0 && (
              <div className="text-center py-20">
                <p className="text-warm-gray text-lg mb-4">No products found</p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-deep-navy hover:text-charcoal font-semibold"
                  >
                    Clear filters to see all products
                  </button>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
};

export default ShopPage;