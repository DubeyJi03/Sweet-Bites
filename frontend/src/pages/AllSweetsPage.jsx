import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HiStar, HiOutlineStar } from 'react-icons/hi2';
import { HiHeart, HiOutlineShoppingBag } from 'react-icons/hi';
import { IoFilter } from 'react-icons/io5';
import { addToCart } from '../redux/slices/cartSlice';
import { toast } from 'sonner';
import { allProducts, getProductsByCategory } from '../data/allProducts';

const AllSweetsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');
  const [filterBy, setFilterBy] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    fetchAllSweets();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, sortBy, filterBy]);

  const fetchAllSweets = async () => {
    try {
      // Use data from allProducts.js - convert to display format
      const sweetsData = allProducts.map(product => ({
        ...product,
        image: product.images[0]?.url || '/images/placeholder.jpg',
        category: product.subcategory // Use subcategory for filtering
      }));
      
      setProducts(sweetsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = [...products];

    // Filter by category
    if (filterBy !== 'all') {
      filtered = filtered.filter(product => product.category === filterBy);
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Featured - keep original order
        break;
    }

    setFilteredProducts(filtered);
  };

  const handleAddToCart = async (product) => {
    try {
      // Generate a guest ID if user is not logged in
      const guestId = localStorage.getItem('guestId') || 
        'guest_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      
      if (!localStorage.getItem('guestId')) {
        localStorage.setItem('guestId', guestId);
      }

      const cartData = {
        productId: product.id,
        quantity: 1,
        weights: product.weight || '250g', // Default weight
        guestId: guestId,
        userId: null // For guest users
      };

      console.log('Adding to cart:', cartData);
      
      await dispatch(addToCart(cartData)).unwrap();
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      console.error('Add to cart error:', error);
      toast.error('Failed to add item to cart');
    }
  };



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">All Sweets</h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover our complete collection of traditional and premium sweets, 
              carefully crafted with authentic recipes and finest ingredients.
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Filter Toggle for Mobile */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg"
              >
                <IoFilter className="h-4 w-4" />
                Filters
              </button>
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            {/* Desktop Filters */}
            <div className={`flex flex-col md:flex-row gap-4 ${showFilters ? 'block' : 'hidden md:flex'}`}>
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="all">All Categories</option>
                <option value="mithai">Mithai</option>
                <option value="ladoos">Ladoos</option>
                <option value="bengali">Bengali Sweets</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.discount && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                    {product.discount}% OFF
                  </div>
                )}
                <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-amber-50 transition-colors">
                  <HiHeart className="h-5 w-5 text-gray-600 hover:text-red-500" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <Link to={`/products/${product.id}`} className="block mb-2">
                  <h3 className="font-semibold text-gray-800 hover:text-amber-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>



                {/* Price */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl font-bold text-gray-800">
                    ₹{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {product.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <HiOutlineShoppingBag className="h-4 w-4" />
                    Add to Cart
                  </button>
                  <Link
                    to={`/products/${product.id}`}
                    className="px-4 py-2 border border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50 transition-colors duration-200"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllSweetsPage;
