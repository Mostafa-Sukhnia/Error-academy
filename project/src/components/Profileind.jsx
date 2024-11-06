import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { edite } from "../store/Slices/authSlice";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getCources } from "../store/Slices/AddYourCourse";

const Profileind = () => {
  const { id } = useParams();
  const you = useSelector((state) => state.authSlice.you);
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authSlice.loading);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };
  const submitHandler = () => {
    if (selectedImage) {
      const fileInput = document.getElementById("file-input");
      const file = fileInput.files[0];
      if (file) {
        dispatch(edite(file));
      }
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getCources(id));
    }
  }, [dispatch, id]);

  return (
    <>
      {loading && (
        <div className="w-screen h-screen bg-[rgba(0,0,0,0.2)] flex justify-center items-center fixed top-0 right-0">
          <div className="w-40 h-40 rounded-full border-4 border-t-transparent border-b-transparent border-r-transparent border-l-gray-500 animate-spin"></div>
        </div>
      )}

      <div className="container">
        <div className="flex gap-8 max-md:flex-col">
          <div>
            <div className="relative w-full">
              <img
                src={selectedImage || you.image}
                alt="your profile"
                className="w-[300px] h-[300px] object-cover rounded-full m-auto"
              />
              <div>
                <label htmlFor="file-input">
                  <i className="fa-solid fa-pencil absolute bottom-2 right-2 text-white bg-black p-4 rounded-full border border-white cursor-pointer transition-transform duration-300 hover:scale-110"></i>
                </label>
                <input
                  id="file-input"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </div>
            </div>
            {selectedImage && (
              <div className="w-full my-2">
                <button
                  className="block w-[150px] m-auto px-4 py-2 bg-green-700 cursor-pointer text-white rounded-lg"
                  onClick={submitHandler}
                >
                  Save
                </button>
              </div>
            )}
          </div>
          <div className="flex-1 text-center flex justify-center items-center flex-col gap-2">
            <p className="text-[30px] md:text-[40px] lg:text-[50px] xl:text-[60px] text-purple-500">
              W<span className="text-black">e</span>lcom{" "}
              <span className="text-black">B</span>ack
            </p>
            <p className="text-[30px] md:text-[40px] lg:text-[50px] xl:text-[60px]">
              <span className="text-purple-500">{you.fname}</span> {you.lname}
            </p>
            <motion.div
              whileHover={{ rotate: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link
                to="write"
                className="block w-[200px] mx-auto p-2 rounded-lg bg-black text-white font-bold hover:bg-purple-600 duration-500"
              >
                <i className="fa-solid fa-plus"></i> Add Your Course
              </Link>
            </motion.div>
          </div>
        </div>
        <div className="relative mt-4">
          <p className="font-bold">Your Courses</p>
          <span className="absolute top-[11px] left-[-13px] w-2 h-2 bg-purple-500 rounded-full"></span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {you.courses && you.courses.length > 0 ? (
            you.courses.map((item, index) => (
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
                      to={`edit/${item.courseId}`}
                      className="px-3 py-2 bg-black rounded-lg text-white flex items-center"
                    >
                      <span>Edit your course</span>
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
      </div>
    </>
  );
};

export default Profileind;
