
import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Phone, Menu, X, LucideHome } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/logo2.svg";
import whiteLog from "../assets/logo.svg";
import Login from "../Pages/Login";
import RegisterUI from "../Pages/Register";
import { FaUser, FaUserLock } from "react-icons/fa6";
import { useLogoutUserMutation } from "../redux/api/userApi";
import { LuLogOut, LuMail, LuMapPin, LuPhone } from "react-icons/lu";
import { toast } from "react-toastify";

const Navbar = () => {
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // <-- Get current page path
  const user = JSON.parse(localStorage.getItem("user"));
  const isHeroPage = location.pathname === "/"; // <-- check if we are on hero page
  const dropdownRef = useRef();
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await logoutUser().unwrap(); // RTK Query logout
      toast.success("Logged out successfully!");

      setUserDropdown(false);

      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (error) {
      toast.error("Logout failed!");
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
            className="h-14 "
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



        <div className="flex items-center gap-3 relative" ref={dropdownRef}>
          {user?.user?.name ? (
            <div className="relative">
              {/* Username Button */}
              <div
                onClick={() => setUserDropdown((prev) => !prev)}
                className="flex items-center gap-2 bg-yellow-400 border border-[#851524] 
                 text-black px-4 py-2 rounded-full font-semibold cursor-pointer 
                 hover:bg-yellow-300 transition"
              >
                <FaUser className="text-[#851524]" /> {user.user.name}
              </div>

              {/* Dropdown */}
              {userDropdown && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border 
                      border-gray-200 overflow-hidden z-[9999] p-4 animate-fadeIn">

                  {/* User Icon + Name Center */}
                  <div className="flex justify-start gap-2 mb-4">
                    <div className="w-10 h-10 bg-yellow-400 text-[#851524] rounded-full 
                          flex items-center justify-center text-xl font-bold shadow-md">
                      <FaUser />
                    </div>

                    <h3 className="text-lg  font-semibold text-gray-800 mt-1">
                      {user.user.name}
                    </h3>
                  </div>

                  <div className="border-t mb-3"></div>

                  {/* Email */}
                  {user.user.email && (
                    <div className="flex items-center gap-3 px-2 py-2 text-sm 
                          text-gray-700 hover:bg-gray-100 rounded-md cursor-default">
                      <LuMail className="text-yellow-400" size={18} />
                      <span>{user.user.email}</span>
                    </div>
                  )}

                  {/* Contact */}
                  {user.user.contact && (
                    <div className="flex items-center gap-3 px-2 py-2 text-sm 
                          text-gray-700 hover:bg-gray-100 rounded-md cursor-default">
                      <LuPhone className="text-yellow-400" size={18} />
                      <span>{user.user.contact}</span>
                    </div>
                  )}

                  {/* Address */}
                  {user.user.address && (
                    <div className="flex items-center gap-3 px-2 py-2 text-sm 
                          text-gray-700 hover:bg-gray-100 rounded-md cursor-default">
                      <LuMapPin className="text-yellow-400" size={18} />
                      <span>{user.user.address}</span>
                    </div>
                  )}

                  <div className="border-t my-3"></div>

                  {/* Your Properties */}
                  <Link
                    to="/your-properties"
                    className="flex items-center gap-3 px-2 py-2 text-sm 
                     text-gray-700 hover:bg-gray-100 rounded-md font-medium"
                  >
                    <LucideHome className="text-yellow-400" size={18} />
                    Your Properties
                  </Link>

                  {/* Logout */}
                  <div
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-2 py-2 text-sm 
                     text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer font-medium mt-2"
                  >
                    <LuLogOut className="text-red-500" size={18} />
                    {isLoading ? "Logging out..." : "Logout"}
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Login Button
            <button
              onClick={() => setOpenLogin(true)}
              className="flex items-center gap-2 bg-yellow-400 border border-[#851524] 
               text-black px-4 py-2 rounded-full font-semibold hover:bg-yellow-300 transition"
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
