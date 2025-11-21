import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  disabled = false,
  fullWidth = false,
  type = 'button',
  className = ''
}) => {
  
  // Base styles (always applied)
  const baseStyles = "font-sans font-medium rounded transition-all duration-300 inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  // Variant styles
  const variants = {
    primary: "bg-deep-navy text-pure-white hover:bg-[#3D5165] focus:ring-deep-navy active:scale-[0.98]",
    secondary: "border-2 border-deep-navy text-deep-navy bg-transparent hover:bg-deep-navy hover:text-pure-white focus:ring-deep-navy",
    gold: "bg-brushed-gold text-pure-white hover:bg-[#A37E4F] focus:ring-brushed-gold",
    outline: "border border-border-color text-charcoal hover:border-warm-stone hover:bg-light-sand focus:ring-warm-stone"
  };
  
  // Size styles
  const sizes = {
    sm: "text-sm px-4 py-2 min-h-[36px]",
    md: "text-base px-6 py-3 min-h-[44px]",
    lg: "text-lg px-8 py-4 min-h-[52px]"
  };
  
  // Width style
  const widthStyle = fullWidth ? "w-full" : "";
  
  // Combine all styles
  const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`;
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {children}
    </button>
  );
};

export default Button;
