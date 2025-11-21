import React from 'react';

const Loader = ({ size = 'md', color = 'navy' }) => {
  
  const sizes = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4'
  };
  
  const colors = {
    navy: 'border-deep-navy border-t-transparent',
    gold: 'border-brushed-gold border-t-transparent',
    white: 'border-pure-white border-t-transparent'
  };
  
  return (
    <div className="flex items-center justify-center">
      <div 
        className={`${sizes[size]} ${colors[color]} rounded-full animate-spin`}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;