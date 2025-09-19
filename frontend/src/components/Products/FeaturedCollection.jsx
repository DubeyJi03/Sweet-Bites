import React from 'react'
import { Link } from 'react-router-dom'
import featured from '../../assets/FeatureCol.png'

const FeaturedCollection = () => {
  return (
    <section className="py-20 px-6 lg:px-0">
      <div className="container mx-auto flex flex-col lg:flex-row items-center bg-gradient-to-r from-yellow-100 via-pink-100 to-red-100 rounded-3xl shadow-xl overflow-hidden">
        
        {/* Left content */}
        <div className="lg:w-1/2 p-10 text-center lg:text-left space-y-6 animate-slideUp">
          <h2 className="text-xl font-semibold text-amber-700 animate-fadeIn">Sweet Bites</h2>
          <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight text-gray-800 animate-slideUp animation-delay-200">
            Sweets For Every Age
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed animate-fadeIn animation-delay-400">
            From festive laddoos that light up Diwali to mouth-watering rajbhogs
            that sweeten family gatherings, our collection brings joy to every occasion.
            Celebrate life’s special moments with authentic Indian mithai — crafted fresh,
            with love and tradition in every bite.
          </p>
          <Link
            to="/collections/all"
            className="inline-block bg-amber-600 text-white px-8 py-3 rounded-xl font-medium shadow-md hover:bg-amber-700 transition duration-300 hover:scale-105 animate-fadeIn animation-delay-600"
          >
            Shop Now
          </Link>
        </div>

        {/* Right content */}
        <div className="lg:w-1/2 animate-fadeIn animation-delay-800">
          <img
            src={featured}
            alt="Featured Collection"
            className="w-full h-[750px] object-cover lg:rounded-tl-[100px] lg:rounded-bl-[100px] hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </section>
  )
}

export default FeaturedCollection
