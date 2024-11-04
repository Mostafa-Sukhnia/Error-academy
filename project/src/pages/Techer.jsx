import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const Techer = () => {
  const { id } = useParams();
  const teachers = useSelector((state) => state.authSlice.users);
  const teacher = teachers.find((teacher) => teacher.id === id);
  console.log(teacher);
  return (
    <div className="container min-h-[80vh] ">
      {teacher ? (
        <>
          <div>
            <div className="relative w-full mb-4">
              <img
                src={teacher.image}
                className="h-[350px] w-[350px] max-sm:w-[200px] max-sm:h-[200px] rounded-full object-cover m-auto"
                alt={`${teacher.fname} ${teacher.lname}`}
              />
            </div>
            <div className="text-center">
              <h2 className="font-bold text-lg">{`${teacher.fname} ${teacher.lname}`}</h2>
              <p className="text-lg text-purple-500">Welcome in my profile</p>
            </div>
          </div>
          <div className="relative mt-4">
            <p className="font-bold">your Cources</p>
            <span className="absolute top-[11px] left-[-13px] w-2 h-2 bg-purple-500  rounded-full"></span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {teacher.courses && teacher.courses.length > 0 ? (
              teacher.courses.map((item, index) => (
                <div
                  key={index}
                  className="p-2 bg-[#fafafa] rounded-lg shadow-lg cursor-pointer"
                >
                  <img
                    src={item.img}
                    alt={`course ${index + 1}`}
                    className="w-full h-[200px] max-lg:h-[360px] rounded-lg hover:scale-105 hover:shadow-md transition object-cover duration-500"
                  />
                  <p className="p-1 font-[500] text-sm">{item.titel}</p>
                  <div className="px-1 flex justify-between my-2">
                    <div className="text-[#bdbdbd] flex items-center">
                      <i className="fa-solid fa-graduation-cap"></i>
                      <p className="ml-2 text-black text-[12px]">
                        Lessons: unknow
                      </p>
                    </div>
                    <div className="text-[#bdbdbd] flex items-center">
                      <i className="fa-solid fa-trophy"></i>
                      <p className="ml-2 text-black text-[12px]">
                        Rating: {item.difficulty}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between p-1 pt-2 items-center">
                    <motion.div initial={{}} whileTap={{ scale: 0.9 }}>
                      <Link
                        to={`/Courses/${item.type}/cource/${teacher.id}/${item.courseId}`}
                        className="px-3 py-2 bg-black rounded-lg text-white flex items-center"
                      >
                        <span>Start Course</span>
                        <i className="fa-solid fa-angle-right ml-2"></i>
                      </Link>
                    </motion.div>
                    <div className="flex items-center">
                      <p className="mr-[1px]">{item.star}</p>
                      <motion.i
                        whileHover={{ rotate: 360 }}
                        className="fa-solid fa-star"
                        style={{ color: "orange" }}
                      ></motion.i>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No courses available.</p>
            )}
          </div>
        </>
      ) : (
        <p>There is no teacher with this name</p>
      )}
    </div>
  );
};

export default Techer;
