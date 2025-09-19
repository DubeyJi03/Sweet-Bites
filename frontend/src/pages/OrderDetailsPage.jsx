// Filename: OrderDetailsPage.jsx
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchOrderDetails } from "../redux/slices/orderSlice";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ FIX: use orderDetails instead of order
  const { orderDetails, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderDetails(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return <p className='text-center py-8'>Loading order details...</p>;
  }

  if (error) {
    return (
      <div className='text-center py-8 text-red-500'>
        <p>Error: {error}</p>
        <button
          onClick={() => navigate('/my-orders')}
          className='mt-4 px-4 py-2 bg-blue-600 text-white rounded'
        >
          Go back to My Orders
        </button>
      </div>
    );
  }

  // ✅ FIX: Use orderDetails check
  if (!orderDetails || orderDetails._id !== id) {
    return <p className='text-center py-8'>Order not found.</p>;
  }

  const order = orderDetails;

  return (
    <div className='max-w-7xl mx-auto p-4 sm:p-6'>
      <h2 className='text-2xl md:text-3xl font-bold mb-6'>Order Details</h2>
      <div className='p-4 sm:p-6 rounded-lg border'>
        {/* Order Info */}
        <div className='flex flex-col sm:flex-row justify-between mb-8'>
          <div>
            <h3 className='text-lg md:text-xl font-semibold'>
              Order ID: #{order._id}
            </h3>
            <p className='text-gray-600'>
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className='flex flex-col items-start sm:items-end mt-4 sm:mt-0'>
            <span
              className={`${
                order.isPaid
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              } px-3 py-1 rounded-full text-sm font-medium mb-2`}
            >
              {order.isPaid ? "Approved" : "Pending"}
            </span>
            <span
              className={`${
                order.isDelivered
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              } px-3 py-1 rounded-full text-sm font-medium mb-2`}
            >
              {order.isDelivered ? "Delivered" : "Pending delivery"}
            </span>
          </div>
        </div>

        {/* Payment + Shipping */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8'>
          <div>
            <h4 className='text-lg font-semibold mb-2'>Payment Info</h4>
            <p>Payment Method: {order.paymentMethod}</p>
            <p>Status: {order.isPaid ? "Paid" : "Unpaid"}</p>
          </div>
          <div>
            <h4 className='text-lg font-semibold mb-2'>Shipping Info</h4>
            <p>Shipping Method: {order.shippingMethod}</p>
            <p>
              Address: {`${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.country}`}
            </p>
          </div>
        </div>

        {/* Product List */}
        <div className='overflow-x-auto'>
          <h4 className='text-lg mb-4 font-semibold'>Products</h4>
          <table className='min-w-full text-gray-600 mb-4'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='py-2 px-4'>Name</th>
                <th className='py-2 px-4'>Unit Price</th>
                <th className='py-2 px-4'>Quantity</th>
                <th className='py-2 px-4'>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems.map((item) => (
                <tr key={item._id} className='border-b'>
                  <td className='py-2 px-4 flex items-center'>
                    <img
                      src={item.image}
                      alt={item.name}
                      className='w-12 h-12 object-cover rounded-lg mr-4'
                    />
                    <Link
                      to={`/products/${item.productId}`}
                      className='text-blue-500 hover:underline'
                    >
                      {item.name}
                    </Link>
                  </td>
                  <td className="py-2 px-4 text-center">₹{item.price}</td>
                  <td className="py-2 px-4 text-center">{item.quantity}</td>
                  <td className="py-2 px-4 text-center">
                    ₹{item.price * item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-semibold">
                <td colSpan="3" className="py-2 px-4 text-right">Grand Total</td>
                <td className="py-2 px-4 text-center">
                  ₹{order.orderItems.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                  )}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Back link */}
        <Link to="/my-orders" className='text-blue-500 hover:underline'>
          Back to my orders
        </Link>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
