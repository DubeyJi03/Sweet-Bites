import { Link } from "react-router-dom"; 
import { HiBars3BottomRight, HiOutlineUser } from "react-icons/hi2"; 
import { HiOutlineShoppingBag } from "react-icons/hi2"; 
import SearchBar from "./SearchBar"; 
import CartDrawer from "../Layout/CartDrawer"; 
import React, { useState, useEffect } from "react"; 
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

const Navbar = () => { 
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false); 
  const [navDrawerOpen, setNavDrawerOpen] = useState(false); 
  const [scrolled, setScrolled] = useState(false);
  const {cart} = useSelector((state) => state.cart);
  const {user} = useSelector((state) => state.auth);

  const cartItemCount = 
  cart?.products?.reduce((
    total, 
    product) => 
      total + product.quantity, 0) || 
    0;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleNavDrawer = () => setNavDrawerOpen(!navDrawerOpen); 
  const toggleCartDrawer = () => setCartDrawerOpen(!cartDrawerOpen);

  return (
    <>
      <nav className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white/95 shadow-md backdrop-blur-sm' : 'bg-white shadow-sm'}`}> 
         <div className="container mx-auto flex justify-between items-center py-4 px-4 sm:px-6 lg:px-12"> 
           {/* Left - Logo */} 
           <div className="animate-fadeIn"> 
             <Link to="/" className="flex items-center"> 
               <span className="text-xl font-semibold text-amber-600 hover:text-amber-700 leading-none transition-colors duration-200"> 
                 Sweet Bites 
               </span> 
             </Link> 
           </div>

          {/* Center - Navigation Links */} 
           <div className="hidden md:flex space-x-8 animate-fadeIn"> 
             <Link 
               to="/collections/all" 
               className="text-gray-700 hover:text-amber-600 relative group text-sm font-medium uppercase tracking-wide transition-colors duration-200" 
             > 
               All Sweets 
               <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300"></span>
             </Link> 
            <Link 
              to="/collections/all?category=Rajbhog" 
              className="text-gray-700 hover:text-amber-600 relative group text-sm font-medium uppercase tracking-wide transition-colors duration-200" 
            > 
              Rajbhogs 
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
             <Link 
               to="/contact" 
               className="text-gray-700 hover:text-amber-600 relative group text-sm font-medium uppercase tracking-wide transition-colors duration-200" 
             > 
               Contact Us 
               <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300"></span>
             </Link> 
             <Link 
               to="/about" 
               className="text-gray-700 hover:text-amber-600 relative group text-sm font-medium uppercase tracking-wide transition-colors duration-200" 
             > 
               About Us 
               <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300"></span>
             </Link>
           </div>

          {/* Right - Icons */} 
           <div className="flex items-center space-x-5 animate-fadeIn"> 
            {user && user.role === "admin" && ( <Link 
               to="/admin" 
               className="block bg-amber-600 px-3 py-1 rounded-full text-sm text-white hover:bg-amber-700 transition-all duration-300 shadow-sm hover:shadow-md" 
             > 
               Admin 
             </Link> )}
             <Link 
               to="/Profile" 
               className="text-gray-700 hover:text-amber-600 transition-colors duration-200" 
             > 
               <HiOutlineUser className="h-6 w-6" /> 
             </Link> 
             <button 
               onClick={toggleCartDrawer} 
               className="relative hover:text-amber-600 transition-colors duration-200" 
             > 
               <HiOutlineShoppingBag className="h-6 w-6 text-gray-700 hover:text-amber-600 transition-colors duration-200" />
               {cartItemCount > 0 && (<span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-sm"> 
                 {cartItemCount}
               </span> )} 
               
             </button> 
             <div className="overflow-hidden"> 
               <SearchBar /> 
             </div> 
             <button className="md:hidden" onClick={toggleNavDrawer}> 
               <HiBars3BottomRight className="h-6 w-6 text-gray-700 hover:text-amber-600 transition-colors duration-200" /> 
             </button> 
           </div>
        </div>
      </nav>
      
      {/* No spacer needed with sticky positioning */}

      {/* Cart Drawer */}
      <CartDrawer
        drawerOpen={cartDrawerOpen}
        toggleCartDrawer={toggleCartDrawer}
      />

      {/* Mobile Navigation Drawer with Overlay */}
       <div 
         onClick={toggleNavDrawer}
         className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity z-50 ${navDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
       ></div>
       
       {/* Mobile Navigation Drawer */} 
       <div 
         className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/4 h-full bg-white/95 backdrop-blur-sm shadow-lg transform transition-transform 
           duration-300 z-50 ${navDrawerOpen ? "translate-x-0" : "-translate-x-full" 
           }`} 
       > 
         <div className="flex justify-between items-center p-4 border-b border-gray-100"> 
           <h2 className="text-xl font-semibold text-amber-600 animate-fadeIn">Sweet Menu</h2>
           <button 
             onClick={toggleNavDrawer}
             className="text-gray-600 hover:text-amber-600 hover:bg-gray-100 p-2 rounded-full transition-colors duration-200"
           > 
             <IoMdClose className="h-6 w-6" /> 
           </button> 
         </div> 
         <div className="p-4"> 
           <nav className="space-y-4 animate-slideUp"> 
             <Link 
               to="/collections/all" 
               className="flex items-center text-gray-700 hover:text-amber-600 text-base font-medium uppercase transition-colors duration-200" 
               onClick={toggleNavDrawer} 
             > 
               <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mr-2"></span>
               All Sweets 
             </Link> 
            <Link 
              to="/rajbhog" 
              className="flex items-center text-gray-700 hover:text-amber-600 text-base font-medium uppercase transition-colors duration-200" 
              onClick={toggleNavDrawer} 
            > 
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mr-2"></span>
              Rajbhogs 
            </Link>
             <Link 
               to="/contact" 
               className="flex items-center text-gray-700 hover:text-amber-600 text-base font-medium uppercase transition-colors duration-200" 
               onClick={toggleNavDrawer} 
             > 
               <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mr-2"></span>
               Contact Us 
             </Link> 
             <Link 
               to="/about" 
               className="flex items-center text-gray-700 hover:text-amber-600 text-base font-medium uppercase transition-colors duration-200" 
               onClick={toggleNavDrawer} 
             > 
               <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mr-2"></span>
               About us 
             </Link>
             <div className="border-t border-gray-100 my-4"></div>
             <Link 
               to="/profile" 
               className="flex items-center text-gray-700 hover:text-amber-600 text-base font-medium uppercase transition-colors duration-200" 
               onClick={toggleNavDrawer} 
             > 
               <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mr-2"></span>
               My Account 
             </Link>
             <Link 
               to="/admin" 
               className="flex items-center text-gray-700 hover:text-amber-600 text-base font-medium uppercase transition-colors duration-200" 
               onClick={toggleNavDrawer} 
             > 
               <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mr-2"></span>
                Admin Portal
              </Link>
            </nav>
          </div> 
       </div>
    </>
  );
};

export default Navbar;
