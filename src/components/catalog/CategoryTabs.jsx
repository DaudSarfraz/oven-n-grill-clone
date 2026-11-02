import React from 'react';

const CategoryTabs = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <div className="flex overflow-x-auto space-x-3 pb-4 mb-6 scrollbar-hide">
      {/* All Categories Button */}
      <button
        onClick={() => onSelectCategory('ALL')}
        className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all shadow-sm ${
          activeCategory === 'ALL'
            ? 'bg-red-600 text-white shadow-md'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All
      </button>

      {/* Dynamic Category Buttons */}
      {categories?.map((category) => (
        <button
          key={category.menuCategoryID}
          onClick={() => onSelectCategory(category.menuCategoryID)}
          className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all shadow-sm ${
            String(activeCategory) === String(category.menuCategoryID)
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category.menuCategoryName}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;