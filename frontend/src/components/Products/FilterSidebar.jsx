import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const FilterSidebar = ({ isSidebarOpen, sidebarRef, toggleSidebar }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    category: "",
    type: "",
    sweetType: "",
    collections: "",
    weight: "",
    customWeight: "",
    minPrice: 0,
    maxPrice: 1500,
  });

  const [priceRange, setPriceRange] = useState([0, 1500]);

  // Options
  const categories = ["Rajbhog", "Premium Sweets"];
  const types = ["Traditional", "Special", "Halwa"];
  const sweetTypes = ["classic", "ladoo", "barfi", "halwa", "mithai", "bengali"];
  const collections = [
    "Festival Specials",
    "Bengali Classics",
    "Milk Sweets",
    "Dryfruit Collection",
  ];
  const weights = ["250g", "500g", "1kg", "2kg"];

  // Sync state with URL params
  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      category: params.category || "",
      type: params.type || "",
      sweetType: params.sweetType || "",
      collections: params.collections || "",
      weight: params.weight || "",
      customWeight: params.customWeight || "",
      minPrice: Number(params.minPrice) || 0,
      maxPrice: Number(params.maxPrice) || 1500,
    });

    setPriceRange([0, Number(params.maxPrice) || 1500]);
  }, [searchParams]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value, customWeight: "" };
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  // Handle custom weight input
  const handleCustomWeightChange = (e) => {
    const value = e.target.value;
    const newFilters = {
      ...filters,
      weight: "",
      customWeight: value && value >= 250 ? value : "",
    };

    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  // Update URL params
  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();

    Object.keys(newFilters).forEach((key) => {
      const value = newFilters[key];
      if (value !== "" && value !== 0 && value !== null) {
        params.append(key, value);
      }
    });

    setSearchParams(params, { replace: true });
  };

  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setPriceRange([0, newPrice]);
    const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice };
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  // Reset all filters
  const handleResetFilters = () => {
    const newFilters = {
      category: "",
      type: "",
      sweetType: "",
      collections: "",
      weight: "",
      customWeight: "",
      minPrice: 0,
      maxPrice: 1500,
    };
    setFilters(newFilters);
    setPriceRange([0, 1500]);
    setSearchParams({});
  };

  return (
    <div className="h-full bg-white lg:shadow-lg lg:rounded-lg">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Filter Sweets</h3>
          <button
            onClick={handleResetFilters}
            className="text-sm text-amber-600 hover:text-amber-700 font-medium transition-colors duration-200"
          >
            Reset All
          </button>
        </div>
      </div>
      
      {/* Scrollable Content */}
      <div className="px-6 py-4 space-y-6 overflow-y-auto max-h-screen filter-sidebar-scrollbar">
        {/* Note: The max-h-screen will be overridden by the parent container */}

        {/* Category */}
        <FilterGroup
          label="Category"
          options={categories}
          selected={filters.category}
          name="category"
          onChange={handleFilterChange}
        />

        {/* Types */}
        <FilterGroup
          label="Types"
          options={types}
          selected={filters.type}
          name="type"
          onChange={handleFilterChange}
        />

        {/* Sweet Type */}
        <FilterGroup
          label="Sweet Type"
          options={sweetTypes}
          selected={filters.sweetType}
          name="sweetType"
          onChange={handleFilterChange}
          capitalize
        />

        {/* Collections */}
        <FilterGroup
          label="Collections"
          options={collections}
          selected={filters.collections}
          name="collections"
          onChange={handleFilterChange}
        />

        {/* Weights */}
        <FilterGroup
          label="Weight"
          options={weights}
          selected={filters.weight}
          name="weight"
          onChange={handleFilterChange}
        />

        {/* Price Range */}
        <div className="space-y-3">
          <label
            htmlFor="priceRange"
            className="block text-sm font-semibold text-gray-800"
          >
            Price Range: <span className="text-amber-600 font-bold">₹{priceRange[1]}</span>
          </label>
          <input
            type="range"
            id="priceRange"
            min={0}
            max={1500}
            value={priceRange[1]}
            onChange={handlePriceChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${(priceRange[1] / 1500) * 100}%, #e5e7eb ${(priceRange[1] / 1500) * 100}%, #e5e7eb 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>₹0</span>
            <span>₹1500</span>
          </div>
        </div>
      </div>
      
      {/* Footer with Apply Filters Button */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
        <button
          onClick={handleResetFilters}
          className="w-full px-4 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors duration-200 shadow-sm"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

// Reusable Filter Group Component
const FilterGroup = ({ label, options, selected, name, onChange, capitalize }) => (
  <div className="space-y-3">
    <label className="block text-sm font-semibold text-gray-800 uppercase tracking-wide">{label}</label>
    <div className="space-y-2.5">
      {options.map((opt) => (
        <label
          key={opt}
          htmlFor={`${name}-${opt}`}
          className="flex items-center space-x-3 cursor-pointer group py-1 px-2 rounded-md hover:bg-amber-50 transition-colors duration-150"
        >
          <input
            type="radio"
            id={`${name}-${opt}`}
            name={name}
            value={opt}
            checked={selected === opt}
            onChange={onChange}
            className="h-4 w-4 text-amber-600 focus:ring-amber-500 focus:ring-offset-0 border-gray-300 cursor-pointer"
          />
          <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-150 select-none">
            {capitalize ? opt.charAt(0).toUpperCase() + opt.slice(1) : opt}
          </span>
        </label>
      ))}
    </div>
  </div>
);

export default FilterSidebar;
