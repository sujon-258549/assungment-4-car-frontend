import { useState } from "react";
import Footerimg from "./Footerimg";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineLogin } from "react-icons/md";
import { useAppSelector } from "@/redux/hooks";
import "./header.css";
import { TUser, useCurrentUser } from "@/redux/features/assignment4/authSlice";
import CommonButton from "./Home/HomeComponent/CommonButton";
import DropdownProfile from "./DropdownProfile";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userRole = useAppSelector(useCurrentUser) as TUser;

  const email = userRole?.email;

  return (
    <section
      style={{ zIndex: "250" }}
      className="  sticky top-0 transition-all duration-500 ease-in-out bg-[#424242] shadow-lg z-10 "
    >
      <header className="flex header max-w-6xl mx-auto px-4  font-sans min-h-[70px] tracking-wide relative z-50">
        <div className="flex  flex-wrap items-center justify-between gap-4 w-full max-w-screen-xl mx-auto">
          {/* Logo for Large Screens */}
          <a href="#" className="max-sm:hidden">
            <Footerimg></Footerimg>
          </a>

          {/* Logo for Small Screens */}
          <a href="#" className="hidden max-sm:block">
            <Footerimg></Footerimg>
          </a>

          {/* Navigation Menu */}
          <div
            id="collapseMenu"
            className={`lg:flex gap-x-5 
    max-lg:space-y-3 max-lg:fixed max-lg:bg-[#424242] max-lg:w-1/2 
    max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 
    max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50
    max-lg:transform max-lg:transition-transform max-lg:duration-500 max-lg:ease-in-out 
    ${isMenuOpen ? "max-lg:translate-x-0" : "max-lg:-translate-x-full"}`}
          >
            {/* <div
            id="collapseMenu"
            className={`fixed top-0 left-0 h-full w-1/2 min-w-[300px] bg-[#424242] shadow-md overflow-auto p-6 z-50 transform transition-transform duration-500 ease-in-out ${
              isMenuOpen ? "translate-x-0 block" : "-translate-x-full"
            }`}
          > */}
            {/* Close Button */}

            {/* Navigation Links */}
            <ul className="lg:flex gap-x-5">
              <li className="max-lg:border-b max-lg:py-3 px-3">
                <NavLink
                  to="/"
                  className=" text-gray-600 font-bold block text-base"
                >
                  Home
                </NavLink>
              </li>
              <li className="max-lg:border-b max-lg:py-3 px-3">
                <NavLink
                  to="/all-cars"
                  className=" text-gray-600 font-bold block text-base"
                >
                  All Car
                </NavLink>
              </li>
              <li className="max-lg:border-b max-lg:py-3 px-3">
                <NavLink
                  to="/all-offer-cars"
                  className=" text-gray-600 font-bold block text-base"
                >
                  All Offer Car
                </NavLink>
              </li>
              <li className="max-lg:border-b max-lg:py-3 px-3">
                <NavLink
                  to="/all-blog"
                  className=" text-gray-600 font-bold block text-base"
                >
                  All Blog
                </NavLink>
              </li>

              <NavigationMenu className="-mt-1.5">
                <NavigationMenuList className="">
                  <NavigationMenuItem className="">
                    <NavigationMenuTrigger className="text-[16px] text-white bg-transparent">
                      About Us
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="flex flex-col w-28 gap-3">
                      <NavigationMenuLink className="hover:bg-[#424242] px-20 mt-3 bg-[#424242d3]  mx-3 py-2 rounded-md text-white text-center ">
                        <NavLink to={"/about-us"}>About </NavLink>
                      </NavigationMenuLink>
                      <NavigationMenuLink className="hover:bg-[#424242] bg-[#424242d3]  mx-3 py-2 rounded-md text-white text-center  mb-3">
                        About Product
                      </NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <li className="max-lg:border-b max-lg:py-3 px-3">
                <NavLink
                  to={"/contact"}
                  className=" text-gray-600 font-bold block text-base"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Right Section (Login & Menu Toggle) */}
          <div className="flex items-center  max-lg:ml-auto space-x-4">
            {email ? (
              <div className="flex gap-1 items-center">
                <div className="">
                  <DropdownProfile />
                </div>
              </div>
            ) : (
              <Link to={"/login"}>
                <CommonButton btnIcon={<MdOutlineLogin />} text="Login" />
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              id="toggleOpen"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden"
            >
              {isMenuOpen ? (
                <div className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 fill-white"
                    viewBox="0 0 320.591 320.591"
                  >
                    <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" />
                    <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" />
                  </svg>
                </div>
              ) : (
                <svg
                  className="w-7 h-7"
                  fill="#fff"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>
    </section>
  );
};

export default Header;
