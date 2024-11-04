import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import "./index.css";
import Protect from "./pages/ProtectedPages.js";

import Index from "./components/index.jsx";
import Root from "./pages/Root.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Profile from "./pages/Profile.jsx";
import Tech from "./pages/Tech.jsx";
import Courses from "./pages/Courses.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Coding from "./pages/Coding.jsx";
import Design from "./pages/Design.jsx";
import PhotoShop from "./pages/PhotoShop.jsx";
import Courcesind from "./components/Courcesind.jsx";
import Techer from "./pages/Techer.jsx";
import Techind from "./components/Techind.jsx";
import Write from "./pages/Write.jsx";
import Profileind from "./components/Profileind.jsx";
import Edite from "./components/Edite.jsx";
import CourceViwe from "./pages/CourceViwe.jsx";
import CodingIndex from "./components/CodingIndex.jsx";
import DesignIndex from "./components/DesignIndex.jsx";
import PhotoShopIndex from "./components/PhotoShopInd.jsx";
import VideoView from "./pages/VideoView.jsx";
const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/ContactUs",
        element: <ContactUs />,
      },
      {
        path: "/AboutUs",
        element: <AboutUs />,
      },
      {
        path: "cource/:id/:courseId",
        element: <CourceViwe />,
      },{
        path:"cource/:id/:courseId/video/:videoId",
        element:<VideoView/>
      },{
        path: ":id",
        element: (
          <Protect>
            <Profile />
          </Protect>
        ),
        children: [
          {
            path: "",
            element: <Profileind />,
          },
          {
            path: "write",
            element: <Write />,
          },
          {
            path: "edit/:courseId",
            element: <Edite />,
          },
        ],
      },
      {
        path: "/Courses",
        element: (
          <Protect>
            <Courses />
          </Protect>
        ),
        children: [
          {
            path: "",
            element: <Courcesind />,
          },
          {
            path: "coding",
            element: <Coding />,
            children: [
              {
                path: "",
                element: <CodingIndex />,
              },
              {
                path: "cource/:id/:courseId",
                element: <CourceViwe />,
              },{
                path:"cource/:id/:courseId/video/:videoId",
                element:<VideoView/>
              }
            ],
          },
          {
            path: "design",
            element: <Design />,
            children: [
              {
                path: "",
                element: <DesignIndex />,
              },
              {
                path: "cource/:id/:courseId",
                element: <CourceViwe />,
              },{
                path:"cource/:id/:courseId/video/:videoId",
                element:<VideoView/>
              }
            ],
          },
          {
            path: "photoShop",
            element: <PhotoShop />,
            children: [
              {
                path: "",
                element: <PhotoShopIndex />,
              },
              {
                path: "cource/:id/:courseId",
                element: <CourceViwe />,
              },{
                path:"cource/:id/:courseId/video/:videoId",
                element:<VideoView/>
              }
            ],
          }
        ],
      },
      {
        path: "/Teach",
        element: (
          <Protect>
            <Tech />
          </Protect>
        ),
        children: [
          {
            path: ":id",
            element: <Techer />,
          },
          {
            path: "",
            element: <Techind />,
          },
          {
            path: ":id/:courseId",
            element: <CourceViwe />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
