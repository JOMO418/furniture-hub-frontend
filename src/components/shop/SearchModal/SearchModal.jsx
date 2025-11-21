import React from 'react';
import SearchBar from '../SearchBar/SearchBar';

const SearchModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-soft-black/60 z-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="fixed top-0 left-0 right-0 z-50 p-6 md:p-12 pointer-events-none">
        <div className="pointer-events-auto" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-end mb-4">
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center bg-pure-white rounded-full shadow-soft hover:bg-light-sand transition-colors"
              aria-label="Close search"
            >
              <svg className="w-6 h-6 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <SearchBar onClose={onClose} />
        </div>
      </div>
    </>
  );
};

export default SearchModal;