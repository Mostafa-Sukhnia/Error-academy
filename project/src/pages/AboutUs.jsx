import React from 'react';
import ins1 from "../images/instructor/07.png"
import ins2 from "../images/instructor/08.png"
const AboutUs = () => {
  return (
    <div className='container min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 p-8 rounded-lg'>
      <h1 className='font-bold text-6xl text-center mb-4'>
        Abo<span className='text-purple-500'>u</span>t U<span className='text-purple-500'>s</span>
      </h1>
      <p className='text-center text-lg text-gray-700 mb-8'>
        We are a dedicated team of educators and professionals committed to providing high-quality educational content.
        Our goal is to empower learners by offering a diverse range of courses that cater to different interests and skill levels.
      </p>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div className='bg-white rounded-lg shadow-lg p-6 flex flex-col items-center'>
          <img
            src={ins1}
            alt='Team Member'
            className='w-[300px] h-[300px] rounded-full mb-4 object-cover'
          />
          <h2 className='font-semibold text-xl'>John Doe</h2>
          <p className='text-gray-600'>Co-founder & CEO</p>
          <p className='text-center text-gray-700 mt-2'>
            John has over 10 years of experience in the education sector and is passionate about making learning accessible to everyone.
          </p>
        </div>
        <div className='bg-white rounded-lg shadow-lg p-6 flex flex-col items-center'>
          <img
            src={ins2}
            alt='Team Member'
            className='w-[300px] h-[300px] rounded-full mb-4 object-cover'
          />
          <h2 className='font-semibold text-xl'>Jane Smith</h2>
          <p className='text-gray-600'>Head of Content</p>
          <p className='text-center text-gray-700 mt-2'>
            Jane is a content expert who curates high-quality courses and ensures that they meet the needs of our learners.
          </p>
        </div>
      </div>
      <div className='mt-12 text-center'>
        <h2 className='font-bold text-2xl mb-4'>Our Mission</h2>
        <p className='text-lg text-gray-700 max-w-2xl mx-auto'>
          Our mission is to transform the way people learn by providing innovative and engaging educational experiences that inspire personal and professional growth.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
