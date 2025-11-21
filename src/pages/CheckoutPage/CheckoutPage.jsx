import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import Button from '../../components/common/Button/Button';
import { formatPrice } from '../../utils/formatters';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();
  const total = getTotal();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Nairobi',
    paymentMethod: 'mpesa'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="font-serif text-4xl text-soft-black mb-4">Your cart is empty</h1>
        <p className="text-warm-gray mb-8">Add some products before checking out</p>
        <Button variant="primary" onClick={() => navigate('/shop')}>
          Browse Products
        </Button>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      console.log('Order submitted:', { ...formData, items, total });
      alert('Order placed successfully! (This is a demo - no real payment processed)');
      clearCart();
      navigate('/');
    }, 2000);
  };

  return (
    <section className="py-12 md:py-20 bg-ivory min-h-screen">
      <div className="container-custom max-w-6xl">
        
        <h1 className="font-serif text-3xl md:text-4xl text-soft-black mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-pure-white rounded-lg border border-border-color p-6 md:p-8">
              
              <h2 className="font-serif text-2xl text-charcoal mb-6">Delivery Information</h2>

              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border-color rounded focus:outline-none focus:ring-2 focus:ring-deep-navy"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-border-color rounded focus:outline-none focus:ring-2 focus:ring-deep-navy"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-border-color rounded focus:outline-none focus:ring-2 focus:ring-deep-navy"
                      placeholder="+254 700 000 000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Delivery Address *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full px-4 py-3 border border-border-color rounded focus:outline-none focus:ring-2 focus:ring-deep-navy"
                    placeholder="Street address, apartment, building, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border-color rounded focus:outline-none focus:ring-2 focus:ring-deep-navy"
                  />
                </div>
              </div>

              <h2 className="font-serif text-2xl text-charcoal mb-6">Payment Method</h2>

              <div className="space-y-3 mb-8">
                <label className="flex items-center gap-3 p-4 border-2 border-border-color rounded cursor-pointer hover:border-deep-navy transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="mpesa"
                    checked={formData.paymentMethod === 'mpesa'}
                    onChange={handleChange}
                    className="w-5 h-5"
                  />
                  <div>
                    <span className="font-medium text-charcoal">M-Pesa</span>
                    <p className="text-sm text-warm-gray">Pay via M-Pesa mobile money</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 border-2 border-border-color rounded cursor-pointer hover:border-deep-navy transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleChange}
                    className="w-5 h-5"
                  />
                  <div>
                    <span className="font-medium text-charcoal">Card Payment</span>
                    <p className="text-sm text-warm-gray">Pay with Visa or Mastercard</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 border-2 border-border-color rounded cursor-pointer hover:border-deep-navy transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                    className="w-5 h-5"
                  />
                  <div>
                    <span className="font-medium text-charcoal">Cash on Delivery</span>
                    <p className="text-sm text-warm-gray">Pay when you receive your order</p>
                  </div>
                </label>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : `Place Order - ${formatPrice(total)}`}
              </Button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-pure-white rounded-lg border border-border-color p-6 sticky top-24">
              <h2 className="font-serif text-xl text-charcoal mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 flex-shrink-0 rounded overflow-hidden bg-light-sand border border-border-color">
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-charcoal line-clamp-2 mb-1">{item.name}</h3>
                      <p className="text-sm text-warm-gray">Qty: {item.quantity}</p>
                      <p className="text-sm font-bold text-charcoal">
                        {formatPrice((item.salePrice || item.price) * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-border-color">
                <div className="flex justify-between text-sm">
                  <span className="text-warm-gray">Subtotal</span>
                  <span className="font-medium text-charcoal">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-warm-gray">Delivery</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-border-color">
                  <span className="text-charcoal">Total</span>
                  <span className="text-soft-black">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;