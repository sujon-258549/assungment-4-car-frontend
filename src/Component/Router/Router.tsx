import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../Layout/MainLayout/MainLayout";
import LoginFrom from "../page/LoginFrom/LoginFrom";
import Registration from "../page/LoginFrom/Registration";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../Layout/Home/Home";
import Contact from "../page/Contect/Contact";
import CreateCar from "../page/Admin/CreateCar";
import AllCorCard from "../page/Common/AllCorCard";
import DetailsCar from "../page/Common/DetailsCar";
import AboutUs from "../Layout/Home/About/AboutUs";
import GetAllCar from "../page/Admin/GetAllCar";
import UpdateCar from "../page/Admin/UpdateCar";
import ChangePassword from "../page/LoginFrom/ChangePassword";
import Dashboard from "../page/DashboardMain/Dashboard";
import VarefyPreempt from "../page/DashboardMain/VarefyPreempt";
import MyOrder from "../page/DashboardMain/MyOrder";
import GetAllOrder from "../page/Admin/GetAllOrder";
import Sidebar from "../page/sideber/Sidebar";
import Profile from "../page/dashboard/common/Profile";
import UpdateUser from "../page/LoginFrom/UpdateUser";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/varefy-payment",
        element: (
          <ProtectedRoute role="user">
            {" "}
            <VarefyPreempt />
          </ProtectedRoute>
        ),
      },
      {
        path: "/all-cars",
        element: <AllCorCard />,
      },
      {
        path: `/detail-page/:_id`,
        element: <DetailsCar />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/login",
    element: <LoginFrom />,
  },
  {
    path: "/dashboard",
    element: <Sidebar />,
    children: [
      {
        index: true, // ✅ Redirects `/dashboard` to `/dashboard/admin`
        element: <Navigate to="board" replace />,
      },
      {
        //  role &&
        path: "board",
        element: <Dashboard />,
      },
      {
        path: "create-car",
        element: (
          <ProtectedRoute role="admin">
            {" "}
            <CreateCar />
          </ProtectedRoute>
        ),
      },
      {
        path: "change-password",
        element: <ChangePassword />,
      },
      {
        path: "update-profile",
        element: <UpdateUser />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "my-order",
        element: (
          <ProtectedRoute role="user">
            <MyOrder />,
          </ProtectedRoute>
        ),
      },
      {
        path: "getallorder",
        element: (
          <ProtectedRoute role="admin">
            <GetAllOrder />
          </ProtectedRoute>
        ),
      },
      {
        path: "all-car",
        element: (
          //   <ProtectedRoute role="admin">
          <GetAllCar />
          //   </ProtectedRoute>
        ),
      },
      {
        path: `update-page/:_id`,
        element: (
          <ProtectedRoute role="admin">
            <UpdateCar />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
