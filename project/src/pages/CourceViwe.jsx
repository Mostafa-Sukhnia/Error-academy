import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

const CourceViwe = () => {
  const { id, courseId } = useParams();

  const users = useSelector((state) => state.authSlice.users);
  const user = users?.find((user) => user.id == id);
  const cource = user?.courses?.find((courc) => courc.courseId == courseId);

  return (
    <div className="container min-h-[80vh] p-4">
      {cource ? (
        <div className="cursor-default">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Wel<span className="text-purple-600">come</span> to the{" "}
            <span className="text-purple-600 text-5xl">{cource.title}</span> Course
          </h1>

          {/* بطاقة الدورة */}
          <div className="bg-white p-4 pt-0 rounded-lg shadow-lg border border-gray-300">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">{cource.name}</h2>

            <iframe
              className="m-auto bg-black w-full h-[230px] sm:h-[220px] md:h-[300px] lg:h-[450px] xl:h-[600px] rounded-lg shadow-md"
              src={cource.advertisement}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

            <div className="flex justify-between mt-4 font-semibold text-gray-700">
              <p className="text-md">
                Difficulty: <span className="text-purple-600">{cource.difficulty}</span>
              </p>
              <p className="text-md">
                Number of videos: <span className="text-purple-600">{cource.videos.length}</span>
              </p>
            </div>
            <p className="text-purple-500 text-center text-3xl font-bold">About Cource</p>
            <p className="text-lg mt-6 text-gray-800 leading-relaxed tracking-wide font-light">{cource.descripe}</p>
          </div>

          {/* قائمة الفيديوهات */}
          <h2 className="text-3xl font-bold mt-8 mb-4 text-center">
            Course V<span className="text-purple-500">ide</span>os<span className="text-purple-600">:</span>
          </h2>

          <div className="mt-6 space-y-4">
            {cource.videos && cource.videos.length > 0 ? (
              cource.videos.map((item, index) => (
                <div
                  key={index}
                  className="p-4 bg-[#f9fafb] rounded-lg shadow-md cursor-pointer flex items-center justify-between hover:bg-[#f3f4f6] transition-all duration-200"
                >
                  <Link
                  to={`video/${index}`} //:videoId
                  className="relative overflow-hidden rounded-lg group">
                    <img
                      src={item.urlPoster}
                      alt={`video ${index + 1}`}
                      className="h-[150px] w-[150px] rounded-lg transform transition-transform duration-200 object-cover group-hover:scale-105 group-hover:shadow-lg"
                    />
                    <i className="fa-solid fa-play absolute top-[38%] right-[40%] text-3xl text-white z-10 hover:text-[#eee]"></i>
                    <div className="absolute top-0 left-0 w-full h-full bg-purple-500 opacity-30 rounded-lg group-hover:opacity-50"></div>
                  </Link>
                  <div className="flex-1 ml-4">
                    <p className="font-medium text-lg md:text-xl text-gray-800 mb-1">
                      <i className="fa-solid fa-signature text-purple-500"></i>{" "}
                      <span className="text-purple-500">:</span> {item.titleVid}
                    </p>
                    <div className="flex items-center text-purple-600 text-sm md:text-base">
                      <i className="fa-solid fa-info-circle mr-2" title="Description"></i>
                      <p className="text-xs md:text-sm lg:text-base">{item.decripevid}</p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-lg md:text-3xl lg:text-5xl xl:text-6xl ml-4">
                    <span className="text-purple-500">#</span>
                    {index + 1}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No video courses available yet.</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-red-500">Course not found.</p>
      )}
    </div>
  );
};

export default CourceViwe;
