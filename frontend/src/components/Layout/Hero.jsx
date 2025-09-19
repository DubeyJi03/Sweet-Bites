import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Import multiple images for the slideshow
import featured from '../../assets/FeatureCol.png';
import heroImg from '../../assets/heroImg.png';
import heroSlide2 from '../../assets/heroSlide2.png';
import heroSlide3 from '../../assets/heroSlide3.png';
import heroSlide1 from '../../assets/heroSlide1.png';

const Hero = () => {
  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    fade: true,
    cssEase: 'linear',
    pauseOnHover: false
  };

  // Slideshow images with captions
  const slides = [
    {
      image: featured,
      alt: 'Featured Collection',
      title: 'Welcome to <span class="text-amber-400">Sweet Bites</span>',
      subtitle: 'Indulge in handcrafted delights made to brighten every moment ✨'
    },
    {
      image: heroSlide2,
      alt: 'Cake Collection',
      title: 'Delicious <span class="text-amber-400">Sweets</span>',
      subtitle: 'Celebrate special moments with our premium sweets collection'
    },
    {
      image: heroSlide3,
      alt: 'hero slide3 ',
      title: 'Traditional <span class="text-amber-400">Sweets</span>',
      subtitle: 'Experience authentic flavors crafted with love and tradition'
    },
    {
      image: heroSlide1,
      alt: 'Other Sweets Collection',
      title: 'Exquisite <span class="text-amber-400">Delicacies</span>',
      subtitle: 'Discover our wide range of mouth-watering sweet treats'
    },
    {
      image: heroImg,
      alt: 'Hero Image',
      title: 'Premium <span class="text-amber-400">Quality</span>',
      subtitle: 'Only the finest ingredients go into our sweet creations'
    }
  ];

  return (
    <section className="relative w-full overflow-hidden">
      {/* Slideshow */}
      <div className="h-[400px] md:h-[600px] lg:h-[700px]">
        <Slider {...settings} className="h-full">          
          {slides.map((slide, index) => (
            <div key={index} className="relative h-[400px] md:h-[600px] lg:h-[700px]">
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover object-center"
              />

              {/* Overlay for each slide */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black/40 via-black/30 to-black/40">
                <div className="text-white text-center px-6 max-w-3xl animate-fadeIn">
                  
                  {/* Title with animation */}
                  <h1 
                    className="text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-snug animate-slideUp"
                    dangerouslySetInnerHTML={{ __html: slide.title }}
                  ></h1>
                  
                  {/* Subtitle with animation */}
                  <p className="text-sm md:text-lg mb-6 text-gray-200 tracking-tight animate-slideUp animation-delay-200">
                    {slide.subtitle}
                  </p>

                  {/* Button with animation */}
                  <Link
                    to="/all-sweets"
                    className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-6 py-3 rounded-full text-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 animate-fadeIn animation-delay-400"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};



export default Hero;
