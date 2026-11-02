import React from 'react';

const ProductCard = ({ product, onSelect }) => {
  if (!product) return null;

  const getImageSrc = () => {
    if (Array.isArray(product.imageURLs) && product.imageURLs.length > 0) {
      return product.imageURLs[0];
    }
    if (typeof product.imageURLs === 'string') {
      return product.imageURLs;
    }
    return 'https://via.placeholder.com/300';
  };

  const hasVariations = product.variations && product.variations.length > 0;
  const priceVal = product.cleanPrice || product.price || 0;

  return (
    <div 
      onClick={() => onSelect(product)}
      className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group relative"
    >
      {/* Wishlist Heart Icon Top Right */}
      <button 
        onClick={(e) => { e.stopPropagation(); alert('Added to wishlist!'); }}
        className="absolute top-3 right-3 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-sm text-gray-500 hover:text-red-600 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      <div>
        {/* Product Image */}
        <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
          <img
            src={getImageSrc()}
            alt={product.displayName || product.name || 'Food Item'}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300';
            }}
          />
        </div>

        {/* Product Details */}
        <div className="p-4">
          <h3 className="font-bold text-gray-900 text-base line-clamp-1">
            {product.displayName || product.name || 'Unnamed Item'}
          </h3>
          <p className="text-gray-500 text-xs mt-1 line-clamp-2">
            {product.description || product.summary || 'Delicious menu item'}
          </p>
        </div>
      </div>

      {/* Price & Add Button Section */}
      <div className="p-4 pt-0 flex items-center justify-between mt-2">
        <div>
          <span className="text-[10px] text-gray-400 block font-medium">Starting from</span>
          <span className="text-red-600 font-extrabold text-base">
            Rs. {priceVal}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(product);
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-md transition-colors"
        >
          {hasVariations ? 'Customize' : 'Add To Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;