import React, { useState } from 'react';

const VariationsModal = ({ product, onClose, onAddToCart }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const getModalImage = () => {
    if (Array.isArray(product.imageURLs) && product.imageURLs.length > 0) {
      return product.imageURLs[0];
    }
    if (typeof product.imageURLs === 'string') {
      return product.imageURLs;
    }
    return 'https://via.placeholder.com/300';
  };

  const priceVal = product.cleanPrice || product.price || 0;

  // Toggle option so clicking again deselects it
  const handleOptionToggle = (variationId, option) => {
    setSelectedOptions((prev) => {
      const currentSelected = prev[variationId];
      if (currentSelected && currentSelected.id === option.id) {
        // Deselect if already selected
        const updated = { ...prev };
        delete updated[variationId];
        return updated;
      }
      // Select new option
      return {
        ...prev,
        [variationId]: option,
      };
    });
  };

  const handleConfirm = () => {
    onAddToCart(product, selectedOptions, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
      {/* Spacious Container mimicking the website page view */}
      <div className="bg-white rounded-3xl max-w-4xl w-full p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 bg-gray-100 hover:bg-gray-200 w-9 h-9 rounded-full flex items-center justify-center text-gray-600 font-bold transition-colors z-10"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left Side: Big Clean Image */}
          <div className="relative h-80 md:h-[400px] w-full bg-gray-50 rounded-2xl overflow-hidden shadow-inner">
            <img 
              src={getModalImage()} 
              alt={product.displayName || product.name} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Side: Details, Options, & Actions */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-1">
                {product.displayName || product.name || 'Customize Item'}
              </h2>
              <span className="text-xs text-gray-400 block font-medium mt-1">Starting from</span>
              <p className="text-red-600 font-extrabold text-2xl mb-4">Rs. {priceVal}</p>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {product.description || product.summary || 'Delicious item with multiple customizable options.'}
              </p>

              <div className="border-t border-gray-100 pt-4 mb-4">
                <h4 className="font-bold text-gray-800 text-sm mb-1">What's Included:</h4>
                <p className="text-xs text-gray-500">Includes ingredients and items as per specification.</p>
              </div>
            </div>

            {/* Variations Loop with Deselect Support */}
            <div className="space-y-4 my-2">
              {product.variations && product.variations.map((variation, vIndex) => {
                const varId = variation.id || vIndex;
                const varTitle = variation.displayName || variation.description || 'Select Option';
                const variationItems = variation.menuVariationItems || variation.options || [];

                return (
                  <div key={varId} className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-gray-800 text-xs tracking-wide uppercase">{varTitle}</h4>
                      {variation.isRequired ? (
                        <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          REQUIRED
                        </span>
                      ) : (
                        <span className="bg-gray-200 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          OPTIONAL
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {variationItems.map((opt, oIndex) => {
                        const optId = opt.id || oIndex;
                        const optName = opt.menuItemName || opt.name || opt.optionName || 'Option';
                        const optPrice = opt.price ? ` (+Rs. ${opt.price})` : '';
                        const isSelected = selectedOptions[varId]?.id === optId;

                        return (
                          <button
                            type="button"
                            key={optId}
                            onClick={() => handleOptionToggle(varId, opt)}
                            className={`py-2.5 px-3 text-xs font-semibold rounded-xl border transition-all text-center truncate ${
                              isSelected
                                ? 'bg-red-600 text-white border-red-600 shadow-md ring-2 ring-red-300'
                                : 'bg-white text-gray-700 border-gray-200 hover:border-red-400 hover:bg-red-50/20'
                            }`}
                          >
                            {optName} {optPrice}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quantity Counter & Wishlist Heart */}
            <div className="flex items-center gap-4 mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-4 py-2.5 text-gray-600 hover:bg-gray-200 font-bold transition-colors"
                >
                  -
                </button>
                <span className="px-5 text-sm font-bold text-gray-800">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-4 py-2.5 text-gray-600 hover:bg-gray-200 font-bold transition-colors"
                >
                  +
                </button>
              </div>

              <button 
                onClick={() => alert('Added to wishlist!')}
                className="p-3.5 border border-gray-200 rounded-xl hover:bg-red-50 hover:border-red-200 text-gray-500 hover:text-red-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Add To Cart Confirmation Button */}
            <button
              onClick={handleConfirm}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl font-black text-sm tracking-wide transition-colors shadow-lg shadow-red-600/30 mt-6 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              ADD TO CART
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default VariationsModal;