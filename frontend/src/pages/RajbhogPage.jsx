import React, { useEffect, useRef, useState } from 'react';
import { FaFilter } from "react-icons/fa";
import FilterSidebar from '../components/Products/FilterSidebar';
import SortOptions from '../components/Products/SortOptions';
import ProductGrid from '../components/Products/ProductGrid';
import axios from 'axios';

const RajbhogPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch Rajbhog products from backend
  useEffect(() => {
    fetchRajbhogProducts();
  }, []);

  const fetchRajbhogProducts = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Get backend URL from environment or use default
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:9000';
      console.log('Fetching from:', `${backendUrl}/api/products?category=Rajbhog`);
      
      const response = await axios.get(
        `${backendUrl}/api/products?category=Rajbhog`
      );
      
      console.log('API Response:', response.data);
      console.log('Total products received:', response.data?.length || 0);
      
      if (response.data && response.data.length > 0) {
        setProducts(response.data);
      } else {
        console.log('No products in response, trying fallback...');
        loadMockRajbhogProducts();
      }
    } catch (error) {
      console.error('Failed to fetch Rajbhog products:', error);
      console.error('Error details:', error.response?.data || error.message);
      setError(`Failed to load products: ${error.response?.data?.message || error.message}`);
      
      // Fallback to mock data if API fails
      console.log('Trying fallback method...');
      loadMockRajbhogProducts();
    } finally {
      setLoading(false);
    }
  };

  const loadMockRajbhogProducts = async () => {
    try {
      // Try to fetch all products and filter Rajbhog category as fallback
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:9000';
      console.log('Fallback: Fetching all products from:', `${backendUrl}/api/products`);
      
      const response = await axios.get(`${backendUrl}/api/products`);
      console.log('Fallback: Total products received:', response.data?.length || 0);
      
      if (response.data && Array.isArray(response.data)) {
        const rajbhogProducts = response.data.filter(product => 
          product.category === 'Rajbhog'
        );
        console.log('Fallback: Filtered Rajbhog products:', rajbhogProducts.length);
        
        if (rajbhogProducts.length > 0) {
          setProducts(rajbhogProducts);
          setError('');
        } else {
          console.log('Fallback: No Rajbhog products found, loading static data');
          loadStaticProducts();
        }
      } else {
        console.log('Fallback: Invalid response format, loading static data');
        loadStaticProducts();
      }
    } catch (error) {
      console.error('Fallback API call failed:', error);
      console.log('Loading static products as last resort');
      loadStaticProducts();
    }
  };
  
  const loadStaticProducts = () => {
    // Static products as last resort
    const staticProducts = [
      {
        _id: "static1",
        name: "Traditional Gulab Jamun",
        description: "Soft, spongy milk-based dumplings soaked in fragrant sugar syrup.",
        price: 350,
        discountPrice: 320,
        category: "Rajbhog",
        images: [{ url: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=500&q=80", altText: "Gulab Jamun" }],
        weights: ["250g", "500g", "1kg"],
        countInStock: 50
      },
      {
        _id: "static2",
        name: "Premium Besan Ladoo",
        description: "Round, aromatic balls made from roasted gram flour, ghee, and sugar.",
        price: 300,
        discountPrice: 280,
        category: "Rajbhog",
        images: [{ url: "https://images.unsplash.com/photo-1599291113443-4089effa4b48?w=500&q=80", altText: "Besan Ladoo" }],
        weights: ["250g", "500g", "1kg"],
        countInStock: 60
      },
      {
        _id: "static3",
        name: "Royal Rasgulla",
        description: "Spongy, soft cheese dumplings made from chhena, cooked in light sugar syrup.",
        price: 320,
        discountPrice: 300,
        category: "Rajbhog",
        images: [{ url: "https://images.unsplash.com/photo-1603048719539-9ecb4ac3d40c?w=500&q=80", altText: "Rasgulla" }],
        weights: ["250g", "500g", "1kg"],
        countInStock: 35
      },
      {
        _id: "static4",
        name: "Kaju Katli",
        description: "Rich and delicious sweet made from cashew paste and sugar.",
        price: 450,
        discountPrice: 420,
        category: "Rajbhog",
        images: [{ url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&q=80", altText: "Kaju Katli" }],
        weights: ["250g", "500g", "1kg"],
        countInStock: 25
      },
      {
        _id: "static5",
        name: "Golden Jalebi",
        description: "Crispy, pretzel-like swirls of fried batter soaked in warm sugar syrup.",
        price: 250,
        discountPrice: 230,
        category: "Rajbhog",
        images: [{ url: "https://images.unsplash.com/photo-1626132647346-59ba7d3a638e?w=500&q=80", altText: "Jalebi" }],
        weights: ["250g", "500g", "1kg"],
        countInStock: 40
      },
      {
        _id: "static6",
        name: "Coconut Ladoo",
        description: "Soft, chewy ladoos made from freshly grated coconut, condensed milk, and cardamom.",
        price: 280,
        discountPrice: 260,
        category: "Rajbhog",
        images: [{ url: "https://images.unsplash.com/photo-1609501676725-7186f492c9b5?w=500&q=80", altText: "Coconut Ladoo" }],
        weights: ["250g", "500g", "1kg"],
        countInStock: 55
      }
    ];
    
    console.log('Loading static products:', staticProducts.length);
    setProducts(staticProducts);
    setError('Using offline product data. Please check your internet connection.');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row">
        {/* Mobile filter button */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden mx-4 my-4 p-3 flex justify-center items-center bg-white text-gray-700 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
        >
          <FaFilter className="mr-2" />
          Filter Products
        </button>

        {/* Filter Sidebar */}
        <div
          ref={sidebarRef}
          className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          fixed inset-y-0 z-50 left-0 w-80 bg-white shadow-xl transition-transform duration-300
          lg:static lg:translate-x-0 lg:w-72 lg:min-h-screen lg:shadow-lg lg:border-r lg:border-gray-200`}
        >
          <FilterSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white lg:bg-gray-50">
          <div className="max-w-7xl mx-auto p-6 lg:p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Rajbhog Sweets Collection
              </h1>
              <p className="text-gray-600">Premium traditional sweets crafted with love</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700">{error}</p>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
              <div className="text-sm text-gray-600">
                {products?.length > 0 && (
                  <span>{products.length} product{products.length !== 1 ? 's' : ''} available</span>
                )}
              </div>
              <SortOptions />
            </div>
            
            <div className="bg-white lg:bg-transparent lg:rounded-lg lg:shadow-sm lg:p-6">
              {products.length === 0 && !loading ? (
                <div className="text-center py-16">
                  <div className="text-gray-400 mb-4">
                    <svg className="mx-auto h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No Rajbhog Products Found</h3>
                  <p className="text-gray-500">Check back soon for our delicious Rajbhog collection!</p>
                </div>
              ) : (
                <ProductGrid products={products} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RajbhogPage;
