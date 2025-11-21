import React, { useState } from 'react';
import { useModalStore } from '../../../store/modalStore';
import { useCartStore } from '../../../store/cartStore';
import Button from '../../common/Button/Button';
import Badge from '../../common/Badge/Badge';
import { formatPrice, calculateDiscount } from '../../../utils/formatters';

const ProductModal = () => {
  const { isOpen, selectedProduct, closeModal } = useModalStore();
  const { addItem, openCart } = useCartStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen || !selectedProduct) return null;

  const product = selectedProduct;
  const discount = calculateDiscount(product.price, product.salePrice);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      closeModal();
      openCart();
    }, 1000);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    closeModal();
    openCart();
  };

  const handleClose = () => {
    closeModal();
    setQuantity(1);
    setSelectedImage(0);
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-soft-black/60 z-50 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="bg-pure-white rounded-2xl shadow-high w-full max-w-6xl max-h-[90vh] overflow-hidden pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-pure-white rounded-full shadow-soft hover:bg-light-sand transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 max-h-[90vh] overflow-y-auto">
            
            <div className="p-6 md:p-8 bg-light-sand">
              <div className="sticky top-0">
                <div className="relative aspect-square rounded-lg overflow-hidden bg-pure-white mb-4">
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                  {product.bestSeller && (
                    <Badge variant="gold" className="absolute top-4 right-4">
                      Best Seller
                    </Badge>
                  )}
                  {product.newArrival && (
                    <Badge variant="green" className="absolute top-4 right-4">
                      New
                    </Badge>
                  )}
                  {discount > 0 && (
                    <Badge variant="gold" className="absolute top-4 left-4">
                      {discount}% OFF
                    </Badge>
                  )}
                </div>

                {product.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === index 
                            ? 'border-deep-navy' 
                            : 'border-transparent hover:border-warm-stone'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 md:p-8 lg:p-12">
              
              <div className="mb-4">
                <span className="text-sm text-warm-gray uppercase tracking-wide">
                  {product.category.replace('-', ' ')}
                </span>
              </div>

              <h2 className="font-serif text-3xl md:text-4xl text-soft-black mb-4">
                {product.name}
              </h2>

              <div className="flex items-center gap-4 mb-6">
                {product.salePrice ? (
                  <>
                    <span className="font-sans text-xl text-warm-gray line-through">
                      {formatPrice(product.price)}
                    </span>
                    <span className="font-sans text-3xl font-bold text-soft-black">
                      {formatPrice(product.salePrice)}
                    </span>
                  </>
                ) : (
                  <span className="font-sans text-3xl font-bold text-soft-black">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>

              <p className="text-charcoal text-base leading-relaxed mb-6">
                {product.description}
              </p>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wide mb-3">
                  Specifications
                </h3>
                <div className="space-y-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-border-color">
                      <span className="text-sm text-warm-gray capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-sm text-charcoal font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-charcoal uppercase tracking-wide mb-3">
                  Quantity
                </label>
                <div className="flex items-center border border-border-color rounded w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-light-sand transition-colors"
                    disabled={quantity <= 1}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                    className="w-16 h-12 text-center border-x border-border-color focus:outline-none"
                    min="1"
                    max={product.stock}
                  />
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-light-sand transition-colors"
                    disabled={quantity >= product.stock}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-warm-gray mt-2">
                  {product.stock > 5 ? 'In Stock' : `Only ${product.stock} left in stock`}
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleAddToCart}
                  disabled={showSuccess}
                >
                  {showSuccess ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Added to Cart!
                    </span>
                  ) : (
                    'Add to Cart'
                  )}
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  fullWidth
                  onClick={handleBuyNow}
                >
                  Buy Now
                </Button>
              </div>

              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-border-color">
                <button className="flex items-center gap-2 text-sm text-charcoal hover:text-deep-navy transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Add to Wishlist
                </button>

                <button className="flex items-center gap-2 text-sm text-charcoal hover:text-deep-navy transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductModal;