import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const PhotoShopIndex = () => {
  const users = useSelector((state) => state.authSlice.users);

  const photoShopCourses = users
    .filter((user) => user.courses && user.courses.length > 0)
    .flatMap((user) =>
      user.courses
        .filter((course) => course.type === "photoShop")
        .map((course) => ({ ...course, userId: user.id }))
    );
  
  return (
    <div className="container min-h-[80vh]">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {photoShopCourses.length > 0 ? (
          photoShopCourses.map((item, index) => (
            <div
              key={index + 1}
              className="p-2 bg-[#fafafa] rounded-lg hover:scale-105 transition duration-500 hover:shadow-2xl"
            >
              <img
                src={item.img}
                alt={`course ${index + 1}`}
                className="w-[400px] h-[200px] max-lg:h-[150px] object-cover rounded-lg"
              />
              <p className="p-1 font-[500] text-sm">{item.titel}</p>
              <div className="px-1 flex justify-between my-2">
                <div className="text-[#bdbdbd] flex items-center">
                  <i className="fa-solid fa-graduation-cap"></i>
                  <p className="ml-2 text-black text-[12px]">
                    Lesson: {item.videos.length}
                  </p>
                </div>
                <div className="text-[#bdbdbd] flex items-center">
                  <i className="fa-solid fa-trophy"></i>
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
                    to={`cource/${item.userId}/${item.courseId}`}
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
                    className="fa-solid fa-star"
                    style={{ color: "orange" }}
                  ></i>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>there is no courses</div>
        )}
      </div>
    </div>
  );
};

export default PhotoShopIndex;
