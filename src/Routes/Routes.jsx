import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Components/Home/Home";
import SingUp from "../Components/SingUp/SingUp";
import Login from "../Components/Login/Login";
import DashBoard from "../Layout/DashBoard";
import PrivetRout from "./PrivetRout";
import AllUsers from "../DashBoard/AllUsers/AllUsers";
// import AdminRoute from "./AdminRoute";
import AddLatestPlan from "../DashBoard/AddLatestPlan/AddLatestPlan";
import AllLatestPlan from "../DashBoard/AllLatestPlan/AllLatestPlan";
import UpdateLatestPlan from "../DashBoard/UpdateLatestPlan/UpdateLatestPlan";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import AddThemMember from "../DashBoard/AddThemMember/AddThemMember";
import AllThemMember from "../DashBoard/AllThemMember/AllThemMember";
import UpdateThemMember from "../DashBoard/UpdateThemMember/UpdateThemMember";
import AddBanner from "../DashBoard/AddBanner/AddBanner";
import Destinations from "../Components/Pages/Destinations/Destinations";
import ExplorePlan from "../Components/Pages/Destinations/ExplorePlan";
import Gallery from "../Components/Pages/Gallery/Gallery";
import AddGallery from "../DashBoard/AddGallery/AddGallery";
import DashBoardHome from "../DashBoard/DashBoardHome/DashBoardHome";
import MyProfile from "../DashBoard/MyProfile/MyProfile";
import EditProfile from "../DashBoard/EditProfile/EditProfile";
import AboutUs from "../Components/Pages/AboutUs/AboutUs";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFoundPage />,
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/destination",
        element: (
          <PrivetRout>
            <Destinations />
          </PrivetRout>
        ),
      },
      {
        path: "/explorePlan",
        element: (
          <PrivetRout>
            <ExplorePlan />
          </PrivetRout>
        ),
      },
      {
        path: "/gallery",
        element: <Gallery />,
      },
      {
        path: "/aboutUs",
        element: <AboutUs />,
      },
      {
        path: "/signUp",
        element: <SingUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/dashBoard",
    errorElement: <NotFoundPage />,
    element: (
      <PrivetRout>
        <DashBoard />
      </PrivetRout>
    ),
    children: [
      {
        path: "/dashBoard/myProfile",
        element: (
            <MyProfile />
        ),
      },
      {
        path: "/dashBoard/home",
        element: (
            <DashBoardHome />
        ),
      },
      {
        path: "/dashBoard/allUsers",
        element: (
            <AllUsers />
        ),
      },
      {
        path: "/dashBoard/addlatestPlan",
        element: (
            <AddLatestPlan />
        ),
      },
      {
        path: "/dashBoard/allLatestPlan",
        element: (
            <AllLatestPlan />
        ),
      },
      {
        path: "/dashBoard/updateLatestPlan/:id",
        element: (
            <UpdateLatestPlan />
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_SERVER_URL}/aLatestPlan/${params.id}`),
      },
      {
        path: "/dashBoard/addThemMember",
        element: (
            <AddThemMember />
        ),
      },
      {
        path: "/dashBoard/allThemMember",
        element: (
            <AllThemMember />
        ),
      },
      {
        path: "/dashBoard/updateMember/:id",
        element: (
            <UpdateThemMember />
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_SERVER_URL}/aMember/${params.id}`),
      },
      {
        path: "/dashBoard/addBanner",
        element: (
            <AddBanner />
        ),
      },
      {
        path: "/dashBoard/addGallery",
        element: (
            <AddGallery />
        ),
      },

      {
        path: "/dashBoard/editProfile/:id",
        element: (
            <EditProfile />
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_SERVER_URL}/singleUser/${params.id}`),
      },
    ],
  },
]);
