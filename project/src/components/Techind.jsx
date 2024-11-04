import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const Techind = () => {
  const users = useSelector((state) => state.authSlice.users);

  return (
    <div className='container min-h-[80vh]'>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
      {
        users.map((item, index) => (
          <Link 
            to={`${item.id}`} 
            key={index} 
            className="p-2 bg-[#fafafa] rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-500 cursor-pointer"
          >
            <img
              src={item.image}
              className="w-full h-[200px] max-lg:h-[360px] rounded-lg hover:scale-105 hover:shadow-md transition object-cover duration-500"

              alt={`Instructor ${index + 1}`}
            />
            <div className="flex justify-center items-center mt-2">
              <p className="p-1 font-medium text-sm text-center">
                {item.fname} {item.lname}
              </p>
            </div>
          </Link>
        ))
      }
    </div>
  </div>
)
}
export default Techind