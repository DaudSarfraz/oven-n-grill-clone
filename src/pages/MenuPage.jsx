import React, { useState, useMemo } from 'react';
import { useGetSalesCatalogQuery } from '../api/catalogApi';
import CategoryTabs from '../components/catalog/CategoryTabs';
import ProductCard from '../components/catalog/ProductCard';
import VariationsModal from '../components/catalog/VariationsModal';

const MenuPage = () => {
  const { data, isLoading, isError } = useGetSalesCatalogQuery();
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeModalProduct, setActiveModalProduct] = useState(null);

  const allProducts = useMemo(() => {
    if (!data) return [];
    
    const rawItems = data?.data?.menuItems || data?.menuItems || [];
    
    return rawItems.map((item) => {
      let priceVal = item.price || item.displayPrice || 0;
      return {
        ...item,
        id: item.id,
        name: item.summary || item.description || item.displayName || 'Menu Item',
        cleanPrice: priceVal,
        imageURLs: item.imageURLs?.[0] || item.imageURLs || 'https://via.placeholder.com/300',
        categoryId: item.menuCategoryID,
        categoryName: item.menuCategoryName,
      };
    });
  }, [data]);

  // Unique categories dynamically generate 
  const categories = useMemo(() => {
    if (!allProducts.length) return [];
    
    const uniqueCats = new Map();
    allProducts.forEach((item) => {
      if (item.categoryId && item.categoryName) {
        uniqueCats.set(String(item.categoryId), {
          menuCategoryID: item.categoryId,
          menuCategoryName: item.categoryName,
        });
      }
    });

    return Array.from(uniqueCats.values());
  }, [allProducts]);

  // Filter Products based on Selected Tab ID
  const filteredProducts = useMemo(() => {
    if (!allProducts.length) return [];
    if (!selectedCategory || selectedCategory === 'ALL' || selectedCategory === 'all') {
      return allProducts;
    }

    return allProducts.filter(
      (item) => String(item.categoryId) === String(selectedCategory)
    );
  }, [allProducts, selectedCategory]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-600 font-semibold">
        Failed to fetch Oven N Grill catalog data. Please check your network.
      </div>
    );
  }

  const handleCardSelect = (product) => {
    if (product.variations && product.variations.length > 0) {
      setActiveModalProduct(product);
    } else {
      alert(`Added to cart: ${product.name}`);
    }
  };

  const handleAddToCartWithVariations = (product, options, quantity) => {
    console.log('Product Added with Choices & Qty:', product, options, quantity);
    alert(`Added ${quantity} x ${product.name} with selected options!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">Oven N Grill Menu</h1>
        <p className="text-gray-500 mt-1">Explore delicious pizzas, burgers, and deals.</p>
      </header>

      {/* Categories Bar */}
      <CategoryTabs
        categories={categories}
        activeCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={handleCardSelect}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-400 font-medium">
            No items found in this category.
          </div>
        )}
      </div>

      {/* Detail View Container */}
      <VariationsModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
        onAddToCart={handleAddToCartWithVariations}
      />
    </div>
  );
};

export default MenuPage;