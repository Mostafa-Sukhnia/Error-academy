import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadImage,
  uploadVideo,
  updateCourses,
} from "../store/Slices/AddYourCourse";

const Edite = () => {
  const { courseId } = useParams();
  const { id } = useParams();
  const you = useSelector((state) => state.authSlice.you.courses);
  const user = useSelector((state) => state.authSlice.you);
  const yourCources = you.find((item) => item.courseId == courseId);

  const [CourseId, setCourseId] = useState(""); // اسم الكورس
  const [title, setTitle] = useState(""); // اسم الكورس
  const [difficulty, setDifficulty] = useState(""); // difficulty of your course صعوبة الكورس
  const [advertisement, setAdvertisement] = useState(""); // اعلان الكورس
  const [url, setUrl] = useState(""); // صورة الكورس
  const [description, setDescription] = useState(""); // description of your course شرح عن الكورس
  const [image, setImage] = useState(""); // صورة الكورس
  const [type, setType] = useState(""); // نوع الكورس
  const [vid, setVid] = useState(false); // رفع فيديو من فيديوهات الكورس
  const [poster, setPoster] = useState(""); // صورة تعريفية للفيديو
  const [vidUrl, setVidUrl] = useState(""); // صورة تعريفية للفيديو رابط
  const [posterURL, setPosterURL] = useState(""); // صورة تعريفية للفيديو
  const [titleVid, setTitleVid] = useState(""); // اسم الكورس
  const [decripevid, setDecripevid] = useState(""); //  تعريف الكورس
  const [longdecripevid, setLongDecripeVid] = useState(""); // تعريف طويل للكورس

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(you);
    console.log(yourCources);
    console.log(courseId);
    if (yourCources) {
      setAdvertisement(yourCources.advertisement || "unsign");
      setImage(yourCources.img);
      setTitle(yourCources.titel || "unsign");
      setType(yourCources.type || "unsign");
      setDifficulty(yourCources.difficulty || "unsign");
      setDescription(yourCources.descripe || "unsign");
      setCourseId(courseId);
    }
  }, [yourCources, id, courseId, you]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // تحميل الصور والفيديوهات
      const urlPoster = await uploadImage(poster);
      const urlVidC = await uploadVideo(vid);
      const urlImgC = await uploadImage(image);

      // إعداد بيانات الكورس بعد التحديث
      const courseData = {
        id: user.id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        password: user.password,
        image: user.image,
        courses: [
          // الاحتفاظ بالكورسات غير المعدلة وإزالة الكورس الذي يتم تعديله حاليًا
          ...user.courses.filter((item) => item.courseId != courseId),
          {
            courseId,
            title,
            descripe: description,
            advertisement,
            difficulty,
            img: urlImgC,
            type,
            videos: [
              // هنا يتم تحديث الفيديوهات في الكورس فقط، من خلال فلترة الفيديوهات
              ...(yourCources.videos
                ? yourCources.videos.filter(
                    (video) => video.titleVid != titleVid
                  )
                : []),
              {
                urlPoster,
                urlVidC,
                titleVid,
                decripevid,
                longdecripevid,
              },
            ],
          },
        ],
      };

      // إرسال البيانات للـ Redux
      dispatch(updateCourses(courseData));
    } catch (error) {
      console.error("Error uploading data:", error);
    }
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
      setAdvertisement(embedUrl);
    }
  };

  const handelImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setUrl(URL.createObjectURL(file));
    }
  };

  const posterfileHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPoster(file);
      setPosterURL(URL.createObjectURL(file));
    }
  };

  const videofilehandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVid(file);
      setVidUrl(URL.createObjectURL(file));
    }
  };

  const loading = useSelector((state) => state.Course.loading);

  function LoadingOverlay() {
    return loading ? (
      <div className="w-screen h-screen bg-[rgba(0,0,0,0.2)] fixed top-0 right-0 flex items-center justify-center">
        <p className="text-white text-2xl">Loading...</p>
      </div>
    ) : null;
  }

  return (
    <section className="container min-h-[80vh] ">
      {<LoadingOverlay />}

      <p className="text-center text-6xl font-default font-medium">
        <span className="text-purple-500">E</span>dite
      </p>
      <div className="container min-h-[80vh]">
        <div className="w-full p-4 bg-[#fafafa] rounded-lg flex flex-col gap-4">
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
              value={advertisement}
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
            src={
              url || (yourCources && yourCources.img) || "default-image-url.jpg"
            } // تأكد من وجود قيمة افتراضية
            alt="set your img"
            className="w-full h-[230px] sm:h-[220px] md:h-[300px] lg:h-[450px] xl:h-[600px] bg-black rounded-lg object-cover"
          />

          <div className="flex justify-between items-center text-2xl my-2">
            <p className="text-gray-600 font-bold block my-2">
              input your <span className="text-purple-500">poster</span> for
              your course
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
              type="file"
              id="image"
              onChange={handelImageChange}
              className="hidden"
            />
          </div>
          <label htmlFor="input1" className="text-purple-400 font-bold">
            name of your course
          </label>
          <input
            id="input1"
            onChange={(e) => setTitle(e.target.value)}
            className="block border p-2 w-full mb-4 rounded-md focus:outline-purple-300 caret-purple-300"
            value={title}
          />

          <label htmlFor="input3" className="text-purple-400 font-bold">
            type of your course
          </label>
          <input
            value={type}
            id="input3"
            className="block border p-2 w-full mb-4 rounded-md focus:outline-purple-300 caret-purple-300"
            maxLength="10"
            onChange={(e) => setType(e.target.value)}
          />
          <label htmlFor="input4" className="text-purple-400 font-bold">
            difficulty of your course
          </label>
          <input
            value={difficulty}
            id="input4"
            className="block border p-2 w-full mb-4 rounded-md focus:outline-purple-300 caret-purple-300"
            maxLength="40"
            onChange={(e) => setDifficulty(e.target.value)}
          />
          <label htmlFor="input2" className="text-purple-400 font-bold">
            description of your course
          </label>
          <textarea
            value={description}
            id="input2"
            className="block border p-2 w-full h-[150px] mb-4 rounded-md focus:outline-purple-300 caret-purple-300 resize-none"
            onChange={(e) => setDescription(e.target.value)}
          />

          <section className="mt-5">
            <p className="text-center text-4xl my-4 font-bold">
              A<span className="text-purple-500">d</span>d{" "}
              <span className="text-purple-500">video</span> of your cource
            </p>
            <div className="w-full  rounded-lg bg-white p-2 flex justify-between items-center">
              <p className="text-center px-2 text-2xl font-bold">
                your cource videos (
                <span className="text-purple-500">{title}</span>)
              </p>
              <label
                className={`fa-solid ${
                  vid ? "fa-minus" : "fa-plus"
                } bg-green-500 text-black px-4 py-3 cursor-pointer rounded-lg`}
                onClick={() => setVid(!vid)}
              ></label>
            </div>
            <div className="w-full min-h-20 bg-white rounded-lg flex justify-center items-center my-2">
              {vid ? (
                <div className="flex flex-col justify-between items-center gap-4 w-full p-4">
                  <div className="flex flex-col w-full">
                    <video
                      src={
                        vidUrl || "https://www.w3schools.com/html/mov_bbb.mp4"
                      }
                      controls
                      className="rounded-lg w-full"
                    />
                    <div className="flex flex-col gap-2 mb-4">
                      <label
                        htmlFor="addvid"
                        className="font-bold  flex justify-between items-center by-2 my-2 text-xl"
                      >
                        <p>
                          Add <span className="text-purple-500">your</span>{" "}
                          video
                        </p>
                        <i className="fa-solid fa-cloud-arrow-up text-purple-500 cursor-pointer"></i>
                      </label>
                      <input
                        id="addvid"
                        type="file"
                        className="hidden"
                        onChange={videofilehandler}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col w-full">
                    <img
                      src={posterURL}
                      className="bg-black rounded-lg w-full h-[220px] sm:h-[220px] md:h-[300px] lg:h-[350px] xl:h-[450px] object-cover"
                      alt="poster"
                    />
                    <div className="flex flex-col gap-2 mb-4">
                      <label
                        htmlFor="addimg"
                        className="font-bold  flex justify-between items-center by-2 my-2 text-xl"
                      >
                        <p>
                          Add <span className="text-purple-500">the</span>{" "}
                          poster
                        </p>
                        <i className="fa-solid fa-cloud-arrow-up text-purple-500 cursor-pointer"></i>
                      </label>
                      <input
                        id="addimg"
                        type="file"
                        className="hidden"
                        onChange={posterfileHandler}
                      />
                    </div>
                  </div>

                  <div className="flex-grow space-y-2 w-full">
                    <label htmlFor="name" className="block font-bold ">
                      Title
                    </label>
                    <input
                      id="name"
                      type="text"
                      maxLength={15}
                      className="block w-full p-2 border rounded focus:outline-none focus:border-purple-500"
                      onChange={(e) => {
                        setTitleVid(e.target.value);
                      }}
                    />

                    <label htmlFor="description" className="block font-bold ">
                      Description
                    </label>
                    <input
                      id="description"
                      type="text"
                      maxLength={25}
                      className="block w-full p-2 border rounded focus:outline-none focus:border-purple-500"
                      onChange={(e) => {
                        setDecripevid(e.target.value);
                      }}
                    />

                    <label
                      htmlFor="longDescription"
                      className="block font-bold "
                    >
                      Long Description
                    </label>
                    <textarea
                      id="longDescription"
                      className="block w-full p-2 border rounded resize-none focus:outline-none focus:border-purple-500"
                      rows="3"
                      onChange={(e) => {
                        setLongDecripeVid(e.target.value);
                      }}
                    />
                  </div>
                </div>
              ) : (
                <p className="upper-case  text-xl">
                  there is{" "}
                  <span className="text-purple-500 font-semibold">no</span>{" "}
                  videos yet !
                </p>
              )}
            </div>
          </section>
          <input
            type="submit"
            value="save changes"
            className="bg-purple-500 text-white px-6 py-2 rounded font-bold cursor-pointer"
          />
        </form>
      </div>
    </section>
  );
};
export default Edite;
