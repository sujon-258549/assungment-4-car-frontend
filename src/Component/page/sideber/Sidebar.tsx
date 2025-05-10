import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LogOut,
  Settings,
  User,
  Car,
  ShoppingCart,
  List,
  User2,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  ListOrdered,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { logOut } from "@/redux/features/assignment4/authSlice";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import Loader from "@/Component/Utils/Loader";
import { BsShop } from "react-icons/bs";
import { MdUpdate } from "react-icons/md";
import { FaShop } from "react-icons/fa6";
import { FaBlogger } from "react-icons/fa";

type MenuItem = {
  path: string;
  label: string;
  icon: React.ReactNode;
  adminOnly?: boolean;
};

type CollapsibleMenu = {
  title: string;
  icon: React.ReactNode;
  items: MenuItem[];
  adminOnly?: boolean;
};

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const { data: meData, isLoading } = useGetMeQuery("me");

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  const toggleMenu = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const mainMenuItems: MenuItem[] = [
    {
      path: "/dashboard/board",
      label: "Dashboard",
      icon: null,
    },
    {
      path: "/dashboard/my-order",
      label: "My Orders",
      icon: <ShoppingCart className="w-5 h-5" />,
      adminOnly: false,
    },
  ];

  const adminMenus: CollapsibleMenu[] = [
    {
      title: "Blogs Management",
      icon: <FaBlogger className="w-5 h-5" />,
      items: [
        {
          path: "/dashboard/create-blog",
          label: "Create Blogs",
          icon: (
            <span className="w-4 h-4 flex items-center justify-center">+</span>
          ),
        },
        {
          path: "/dashboard/all-blog",
          label: "All Blogs",
          icon: <List className="w-4 h-4" />,
        },
      ],
      adminOnly: true,
    },
    {
      title: "Car Management",
      icon: <Car className="w-5 h-5" />,
      items: [
        {
          path: "/dashboard/create-car",
          label: "Create Car",
          icon: (
            <span className="w-4 h-4 flex items-center justify-center">+</span>
          ),
        },
        {
          path: "/dashboard/all-car",
          label: "All Cars",
          icon: <List className="w-4 h-4" />,
        },
      ],
      adminOnly: true,
    },
    {
      title: "Order Management",
      icon: <ListOrdered className="w-5 h-5" />,
      items: [
        {
          path: "/dashboard/all-orders",
          label: "All Orders",
          icon: (
            <span className="w-4 h-4 flex items-center justify-center">+</span>
          ),
        },
      ],
      adminOnly: true,
    },
    {
      title: "Shop Management",
      icon: <FaShop className="w-5 h-5" />,
      items: [
        // {
        //   path: "/dashboard/create-shop",
        //   label: "Create Shop",
        //   icon: (
        //     <span className="w-4 h-4 flex items-center justify-center">+</span>
        //   ),
        // },
        {
          path: "/dashboard/details-shop",
          label: "Shop",
          icon: <BsShop className="w-4 h-4" />,
        },
        {
          path: "/dashboard/update-shop",
          label: "Update Shop",
          icon: <MdUpdate className="w-4 h-4" />,
        },
      ],
      adminOnly: true,
    },
  ];

  const profileMenu: CollapsibleMenu = {
    title: "Profile",
    icon: <User className="w-5 h-5" />,
    items: [
      {
        path: "/dashboard/change-password",
        label: "Change Password",
        icon: <Settings className="w-4 h-4" />,
      },
      {
        path: "/dashboard/update-profile",
        label: "Update Profile",
        icon: <Settings className="w-4 h-4" />,
      },
      {
        path: "/dashboard/profile",
        label: "My Profile",
        icon: <User2 className="w-4 h-4" />,
      },
    ],
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="sm:hidden fixed top-4 left-4 z-50 p-2 rounded-md mt-1 bg-[#424242] hover:bg-[#424242da] text-white shadow-lg"
      >
        {isSidebarOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed sm:relative w-64 h-full bg-gradient-to-b from-[#424242] to-[#424242eb] text-white transition-all duration-300 z-40
          ${isSidebarOpen ? "left-0" : "-left-64 sm:left-0"}`}
      >
        <div className="flex flex-col h-full">
          {/* Brand Logo */}
          <Link to="/">
            <div className="flex p-4 items-center">
              <img src="/logo.png" className="w-14 h-5" alt="logo" />
              <h3 className="text-2xl font-bold">Shop</h3>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto pb-2">
            <ul className="space-y-1 px-3">
              {/* Main Menu Items */}
              {mainMenuItems
                .filter((item) => !item.adminOnly || meData?.role === "admin")
                .map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center py-1 px-2 mb-4 rounded-lg transition-all ${
                          isActive
                            ? "bg-white text-indigo-800"
                            : "hover:bg-[#424242]"
                        }`
                      }
                    >
                      {item.icon}
                      <span className="ml-3">{item.label}</span>
                    </NavLink>
                  </li>
                ))}

              {/* Admin Menus */}
              {meData?.role === "admin" &&
                adminMenus.map((menu) => (
                  <li key={menu.title}>
                    <button
                      onClick={() => toggleMenu(menu.title)}
                      className={`flex items-center justify-between w-full p-3 rounded-lg transition-all ${
                        activeMenu === menu.title
                          ? "bg-white text-indigo-800"
                          : "hover:bg-[#424242d3]"
                      }`}
                    >
                      <div className="flex items-center">
                        {menu.icon}
                        <span className="ml-3">{menu.title}</span>
                      </div>
                      {activeMenu === menu.title ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                    <div
                      className={`pl-8 overflow-hidden transition-all duration-300 ${
                        activeMenu === menu.title ? "max-h-60" : "max-h-0"
                      }`}
                    >
                      <ul className="py-2 space-y-1">
                        {menu.items.map((item) => (
                          <li key={item.path}>
                            <NavLink
                              to={item.path}
                              className={({ isActive }) =>
                                `flex items-center p-2 rounded-lg text-sm transition-all ${
                                  isActive
                                    ? "bg-white text-indigo-800"
                                    : "hover:bg-[#424242d3]"
                                }`
                              }
                            >
                              {item.icon}
                              <span className="ml-2">{item.label}</span>
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}

              {/* Profile Menu */}
              <li>
                <button
                  onClick={() => toggleMenu("profile")}
                  className={`flex items-center justify-between w-full p-3 rounded-lg transition-all ${
                    activeMenu === "profile"
                      ? "bg-[#424242]"
                      : "hover:bg-[#424242d3]"
                  }`}
                >
                  <div className="flex items-center">
                    {profileMenu.icon}
                    <span className="ml-3">{profileMenu.title}</span>
                  </div>
                  {activeMenu === "profile" ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                <div
                  className={`pl-8 overflow-hidden transition-all duration-300 ${
                    activeMenu === "profile" ? "max-h-40" : "max-h-0"
                  }`}
                >
                  <ul className="py-2 space-y-1">
                    {profileMenu.items.map((item) => (
                      <li key={item.path}>
                        <NavLink
                          to={item.path}
                          className={({ isActive }) =>
                            `flex items-center p-2 rounded-lg text-sm transition-all ${
                              isActive
                                ? "bg-white text-indigo-800"
                                : "hover:bg-[#424242d3]"
                            }`
                          }
                        >
                          {item.icon}
                          <span className="ml-2">{item.label}</span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
          </nav>

          {/* User Profile Section */}
          <div className="p-6 text-center border-b border-purple-700">
            <div className="flex gap-2 items-center">
              <img
                src={meData?.profileImage}
                alt="Profile"
                className="w-12 h-12 border border-white rounded-full object-cover"
              />
              <div>
                <h2 className="text-sm font-semibold">
                  {meData?.firstName} {meData?.lastName}
                </h2>
                <p className="text-purple-200 text-left text-sm mt-1">
                  {meData?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="p-4 border-t border-white">
            <Button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-white text-indigo-800 hover:bg-gray-100"
              variant="ghost"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Sidebar;
