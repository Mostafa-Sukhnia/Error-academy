import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className="container p-2 bg-[#fafafa] rounded-t-xl mt-10">
  <div className="flex items-center gap-10 max-md:flex-col-reverse max-md:gap-5">
    <p className="p-4 pr-[80px] bg-[#f5f2fa] rounded-tr-[100px] rounded-br-[200px] rounded-l-xl max-md:rounded-xl max-md:p-4">
      Error Academy is an educational platform specialized in providing high-quality technical content, focusing on programming and web development. It was established to bridge the gap between traditional education and the demands of the modern job market. The academy offers intensive training courses covering programming languages such as JavaScript and Python, as well as frameworks like React and Node.js, in addition to advanced topics like project management and system design.
      The academy employs a project-based learning approach, allowing students to immediately apply the concepts they learn. With a team of experts, Error Academy provides continuous support to students to ensure they get the most out of each course.
    </p>
    <div className="flex mr-10">
      <Link to="/" className="text-[70px] md:text-[40px] lg:text-[70px] xl:text-[70px] font-bold">
        <span className="text-[#9e5cf2]">E</span>rr
        <span className="text-[#9e5cf2]">o</span>r
      </Link>
    </div>
  </div>
  <div className="w-full m-auto flex justify-between items-center mt-10 rounded-lg bg-[#f5f5f5] p-2 px-4 max-md:flex-col">
  <p>privacy policy | terms & conditions</p>
  <p>all copyright (c) 2022 reserved</p>
  </div>
</div>
  )
}

export default Footer