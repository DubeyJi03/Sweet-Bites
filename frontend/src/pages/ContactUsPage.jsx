import React, { useState, useEffect, useRef } from 'react';

// Custom Toast component to replace 'sonner'
const Toast = ({ message, type }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000); // Hide after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!visible) return null;

  const typeStyles = {
    success: 'bg-green-500',
    error: 'bg-red-500',
  };

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg text-white font-medium ${typeStyles[type]} transform transition-all duration-300 ease-in-out ${visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
      {message}
    </div>
  );
};


// Location Card Component
const LocationCard = ({ location }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 transform transition-transform duration-500 ease-in-out hover:scale-[1.02] cursor-pointer group hover:shadow-2xl">
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v.75m-4.5 0v-.75m0 0a.75.75 0 01.75-.75h2.25a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75h-2.25a.75.75 0 01-.75-.75zM12 9h.008v.008H12V9zm.375 0h.008v.008h-.008V9zm-.375 2.25h.008v.008H12v-.008zm.375 0h.008v.008h-.008v-.008zm-.375 2.25h.008v.008H12v-.008zm.375 0h.008v.008h-.008v-.008zM12 15h.008v.008H12V15zm.375 0h.008v.008h-.008V15zm-.375 2.25h.008v.008H12v-.008zm.375 0h.008v.008h-.008v-.008z" />
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


const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const locations = [
    {
      id: 1,
      name: "Virar West Main Store",
      address: "Shop no. 1, Gaothan Road, Virar West, Maharashtra 401303",
      phone: "+91 9999 99 9999",
      email: "virarwest@sweetbites.com",
      hours: "9:00 AM - 10:00 PM",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.4852718320184!2d72.7917308!3d19.4563672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7a9c8b8f7f7f7%3A0x1234567890abcdef!2sVirar%20West%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1642567890123!5m2!1sen!2sin"
    },
    {
      id: 2,
      name: "Borivali Branch",
      address: "Shop 15, Shanti Shopping Center, Borivali East, Mumbai 400066",
      phone: "+91 9888 88 8888",
      email: "borivali@sweetbites.com",
      hours: "8:30 AM - 9:30 PM",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.123456789!2d72.8566!3d19.230123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b151234abcde%3A0x9876543210fedcba!2sBorivali%20East%2C%20Mumbai!5e0!3m2!1sen!2sin!4v1642567890124!5m2!1sen!2sin"
    },
    {
      id: 3,
      name: "Andheri Outlet",
      address: "Unit 23, Infinity Mall, Andheri West, Mumbai 400053",
      phone: "+91 9777 77 7777",
      email: "andheri@sweetbites.com",
      hours: "10:00 AM - 11:00 PM",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.123456789!2d72.834567!3d19.134567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63ace90c2bd%3A0x11ff28dd1245abcd!2sAndheri%20West%2C%20Mumbai!5e0!3m2!1sen!2sin!4v1642567890125!5m2!1sen!2sin"
    },
    {
      id: 4,
      name: "Pune Branch",
      address: "Shop 8, FC Road, Shivaji Nagar, Pune 411005",
      phone: "+91 9666 66 6666",
      email: "pune@sweetbites.com",
      hours: "9:00 AM - 10:30 PM",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.123456789!2d73.845678!3d18.523456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sFC%20Road%2C%20Pune!5e0!3m2!1sen!2sin!4v1642567890126!5m2!1sen!2sin"
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setToastMessage("Message sent successfully! We'll get back to you within 24 hours.");
      setToastType("success");
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setToastMessage("Failed to send message. Please try again.");
      setToastType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Advanced Animation with Intersection Observer
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
      { threshold: 0.1 } // Trigger when 10% of the element is visible
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
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
        .animate-pulse-slow {
          animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
      `}</style>

      <Toast message={toastMessage} type={toastType} />
      
      {/* Header Section */}
      <div 
        ref={el => sectionRefs.current[0] = el}
        className="fade-in-section bg-gradient-to-r from-amber-600 to-orange-600 text-white py-16 px-4 md:px-8 shadow-xl"
      >
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 animate-pulse-slow">Get in Touch</h1>
          <p className="text-xl text-amber-100 max-w-2xl mx-auto mb-8 font-light">
            We'd love to hear from you! Whether you have questions, feedback, or need assistance, 
            our team is here to help.
          </p>
          <div className="mt-8 flex flex-col md:flex-row justify-center gap-6 text-amber-100">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h15a3 3 0 013 3v15a3 3 0 01-3 3h-15a3 3 0 01-3-3v-15z" clipRule="evenodd" />
                <path d="M8.25 6.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zM12 9a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H12.75a.75.75 0 01-.75-.75zM8.25 12a.75.75 0 01.75-.75h.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM12 12a.75.75 0 01.75-.75h.75a.75.75 0 010 1.5H12.75a.75.75 0 01-.75-.75zM15.75 12a.75.75 0 01.75-.75h.75a.75.75 0 010 1.5h-.75a.75.75 0 01-.75-.75zM8.25 15a.75.75 0 01.75-.75h.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM12 15a.75.75 0 01.75-.75h.75a.75.75 0 010 1.5H12.75a.75.75 0 01-.75-.75zM15.75 15a.75.75 0 01.75-.75h.75a.75.75 0 010 1.5h-.75a.75.75 0 01-.75-.75z" />
              </svg>
              <span>Quick Response</span>
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M4.848 2.772a.75.75 0 011.032.22l2.35 6.456a.75.75 0 01-.194.887l-2.19 2.192a.75.75 0 00-.22.56v1.368a.75.75 0 00.75.75h1.368a.75.75 0 00.56-.22l2.192-2.19a.75.75 0 01.886-.194l6.457 2.35a.75.75 0 01.22 1.032v1.656a.75.75 0 01-.75.75H4.5a3 3 0 01-3-3V5.25a3 3 0 013-3h1.656zm6.828 2.062a.75.75 0 01.996-.134l5.357 2.679c.148.075.297.151.446.228l3.123 1.562a.75.75 0 01.127 1.39l-2.482 1.391a.75.75 0 01-.127 1.39l-2.482 1.391a.75.75 0 01-.127 1.39l-2.482 1.391a.75.75 0 01-1.125-.134l-2.679-5.357a.75.75 0 01.134-1.125z" clipRule="evenodd" />
              </svg>
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M12.516 2.173a.75.75 0 00-1.032 0l-9 9a.75.75 0 00-.22.56v7.5a3 3 0 003 3h13.5a3 3 0 003-3v-7.5a.75.75 0 00-.22-.56l-9-9zM12 9a2.5 2.5 0 100 5 2.5 2.5 0 000-5z" clipRule="evenodd" />
              </svg>
              <span>Expert Assistance</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div 
            ref={el => sectionRefs.current[1] = el}
            className="fade-in-section bg-white rounded-xl shadow-lg p-8 transform transition-transform duration-500 ease-out hover:-translate-y-1"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow duration-300 shadow-sm"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow duration-300 shadow-sm"
                    placeholder="+91 9999 99 9999"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow duration-300 shadow-sm"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow duration-300 shadow-sm"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="order">Order Related</option>
                  <option value="complaint">Complaint</option>
                  <option value="feedback">Feedback</option>
                  <option value="wholesale">Wholesale Inquiry</option>
                  <option value="catering">Catering Services</option>
                  <option value="custom">Custom Orders</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-vertical transition-shadow duration-300 shadow-sm"
                  placeholder="Please describe your inquiry in detail..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.695 2.898a1.5 1.5 0 01-1.61 0L1.5 8.67z" />
                      <path d="M19.5 21a3 3 0 003-3V6.75l-9.25 3.083a1.5 1.5 0 01-1.5 0L1.5 6.75V18a3 3 0 003 3h15z" />
                    </svg>
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div 
            ref={el => sectionRefs.current[2] = el}
            className="fade-in-section space-y-8"
          >
            {/* Quick Contact */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Contact</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center animate-pulse-slow">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-amber-600">
                      <path fillRule="evenodd" d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.695 2.898a1.5 1.5 0 01-1.61 0L1.5 8.67z" clipRule="evenodd" />
                      <path d="M19.5 21a3 3 0 003-3V6.75l-9.25 3.083a1.5 1.5 0 01-1.5 0L1.5 6.75V18a3 3 0 003 3h15z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Call Us</p>
                    <p className="text-gray-600">+91 9999 99 9999</p>
                    <p className="text-sm text-gray-500">Mon-Sun: 9 AM - 10 PM</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center animate-pulse-slow">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-600">
                      <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.695 2.898a1.5 1.5 0 01-1.61 0L1.5 8.67z" />
                      <path d="M19.5 21a3 3 0 003-3V6.75l-9.25 3.083a1.5 1.5 0 01-1.5 0L1.5 6.75V18a3 3 0 003 3h15z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Email Us</p>
                    <p className="text-gray-600">info@sweetbites.com</p>
                    <p className="text-sm text-gray-500">24/7 Response</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center animate-pulse-slow">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-600">
                      <path fillRule="evenodd" d="M11.54 22.351A8.25 8.25 0 0021 12.75a9.75 9.75 0 10-18.54.914.75.75 0 00.395 1.393L8.5 18.75h3a.75.75 0 00.75-.75v-2.25a.75.75 0 00-.75-.75h-3a.75.75 0 00-.53.22L4.54 17.391a.75.75 0 01-1.06-1.06l.512-.511a.75.75 0 00-1.06-1.06L2.94 15.28a.75.75 0 00.063-.087c-.01-.013-.016-.02-.027-.033A8.25 8.25 0 00.75 12.75 9.75 9.75 0 0118.667 4.19a.75.75 0 00-.083.844.75.75 0 001.06.844A11.25 11.25 0 0012 1.5a11.25 11.25 0 00-10.74 13.914.75.75 0 00.395 1.393L8.5 18.75z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Visit Us</p>
                    <p className="text-gray-600">4 Locations Across Mumbai & Pune</p>
                    <p className="text-sm text-gray-500">See locations below</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Reviews Summary */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">What Our Customers Say</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-4xl font-extrabold text-amber-600">4.8</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-extrabold text-green-600">1,250+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
              </div>
              <div className="text-center">
                <button className="text-amber-600 hover:text-amber-700 font-bold transition-transform duration-300 transform hover:scale-105">
                  View All Reviews →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Locations Section */}
        <div 
          ref={el => sectionRefs.current[3] = el}
          className="fade-in-section mt-16 md:mt-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Locations</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Visit us at any of our convenient locations across Mumbai and Pune. 
              Each store offers the same quality products and excellent service.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {locations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
