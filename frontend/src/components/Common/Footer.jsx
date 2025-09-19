import React from 'react';
import { Link } from 'react-router-dom';
import { TbBrandMeta } from 'react-icons/tb';
import { IoLogoInstagram } from 'react-icons/io';
import { RiTwitterXLine } from 'react-icons/ri';
import { FiPhoneCall } from 'react-icons/fi';
import { HiOutlineLocationMarker } from "react-icons/hi";
import { HiMail } from "react-icons/hi";


const Footer = () => {
    return (
        <footer className="border-t py-14 bg-amber-50">
            <div className="container mx-auto px-6">
                {/* Grid wrapper */}
                <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
                    {/* Newsletter Section */}
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Newsletter</h3>
                        <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                            Be the first to hear about new products, exclusive events,
                            and special offers.
                        </p>
                        <p className="text-gray-600 mb-5 text-sm">
                            Sign up now & enjoy <span className="font-semibold text-amber-600">10% off</span> on your first order.
                        </p>

                        <form className="flex">
                            <input
                                type="email"
                                placeholder="Enter your Email"
                                className="p-3 w-full text-sm border border-amber-200 rounded-l-md focus:outline-none
                                          focus:ring-2 focus:ring-amber-500 transition-all placeholder-gray-400"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-amber-600 text-white px-6 text-sm rounded-r-md hover:bg-amber-700
                                          transition-all focus:outline-none focus:ring-2 focus:ring-amber-500"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>

                    {/* Other sections */}
                    <div className="grid grid-cols-2 gap-10 sm:grid-cols-2 md:grid-cols-3 md:col-span-3">
                        {/* Shop Links */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Shop</h3>
                            <ul className="space-y-3 text-gray-600">
                                <li><Link to="/collections/all" className="hover:text-amber-600 transition-colors text-sm flex items-center gap-2">All Sweets</Link></li>
                                <li><Link to="/rajbhog" className="hover:text-amber-600 transition-colors text-sm">Rajbhogs</Link></li>
                                <li><Link to="/collections/all?sweetType=mithai" className="hover:text-amber-600 transition-colors text-sm">Mithai <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">New</span></Link></li>
                                <li><Link to="/collections/all?sweetType=ladoo" className="hover:text-amber-600 transition-colors text-sm">Ladoos <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">New</span></Link></li>
                            </ul>
                        </div>

                        {/* Support Links */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Support</h3>
                            <ul className="space-y-3 text-gray-600">
                                <li><Link to="/contact" className="hover:text-amber-600 transition-colors text-sm">Contact Us</Link></li>
                                <li><Link to="/about" className="hover:text-amber-600 transition-colors text-sm">About Us</Link></li>
                                <li><Link to="#" className="hover:text-amber-600 transition-colors text-sm">FAQs</Link></li>
                                <li><Link to="#" className="hover:text-amber-600 transition-colors text-sm">Features</Link></li>
                            </ul>
                        </div>

                        {/* Follow Us / Contact */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Follow Us</h3>
                            <div className="flex items-center space-x-5 mb-6">
                                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"
                                   className="text-gray-500 hover:text-amber-600 transition-colors">
                                    <TbBrandMeta className="h-6 w-6" />
                                </a>
                                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"
                                   className="text-gray-500 hover:text-amber-600 transition-colors">
                                    <IoLogoInstagram className="h-6 w-6" />
                                </a>
                                <a href="https://www.x.com" target="_blank" rel="noopener noreferrer"
                                   className="text-gray-500 hover:text-amber-600 transition-colors">
                                    <RiTwitterXLine className="h-5 w-5" />
                                </a>
                            </div>

                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Contact Us</h3>
                            <p className="text-gray-500 flex items-center text-sm hover:text-amber-600 transition-colors">
                                <FiPhoneCall className="mr-2 text-base text-amber-500" />
                                +91 9999 99 9999
                            </p>

                            <p className="text-gray-500 flex items-center hover:text-amber-600 transition-colors text-sm">
                                <HiMail className="mr-2 text-base text-amber-500" />
                                sweetbites@example.com
                            </p>

                             <p className="text-gray-500 flex items-center hover:text-amber-600 transition-colors text-sm">
                                <HiOutlineLocationMarker className="mr-2 text-base" />
                               Shop no. 1 virar west,gaothan road,
                               
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="container mx-auto mt-10 px-6 border-t border-gray-200 pt-6">
                <p className="text-center text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} <span className="font-semibold text-amber-600">Sweet Bites</span>. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;


