import React from 'react';
import { Link } from 'react-router-dom';

const ProductGrid = ({ products, loading, error }) => {
  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-500">Error: {error}</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product, index) => {
        const imageUrl = product.images?.[0]?.url || '/placeholder.png';
        const imageAlt = product.images?.[0]?.altText || product.name;

        return (
          <Link key={product._id || index} to={`/products/${product._id}`} className="block">
            <div
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-all duration-300"
              style={{ animation: `fadeIn 0.5s ease forwards`, animationDelay: `${index * 0.1}s`, opacity: 0 }}
            >
              <div className="w-full h-40 sm:h-48 md:h-56 lg:h-64 mb-4 overflow-hidden rounded-lg">
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              <h3 className="text-base font-medium mb-1 line-clamp-1">{product.name}</h3>
              <p className="text-gray-600 font-semibold text-sm">₹{product.price}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductGrid;
