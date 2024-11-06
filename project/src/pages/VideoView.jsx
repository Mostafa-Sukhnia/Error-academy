import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

const VideoView = () => {
  const { id, courseId, videoId } = useParams();

  
  const users = useSelector((state) => state.authSlice.users);
  const user = users?.find((user) => user.id == id);
  const course = user?.courses?.find((course) => course.courseId == courseId);
  
  // تحقق من وجود الدورة والفيديو قبل الوصول إليهم
  const video = course?.videos[videoId];
  
  // في حالة عدم وجود الفيديو، يمكن عرض رسالة مناسبة
  if (!video) {
    return <p className="text-center text-red-500">Video not found!</p>;
  }
  
  return (
    <div className="min-h-[80vh] container mx-auto p-4">
      <h2 className="text-center font-bold text-purple-300 text-4xl mt-2 mb-4">{video.titleVid}</h2>
      <video
        poster={video.urlPoster}
        src={video.urlVidC}
        className="w-full h-auto md:h-[400px] lg:h-[500px] xl:h-[600px] object-cover rounded-lg p-2 border-2 shadow-lg border-gray-100"
        controls // إضافة عناصر التحكم للفيديو
      />
      <p className="my-4 text-lg mt-6 text-gray-800 leading-relaxed font-normal tracking-wide">
        <span className="text-purple-400">Description</span> of video: {video.longdecripevid}
      </p>
      <div className="mt-6 space-y-4">
        {course?.videos && course.videos.length > 0 ? (
          course.videos.map((item, index) => (
            <div
              key={index}
              className={`p-4 bg-[#f9fafb] rounded-lg shadow-md cursor-pointer flex items-center justify-between hover:bg-[#f3f4f6] transition-all duration-200 ${index == videoId ? "border-2 border-green-200 hover:bg-green-100" : ""}`}
            >
              <Link
                to={`/Courses/coding/cource/${user.id}/${course.courseId}/video/${index}`}
                className={`relative overflow-hidden rounded-lg group`}
              >
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
  );
};

export default VideoView;
