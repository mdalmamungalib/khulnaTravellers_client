// src/components/AboutUs.jsx
import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 mt-10">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 md:p-16 mb-12"
      >
        <h1 className="text-5xl font-bold text-gray-800 mb-4 text-center">About Khulna Travels</h1>
        <p className="text-gray-600 text-xl mb-6 text-center">
          Welcome to Khulna Travels! We are your trusted partner in exploring the beautiful and diverse landscapes of Khulna. Our mission is to provide unforgettable travel experiences that showcase the rich culture, history, and natural beauty of this amazing region.
        </p>
      </motion.div>
      <div className="flex flex-wrap justify-center -m-4">
        {[
          { name: 'Raziul Islam Rana ', role: 'Founder & CEO', img: 'https://scontent.fjsr6-1.fna.fbcdn.net/v/t39.30808-6/315222850_5996506240368780_7977675515934715645_n.jpg?stp=c0.23.206.206a_dst-jpg_p206x206&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEJZndmbJrHOPEMa1To3m0zwKMos7TXTE3AoyiztNdMTXEBLJifx3vXuDk58kLhOsJ8oUHJyCCTfv5_YO_z8LS5&_nc_ohc=83jMAarehwAQ7kNvgHKX4-S&_nc_ht=scontent.fjsr6-1.fna&oh=00_AYDxrxc92jhkXlqjLXoWrB8xG0TZWZYZ1yfF3cajxvFVkA&oe=6673707B' },
          { name: 'Masud Hasan ', role: 'Chief Tour Guide', img: 'https://scontent.fjsr6-1.fna.fbcdn.net/v/t1.6435-9/80551323_2371941872912155_9124223017474326528_n.jpg?stp=c34.0.206.206a_dst-jpg_p206x206&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEfnMLXyB9qNWgHwJEpuJgju4rCqCecOPK7isKoJ5w48mClj1JoItj4D_jppmqFnPeXKuuTONxXpi7zVFiGLilg&_nc_ohc=K96JGR93y9YQ7kNvgFOD-2P&_nc_ht=scontent.fjsr6-1.fna&oh=00_AYAQPtLYhRqnq5zpT3uVqnqnQJhj4oDjSKB-tOKLuSv3fg&oe=66950D09' },
          { name: 'Sabiha Islam Tith', role: 'Travel Coordinator', img: 'https://scontent.fjsr6-1.fna.fbcdn.net/v/t39.30808-1/437892078_2722271257926270_299207427168760919_n.jpg?stp=c0.33.200.200a_dst-jpg_p200x200&_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFJvYHXfBj7xf9ggEot8PMNxFKPvBuzMY_EUo-8G7Mxj19e7eE0b3nguw-xcQ6PZbl3XX93W1wRfsOjsxMrJTY2&_nc_ohc=o1-dHfk5thwQ7kNvgFmuBPd&_nc_ht=scontent.fjsr6-1.fna&oh=00_AYCw8Vq45dcAEPG2ZsKfRlEWjrSUEp7Ghk3ek8ZcusOt_g&oe=66736CC8' },
        ].map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.3 }}
            className="p-4 md:w-1/3 w-full"
          >
            <div className="h-full bg-white p-8 rounded-lg shadow-lg transition transform hover:scale-105">
              <img
                alt="team"
                className="w-32 h-32 mb-8 object-cover object-center rounded-full inline-block"
                src={member.img}
              />
              <h2 className="text-gray-900 text-lg font-medium title-font mb-4">{member.name}</h2>
              <p className="leading-relaxed text-base">{member.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default AboutUs;
