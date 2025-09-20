import React from 'react';
import { Link } from 'react-router-dom';

// Backend URL for images
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:9000";

const ProductGrid = ({ products, loading, error }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error}</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product, index) => {
        // Ensure image exists and prepend backend URL if relative
        let imageUrl = product?.images?.[0]?.url || "";
        if (imageUrl && !imageUrl.startsWith("http")) {
          imageUrl = `${BACKEND_URL}/${imageUrl.replace(/^\/+/, "")}`;
        }

        return (
          <Link key={product._id || index} to={`/products/${product._id}`} className="block">
            <div
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition animate-fadeIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-full h-40 sm:h-48 md:h-56 lg:h-64 mb-4 overflow-hidden rounded-lg flex items-center justify-center bg-gray-100">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={product.images?.[0]?.altText || product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">No Image</span>
                )}
              </div>

              {/* Product details */}
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
