import React from 'react';
import { Link } from 'react-router-dom';

const ContactUs = () => {
  return (
    <div className='container min-h-[80vh] flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg'>
      <h1 className='text-purple-500 text-6xl font-bold text-center mb-4'>
        Con<span className='text-black'>t</span>act<span className='text-black'>U</span>s
      </h1>
      <p className='text-center text-sm text-purple-400 font-bold mb-6'>
        Questions, bug reports, feedback, feature requests - we're here for it all.
        Already use Error? <Link to="/login" className='text-black underline'>SignIn</Link> so we can tailor your support experience.
        If that's not possible, we'd still like to hear from you.
      </p>
      <div className='w-full max-w-lg'>
        <form 
          className='flex flex-col m-auto rounded-lg shadow-lg p-6 border-2 border-[#f9f9f9] gap-4 bg-white'
          onSubmit={(e) => { e.preventDefault(); }}
        >
          <label htmlFor='email' className='font-bold text-gray-700'>Your Email Address</label>
          <input 
            type='email' 
            placeholder='Email' 
            id='email' 
            className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'
            required 
          />
          <label htmlFor='subject' className='font-bold text-gray-700'>Subject</label>
          <input 
            type='text' 
            placeholder='Subject' 
            id='subject' 
            className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'
            required 
          />
          <label htmlFor='message' className='font-bold text-gray-700'>How Can We Help?</label>
          <textarea 
            placeholder='Your message' 
            id='message' 
            className='min-h-[150px] p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-purple-500' 
            required
          />
          <input 
            type='submit' 
            value="Send" 
            className='cursor-pointer bg-purple-500 text-white font-semibold py-2 rounded-md transition duration-300 hover:bg-purple-600'
          />
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
