import React from "react";

const RazorpayButton = ({ amount, onSuccess, onError }) => {
  const loadRazorpay = () => {
    try {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY, 
        amount: amount * 100, 
        currency: "INR",
        name: "Creamy Cake & Co",
        description: "Order Payment",
        image: "https://yourstore.com/logo.png",
        handler: function (response) {
          if (onSuccess) {
            onSuccess(response);
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      if (onError) {
        onError(err);
      }
    }
  };

  return (
    <button
      onClick={loadRazorpay}
      className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700"
    >
      Pay ₹{amount}
    </button>
  );
};

export default RazorpayButton;
