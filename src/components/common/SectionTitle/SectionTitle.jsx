import React from 'react';

const SectionTitle = ({ 
  title, 
  subtitle, 
  align = 'center',
  className = '' 
}) => {
  
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };
  
  return (
    <div className={`mb-12 ${alignClasses[align]} ${className}`}>
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-soft-black mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="font-sans text-base md:text-lg text-warm-gray max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
