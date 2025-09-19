// Filename: CollectionPage.jsx
import React, { useEffect, useRef, useState } from 'react';
import { FaFilter } from "react-icons/fa";
import FilterSidebar from '../components/Products/FilterSidebar';
import SortOptions from '../components/Products/SortOptions';
import ProductGrid from '../components/Products/ProductGrid';
import Pagination from '../components/Products/Pagination';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../redux/slices/productsSlice';

// A helper function to create pagination URLs
const createPaginationUrl = (params, page) => {
    const newParams = { ...params, page: page.toString() };
    const searchString = new URLSearchParams(newParams).toString();
    return `?${searchString}`;
};

const CollectionPage = () => {
    const { collection } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    const queryParams = Object.fromEntries([...searchParams]);

    const sidebarRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Pagination constants
    const productsPerPage = 48; // Set products per page
    const currentPage = parseInt(queryParams.page) || 1;
    const totalProducts = products.length; // Assumes all products are loaded, though for better performance you would get this from the API

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    useEffect(() => {
        // Fetch products, including filters and pagination info
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
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const pageTitle = collection
        ? `${collection.charAt(0).toUpperCase() + collection.slice(1)} Collection`
        : 'All Products';

    const handlePageChange = (pageNumber) => {
        // Update URL to reflect the new page number, which triggers useEffect
        const newUrl = createPaginationUrl(queryParams, pageNumber);
        setSearchParams(new URLSearchParams(newUrl));
        // You might also want to scroll to the top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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
                                {pageTitle}
                            </h1>
                            <p className="text-gray-600">Discover our handcrafted sweet collections</p>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                            <div className="text-sm text-gray-600">
                                {products?.length > 0 && (
                                    <span>{totalProducts} product{totalProducts !== 1 ? 's' : ''} found</span>
                                )}
                            </div>
                            <SortOptions />
                        </div>

                        <div className="bg-white lg:bg-transparent lg:rounded-lg lg:shadow-sm lg:p-6">
                            <ProductGrid products={currentProducts} loading={loading} error={error} />
                        </div>

                        {/* Pagination component */}
                        {totalProducts > productsPerPage && (
                            <div className="mt-8 flex justify-center">
                                <Pagination
                                    currentPage={currentPage}
                                    totalProducts={totalProducts}
                                    productsPerPage={productsPerPage}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollectionPage;