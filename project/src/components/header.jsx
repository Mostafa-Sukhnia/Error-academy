import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/Slices/authSlice";
const Header = () => {
  const dispatch = useDispatch();
  const [settings1, setSettings1] = useState(false);
  const you = useSelector((state) => state.authSlice.you);
  const [search, setSearch] = useState([]);
  const [text, setText] = useState(""); // استخدم سلسلة فارغة بدلاً من null
  const settingsHandler = () => {
    setSettings1(!settings1);
  };

  const logoutHandler = () => {
    dispatch(logout());
  };
  const users = useSelector((state) => state.authSlice.users);
  const cources = users
    .filter((user) => user.courses && user.courses.length > 0)
    .flatMap((user) =>
      user.courses.map((course) => ({ ...course, userId: user.id }))
    );

  const searchHandler = () => {
    if (text.trim()) {
      setSearch(
        cources.filter((item) => item.title && item.title.includes(text))
      ); // تحقق من وجود title
    } else {
      setSearch([]); // إخفاء النتائج عند حذف النص
    }
  };

  console.log(search);
  console.log(cources);
  return (
    <>
      <header className="relative">
        <AnimatePresence>
          {settings1 && (
            <motion.div
              key="settings-menu"
              className="h-screen w-[70%] bg-[#fafafa] fixed right-0 top-0 rounded-t-3xl z-[999] "
              initial={{ x: 250 }}
              animate={{ x: 0 }}
              exit={{ x: 615 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <i
                className="fa-regular fa-circle-xmark"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "-22px",
                  fontSize: "30px",
                  color: "#9e5cf2",
                  cursor: "pointer",
                  backgroundColor: "#f9f9f9",
                  padding: "10px",
                  borderRadius: "50%",
                }}
                onClick={settingsHandler}
              ></i>
              <div className="container flex flex-col h-full !pb-0">
                <div className="h-full pt-[50px] pb-[20px]">
                  <ul className="items-center flex flex-col justify-between h-full">
                    <motion.div whileHover={{ color: "#000", scale: 1.1 }}>
                      <Link to="/Teach" className="text-[#838383]">
                        Teach
                      </Link>
                    </motion.div>
                    <motion.div whileHover={{ color: "#000", scale: 1.1 }}>
                      <Link to="/Courses" className="text-[#838383] mr-6">
                        Cources
                      </Link>
                    </motion.div>
                    <motion.div whileHover={{ color: "#000", scale: 1.1 }}>
                      <Link to="/ContactUS" className="text-[#838383]">
                        Contact Us
                      </Link>
                    </motion.div>
                    <motion.div whileHover={{ color: "#000", scale: 1.1 }}>
                      <Link to="/AboutUs" className="text-[#838383]">
                        About Us
                      </Link>
                    </motion.div>
                    {you ? (
                      <div className="w-full bg-[#ffffff] px-4  py-4 flex justify-between items-center rounded-t-lg text-xl  max-sm:gap-4">
                        <Link to={`${you.id}`}>
                          <div className="flex gap-4 items-end">
                            <i
                              className="fa-solid fa-user"
                              style={{ color: "#9e5cf2", fontSize: "24px" }}
                              title={`your profile ${you.fname}`}
                            ></i>
                            <p>{you.fname}</p>
                          </div>
                        </Link>
                        <button
                          className="text-red-600 px-4 py-2 rounded-lg font-bold text-3xl"
                          onClick={logoutHandler}
                          title="logout"
                        >
                          <i className="fa-solid fa-person-through-window"></i>
                        </button>
                      </div>
                    ) : (
                      <div className="flex w-full items-center justify-between">
                        <Link
                          to="/login"
                          className="px-4 py-2 w-20 bg-[#9e5cf2] text-white font-bold rounded-md flex"
                        >
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          className="px-4 py-2 w-20 bg-[#000000] text-white font-bold rounded-md flex"
                        >
                          Signup
                        </Link>
                      </div>
                    )}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <header className="container flex justify-between items-center">
          <div className="flex">
            <Link to="/" className="text-[30px] font-bold">
              <span className="text-[#9e5cf2]">E</span>rr
              <span className="text-[#9e5cf2]">o</span>r
            </Link>
          </div>
          <ul className="items-center hidden lg:flex">
            <Link to="/Courses" className="text-[#838383] mr-6">
              Cources
            </Link>
            <Link to="/Teach" className="text-[#838383] mr-6">
              Teach
            </Link>
            <Link to="/ContactUS" className="text-[#838383] mr-6">
              Contact Us
            </Link>
            <Link to="/AboutUs" className="text-[#838383]">
              About Us
            </Link>
          </ul>
          <div className="relative">
            <input
              type="text"
              className="bg-[#f9f9f9] px-4 py-2 rounded-lg focus:outline-none pr-8"
              placeholder="Search Courses"
              onChange={(e) => setText(e.target.value)}
              // **************************************************************************
            />
            <i
              className="fa-solid fa-magnifying-glass z-10 cursor-pointer"
              style={{
                position: "absolute",
                right: "10px",
                top: "12px",
                color: "#bdbdbd",
              }}
              onClick={() => {
                searchHandler();
              }}
            ></i>
          </div>

          <div className="max-lg:hidden">
            {you ? (
              <Link to={`${you.id}`}>
                <img
                  src={you.image}
                  className="w-[40px] h-[40px] object-cover rounded-full"
                  alt="profile"
                  title={`your profile ${you.fname}`}
                />
              </Link>
            ) : (
              <div className="Login flex gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 bg-[#9e5cf2] text-white font-bold rounded-md hidden lg:flex"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-[#000000] text-white font-bold rounded-md hidden lg:flex"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          <div className="block lg:hidden" onClick={settingsHandler}>
            <i
              className="fa-solid fa-bars"
              style={{ fontSize: "22px", color: "#9e5cf2", cursor: "pointer" }}
            ></i>
          </div>
        </header>
        <hr />
        <div className="container hidden lg:flex justify-between items-center">
          <ul className="flex justify-between w-1/3">
            <li className="w-10 h-10 bg-[#ebfaf5] flex justify-center items-center rounded-md">
              <i className="fa-solid fa-code" style={{ color: "#009e68" }}></i>
            </li>
            <Link
              to="/Courses/coding"
              className="cursor-pointer w-20 h-10 bg-[#fafafa] flex justify-center items-center rounded-md"
            >
              Python
            </Link>
            <Link
              to="/Courses/coding"
              className="cursor-pointer w-20 h-10 bg-[#fafafa] flex justify-center items-center rounded-md"
            >
              React
            </Link>
            <Link
              to="/Courses/coding"
              className="cursor-pointer w-10 h-10 bg-[#fafafa] flex justify-center items-center rounded-md"
            >
              JS
            </Link>
          </ul>
          <ul className="flex justify-between w-1/4 items-center">
            <li className="bg-[#9e5cf226] w-10 h-10 flex justify-center items-center rounded-lg">
              <i
                className="fa-solid fa-pen-nib"
                style={{ color: "#9e5cf2" }}
              ></i>
            </li>
            <Link
              to="/Courses/design"
              className="w-20 h-10 bg-[#fafafa] flex justify-center items-center rounded-md cursor-pointer"
            >
              UI & UX
            </Link>
            <Link
              to="/Courses/design"
              className="w-20 h-10 bg-[#fafafa] flex justify-center items-center rounded-md cursor-pointer"
            >
              Figma
            </Link>
          </ul>
          <ul className="flex justify-between w-1/3 items-center">
            <li className="bg-[#ff3c311f] w-10 h-10 rounded-lg flex justify-center items-center">
              <i className="fa-solid fa-video" style={{ color: "#ff3c31" }}></i>
            </li>
            <Link
              to="/Courses/photoShop"
              className="cursor-pointer bg-[#fafafa] flex justify-center items-center p-4 rounded-lg h-10"
            >
              After Effects
            </Link>
            <Link
              to="/Courses/photoShop"
              className="cursor-pointer bg-[#fafafa] flex justify-center items-center p-4 rounded-lg h-10"
            >
              Lightroom
            </Link>
          </ul>
        </div>
        <div
          className={`w-[80%] min-h-[140px] bg-[#f9f9f9] border-gray-200 border-[.5px] shadow-lg rounded-b-lg absolute top-[77.5px] right-[10%] p-2 z-[100] ${
            search.length > 0 ? "absolute" : "hidden"
          }`}
        >
          {search.length > 0 ? (
            search.map((item, index) => (
              <div key={item.courseId} className="p-2 border-b border-gray-200">
                <div className="flex gap-4">
                  <img
                    src={item.img}
                    alt={`Course ${index}`}
                    className="w-[30%] h-[150px] object-cover rounded-md max-md:w-[45%]"
                  />
                  <div className="flex flex-col justify-between w-[60%]">
                    <div className="flex justify-between">
                      <h2 className="font-semibold text-lg">{item.title}</h2>
                      <p className="text-sm text-gray-500">{item.difficulty}</p>
                    </div>
                    <Link
                      to={`/Courses/${item.type}/cource/${item.userId}/${item.courseId}`}
                      className="text-purple-500 font-medium mt-2 inline-block"
                      onClick={() => setSearch([])}
                    >
                      Start
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">
              Not found, try again
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
