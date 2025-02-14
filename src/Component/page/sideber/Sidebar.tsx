import { varyFyToken } from "@/Component/Utils/decodeJwt";
import {
  logOut,
  useCurrentToken,
  useCurrentUser,
} from "@/redux/features/assignment4/authSlice";
import { useGetSingleUserQuery } from "@/redux/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaShopify, FaUserGraduate } from "react-icons/fa";
import { GrLogout } from "react-icons/gr";
import { ImProfile } from "react-icons/im";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
const Sidebar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPfofileopen, setIsPfofileopen] = useState(false);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };
  const token = useAppSelector(useCurrentToken);
  const userInfo = varyFyToken(token as string);
  //   @ts-expect-error role
  const role = userInfo?.role;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleProfile = () => {
    setIsPfofileopen(!isPfofileopen);
  };

  const data = useAppSelector(useCurrentUser);
  console.log(data);

  const { data: userData } = useGetSingleUserQuery(data?.email as string);
  console.log(userData);

  return (
    <div className="">
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        style={{ zIndex: "99" }}
        id="sidebar-multi-level-sidebar"
        className={`fixed top-0 left-0 z-10 w-64 h-screen transition-transform ${
          !isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div
          style={{ zIndex: "999" }}
          className="h-full px-3 relative pt-10 mt-16 overflow-y-auto bg-gray-50 dark:bg-gray-800"
        >
          <div className=" md:hidden absolute -mt-8 right-1">
            <button
              style={{ zIndex: "999" }}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="py-5"
            >
              <AiOutlineCloseCircle
                style={{ zIndex: "999" }}
                className="text-3xl"
              />
            </button>
          </div>
          <ul className="space-y-2 font-medium">
            {/* Dashboard */}
            <li>
              <li>
                <header className=" flex flex-col justify-center items-center text-center">
                  <FaUserGraduate className="border border-black text-3xl rounded-full p-1" />
                  <h1 className="text-sm md:text-[18px] py-2 text-black font-medium">
                    {userData?.name}
                  </h1>
                  <h2 className="text-sm border-b w-full border-slate-500 pb-4 md:text-[18px] text-black font-medium">
                    {userData?.email}
                  </h2>
                </header>
              </li>
              <a
                href="#"
                className="flex pt-5 items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">
                  <Link to={"/dashboard/board"}>Dashboard</Link>
                </span>
              </a>
            </li>
            {role === "user" && (
              <li className="pl-2 py-3">
                <Link
                  className="flex items-center gap-2"
                  to={"/dashboard/my-order"}
                >
                  <FaShopify className="text-xl text-slate-600" /> My Order
                </Link>
              </li>
            )}

            {/* E-commerce Dropdown */}
            <li>
              <button
                type="button"
                onClick={toggleProfile}
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-example"
              >
                <ImProfile />
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Profile
                </span>
                <svg
                  className={`w-3 h-3 transition-transform ${
                    isPfofileopen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {/* Dropdown Menu */}
              <ul
                id="dropdown-example"
                className={`${
                  isPfofileopen ? "block" : "hidden"
                } py-2 space-y-2`}
              >
                <li>
                  <NavLink
                    to="/dashboard/change-password"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Change Password
                  </NavLink>
                </li>
              </ul>
            </li>
            {role === "admin" && (
              <li>
                <button
                  type="button"
                  onClick={toggleDropdown}
                  className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  aria-controls="dropdown-example"
                >
                  <svg
                    className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 21"
                  >
                    <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                  </svg>
                  <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                    Care Management
                  </span>
                  <svg
                    className={`w-3 h-3 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                {/* Dropdown Menu */}
                <ul
                  id="dropdown-example"
                  className={`${
                    isDropdownOpen ? "block" : "hidden"
                  } py-2 space-y-2`}
                >
                  <li>
                    <NavLink
                      to="/dashboard/create-car"
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Create Car
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/all-car"
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      All Car
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/getallorder"
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      All Order
                    </NavLink>
                  </li>
                </ul>
              </li>
            )}

            <div className="ml-2 pt-20 md:pt-32 lg:pt-40 bg-white ">
              <div className="border-b border-slate-500"></div>
              <button
                className="flex gap-3 pt-2 items-center text-[16px]"
                onClick={handleLogout}
              >
                <GrLogout /> <span>Log Out</span>
              </button>
            </div>

            {/* Other Menu Items */}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="p-4 sm:ml-64">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
