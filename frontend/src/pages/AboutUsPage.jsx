import React, { useEffect, useRef } from 'react';

// Location Card Component
const LocationCard = ({ location }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 transform transition-transform duration-500 ease-in-out hover:scale-[1.02] cursor-pointer group">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{location.name}</h3>
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 4.38-7.5 11.5-7.5 11.5S4.5 14.88 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          <span className="text-gray-600 group-hover:text-orange-600 transition-colors duration-300">{location.address}</span>
        </div>
        <div className="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-orange-500 flex-shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.18.44l-1.423 1.907c-.198.264-.406.496-.604.728.18-.168.358-.351.535-.535L14.735 4.516a1.26 1.26 0 00-.712-.321c-.495-.126-.984-.131-1.48.016-.277.086-.549.208-.797.382l-1.396 1.246c-.237.21-.462.436-.667.669a.75.75 0 01-.842.234l-2.484-.439a1.125 1.125 0 01-.796-.547L4.5 1.5l.75.75zM12 21.75c-4.437 0-8.232-2.126-10.5-5.385.127-.234.256-.469.384-.703M21.75 6.75a15 15 0 00-15-15" />
          </svg>
          <span className="text-gray-600 group-hover:text-orange-600 transition-colors duration-300">{location.phone}</span>
        </div>
        <div className="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-orange-500 flex-shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v.75m-4.5 0v-.75m0 0a.75.75 0 01.75-.75h2.25a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-2.25a.75.75 0 01-.75-.75zM12 9h.008v.008H12V9zm.375 0h.008v.008h-.008V9zm-.375 2.25h.008v.008H12v-.008zm.375 0h.008v.008h-.008v-.008z" />
          </svg>
          <span className="text-gray-600 group-hover:text-orange-600 transition-colors duration-300">{location.hours}</span>
        </div>
      </div>
      <div className="mt-6 rounded-lg overflow-hidden border border-gray-200 shadow-md">
        <iframe
          src={location.mapEmbed}
          width="100%"
          height="250"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map for ${location.name}`}
        ></iframe>
      </div>
    </div>
  );
};

const AboutUsPage = () => {
  const stats = [
    { id: 1, number: '25+', label: 'Years of Excellence' },
    { id: 2, number: '10,000+', label: 'Happy Customers' },
    { id: 3, number: '4', label: 'Store Locations' },
    { id: 4, number: '150+', label: 'Sweet Varieties' }
  ];

  const values = [
    {
      id: 1,
      icon: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.645 20.91l-.007-.003-.022-.012a15.227 15.227 0 01-1.383-.811L6.715 15.2a3.75 3.75 0 01-1.196-2.613c0-2.585 1.77-4.143 4.143-4.143 1.258 0 2.457.544 3.25 1.472A3.75 3.75 0 0115.828 8.4a4.143 4.143 0 014.143 4.143c0 1.258-.544 2.457-1.472 3.25L13.116 20.91a1.5 1.5 0 01-2.221-.004z" /></svg>,
      title: 'Quality First',
      description: 'We never compromise on the quality of ingredients and maintain the highest standards in preparation.'
    },
    {
      id: 2,
      icon: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M12.963 2.25a.75.75 0 01.745.653l1.935 8.169a.75.75 0 00.992.51l6.38-2.935c.411-.189.873.238.625.626l-3.235 5.18a.75.75 0 00-.236.634l.585 6.034a.75.75 0 01-1.282.615l-4.524-4.225a.75.75 0 00-.916 0L8.35 20.893a.75.75 0 01-1.282-.615l.585-6.034a.75.75 0 00-.236-.634L2.34 9.123c-.248-.388.214-.815.625-.626l6.38 2.935a.75.75 0 00.992-.51L12.218 2.9a.75.75 0 01.745-.653z" clipRule="evenodd" /></svg>,
      title: 'Traditional Recipes',
      description: 'Our recipes have been passed down through generations, ensuring authentic taste and quality.'
    },
    {
      id: 3,
      icon: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12 4.5a.75.75 0 01.75.75v5.52a.75.75 0 01-1.5 0V5.25a.75.75 0 01.75-.75zM12 12a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd" /></svg>,
      title: 'Customer Satisfaction',
      description: 'Customer happiness is our priority. We strive to exceed expectations with every order.'
    },
    {
      id: 4,
      icon: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12 4.5a.75.75 0 01.75.75v5.52a.75.75 0 01-1.5 0V5.25a.75.75 0 01.75-.75zM12 12a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd" /></svg>,
      title: 'Fresh Daily',
      description: 'All our products are made fresh daily using the finest ingredients available.'
    }
  ];

  const locations = [
    {
      id: 1,
      name: "Virar West Main Store",
      address: "Shop no. 1, Gaothan Road, Virar West, Maharashtra 401303",
      phone: "+91 9999 99 9999",
      email: "virarwest@sweetbites.com",
      hours: "9:00 AM - 10:00 PM",
      manager: "Rajesh Kumar",
      specialties: ["Traditional Sweets", "Custom Orders", "Wedding Packages"],
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.4852718320184!2d72.7917308!3d19.4563672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7a9c8b8f7f7f7%3A0x1234567890abcdef!2sVirar%20West%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1642567890123!5m2!1sen!2sin"
    },
    {
      id: 2,
      name: "Borivali Branch",
      address: "Shop 15, Shanti Shopping Center, Borivali East, Mumbai 400066",
      phone: "+91 9888 88 8888",
      email: "borivali@sweetbites.com",
      hours: "8:30 AM - 9:30 PM",
      manager: "Priya Sharma",
      specialties: ["Bengali Sweets", "Mithai Boxes", "Festival Specials"],
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.123456789!2d72.8566!3d19.230123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b151234abcde%3A0x9876543210fedcba!2sBorivali%20East%2C%20Mumbai!5e0!3m2!1sen!2sin!4v1642567890124!5m2!1sen!2sin"
    },
    {
      id: 3,
      name: "Andheri Outlet",
      address: "Unit 23, Infinity Mall, Andheri West, Mumbai 400053",
      phone: "+91 9777 77 7777",
      email: "andheri@sweetbites.com",
      hours: "10:00 AM - 11:00 PM",
      manager: "Suresh Patel",
      specialties: ["Premium Collection", "Dry Fruit Sweets", "Gift Packaging"],
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.123456789!2d72.834567!3d19.134567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63ace90c2bd%3A0x11ff28dd1245abcd!2sAndheri%20West%2C%20Mumbai!5e0!3m2!1sen!2sin!4v1642567890125!5m2!1sen!2sin"
    },
    {
      id: 4,
      name: "Pune Branch",
      address: "Shop 8, FC Road, Shivaji Nagar, Pune 411005",
      phone: "+91 9666 66 6666",
      email: "pune@sweetbites.com",
      hours: "9:00 AM - 10:30 PM",
      manager: "Meera Joshi",
      specialties: ["South Indian Sweets", "Ladoos", "Catering Services"],
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.123456789!2d73.845678!3d18.523456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sFC%20Road%2C%20Pune!5e0!3m2!1sen!2sin!4v1642567890126!5m2!1sen!2sin"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Kavita Mehta",
      location: "Virar West",
      message: "Sweet Bites has been our family's go-to sweet shop for over 10 years. The quality is consistently excellent, and the taste reminds me of my grandmother's homemade sweets. Their Kaju Katli is absolutely divine!",
      image: "https://placehold.co/100x100/A0522D/FFFFFF?text=KM",
      verified: true
    },
    {
      id: 2,
      name: "Arjun Patel",
      location: "Borivali",
      message: "I've tried sweets from many places, but Sweet Bites stands out for their authentic flavors and fresh preparation. Their customer service is exceptional, and they always deliver on time for festivals.",
      image: "https://placehold.co/100x100/4682B4/FFFFFF?text=AP",
      verified: true
    },
    {
      id: 3,
      name: "Sunita Agarwal",
      location: "Andheri",
      message: "The premium collection at Sweet Bites is worth every penny. Perfect for gifting and special occasions. The packaging is beautiful and the taste is unmatched. Highly recommended!",
      image: "https://placehold.co/100x100/708090/FFFFFF?text=SA",
      verified: true
    },
    {
      id: 4,
      name: "Dr. Ravi Kumar",
      location: "Pune",
      message: "Great variety of sweets and very hygienic preparation. I particularly love their South Indian specialties. The staff is knowledgeable and helps in selecting the right products.",
      image: "https://placehold.co/100x100/228B22/FFFFFF?text=RK",
      verified: true
    },
    {
      id: 5,
      name: "Neha Singh",
      location: "Mumbai",
      message: "Ordered sweets for my wedding from Sweet Bites and received countless compliments from guests. The quality, taste, and presentation were all perfect. Thank you for making our special day even sweeter!",
      image: "https://placehold.co/100x100/DDA0DD/FFFFFF?text=NS",
      verified: true
    },
    {
      id: 6,
      name: "Vikram Jain",
      location: "Pune",
      message: "Been a loyal customer for years. The consistency in quality and taste is remarkable. Sweet Bites has become synonymous with celebration in our family. Keep up the excellent work!",
      image: "https://placehold.co/100x100/FFD700/000000?text=VJ",
      verified: true
    }
  ];

  const milestones = [
    { year: '1999', event: 'Founded our first store in Virar West with traditional family recipes' },
    { year: '2005', event: 'Expanded to Borivali, bringing authentic sweets to more families' },
    { year: '2012', event: 'Opened our premium Andheri outlet in Infinity Mall' },
    { year: '2018', event: 'Launched our Pune branch to serve customers across Maharashtra' },
    { year: '2020', event: 'Introduced online ordering and home delivery services' },
    { year: '2024', event: 'Celebrating 25 years of sweet traditions and 10,000+ happy customers' }
  ];

  const sectionRefs = useRef([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-section {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .fade-in-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .stat-number {
          animation: pop-in 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
        }
        @keyframes pop-in {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
      
      {/* Hero Section */}
      <div 
        ref={el => sectionRefs.current[0] = el}
        className="fade-in-section bg-gradient-to-r from-amber-600 via-orange-600 to-red-500 text-white py-20"
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Sweet Bites</h1>
          <p className="text-2xl text-amber-100 mb-8 max-w-3xl mx-auto">
            Crafting sweet memories for over 25 years with authentic recipes, 
            premium ingredients, and a passion for perfection.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.id} className="text-center">
                <div className="text-4xl font-bold text-yellow-200 stat-number">{stat.number}</div>
                <div className="text-amber-100 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div 
        ref={el => sectionRefs.current[1] = el}
        className="fade-in-section py-16 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Sweet Story</h2>
              <p className="text-gray-600 text-lg">
                From humble beginnings to becoming Maharashtra's trusted sweet destination
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">A Legacy of Excellence</h3>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Sweet Bites began in 1999 with a simple dream - to bring the authentic taste of 
                    traditional Indian sweets to every household. What started as a small family business 
                    in Virar West has grown into a trusted name across Maharashtra.
                  </p>
                  <p>
                    Our founder, Shri Ramesh Kumar, learned the art of sweet-making from his grandfather, 
                    who was a renowned halwai in Rajasthan. These time-tested recipes, combined with 
                    modern hygiene standards and quality control, form the backbone of our business.
                  </p>
                  <p>
                    Today, we serve thousands of families across Mumbai and Pune, carrying forward the 
                    tradition of celebrating life's sweet moments with authentic, delicious sweets made 
                    from the finest ingredients.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://placehold.co/600x400/FFDDC1/FF5733?text=Our+Heritage" 
                  alt="Sweet Bites Heritage" 
                  className="rounded-lg shadow-lg w-full h-96 object-cover"
                />
                <div className="absolute -bottom-6 -right-6 bg-amber-600 text-white p-6 rounded-lg shadow-xl">
                  <div className="text-3xl font-bold">25+</div>
                  <div className="text-amber-100 text-sm">Years of Trust</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div 
        ref={el => sectionRefs.current[2] = el}
        className="fade-in-section py-16 bg-amber-50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Values</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              The principles that guide us in creating exceptional sweet experiences for our customers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.id} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div 
        ref={el => sectionRefs.current[3] = el}
        className="fade-in-section py-16 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Journey</h2>
            <p className="text-gray-600 text-lg">
              Key milestones in our 25-year journey of spreading sweetness
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-amber-200"></div>
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center z-10">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                      <div className="text-2xl font-bold text-amber-600 mb-2">{milestone.year}</div>
                      <p className="text-gray-700">{milestone.event}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Locations Section */}
      <div 
        ref={el => sectionRefs.current[4] = el}
        className="fade-in-section py-16 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Visit Our Stores</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Experience the Sweet Bites difference at any of our four convenient locations 
              across Mumbai and Pune.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {locations.map((location) => (
              <LocationCard key={location.id} location={location} showMap={true} />
            ))}
          </div>
        </div>
      </div>

      {/* Customer Testimonials */}
      <div 
        ref={el => sectionRefs.current[5] = el}
        className="fade-in-section py-16 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 text-lg">
              Real experiences from our valued customers across all locations
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <span className="text-amber-600 font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                  {testimonial.verified && (
                    <div className="ml-auto">
                      <div className="flex items-center gap-1 text-green-600 text-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                        </svg>
                        Verified
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed italic">
                  "{testimonial.message}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div 
        ref={el => sectionRefs.current[6] = el}
        className="fade-in-section py-16 bg-gradient-to-r from-amber-600 to-orange-600 text-white"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Experience the Sweet Bites Difference</h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us for their sweet moments. 
            Visit any of our stores or order online today!
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors"
            >
              Visit Our Stores
            </a>
            <a
              href="/all-sweets"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-amber-600 transition-colors"
            >
              Shop Online
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
