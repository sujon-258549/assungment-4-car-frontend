import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../Layout/MainLayout/MainLayout";
import LoginFrom from "../page/LoginFrom/LoginFrom";
import Registration from "../page/LoginFrom/Registration";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../Layout/Home/Home";
import Contact from "../page/Contect/Contact";
import CreateCar from "../page/dashboard/admin/Car/CreateCar";
import AllCorCard from "../page/Common/AllCorCard";
import AboutUs from "../Layout/Home/About/AboutUs";
import GetAllCar from "../page/dashboard/admin/Car/GetAllCar";
import UpdateCar from "../page/dashboard/admin/Car/UpdateCar";
import ChangePassword from "../page/LoginFrom/ChangePassword";
import Dashboard from "../page/DashboardMain/Dashboard";
import VarefyPreempt from "../page/DashboardMain/VarefyPreempt";
import MyOrder from "../page/DashboardMain/MyOrder";
import GetAllOrder from "../page/dashboard/admin/Car/GetAllOrder";
import Sidebar from "../page/sideber/Sidebar";
import Profile from "../page/dashboard/common/Profile";
import UpdateUser from "../page/LoginFrom/UpdateUser";
import CreateBlog from "../page/dashboard/admin/Blog/CreateBlog";
import AdminBlog from "../page/dashboard/admin/Blog/AdminBlog";
import DetailsBlog from "../page/dashboard/admin/Blog/DetalBlog";
import UpdateBlog from "../page/dashboard/admin/Blog/UpdateBlog";
import CreateCarShopForm from "../page/dashboard/admin/shop/createShopAndUpdate/CreateCarShopForm";
import DetailsShop from "../page/dashboard/admin/shop/DetailsShop/DetailsShop";
import UpdateCarShopForm from "../page/dashboard/admin/shop/createShopAndUpdate/UpdateCarShopForm";
import DetailsCarPage from "../page/dashboard/admin/Car/DetailsCarPage";
import CreateOrder from "../page/Common/CreateOrder";
import AllBlog from "../page/Common/AllBlog";
import AllOfferCard from "../page/Common/AllOfferCard";
import OrderDetails from "../page/DashboardMain/OrderDetails";

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
          <ProtectedRoute role={["admin", "user"]}>
            <VarefyPreempt />
          </ProtectedRoute>
        ),
      },
      {
        path: "/all-cars",
        element: <AllCorCard />,
      },
      {
        path: "/all-offer-cars",
        element: <AllOfferCard />,
      },
      {
        path: "/all-blog",
        element: <AllBlog />,
      },
      {
        path: `/create-order/:_id`,
        element: (
          <ProtectedRoute role={["admin", "user"]}>
            <CreateOrder />
          </ProtectedRoute>
        ),
      },
      {
        path: `/detail-car/:_id`,
        element: <DetailsCarPage />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: `details-blog/:id`,
        element: <DetailsBlog />,
      },

      {
        path: `details-orders/:_id`,
        element: (
          <ProtectedRoute role={["admin", "user"]}>
            <OrderDetails />
          </ProtectedRoute>
        ),
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
    element: (
      <ProtectedRoute role={["admin", "user"]}>
        <Sidebar />
      </ProtectedRoute>
    ),
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
          <ProtectedRoute role={["admin"]}>
            {" "}
            <CreateCar />
          </ProtectedRoute>
        ),
      },
      {
        path: "change-password",
        element: (
          <ProtectedRoute role={["admin", "user"]}>
            {" "}
            <ChangePassword />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "update-profile",
        element: (
          <ProtectedRoute role={["admin", "user"]}>
            <UpdateUser />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute role={["admin", "user"]}>
            {" "}
            <Profile />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "my-order",
        element: (
          <ProtectedRoute role={["user", "admin"]}>
            <MyOrder />,
          </ProtectedRoute>
        ),
      },
      {
        path: "all-orders",
        element: (
          <ProtectedRoute role={["admin"]}>
            <GetAllOrder />,
          </ProtectedRoute>
        ),
      },
      {
        path: "getallorder",
        element: (
          <ProtectedRoute role={["admin"]}>
            <GetAllOrder />
          </ProtectedRoute>
        ),
      },
      {
        path: "create-blog",
        element: (
          <ProtectedRoute role={["admin"]}>
            <CreateBlog />
          </ProtectedRoute>
        ),
      },
      {
        path: "all-blog",
        element: <AdminBlog />,
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
          <ProtectedRoute role={["admin"]}>
            <UpdateCar />
          </ProtectedRoute>
        ),
      },
      {
        path: `update-blog/:id`,
        element: (
          <ProtectedRoute role={["admin"]}>
            <UpdateBlog />
          </ProtectedRoute>
        ),
      },
      {
        path: `create-shop`,
        element: (
          <ProtectedRoute role={["admin"]}>
            <CreateCarShopForm />
          </ProtectedRoute>
        ),
      },
      {
        path: `details-shop`,
        element: (
          <ProtectedRoute role={["admin"]}>
            <DetailsShop />
          </ProtectedRoute>
        ),
      },
      {
        path: `update-shop`,
        element: (
          <ProtectedRoute role={["admin"]}>
            <UpdateCarShopForm />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
