import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import Footerimg from "./Footerimg";

export default function Footer() {
  return (
    <footer className="bg-[#424242]  text-white py-8">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex flex-wrap justify-between items-center">
          {/* Logo & Description */}
          <div className="w-full md:w-1/3 text-center md:text-left mb-4 md:mb-0">
            <a href="#" className="max-sm:hidden">
              <Footerimg></Footerimg>
            </a>
            <p className="text-gray-300 text-sm mt-2">
              Crafting quality web solutions with passion.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="w-full md:w-1/3 text-center">
            <ul className="flex justify-center space-x-6">
              {["Home", "About", "Services", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Icons */}
          <div className="w-full md:w-1/3 text-center md:mt-0 mt-5 md:text-right">
            <div className="flex justify-center md:justify-end space-x-4">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map(
                (Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-gray-300 hover:text-white transition duration-300 p-2 rounded-full border border-transparent hover:border-white"
                    aria-label="Social Media Link"
                  >
                    <Icon size={18} />
                  </a>
                )
              )}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="text-center mt-8">
          <p className="text-gray-300 text-sm">
            Contact us at:{" "}
            <a
              href="mailto:contact@yourbrand.com"
              className="text-white hover:text-gray-300 transition duration-300"
            >
              contact@yourbrand.com
            </a>
          </p>
          <p className="text-gray-400 text-xs mt-3">
            © {new Date().getFullYear()} YourBrand. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
