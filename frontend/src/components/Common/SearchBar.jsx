import React, { useState } from 'react';
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFilters, fetchProductsByFilters } from '../../redux/slices/productsSlice';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSearchToggle = () => {
        setIsOpen(!isOpen);
    }

   const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setFilters({ search: searchTerm })); // Corrected from searchFilters
    dispatch(fetchProductsByFilters({ search: searchTerm }));
    navigate(`/collections/all?search=${searchTerm}`);
    setIsOpen(false);
}
  return (
    <div className={`flex items-center justify-center w-full transition-all duration-300 ${isOpen ? 
    "fixed top-0 left-0 z-50 bg-white/95 backdrop-blur-sm h-24 shadow-md" : "w-auto"}`}>
        {isOpen ? (
            <form 
            onSubmit={handleSearch}
            className="relative flex items-center justify-center w-full animate-fadeIn">
                <div className="relative w-1/2">
                    <input 
                    type="text" 
                    placeholder="Search for sweets..." 
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm} 
                    className="bg-gray-100 px-5 py-3 pl-5 pr-12 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-400 w-full 
                    placeholder:text-gray-500 shadow-sm transition-all duration-300 animate-slideUp" 
                    autoFocus
                    />
                    {/* Search Icon */}
                    <button 
                      type="submit" 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 
                      text-gray-600 hover:text-amber-600 transition-colors duration-200"
                    >
                        <HiMagnifyingGlass className="h-5 w-5" />
                    </button>
                </div>
                <button 
                  type="button" 
                  onClick={handleSearchToggle}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-amber-600 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
                >
                    <HiMiniXMark className="h-6 w-6" />
                </button>
            </form>
        ) : (
        <button 
          onClick={handleSearchToggle}
          className="text-gray-700 hover:text-amber-600 transition-colors duration-200"
        >
            <HiMagnifyingGlass className='h-6 w-6' />
        </button>
        )}
    </div>
  )
}

export default SearchBar