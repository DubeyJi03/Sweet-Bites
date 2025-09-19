import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

// Import the necessary components and Redux action
import Hero from "../components/Layout/Hero";
import CakeCollectionSection from "../components/Products/CakeCollectionSection";
import Customized from "../components/Products/Customized";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";
import FeaturesSection from "../components/Products/FeaturesSection";
import { fetchProductsByFilters } from '../redux/slices/productsSlice'; // Correct import path

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProducts, setBestSellerProducts] = useState(null);
  const [bestSellerLoading, setBestSellerLoading] = useState(true);

  useEffect(() => {
    // Dispatch action to fetch products for a specific collection
    dispatch(fetchProductsByFilters({ 
      category: "Premium Sweets",
      limit: 8,
      sweetType: "classic",
    }));

    // Fetch best seller products
    const fetchBestSellers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`);
        setBestSellerProducts(response.data); 
      } catch (error) {
        console.error("Error fetching best seller products:", error);
      } finally {
        setBestSellerLoading(false);
      }
    };

    fetchBestSellers();
  }, [dispatch]);

  return (
    <div>
      <Hero />
      <div className="animate-slideUp">
        <CakeCollectionSection />
      </div>
      <div className="animate-slideUp animation-delay-200">
        <Customized />
        <h2 className="text-3xl text-center font-bold mb-4">
          Best Seller
        </h2>
        {bestSellerLoading ? (
          <p className='text-center'>Loading best sellers...</p>
        ) : (
          bestSellerProducts ? (
            <ProductDetails productId={bestSellerProducts._id} />
          ) : (
            <p className='text-center'>No best sellers found.</p>
          )
        )}
      </div>

      <div className="my-16 animate-slideUp animation-delay-300">
        <div className='container mx-auto'>
          <h2 className="text-3xl text-center font-bold mb-4">
            Explore Our Sweet Products
          </h2>
          <ProductGrid products={products.slice(0,8)} loading={loading} error={error} />
        </div>
      </div>
      <div className="animate-slideUp animation-delay-400">
        <FeaturedCollection />
      </div>
      <div className="animate-fadeIn animation-delay-600">
        <FeaturesSection />
      </div>
    </div>
  );
};

export default Home;