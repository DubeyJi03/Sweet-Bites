import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../redux/slices/authSlice'
import { clearCart } from '../redux/slices/cartSlice' // ✅ Corrected: Added this import
import MyOrdersPage from "../pages/MyOrdersPage";
import AccountDetails from "../pages/AccountDetails";
import AddressManagement from "../pages/AddressManagement";
import { HiOutlineLogout, HiOutlineUser, HiOutlineHome, HiOutlineShoppingBag } from "react-icons/hi";


const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeSection, setActiveSection] = useState('orders');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart()); // This will now work
    navigate('/');
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  if (!user) {
    return null; 
  }
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='flex-grow container mx-auto p-4 md:p-6 lg:p-8'>
        <h1 className='text-2xl md:text-3xl font-bold mb-6 text-gray-800'>My Account</h1>

        {/* Mobile Navigation - Only visible on small screens */}
        {isMobile && (
          <div className='bg-white shadow-md rounded-lg p-4 mb-6 border border-amber-100 animate-fadeIn'>
            <div className='grid grid-cols-2 gap-3'>
              <button 
                onClick={() => handleSectionChange('account')}
                className={`p-3 rounded-lg border border-amber-100 flex flex-col items-center transition-colors ${
                  activeSection === 'account' ? 'bg-amber-100 border-amber-200' : 'bg-amber-50 hover:bg-amber-100'
                }`}
              >
                <HiOutlineUser className='w-6 h-6 text-amber-600 mb-1' />
                <span className='text-sm font-medium text-gray-800'>Account</span>
              </button>
              <button 
                onClick={() => handleSectionChange('orders')}
                className={`p-3 rounded-lg border border-amber-100 flex flex-col items-center transition-colors ${
                  activeSection === 'orders' ? 'bg-amber-100 border-amber-200' : 'bg-amber-50 hover:bg-amber-100'
                }`}
              >
                <HiOutlineShoppingBag className='w-6 h-6 text-amber-600 mb-1' />
                <span className='text-sm font-medium text-gray-800'>Orders</span>
              </button>
              <button 
                onClick={() => handleSectionChange('addresses')}
                className={`p-3 rounded-lg border border-amber-100 flex flex-col items-center transition-colors ${
                  activeSection === 'addresses' ? 'bg-amber-100 border-amber-200' : 'bg-amber-50 hover:bg-amber-100'
                }`}
              >
                <HiOutlineHome className='w-6 h-6 text-amber-600 mb-1' />
                <span className='text-sm font-medium text-gray-800'>Addresses</span>
              </button>
              <button 
                onClick={handleLogout}
                className='p-3 rounded-lg bg-red-50 border border-red-100 flex flex-col items-center hover:bg-red-100 transition-colors'
              >
                <HiOutlineLogout className='w-6 h-6 text-red-600 mb-1' />
                <span className='text-sm font-medium text-gray-800'>Logout</span>
              </button>
            </div>
          </div>
        )}

        <div className='flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0'>
          {/* Left Section */}
          <div className='w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6 bg-white border border-amber-100 animate-fadeIn'>
            <div className='flex items-center mb-6'>
              <div className='w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mr-4'>
                <HiOutlineUser className='w-8 h-8 text-amber-600' />
              </div>
              <div>
                <h2 className='text-xl font-semibold text-gray-800'>{user?.name || 'User'}</h2>
                <p className='text-sm text-gray-600'>{user?.email || 'user@example.com'}</p>
              </div>
            </div>

            <div className='space-y-4'>
              <button 
                onClick={() => handleSectionChange('account')}
                className={`w-full p-4 rounded-lg border border-amber-100 text-left transition-colors ${
                  activeSection === 'account' ? 'bg-amber-100 border-amber-200' : 'bg-amber-50 hover:bg-amber-100'
                }`}
              >
                <h3 className='font-medium text-gray-800 mb-1'>Account Details</h3>
                <p className='text-sm text-gray-600'>Manage your personal information</p>
              </button>

              <button 
                onClick={() => handleSectionChange('orders')}
                className={`w-full p-4 rounded-lg border border-amber-100 text-left transition-colors ${
                  activeSection === 'orders' ? 'bg-amber-100 border-amber-200' : 'bg-amber-50 hover:bg-amber-100'
                }`}
              >
                <h3 className='font-medium text-gray-800 mb-1'>My Orders</h3>
                <p className='text-sm text-gray-600'>View your order history</p>
              </button>

              <button 
                onClick={() => handleSectionChange('addresses')}
                className={`w-full p-4 rounded-lg border border-amber-100 text-left transition-colors ${
                  activeSection === 'addresses' ? 'bg-amber-100 border-amber-200' : 'bg-amber-50 hover:bg-amber-100'
                }`}
              >
                <h3 className='font-medium text-gray-800 mb-1'>Address Book</h3>
                <p className='text-sm text-gray-600'>Manage your shipping addresses</p>
              </button>
            </div>

            <button 
              onClick={handleLogout}
              className='w-full bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition-colors mt-6 flex items-center justify-center'
            >
              <HiOutlineLogout className='mr-2' />
              Logout
            </button>
          </div>
          <div className='w-full md:w-2/3 lg:w-3/4 animate-fadeIn'>
            {activeSection === 'account' && <AccountDetails />}
            {activeSection === 'orders' && (
              <div className='bg-white shadow-md rounded-lg p-6 border border-amber-100 profile'>
                <h2 className='text-xl font-semibold text-gray-800 mb-4'>My Orders</h2>
                <MyOrdersPage/>
              </div>
            )}
            {activeSection === 'addresses' && <AddressManagement />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile