import React, { useEffect, useRef, useState } from 'react'
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Customized = () => {
  const scrollRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [canScrollLeft, setCanScrollLeft] = useState(false)

const [ourCustomized, setOurCustomized] = useState([]);
  useEffect(() => {
    const fetchCustomizedProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products?category=Customized`);
        setOurCustomized(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCustomizedProducts();
  }, []);

  // Dragging logic
  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }
  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollRef.current.scrollLeft = scrollLeft - walk
  }
  const handleMouseUpOrLeave = () => setIsDragging(false)

  // Scroll buttons
  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  const updateScrollButtons = () => {
    const container = scrollRef.current
    if (container) {
      const leftScroll = container.scrollLeft
      const rightScrollable = container.scrollWidth > leftScroll + container.clientWidth
      setCanScrollRight(rightScrollable)
      setCanScrollLeft(leftScroll > 0)
    }
  }

  useEffect(() => {
    const container = scrollRef.current
    if (container) {
      container.addEventListener("scroll", updateScrollButtons)
      updateScrollButtons()
      return () => container.removeEventListener("scroll", updateScrollButtons)
    }
  }, [ourCustomized]);

  return (
    <section className='py-16 px-4 lg:px-0 bg-gradient-to-b from-white to-pink-50'>
      <div className='container mx-auto text-center mb-10 relative'>
        <h2 className='font-bold text-3xl md:text-4xl mb-4 text-gray-800'>Our Special Mades</h2>
        <p className='text-lg text-gray-500 mb-8 max-w-2xl mx-auto'>
          Discover our finest handcrafted cakes, made with love & designed to match your celebrations.
        </p>

        {/* Scroll Buttons */}
        <div className='absolute right-4 -bottom-12 flex space-x-3'>
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-3 rounded-full shadow-md transition-all duration-300 ${!canScrollLeft
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-white hover:bg-pink-100 text-pink-600'}`}
          >
            <FiChevronLeft className='text-2xl' />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-3 rounded-full shadow-md transition-all duration-300 ${!canScrollRight
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-white hover:bg-pink-100 text-pink-600'}`}
          >
            <FiChevronRight className='text-2xl' />
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div
        ref={scrollRef}
        className={`container mx-auto overflow-x-scroll flex space-x-6 relative no-scrollbar
          ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {ourCustomized.map((product) => (
          <div
            key={product._id}
            className='min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative group rounded-xl overflow-hidden shadow-lg'
          >
            <img
              src={product.images[0]?.url}
              alt={product.images[0]?.altText || product.name}
              className='w-full h-[500px] object-cover transform transition-transform duration-500 group-hover:scale-105'
            />
            <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent text-white p-5'>
              <Link to={`/products/${product._id}`} className='block'>
                <h4 className='font-semibold text-lg'>{product.name}</h4>
                <p className='mt-1 text-sm opacity-90'>₹ {product.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Customized
