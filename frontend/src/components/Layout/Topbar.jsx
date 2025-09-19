import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { useEffect, useState } from "react";

const Topbar = () => {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    const handleScroll = () => {
      // Hide topbar when scrolling down, show when at top
      if (window.scrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className={`bg-amber-50 text-gray-700 text-sm border-b border-amber-100 transition-all duration-300 ${visible ? 'opacity-100' : 'opacity-0 -translate-y-full'}`}>
      <div className="container mx-auto flex justify-between items-center py-2 px-4 sm:px-6 lg:px-12">
        
        {/* Social Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <a href="#" className="hover:text-amber-600 transition-colors duration-200">
            <TbBrandMeta className="h-4 w-4" />
          </a>
          <a href="#" className="hover:text-amber-600 transition-colors duration-200">
            <IoLogoInstagram className="h-4 w-4" />
          </a>
          <a href="#" className="hover:text-amber-600 transition-colors duration-200">
            <RiTwitterXLine className="h-4 w-4" />
          </a>
        </div>

        {/* Center Text */}
        <div className="flex-grow text-center font-medium tracking-wide animate-fadeIn">
          Welcome to <span className="text-amber-600 font-semibold">Sweet Bites</span>
        </div>

        {/* Contact */}
        <div className="hidden md:block text-sm">
          <a
            href="tel:+919999999999"
            className="hover:text-amber-600 font-medium transition-colors duration-200"
          >
            +91 9999 99 9999
          </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
