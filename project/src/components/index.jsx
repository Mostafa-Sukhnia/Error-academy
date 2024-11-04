import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import arrows from "../images/arrows.png";
import home from "../images/home.png";
import bg from "../images/background.png";
import { motion } from "framer-motion";
const Index = () => {
  const [type, setType] = useState("All");
  const users = useSelector((state) => state.authSlice.users);
  console.log(users);
  const cources = users
    .filter((user) => user.courses && user.courses.length > 0)
    .flatMap((user) =>
      user.courses.map((course) => ({ ...course, userId: user.id }))
    );
  console.log(cources);

  const typeHandler = (type) => {
    setType(type);
  };
  return (
    <main>
      <div className="container min-h-[80vh] flex justify-between items-center max-lg:flex-col gap-8 mb-4 px-6">
        <div className="w-full max-w-[400px] relative flex-1 mx-auto text-center lg:text-left lg:mx-0">
          <p className="font-bold text-[35px] leading-relaxed max-md:mt-[86px]">
            🙌 Hello friends <br />
            I am Mustafa and we want to start
            <br />
            <span className="text-[#e9b0f2]">Front End</span> <br />
            Do you like it too 😍 ?
          </p>
          <Link
            to="/Courses/coding"
            className=" px-6 py-3 bg-black text-white rounded-lg mt-8 mx-auto lg:mx-0 block w-fit hover:scale-105 duration-500"
          >
            Start Course Now
            <i
              style={{ marginLeft: "10px" }}
              className="fa-solid fa-angle-right"
            ></i>
          </Link>
          <img
            src={arrows}
            alt=""
            className="absolute left-[-50px] top-[70%] hidden lg:block"
          />
        </div>

        <div className="flex-1 flex justify-center lg:justify-end">
          <img
            src={home}
            alt=""
            className="max-w-full lg:max-w-[100%] h-auto object-contain"
          />
        </div>
      </div>

      <div className="container">
        <p className="font-bold text-[25px] text-center">
          Search among <span className="text-[#9e5cf2]">{cources.length}</span>{" "}
          courses and
          <br /> find your favorite course
        </p>
        <div className="relative my-4">
          <input
            type="text"
            className="bg-[#f9f9f9] px-4 py-4 pr-10 pl-[110px] rounded-lg focus:outline-none w-full"
            placeholder="Search Courses"
          />
          <i
            className="fa-solid fa-magnifying-glass"
            style={{
              position: "absolute",
              right: "14px",
              top: "20px",
              color: "#bdbdbd",
            }}
          ></i>
          <button className="px-2 py-2 bg-black text-white absolute top-[9px] left-[10px] rounded-lg max-lg:mx-auto block">
            Categories
          </button>
        </div>
      </div>
      <section>
        <div className="container mt-10 flex flex-row max-md:flex-col  justify-between items-center">
          <div className="flex items-center  lg:mb-0">
            <div className="w-3 h-3 lg:w-2 lg:h-2 mr-4 rounded-full bg-purple-500"></div>
            <p className="text-md font-bold lg:text-2xl sm:text-xl xs:text-lg">
              NEW COURSES
            </p>
            <div className="block w-3 h-3 lg:w-2 lg:h-2 ml-4 rounded-full bg-purple-500 sm:hidden"></div>
          </div>

          <div className="flex max-lg:flex-wrap items-center justify-center  lg:space-x-6 text-lg lg:text-base sm:text-sm xs:text-xs">
            <p
              className="cursor-pointer font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition duration-300"
              onClick={() => {
                typeHandler("All");
              }}
            >
              All Courses
            </p>
            <p
              className="cursor-pointer font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition duration-300"
              onClick={() => {
                typeHandler("design");
              }}
            >
              Design
            </p>
            <p
              className="cursor-pointer font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition duration-300"
              onClick={() => {
                typeHandler("coding");
              }}
            >
              Development
            </p>
            <p
              className="cursor-pointer font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition duration-300"
              onClick={() => {
                typeHandler("photoShop");
              }}
            >
              Photography
            </p>

            <div className="hidden lg:flex items-center justify-center">
              <i
                className="fa-solid fa-filter"
                style={{
                  backgroundColor: "#fafafa",
                  color: "#818181",
                  padding: "12px",
                  borderRadius: "10px",
                }}
                aria-label="Filter"
              ></i>
            </div>
          </div>
        </div>
        <div></div>
      </section>

      <div
        className={` ${
          cources.length === 0
            ? "flex justify-center items-center"
            : "container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
        }`}
      >
        {cources.length === 0 ? (
          <div>
            <p className="text-[#e9b0f1] text-xl font-bold">
              There is no cources
            </p>
          </div>
        ) : (
          cources
            .filter((item) => {
              if (type === "All") {
                return true;
              } else {
                return item.type === type;
              }
            })
            .map((item, index) => {
              return (
                <div
                  key={index + 1}
                  className="p-2 bg-[#fafafa] rounded-lg hover:scale-105 transition duration-500 hover:shadow-2xl"
                >
                  <img
                    src={item.img}
                    alt={`cource ${index + 1}`}
                    className="w-[400px] h-[200px] max-lg:h-[150px] object-cover` rounded-lg"
                  />
                  <p className="p-1 font-[500] text-sm">{item.title}</p>
                  <div className="px-1 flex justify-between my-2">
                    <div className="text-[#bdbdbd]  flex items-center">
                      <i class="fa-solid fa-graduation-cap"></i>
                      <p className="ml-2 text-black text-[12px]">
                        Lesson: {item.videos.length}
                      </p>
                    </div>
                    <div className="text-[#bdbdbd] flex items-center">
                      <i class="fa-solid fa-trophy"></i>
                      <p className="ml-2 text-black text-[12px]">
                        {item.difficulty}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between p-1 pt-2 items-center">
                    <motion.div
                      initial={{ rotate: 0 }}
                      whileHover={{ rotate: 5 }}
                      whileTap={{ scale: 0.9, rotate: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link
                        to={`/${item.type}/cource/${item.userId}/${item.courseId}`}
                        className="px-3 py-2 bg-black rounded-lg text-white flex items-center"
                      >
                        <span>start course</span>
                        <i
                          className="fa-solid fa-angle-right"
                          style={{ marginLeft: "5px", marginTop: "3px" }}
                        ></i>
                      </Link>
                    </motion.div>
                    <div className="flex justify-center items-center">
                      <p className="mr-[1px]">{item.stars}</p>
                      <i
                        class="fa-solid fa-star"
                        style={{ color: "orange" }}
                      ></i>
                    </div>
                  </div>
                </div>
              );
            })
        )}
      </div>
      <div className="container flex justify-between flex-col mt-[100px]">
        <div className="text-center mb-4 mx-auto flex flex-col justify-center items-center">
          <h3 className="text-4xl font-bold">
            <span className="text-[#e9b0f1]">Best</span> Instructors
          </h3>
          <p className="font-medium text-xl">
            At the Academy, we strive to bring together the best professors for
            the best courses
          </p>
          <motion.div
            initial={{ rotate: 0 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.9 }}
            className="w-full flex justify-center mt-4"
          >
            <Link
              to="/Teach"
              className="px-3 py-2 bg-black rounded-lg text-white w-fit my-2"
            >
              All Instructors
            </Link>
          </motion.div>
        </div>

        <div className={` ${users.length > 0 ? ('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mx-auto') : ('block')}`}>
          {
           users.length > 0 ? (
            users
              .filter((item) => item.courses.length > 0)
              .map((tech, index) => (
                <div
                  key={index}
                  className="p-2 bg-[#fafafa] rounded-lg shadow-md"
                >
                  <img
                    src={tech.image}
                    className="w-[400px] h-[200px] max-lg:h-[150px] object-cover rounded-lg"
                    alt={`Instructor ${index + 1}`}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <p className="p-1 font-medium text-sm text-center">
                      {tech.fname} {tech.lname}
                    </p>
                    <Link
                      to={`/Teach/${tech.id}`}
                      className="px-3 py-2 bg-black rounded-lg text-white flex items-center "
                    >
                      my profile
                    </Link>
                  </div>
                </div>
              ))
          ) : (
              <p className="text-[#e9b0f1] text-xl font-bold text-center">ther is no any Instructor</p>
          )}
        </div>
      </div>
      <div className="relative my-32 z-[99]">
        <div className="container relative z-10 flex items-start max-sm:items-center  gap-1">
          <div className="mb-4 flex-1 w-1/2">
            <p className="text-xl font-bold">
              Find out about the latest courses with the{" "}
              <span className="text-[#5a69f2]">academy</span> newsletter
            </p>
          </div>
          <form className="flex space-x-4 flex-1 w-1/2 relative">
            <input
              type="text"
              className="w-[85%] pl-[75px] h-10  border-gray-300 rounded-lg flex-1 border-none focus:outline-none"
              placeholder="Enter your email"
            />
            <input
              type="submit"
              value="Submit"
              className="bg-black text-white rounded-lg cursor-pointer px-2 py-1 absolute left-[-10px] top-1"
            />
          </form>
        </div>

        <div
          className="absolute w-[90%] max-sm:w-[100%] max-sm:top-[-30px] max-lg:top-[-55px] h-[200px] left-0 top-[-75px] rounded-xl flex justify-end"
          style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}
        >
          <div className="w-[20%] h-full bg-[#5a69f2] max-sm:w-[40%] rounded-tl-[40px] rounded-tr-2xl rounded-br-2xl rounded-bl-[90px]"></div>
        </div>
      </div>
      
      <div className="container">
        <div className="relative max-sm:text-center w-fit m-auto mb-4">
          <p className="text-[#e9b0f1] text-4xl font-bold">Top courses</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {
            cources.length > 0 ? (
            cources
            .filter((item) => item.videos.length > 0)
            .map((item, index) => (
              <div
                key={index}
                className="p-2 bg-[#fafafa] rounded-lg shadow-lg"
              >
                <img
                  src={item.img}
                  alt={`course ${index + 1}`}
                  className="w-full h-[200px] max-lg:h-[150px]  rounded-lg hover:scale-105 hover:shadow-md transition object-cover duration-500"
                />
                <p className="p-1 font-[500] text-sm">{item.titel}</p>
                <div className="px-1 flex justify-between my-2">
                  <div className="text-[#bdbdbd] flex items-center">
                    <i className="fa-solid fa-graduation-cap"></i>
                    <p className="ml-2 text-black text-[12px]">
                      Lessons: {item.videos.length}
                    </p>
                  </div>
                  <div className="text-[#bdbdbd] flex items-center">
                    <i className="fa-solid fa-trophy"></i>
                    <p className="ml-2 text-black text-[12px]">
                      Rating: {item.type}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between p-1 pt-2 items-center">
                  <motion.div initial={{}} whileTap={{ scale: 0.9 }}>
                    <Link
                      to={`cource/${item.userId}/${item.courseId}`}
                      className="px-3 py-2 bg-black rounded-lg text-white flex items-center"
                    >
                      <span>Start Course</span>
                      <i className="fa-solid fa-angle-right ml-2"></i>
                    </Link>
                  </motion.div>
                  <div className="flex items-center">
                    <p className="mr-[1px]">{item.star}</p>
                    <i
                      className="fa-solid fa-star"
                      style={{ color: "orange" }}
                    ></i>
                  </div>
                </div>
              </div>
            ))

            ) : (
              <p className="text-[#e9b0f1] text-xl font-bold text-center">ther is no any Instructor</p>
            ) 
          }
        </div>
      </div>
    </main>
  );
};

export default Index;
