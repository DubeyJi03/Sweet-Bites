import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RazorpayButton from "./RazorpayButton";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { createCheckout, payCheckout, finalizeCheckout } from "../../redux/slices/checkoutSlice"; // ✅ FIX: Import new thunks
import { clearCart } from "../../redux/slices/cartSlice"; // ✅ FIX: Import to clear the cart

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    pinCode: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const handleCreateCheckout = async (e) => {
    e.preventDefault();
    if (cart && cart.products.length > 0) {
      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress,
          paymentMethod: paymentMethod, // ✅ FIX: Use the selected payment method
          totalPrice: cart.totalPrice,
        })
      );
      if (res.payload && res.payload._id) {
        setCheckoutId(res.payload._id); //set the checkoutId if checkout was successful
        // const newOrder = res.payload;
        // dispatch(clearCart());
        // navigate(`/order-confirmation`);
      }
    }
  };

  const handlePaymentSuccess = async (details) => {
    try {
      // Use the payCheckout thunk instead of direct axios call
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        {paymentStatus: "paid", paymentDetails: details, checkoutId},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

        await handleFinalizeCheckout(checkoutId); //finalize the checkout after payment success
    } catch (error) {
      console.error(error);
    }
  };

const [paymentMethod, setPaymentMethod] = useState("razorpay"); //default to razorpay

  const handleCodOrder = async (e) => {
    e.preventDefault();
    const res = await dispatch(
      createCheckout({
        checkoutItems: cart.products,
        shippingAddress,
        paymentMethod: "cod",
        totalPrice: cart.totalPrice,
      })
    );
    if (res.payload && res.payload._id) {
      // For COD, finalize immediately since it's paid
      const finalizeRes = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${res.payload._id}/pay`,
        { paymentStatus: "pending", paymentDetails: {}, checkoutId: res.payload._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      if (finalizeRes.status === 200) {
        await handleFinalizeCheckout(res.payload._id);
      } else {
        console.error("Failed to finalize COD order");
      }
    }
  }


  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
        navigate("/order-confirmation");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error loading cart: {error}</p>;
  if (!cart || !cart.products || cart.products.length === 0) {
    return <p>Your cart is empty. Please add items to cart before checkout.</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-3xl uppercase mb-6">Checkout</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-lg mb-4">Contact Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={user?.email || ""}
              className="w-full p-2 border rounded"
              disabled
            />
          </div>
          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Pin Code</label>
              <input
                type="text"
                value={shippingAddress.pinCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    pinCode: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Country</label>
            <input
              type="text"
              value={shippingAddress.country}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone No.</label>
            <input
              type="text"
              value={shippingAddress.phone}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mt-6">
            {!checkoutId ? (
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded"
              >
                Continue to Payment
              </button>
            ) : (
              <div>
                <h3 className="text-lg mb-4">Choose Payment Method</h3>
                <div className="mb-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="razorpay"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      checked={paymentMethod === "razorpay"}
                    />
                    Pay Online (Razorpay)
                  </label>
                  <label className="flex items-center gap-2 mt-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      checked={paymentMethod === "cod"}
                    />
                    Cash on Delivery (COD)
                  </label>
                </div>
                {paymentMethod === "razorpay" && (
                  <RazorpayButton
                    amount={cart.totalPrice}
                    onSuccess={handlePaymentSuccess}
                    onError={() => alert("Payment failed. Try again.")}
                  />
                )}
                {paymentMethod === "cod" && (
                  <button
                    type="button"
                    onClick={handleCodOrder}
                    className="w-full bg-green-600 text-white py-3 rounded"
                  >
                    Place Order (COD)
                  </button>
                )}
              </div>
            )}
          </div>
        </form>
      </div>
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Order Summary</h3>
        <div className="border-t py-4 mb-4">
          {cart.products.map((product, index) => (
            <div
              key={index}
              className="flex items-start justify-between py-2 border-b"
            >
              <div className="flex items-start">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-24 object-cover mr-4"
                />
                <div>
                  <h3 className="text-md">{product.name}</h3>
                  <p className="text-gray-500">Weight: {product.weights}</p>
                  <p className="text-gray-500">Quantity: {product.quantity}</p>
                </div>
              </div>
              <p className="text-xl">₹{product.price?.toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-lg mb-4">
          <p>Subtotal</p>
          <p>₹{cart.totalPrice?.toLocaleString()}</p>
        </div>
        <div className="flex justify-between items-center text-lg">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="flex justify-between items-center text-lg mt-4 border-t pt-4">
          <p>Total</p>
          <p>₹{cart.totalPrice?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};
export default Checkout;