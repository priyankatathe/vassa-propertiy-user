
import React, { useState, useEffect } from "react";
import { ChevronDown, Phone, Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/logo2.svg";
import whiteLog from "../assets/logo.svg";
import Login from "../Pages/Login";
import RegisterUI from "../Pages/Register";
import { FaUserLock } from "react-icons/fa6";
import { useLogoutUserMutation } from "../redux/api/userApi";
import { LuLogOut, LuMail, LuMapPin, LuPhone } from "react-icons/lu";

const Navbar = () => {
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // <-- Get current page path
  const user = JSON.parse(localStorage.getItem("user"));
  const isHeroPage = location.pathname === "/"; // <-- check if we are on hero page

  const [userDropdown, setUserDropdown] = useState(false);
  const [logoutUser, { isLoading }] = useLogoutUserMutation();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    // Only add scroll effect if we're on hero page
    if (isHeroPage) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHeroPage]);

  const handleLogout = async () => {
    try {
      const res = await logoutUser().unwrap();  // API call
      console.log("Logout success:", res);

      setUserDropdown(false);

      window.location.reload(); // OR navigate("/")
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };




  return (
    <nav
      className={`w-full fixed font-manrope top-0 left-0 z-50 transition-all duration-300 
    ${isHeroPage
          ? scrolled
            ? "bg-white text-black"
            : "bg-black/0 text-white"
          : "bg-white text-black"
        }`}
    >

      <div className="max-w-10xl mx-auto py-3 flex justify-between items-center px-4 md:px-8 lg:px-16">

        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <img
            src={isHeroPage && !scrolled ? whiteLog : Logo}
            alt="Vassa Properties Logo"
            className="h-14"
          />
        </div>

        {/* Desktop Menu */}
        <ul
          className={`hidden md:flex items-center gap-16 text-sm font-manrope 
              ${isHeroPage && !scrolled ? "text-white" : "text-black"}`}
        >
          <li>
            <Link
              to="/about"
              className={`hover:text-yellow-400 font-bold transition-colors duration-200
        ${location.pathname === "/about" ? "text-yellow-400" : ""}
      `}
            >
              About Us
            </Link>
          </li>

          <li>
            <Link
              to="/find-home"
              className={`hover:text-yellow-400 font-bold transition-colors duration-200
        ${location.pathname === "/find-home" ? "text-yellow-400" : ""}
      `}
            >
              Find Home
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              className={`hover:text-yellow-400 font-bold transition-colors duration-200
        ${location.pathname === "/contact" ? "text-yellow-400" : ""}
      `}
            >
              Contact
            </Link>
          </li>

          <li>
            <Link
              to="/list"
              className={`hover:text-yellow-400 font-bold transition-colors duration-200
        ${location.pathname === "/list" ? "text-yellow-400" : ""}
      `}
            >
              List Properties
            </Link>
          </li>

        </ul>



        <div className="flex items-center gap-3 relative">
          {/* USER DROPDOWN */}
          {user?.user?.name ? (
            <div className="relative">
              {/* Username Button */}
              <div
                onClick={() => setUserDropdown((prev) => !prev)}
                className="flex items-center gap-2 bg-yellow-400 border border-[#851524] text-black px-4 py-2 rounded-full font-semibold cursor-pointer"
              >
                <FaUserLock className="text-[#851524]" /> {user.user.name}
              </div>

              {userDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg overflow-hidden border shadow-lg z-[9999]">

                  {/* Email Display */}
                  {user.user.email && (
                    <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-default">
                      <LuMail className="text-blue-500" size={18} />
                      {user.user.email}
                    </div>
                  )}

                  {/* Contact Display */}
                  {user.user.contact && (
                    <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-default">
                      <LuPhone className="text-green-500" size={18} />
                      {user.user.contact}
                    </div>
                  )}

                  {/* Address Display */}
                  {user.user.address && (
                    <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-default">
                      <LuMapPin  className="text-purple-500" size={18} />
                      {user.user.address}
                    </div>
                  )}

                  {/* Divider */}
                  <div className="border-t my-1"></div>

                  {/* Logout */}
                  <div
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    <LuLogOut className="text-red-600" size={18} />
                    {isLoading ? "Logging out..." : "Logout"}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Login Button */
            <button
              onClick={() => setOpenLogin(true)}
              className="flex items-center gap-2 bg-yellow-400 border border-[#851524] text-white px-4 py-2 rounded-full font-semibold hover:bg-yellow-500 transition"
            >
              <FaUserLock className="text-[#851524]" /> Login
            </button>
          )}

          {/* MOBILE TOGGLE */}
          <button
            className={`${isHeroPage && !scrolled ? "text-white" : "text-black"} md:hidden`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>




      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[72px] left-0 w-full bg-black/95 backdrop-blur-lg z-50 overflow-x-hidden">
          <div className="px-8 py-10 space-y-8 text-center">
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block text-xl font-semibold text-white hover:text-yellow-400 transition">
              About
            </Link>
            <Link to="/find-home" onClick={() => setMobileMenuOpen(false)} className="block text-xl font-semibold text-white hover:text-yellow-400 transition">
              Find Home
            </Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block text-xl font-semibold text-white hover:text-yellow-400 transition">
              Contact
            </Link>
            <Link to="/list" onClick={() => setMobileMenuOpen(false)} className="block text-xl font-semibold text-white hover:text-yellow-400 transition">
              List Properties
            </Link>

            {!user?.user?.name && (
              <button
                onClick={() => {
                  setOpenLogin(true);
                  setMobileMenuOpen(false);
                }}
                className="mt-8 w-full max-w-sm mx-auto bg-yellow-400 text-black font-bold py-4 rounded-full hover:bg-yellow-500 transition shadow-2xl flex items-center justify-center gap-3"
              >
                <FaUserLock size={24} />
                Login
              </button>
            )}


          </div>
        </div>
      )}

      {openRegister && (
        <RegisterUI
          closeModal={() => setOpenRegister(false)}
          openLogin={() => {
            setOpenRegister(false);
            setOpenLogin(true);
          }}
        />
      )}

      {openLogin && (
        <Login
          closeModal={() => setOpenLogin(false)}
          openRegister={() => {
            setOpenLogin(false);
            setOpenRegister(true);
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;
