import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../../services';
import { useCartStore } from '../../store/cartStore';
import Button from '../../components/common/Button/Button';
import Badge from '../../components/common/Badge/Badge';
import Loader from '../../components/common/Loader/Loader';
import { formatPrice } from '../../utils/formatters';
import { ChevronLeft, Heart, Share2, Truck, Shield, Clock } from 'lucide-react';

const ProductPage = () => {
  const { slug } = useParams(); // Changed from 'id' to 'slug'
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product by slug
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch product from backend
        const productData = await productService.getBySlug(slug);
        setProduct(productData);
        
        // Fetch related products (same category)
        if (productData.category) {
          try {
            const relatedData = await productService.getByCategory(productData.category, { limit: 4 });
            // Filter out current product
            const filtered = relatedData.products.filter(p => p.slug !== slug);
            setRelatedProducts(filtered.slice(0, 4));
          } catch (err) {
            console.error('Error fetching related products:', err);
            // Continue even if related products fail
          }
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.message || 'Product not found');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <Loader size="lg" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-ivory">
        <h2 className="text-2xl font-serif mb-4 text-charcoal">Product Not Found</h2>
        <p className="text-warm-gray mb-6">{error || 'The product you are looking for does not exist.'}</p>
        <Button onClick={() => navigate('/shop')}>Back to Shop</Button>
      </div>
    );
  }

  // Extract images from backend format
  const images = product.images?.map(img => img.url) || [];

  return (
    <div className="min-h-screen bg-ivory">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-warm-gray hover:text-charcoal transition-colors"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>
      </div>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-pure-white rounded-lg overflow-hidden border border-border-color">
              <img
                src={images[selectedImage] || images[0] || '/placeholder.jpg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-deep-navy'
                        : 'border-border-color hover:border-warm-gray'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl md:text-4xl font-serif text-charcoal">
                  {product.name}
                </h1>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-light-sand rounded-full transition-colors">
                    <Heart size={20} className="text-warm-gray" />
                  </button>
                  <button className="p-2 hover:bg-light-sand rounded-full transition-colors">
                    <Share2 size={20} className="text-warm-gray" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                {product.salePrice ? (
                  <>
                    <span className="text-3xl font-bold text-deep-navy">
                      {formatPrice(product.salePrice)}
                    </span>
                    <span className="text-xl text-warm-gray line-through">
                      {formatPrice(product.price)}
                    </span>
                    <Badge variant="gold">
                      {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
                    </Badge>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-deep-navy">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 text-sm text-warm-gray">
                <span>SKU: {product.sku || 'N/A'}</span>
                <span>•</span>
                <span className={product.stock > 0 ? 'text-sage' : 'text-deep-navy'}>
                  {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </span>
              </div>

              {/* Badges */}
              <div className="flex gap-2 mt-3">
                {product.featured && <Badge variant="gold">Featured</Badge>}
                {product.bestSeller && <Badge variant="gold">Best Seller</Badge>}
                {product.newArrival && <Badge variant="green">New Arrival</Badge>}
              </div>
            </div>

            <div className="border-t border-border-color pt-6">
              <p className="text-warm-gray leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-charcoal">Quantity:</label>
                <div className="flex items-center border border-border-color rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-light-sand transition-colors text-charcoal"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 border-x border-border-color text-charcoal">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-4 py-2 hover:bg-light-sand transition-colors text-charcoal"
                    disabled={product.stock === 0}
                  >
                    +
                  </button>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full"
              >
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border-color">
              <div className="flex items-center gap-3">
                <Truck className="text-sage" size={24} />
                <div>
                  <p className="text-sm font-medium text-charcoal">Free Shipping</p>
                  <p className="text-xs text-warm-gray">Orders over Ksh 50,000</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="text-sage" size={24} />
                <div>
                  <p className="text-sm font-medium text-charcoal">2 Year Warranty</p>
                  <p className="text-xs text-warm-gray">Quality guaranteed</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="text-sage" size={24} />
                <div>
                  <p className="text-sm font-medium text-charcoal">Easy Returns</p>
                  <p className="text-xs text-warm-gray">30 day policy</p>
                </div>
              </div>
            </div>

            {/* Product Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="space-y-3 pt-6 border-t border-border-color">
                <h3 className="font-serif text-xl text-charcoal">Product Specifications</h3>
                <dl className="space-y-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex">
                      <dt className="text-warm-gray w-1/3 capitalize">{key}:</dt>
                      <dd className="text-charcoal w-2/3">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl md:text-3xl font-serif text-center mb-8 text-charcoal">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <div
                  key={p._id}
                  onClick={() => {
                    navigate(`/product/${p.slug}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="cursor-pointer group"
                >
                  <div className="aspect-square bg-pure-white rounded-lg overflow-hidden mb-3 border border-border-color">
                    <img
                      src={p.images?.[0]?.url || '/placeholder.jpg'}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-medium text-sm mb-1 text-charcoal">{p.name}</h3>
                  <p className="text-deep-navy font-semibold">{formatPrice(p.salePrice || p.price)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;