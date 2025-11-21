import React from 'react';

const Badge = ({ 
  children, 
  variant = 'gold', 
  size = 'md',
  className = '' 
}) => {
  
  // Base styles
  const baseStyles = "inline-flex items-center justify-center font-sans font-medium rounded";
  
  // Variant styles
  const variants = {
    gold: "bg-brushed-gold text-pure-white",
    green: "bg-[#3D5A4C] text-pure-white",
    navy: "bg-deep-navy text-pure-white",
    outline: "border border-border-color text-charcoal bg-transparent"
  };
  
  // Size styles
  const sizes = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2"
  };
  
  const badgeClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <span className={badgeClasses}>
      {children}
    </span>
  );
};

export default Badge;
