import React from 'react'
import { Link } from 'react-router-dom';
import {motion} from "framer-motion"
const Courcesind = () => {
  return (
    <div className="container min-h-[80vh]">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <motion.div whileHover={{scale:1.2}} transition={{duration:1}}>
      <Link to="/Courses/coding" className="cursor-pointer">
       <div className="w-50 h-50 bg-[#ebfaf5] flex justify-center items-center rounded-md h-[200px] flex-col">
          <motion.i
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="fa-solid fa-code"
            style={{ color: " rgb(0, 158, 104)", fontSize: "50px" }}
          ></motion.i>
        </div>
          <p className=" font-medium text-center text-[#009e68] my-2">Coding</p>
       </Link>
      </motion.div>
      <motion.div whileHover={{scale:1.2}} transition={{duration:1}}>
       <Link to="/Courses/design" className="cursor-pointer">
       <div className="w-50 h-50 bg-[#9e5cf226] flex justify-center items-center rounded-md h-[200px]">
          <motion.i  
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="fa-solid fa-pen-nib"
            style={{ color: "rgb(158, 92, 242)", fontSize: "50px" }}
          ></motion.i>
        </div>
        <p className=" font-medium text-center text-[#9e5cf2] my-2">Design</p>
       </Link>
       </motion.div>
       <motion.div whileHover={{scale:1.2}} transition={{duration:1}}>
        <Link to="/Courses/photoShop" className="cursor-pointer">
        <div className="w-50 h-50 bg-[#ff3c311f] flex justify-center items-center rounded-md h-[200px]">
        <motion.i
  whileHover={{ rotate: 360 }}
  transition={{ duration: 0.5 }}
  className="fa-solid fa-video"
  style={{ color: "#ff3c31", fontSize: "50px" }}
></motion.i>

        </div>
        <p className=" font-medium text-center text-[#ff3c31] my-2">photoShop</p>
        </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default Courcesind