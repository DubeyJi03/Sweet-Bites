// Filename: OrderConfirmationPage.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/slices/cartSlice"; 
import { useNavigate } from "react-router-dom";

const OrderConfirmationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Get checkout/order data from Redux
  const { checkout } = useSelector((state) => state.checkout);

  // ✅ Clear cart after successful checkout
  useEffect(() => {
    if (checkout && checkout._id) {
      dispatch(clearCart());
      localStorage.removeItem("cart");
    } else {
      navigate("/my-orders");
    }
  }, [dispatch, checkout, navigate]);

  // ✅ Delivery estimate helper
  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 2);
    return orderDate.toLocaleDateString();
  };

  // ✅ Handle case where checkout/order is missing
  if (!checkout) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-semibold mb-4">No Order Found</h2>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
        Thank You for Your Order!
      </h1>

      <div className="p-6 rounded-lg border">
        <div className="flex justify-between mb-20">
          <div>
            <h2 className="text-xl font-semibold">Order ID: {checkout._id}</h2>
            <p className="text-gray-500">
              Order date: {new Date(checkout.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-emerald-700 text-sm">
              Estimated Delivery:{" "}
              {calculateEstimatedDelivery(checkout.createdAt)}
            </p>
          </div>
        </div>

        {/* Ordered Items */}
        <div className="mb-20">
          {checkout.checkoutItems?.map((item, index) => (
            <div key={index} className="flex items-center mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md mr-4"
              />
              <div>
                <h4 className="text-md font-semibold">{item.name}</h4>
                <p className="text-sm text-gray-500">
                  {item.weights} | {item.quantity}
                </p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-md">₹{item.price}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Payment & Delivery Info */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-2">Payment</h4>
            <p className="text-gray-600">{checkout.paymentMethod}</p>
            <p className="text-gray-600">Status: {checkout.paymentStatus}</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-2">Delivery</h4>
            <p className="text-gray-600">{checkout.shippingAddress?.address}</p>
            <p className="text-gray-600">
              {checkout.shippingAddress?.city}, {checkout.shippingAddress?.country}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
