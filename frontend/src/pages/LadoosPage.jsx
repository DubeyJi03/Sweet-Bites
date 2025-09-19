import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaFilter } from 'react-icons/fa';
import { addToCart } from '../redux/slices/cartSlice';
import { toast } from 'sonner';
import { getProductsByCategory } from '../data/allProducts';
import FilterSidebar from '../components/Products/FilterSidebar';
import SortOptions from '../components/Products/SortOptions';
import ProductGrid from '../components/Products/ProductGrid';

const LadoosPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');
  const [filterBy, setFilterBy] = useState('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const sidebarRef = useRef(null);

  useEffect(() => {
    fetchLadoos();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, sortBy, filterBy]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchLadoos = async () => {
    try {
      const ladooProducts = getProductsByCategory('ladoos').map((product) => ({
        ...product,
        _id: product.id,
        images: [{ url: product.images[0]?.url || '/images/placeholder.jpg' }],
        category: product.tags[0] || 'traditional',
      }));

      setProducts(ladooProducts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching ladoos:', error);
      setLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = [...products];

    if (filterBy !== 'all') {
      filtered = filtered.filter((product) => product.category === filterBy);
    }

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
        break;
    }

    setFilteredProducts(filtered);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
      <div className="flex flex-col lg:flex-row">
        <button
          onClick={toggleSidebar}
          className="lg:hidden mx-4 my-4 p-3 flex justify-center items-center bg-white text-gray-700 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
        >
          <FaFilter className="mr-2" />
          Filter Products
        </button>

        <div
          ref={sidebarRef}
          className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          fixed inset-y-0 z-50 left-0 w-80 bg-white shadow-xl transition-transform duration-300
          lg:static lg:translate-x-0 lg:w-72 lg:min-h-screen lg:shadow-lg lg:border-r lg:border-gray-200`}
        >
          <FilterSidebar setFilterBy={setFilterBy} filterBy={filterBy} />
        </div>

        <div className="flex-1 bg-white lg:bg-gray-50">
          <div className="max-w-7xl mx-auto p-6 lg:p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Traditional Ladoos
              </h1>
              <p className="text-gray-600">Handcrafted ladoos made with authentic recipes</p>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
              <div className="text-sm text-gray-600">
                {filteredProducts.length > 0 && (
                  <span>{filteredProducts.length} delicious ladoo varieties</span>
                )}
              </div>
              <SortOptions sortBy={sortBy} setSortBy={setSortBy} />
            </div>
            
            <div className="bg-white lg:bg-transparent lg:rounded-lg lg:shadow-sm lg:p-6">
              <ProductGrid products={filteredProducts} />
              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🥜</div>
                  <p className="text-gray-600 text-lg mb-4">No ladoos found matching your criteria.</p>
                  <button
                    onClick={() => setFilterBy('all')}
                    className="text-amber-600 hover:text-amber-700 underline font-medium"
                  >
                    View All Ladoos
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LadoosPage;