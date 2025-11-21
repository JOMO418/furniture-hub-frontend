import React from 'react';
import { useCartStore } from '../../../store/cartStore';
import Button from '../../common/Button/Button';
import { formatPrice } from '../../../utils/formatters';

const CartDrawer = () => {
  const { isOpen, items, closeCart, removeItem, updateQuantity, getTotal } = useCartStore();

  if (!isOpen) return null;

  const total = getTotal();

  return (
    <>
      <div 
        className="fixed inset-0 bg-soft-black/60 z-50 backdrop-blur-sm"
        onClick={closeCart}
      />

      <div className="fixed top-0 right-0 bottom-0 w-full md:w-[480px] bg-pure-white z-50 shadow-high overflow-hidden flex flex-col">
        
        <div className="p-6 border-b border-border-color flex items-center justify-between">
          <h2 className="font-serif text-2xl text-charcoal">
            Your Cart
            {items.length > 0 && (
              <span className="text-base text-warm-gray ml-2">
                ({items.reduce((sum, item) => sum + item.quantity, 0)} items)
              </span>
            )}
          </h2>
          <button
            onClick={closeCart}
            className="w-10 h-10 flex items-center justify-center hover:bg-light-sand rounded transition-colors"
            aria-label="Close cart"
          >
            <svg className="w-6 h-6 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <svg className="w-24 h-24 text-warm-gray mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h3 className="font-serif text-xl text-charcoal mb-2">Your cart is empty</h3>
            <p className="text-warm-gray mb-6">Add some beautiful furniture to get started</p>
            <Button variant="primary" onClick={closeCart}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-border-color last:border-0">
                    
                    <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-light-sand border border-border-color">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-sans text-base font-medium text-charcoal mb-1 line-clamp-2">
                        {item.name}
                      </h3>
                      
                      {item.specifications?.color && (
                        <p className="text-sm text-warm-gray mb-2">
                          Color: {item.specifications.color}
                        </p>
                      )}

                      <p className="text-base font-bold text-soft-black mb-3">
                        {formatPrice(item.salePrice || item.price)}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-border-color rounded">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-light-sand transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="w-10 h-8 flex items-center justify-center text-sm font-medium border-x border-border-color">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-light-sand transition-colors"
                            disabled={item.quantity >= item.stock}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-sm text-warm-gray hover:text-deep-navy transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-border-color bg-light-sand p-6">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-base text-charcoal">Subtotal</span>
                  <span className="text-lg font-bold text-soft-black">{formatPrice(total)}</span>
                </div>
                <p className="text-xs text-warm-gray">
                  Taxes and shipping calculated at checkout
                </p>
              </div>

              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => {
                  closeCart();
                  window.location.href = '/checkout';
                }}
              >
                Proceed to Checkout
              </Button>

              <button
                onClick={closeCart}
                className="w-full mt-3 py-3 text-center text-sm text-deep-navy hover:text-charcoal transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartDrawer;