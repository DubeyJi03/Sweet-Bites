import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaFilter } from 'react-icons/fa';
import { toast } from 'sonner';

// Reusing existing components
import FilterSidebar from '../components/Products/FilterSidebar';
import SortOptions from '../components/Products/SortOptions';
import ProductGrid from '../components/Products/ProductGrid';

// Assuming you have a slice to handle products by collection
import { fetchProductsByFilters } from '../redux/slices/productsSlice';

const MithaiCollectionPage = () => {
    const { collection } = useParams();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    const { products, loading, error } = useSelector((state) => state.products);
    const queryParams = Object.fromEntries([...searchParams]);

    const sidebarRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchProductsByFilters({ collection, ...queryParams }));
    }, [dispatch, collection, searchParams]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleClickOutside = (e) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    // Determine the title based on the URL parameter
    const pageTitle = collection
        ? `${collection.charAt(0).toUpperCase() + collection.slice(1)} Collection`
        : 'All Products';

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
                    <FilterSidebar />
                </div>

                <div className="flex-1 bg-white lg:bg-gray-50">
                    <div className="max-w-7xl mx-auto p-6 lg:p-8">
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                {pageTitle}
                            </h1>
                            <p className="text-gray-600">Explore our premium mithai collection</p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                            <div className="text-sm text-gray-600">
                                {products?.length > 0 && (
                                    <span>{products.length} product{products.length !== 1 ? 's' : ''} found</span>
                                )}
                            </div>
                            <SortOptions />
                        </div>
                        
                        <div className="bg-white lg:bg-transparent lg:rounded-lg lg:shadow-sm lg:p-6">
                            <ProductGrid products={products} loading={loading} error={error} />
                            
                            {!loading && products.length === 0 && (
                                <div className="text-center py-16">
                                    <div className="text-6xl mb-4">🍬</div>
                                    <p className="text-gray-600 text-lg mb-4">No products found matching your criteria.</p>
                                    <Link to="/collections/all?sweetType=mithai" className="text-amber-600 hover:text-amber-700 underline font-medium">
                                        View All Collections
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MithaiCollectionPage;