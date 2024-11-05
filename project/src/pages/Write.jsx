import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Addcourse } from "../store/Slices/AddYourCourse";
import { useParams } from "react-router-dom";

const Write = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.Course.loading);
  const [image, setimage] = useState("");
  const [url, setUrl] = useState("");
  const [titel, settitel] = useState("");
  const [descripe, setdescripe] = useState("");
  const [difficulty, setdifficulty] = useState("");
  const [type, settype] = useState("");
  const [advertisement, setadvertisement] = useState(
    "https://www.youtube.com/embed/mjl2pGLfeJM"
  );
const {id} = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      Addcourse({
        id,
        titel,
        descripe,
        difficulty,
        type,
        advertisement,
        image,
        videos: []
      })
    );
  };

  const handleVideoChange = (e) => {
    let videoUrl = e.target.value;
    let videoID = null;

    if (videoUrl.includes("v=")) {
      videoID = videoUrl.split("v=")[1].split("&")[0];
    } else if (videoUrl.includes("youtu.be/")) {
      videoID = videoUrl.split("youtu.be/")[1].split("?")[0];
    }
    if (videoID) {
      const embedUrl = `https://www.youtube.com/embed/${videoID}`;
      setadvertisement(embedUrl);
    }
  };

  const handelImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setimage(file);
      setUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="container min-h-[80vh]">
      {loading && (
        <div className="w-screen h-screen fixed top-0 right-0 bg-[#00000010] flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-4 border-t-transparent border-l-transparent border-b-gray-500 border-r-transparent animate-spin"></div>
        </div>
      )}

      <p className="text-8xl max-sm:text-5xl font-bold text-center my-3">
        Cr<span className="text-purple-500">e</span>at
        <span className="text-purple-500">e</span> yo
        <span className="text-purple-500">u</span>r C
        <span className="text-purple-500">o</span>ur
        <span className="text-purple-500">s</span>e
      </p>
      <div className="w-full p-4 bg-[#fafafa] rounded-lg flex flex-col gap-4">
        <p className="text-center font-bold text-3xl">
          <span className="text-purple-500">D</span>eclare your{" "}
          <span className="text-purple-500">course</span> using a You
          <span className="text-purple-500">T</span>ube vi
          <span className="text-purple-500">d</span>eo
        </p>
        <iframe
          className="m-auto bg-black w-[100%] h-[230px] sm:h-[220px] md:h-[300px] lg:h-[450px] xl:h-[600px] rounded-lg"
          src={advertisement}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div className="flex items-center gap-4">
          <label
            htmlFor="Url"
            className="w-[20%] max-sm:w-[25%] focuse:outline-none "
          >
            Your URL:
          </label>
          <input
          required
            id="Url"
            className="flex-grow border p-2 rounded w-[80%] max-sm:w-[75%] focus:outline-none bg-white"
            onChange={handleVideoChange}
            placeholder="Enter your video URL"
          />
        </div>
      </div>
      <p className="text-8xl font-bold text-center my-3">
        <span className="text-purple-500">W</span>r
        <span className="text-purple-500">i</span>te
      </p>
      <form onSubmit={handleSubmit} className="bg-[#fafafa] p-4 rounded-lg ">
        <img
          src={url}
          alt="set your img"
          className="w-full h-[230px] sm:h-[220px] md:h-[300px] lg:h-[450px] xl:h-[600px] bg-black rounded-lg object-cover"
        />
        <div className="flex justify-between items-center text-2xl my-2">
          <p className="text-gray-600 font-bold block my-2">
            input your <span className="text-purple-500">poster</span> for your
            course
          </p>
          <label
            htmlFor="image"
            className="cursor-pointer flex justify-between items-center  gap-4"
          >
            {image ? (
              <i className="fa-solid fa-check text-green-500 text-2xl"></i>
            ) : (
              <i className="fa-solid fa-circle-xmark text-red-500"></i>
            )}
            <i className="fa-solid fa-upload text-purple-500"></i>
          </label>
          <input
          required

            type="file"
            id="image"
            onChange={(e) => {
              handelImageChange(e);
            }}
            className="hidden"
          />
        </div>
        <label htmlFor="input1" className="text-purple-400 font-bold">
          name of your course
        </label>
        <input
          required

          id="input1"
          onChange={(e) => settitel(e.target.value)}
          className="block border p-2 w-full mb-4 rounded-md focus:outline-purple-300 caret-purple-300"
        />

        <label htmlFor="input3" className="text-purple-400 font-bold">
          type of your course
        </label>
        <input
          required
          id="input3"
          className="block border p-2 w-full mb-4 rounded-md focus:outline-purple-300 caret-purple-300"
          maxLength="10"
          onChange={(e) => {
            settype(e.target.value);
          }}
        />
        <label htmlFor="input4" className="text-purple-400 font-bold">
          difficulty of your course
        </label>
        <input
          required
          id="input4"
          className="block border p-2 w-full mb-4 rounded-md focus:outline-purple-300 caret-purple-300"
          maxLength="10"
          onChange={(e) => {
            setdifficulty(e.target.value);
          }}
        />
        <label htmlFor="input2" className="text-purple-400 font-bold">
          description of your course
        </label>
        <textarea
          required
          id="input2"
          className="block border p-2 w-full h-[150px] mb-4 rounded-md focus:outline-purple-300 caret-purple-300 resize-none"
          onChange={(e) => {
            setdescripe(e.target.value);
          }}
        />
        <button
          type="submit"
          className="bg-purple-500 text-white px-6 py-2 rounded  font-bold"
        >
          Create My Course
        </button>
      </form>
    </div>
  );
};

export default Write;
