import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { HiOutlineHome, HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineStar } from 'react-icons/hi';

const AddressManagement = () => {
  const { user } = useSelector((state) => state.auth);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    country: 'India',
    isDefault: false
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/addresses`,
        config
      );

      setAddresses(response.data);
    } catch (error) {
      console.error('Failed to fetch addresses:', error);
      setError('Failed to load addresses');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      fullName: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pinCode: '',
      country: 'India',
      isDefault: false
    });
    setShowAddForm(false);
    setEditingAddress(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const token = localStorage.getItem('userToken');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      if (editingAddress) {
        // Update existing address
        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/addresses/${editingAddress._id}`,
          formData,
          config
        );
        setMessage('Address updated successfully!');
      } else {
        // Create new address
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/addresses`,
          formData,
          config
        );
        setMessage('Address added successfully!');
      }

      fetchAddresses();
      resetForm();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save address');
    }

    setLoading(false);
  };

  const handleSetDefault = async (addressId) => {
    try {
      const token = localStorage.getItem('userToken');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/addresses/${addressId}/set-default`,
        {},
        config
      );

      setMessage('Default address updated!');
      fetchAddresses();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to set default address');
    }
  };

  const handleEdit = (address) => {
    setFormData({
      title: address.title,
      fullName: address.fullName,
      phone: address.phone,
      address: address.address,
      city: address.city,
      state: address.state,
      pinCode: address.pinCode,
      country: address.country,
      isDefault: address.isDefault
    });
    setEditingAddress(address);
    setShowAddForm(true);
  };

  const handleDelete = async (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        const token = localStorage.getItem('userToken');
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };

        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/addresses/${addressId}`,
          config
        );

        setMessage('Address deleted successfully!');
        fetchAddresses();
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to delete address');
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-amber-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Address Management</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors flex items-center"
        >
          <HiOutlinePlus className="w-4 h-4 mr-1" />
          Add Address
        </button>
      </div>

      {message && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700">{message}</p>
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Add/Edit Address Form */}
      {showAddForm && (
        <div className="mb-6 p-6 bg-amber-50 border border-amber-200 rounded-lg">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            {editingAddress ? 'Edit Address' : 'Add New Address'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="e.g., Home, Office, Work"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PIN Code *
                </label>
                <input
                  type="text"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Address *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                rows="3"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country *
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleInputChange}
                className="mr-2"
                id="isDefault"
              />
              <label htmlFor="isDefault" className="text-sm text-gray-700">
                Set as default address
              </label>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Saving...' : (editingAddress ? 'Update Address' : 'Add Address')}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Address List */}
      <div className="space-y-4">
        {addresses.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <HiOutlineHome className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No addresses found. Add your first address to get started.</p>
          </div>
        ) : (
          addresses.map((address) => (
            <div key={address._id} className={`border rounded-lg p-4 ${address.isDefault ? 'border-amber-300 bg-amber-50' : 'border-gray-200'}`}>
              <div className="flex justify-between items-start">
                <div className="flex-grow">
                  <div className="flex items-center mb-2">
                    <h3 className="text-lg font-medium text-gray-800">{address.title}</h3>
                    {address.isDefault && (
                      <span className="ml-2 px-2 py-1 bg-amber-200 text-amber-800 text-xs rounded-full flex items-center">
                        <HiOutlineStar className="w-3 h-3 mr-1" />
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 font-medium">{address.fullName}</p>
                  <p className="text-gray-600">{address.phone}</p>
                  <p className="text-gray-600 mt-2">
                    {address.address}<br />
                    {address.city}, {address.state} - {address.pinCode}<br />
                    {address.country}
                  </p>
                </div>
                
                <div className="flex gap-2 ml-4">
                  {!address.isDefault && (
                    <button
                      onClick={() => handleSetDefault(address._id)}
                      className="p-2 text-amber-600 hover:bg-amber-100 rounded-lg transition-colors"
                      title="Set as default"
                    >
                      <HiOutlineStar className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleEdit(address)}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                    title="Edit address"
                  >
                    <HiOutlinePencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(address._id)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    title="Delete address"
                  >
                    <HiOutlineTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AddressManagement;
