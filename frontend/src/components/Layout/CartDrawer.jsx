import React from 'react'
import { IoMdClose } from "react-icons/io";
import CartContents from '../Cart/CartContents';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CartDrawer = ({drawerOpen, toggleCartDrawer}) => {
  const navigate = useNavigate();
  const {user, guestId} = useSelector((state) => state.auth);
  const {cart} = useSelector((state) => state.cart);
  const userId = user ? user._id : null;

  const handleCheckout = () => {
    toggleCartDrawer();
    if(!user) {
          navigate("/login?redirect=checkout");
    } else {
          navigate("/checkout");
    }
  };

  return (
    <>
      {/* Overlay */}
      <div 
        onClick={toggleCartDrawer}
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity z-40 ${drawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      ></div>
      
      {/* Cart Drawer */}
      <div className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[25rem] h-full bg-white shadow-lg transform
        transition-transform duration-300 flex flex-col z-50 ${drawerOpen ? "translate-x-0 animate-fadeIn" : "translate-x-full"}`}>
        {/* Close Button */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-amber-600 animate-fadeIn">Your Sweet Cart</h2>
          <button 
            onClick={toggleCartDrawer}
            className="text-gray-600 hover:text-amber-600 hover:bg-gray-100 p-2 rounded-full transition-colors duration-200"
          >
            <IoMdClose className="h-6 w-6" />
          </button>
        </div>
        
        {/* Cart Items */}
        <div className="flex-grow overflow-y-auto p-2 animate-slideUp">
          {cart && cart?.products?.length > 0 ? (<CartContents cart={cart} userId={userId} guestId = {guestId}/>) : (
            <p>Your Cart is empty</p>
          )}
          {/* Component for Cart Contents */}
        </div>

        {/* Checkout Button Fixed At Bottom */}
        <div className="p-4 bg-white sticky bottom-0 border-t border-gray-100 shadow-inner">
          {cart && cart?.products?.length > 0 && (
            <>
            <button 
            onClick={handleCheckout} 
            className='w-full bg-amber-600 text-white py-3 rounded-full font-semibold hover:bg-amber-700 transition-colors duration-200 shadow-md'
          >
            Proceed to Checkout
          </button>
          <p className='text-sm tracking-tighter text-gray-500 mt-3 text-center'>
            Shipping, taxes, and discount codes calculated at checkout
          </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;