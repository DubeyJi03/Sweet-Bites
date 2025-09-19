// Filename: Pagination.jsx
import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ currentPage, totalProducts, productsPerPage, onPageChange }) => {
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const pageNumbers = [];

    // Create a range of page numbers
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // Function to handle the click on a page number
    const handlePageClick = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            onPageChange(pageNumber);
        }
    };

    return (
        <nav className="flex items-center justify-center space-x-2">
            <button
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <FaChevronLeft />
            </button>

            <ul className="flex space-x-2">
                {pageNumbers.map(number => (
                    <li key={number}>
                        <button
                            onClick={() => handlePageClick(number)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                                ${currentPage === number
                                    ? 'bg-gray-900 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>

            <button
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <FaChevronRight />
            </button>
        </nav>
    );
};

export default Pagination;