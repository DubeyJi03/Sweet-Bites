import React from 'react'
import rajbhogColImg from '../../assets/rajbhogCol.png';
import othersColImg from '../../assets/othersCol.png';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const CakeCollectionSection = () => {
  return (
    <section className='py-16 px-4 lg:px-0'>
      <div className='container mx-auto flex flex-col md:flex-row gap-8'>
        
        {/* Rajbhog Collection */}
        <motion.div
          className='relative flex-1 overflow-hidden rounded-xl shadow-lg'
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.img
            src={rajbhogColImg}
            alt="Cake Collection"
            className='w-full lg:h-[550px] sm:h-[500px] object-cover scale-100 hover:scale-105 transition-transform duration-700'
            whileHover={{ scale: 1.05 }}
          />
          <motion.div
            className='absolute bottom-8 left-8 bg-white bg-opacity-90 p-4 rounded-lg shadow-md'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className='text-2xl font-bold text-gray-900 mb-2'>Rajbhog's Collection</h2>
            <Link
              to="/collections/all?category=Rajbhog"
              className='text-sm text-gray-900 underline hover:text-black transition-colors'
            >
              Shop Now
            </Link>
          </motion.div>
        </motion.div>

        {/* Ladoos & Mithai Collection */}
        <motion.div
          className='relative flex-1 overflow-hidden rounded-xl shadow-lg'
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.img
            src={othersColImg}
            alt="Others Collection"
            className='w-full lg:h-[550px] sm:h-[500px] object-cover scale-100 hover:scale-105 transition-transform duration-700'
            whileHover={{ scale: 1.05 }}
          />
          <motion.div
            className='absolute bottom-8 left-8 bg-white bg-opacity-90 p-4 rounded-lg shadow-md'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className='text-2xl font-bold text-gray-900 mb-2'>Ladoos & Mithai Collection</h2>
            <Link
              to="/collections/all?sweetType=ladoo+mithai"
              className='text-sm text-gray-900 underline hover:text-black transition-colors'
            >
              Shop Now
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}

export default CakeCollectionSection
