import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useModalStore } from '../../../store/modalStore';
import Badge from '../../common/Badge/Badge';
import Button from '../../common/Button/Button';
import { formatPrice } from '../../../utils/formatters';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { openModal } = useModalStore();
  
  const discount = product.salePrice 
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  const handleQuickView = (e) => {
    e.stopPropagation();
    openModal(product);
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="group block">
      <div className="bg-pure-white rounded-lg border border-border-color overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-elevated">
        
        <div 
          className="relative aspect-square overflow-hidden bg-light-sand cursor-pointer"
          onClick={handleQuickView}
        >
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-soft-black/0 group-hover:bg-soft-black/10 transition-all duration-300 flex items-center justify-center">
            <span className="text-pure-white bg-soft-black/80 px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium text-sm">
              Quick View
            </span>
          </div>
          
          {product.bestSeller && (
            <Badge variant="gold" className="absolute top-3 right-3">
              Best Seller
            </Badge>
          )}
          {product.newArrival && (
            <Badge variant="green" className="absolute top-3 right-3">
              New
            </Badge>
          )}
          {discount > 0 && (
            <Badge variant="gold" className="absolute top-3 left-3">
              {discount}% OFF
            </Badge>
          )}
        </div>

        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-sans text-base md:text-lg font-medium text-charcoal mb-2 line-clamp-2 group-hover:text-deep-navy transition-colors">
              {product.name}
            </h3>
            
            <div className="flex items-center gap-2">
              {product.salePrice ? (
                <>
                  <span className="font-sans text-sm text-warm-gray line-through">
                    {formatPrice(product.price)}
                  </span>
                  <span className="font-sans text-lg font-bold text-soft-black">
                    {formatPrice(product.salePrice)}
                  </span>
                </>
              ) : (
                <span className="font-sans text-lg font-bold text-soft-black">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleViewDetails}
            className="w-full"
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;