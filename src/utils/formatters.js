export const formatPrice = (price) => {
    return `Ksh ${price.toLocaleString('en-KE')}`;
  };
  
  export const calculateDiscount = (originalPrice, salePrice) => {
    if (!salePrice) return 0;
    const discount = ((originalPrice - salePrice) / originalPrice) * 100;
    return Math.round(discount);
  };
  
  export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  export const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };