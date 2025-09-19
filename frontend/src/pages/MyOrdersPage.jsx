// MyOrdersPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrders } from '../redux/slices/orderSlice'; // ✅ FIX: Import the new thunk
import { HiOutlineLogout, HiOutlineUser, HiOutlineHome, HiOutlineShoppingBag } from "react-icons/hi";


const MyOrdersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { orders, loading, error } = useSelector((state) => state.orders); // ✅ FIX: Get data from orderSlice

  useEffect(() => {
    // ✅ FIX: Fetch real orders from the backend
    if (user) {
      dispatch(fetchUserOrders(user._id));
    }
  }, [dispatch, user]);

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };
  
  if (loading) {
    return <p className='text-center py-8 text-gray-500'>Loading your orders...</p>;
  }
  if (error) {
    return <p className='text-center py-8 text-red-500'>Error: {error}</p>;
  }

  return (
    <>
      <div className='max-w-7xl mx-auto p-4 sm:m-6 hidden md:block profile:hidden'>
        <h2 className='text-xl sm:text-2xl font-bold mb-6 profile:hidden'>My Orders</h2>
        <div className='relative shadow-md sm:rounded-lg overflow-hidden'>
          <table className='min-w-full text-gray-500 text-left'>
            <thead className='bg-amber-50 text-xs uppercase text-gray-700'>
              <tr>
                <th className='py-2 px-4 sm:py-3'>Image</th>
                <th className='py-2 px-4 sm:py-3'>Order Id</th>
                <th className='py-2 px-4 sm:py-3'>Created</th>
                <th className='py-2 px-4 sm:py-3'>Shipping Address</th>
                <th className='py-2 px-4 sm:py-3'>Item</th>
                <th className='py-2 px-4 sm:py-3'>Price</th>
                <th className='py-2 px-4 sm:py-3'>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders && orders.length > 0 ? (
                orders.map(order => (
                  <tr 
                    key={order._id}
                    onClick={() => handleRowClick(order._id)} 
                    className='border-b hover:bg-amber-50/30 transition-colors cursor-pointer'>
                    <td className='py-2 px-2 sm:py-4'>
                      {/* ✅ FIX: Access the image property correctly */}
                      <img
                        src={order.orderItems[0].image}
                        alt={order.orderItems[0].name}
                        className='w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg'
                      />
                    </td>
                    <td className='py-2 px-2 sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap'>
                      {order._id}
                    </td>
                    <td className='py-2 px-2 sm:py-4 sm:px-4'>
                      {new Date(order.createdAt).toLocaleDateString()}{" "}
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </td>
                    <td className='py-2 px-4 sm:py-4 sm:px-4'>
                      {order.shippingAddress
                        ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                        : "N/A"}
                    </td>
                    <td className='py-2 px-4 sm:py-4 sm:px-4'>
                      {order.orderItems.length}
                    </td>
                    <td className='py-2 px-4 sm:py-4 sm:px-4'>
                      ₹{order.totalPrice}
                    </td>
                    <td className='py-2 px-4 sm:py-4 sm:px-4'>
                      <span
                        className={`${
                          order.isPaid
                            ? 'bg-green-100 text-green-700'
                            : 'bg-amber-100 text-amber-700'
                        } px-2 py-1 rounded-full text-xs sm:text-sm font-medium`}
                      >
                        {order.isPaid ? "Paid" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className='py-4 px-4 text-center text-gray-500'>
                    You have no orders
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className='p-4 profile:p-0 md:hidden profile:block'>
        {orders && orders.length > 0 ? (
          orders.map(order => (
            <div 
              key={order._id} 
              onClick={() => handleRowClick(order._id)}
              className='bg-white shadow-md rounded-lg p-4 mb-4 border border-amber-100 hover:border-amber-200 transition-colors cursor-pointer'
            >
              <div className='flex items-center mb-4'>
                <img
                  src={order.orderItems[0].image} // ✅ FIX: Access the image property correctly
                  alt={order.orderItems[0].name}
                  className='w-20 h-20 object-cover rounded-lg mr-4 flex-shrink-0'
                />
                <div className='flex-grow'>
                  <p className='text-lg font-bold text-gray-900'>Order #{order._id}</p>
                  <p className='text-sm text-gray-600'>Items: {order.orderItems.length}</p>
                  <p className='text-sm text-gray-600'>Price: ₹{order.totalPrice.toFixed(2)}</p>
                  <p className='text-sm text-gray-600'>
                    Status:
                    <span
                      className={`ml-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                        order.isPaid ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {order.isPaid ? 'Paid' : 'Pending'}
                    </span>
                  </p>
                </div>
              </div>
              <div className='border-t pt-3'>
                <p className='text-xs text-gray-500 mb-1'>
                  Created: {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}
                </p>
                <p className='text-xs text-gray-500'>
                  Shipping: {`${order.shippingAddress.city}, ${order.shippingAddress.country}`}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className='text-center py-8 text-gray-500'>
            You have no orders.
          </div>
        )}
      </div>
    </>
  );
}

export default MyOrdersPage;