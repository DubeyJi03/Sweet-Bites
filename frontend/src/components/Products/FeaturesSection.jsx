import React from 'react'
import { HiShoppingBag } from "react-icons/hi";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";
import { HiOutlineCreditCard } from "react-icons/hi";

const features = [
  {
    icon: <HiShoppingBag className="text-amber-600 text-3xl" />,
    title: "Free Shipping",
    desc: "Enjoy free delivery on all orders—no minimum required.",
  },
  {
    icon: <HiArrowPathRoundedSquare className="text-amber-600 text-3xl" />,
    title: "No Exchange Policy",
    desc: "Once placed, orders cannot be exchanged to ensure product freshness.",
  },
  {
    icon: <HiOutlineCreditCard className="text-amber-600 text-3xl" />,
    title: "Secure Checkout",
    desc: "Your payments are processed with 100% security.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 px-6 bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:border-amber-200 border border-transparent"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-4 animate-fadeIn">
              {feature.icon}
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              {feature.title}
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
