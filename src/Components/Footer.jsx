import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import logo from "../assets/logo2.svg";
import { Link } from "react-router-dom";
import { useAddContactMutation } from "../redux/api/contactApi";

const Footer = () => {

  return (
    <div className="p-2 overflow-x-hidden">
      <div className="bg-[#D9D9D929] rounded-lg px-4 md:px-8 lg:px-16 overflow-hidden">
        <footer className="text-black w-full">
          <div className="max-w-10xl mx-auto py-6">
            {/* Top Section */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 border-b font-playfair border-gray-300 pb-4 text-center md:text-left">
              <p className="italic font-semibold text-gray-700 text-sm md:text-base leading-relaxed break-words">
                Your trusted real estate partner helping you buy, sell, and
                <br className="hidden md:block" />
                invest in premium residential and commercial spaces.
              </p>

              <img src={logo} alt="Vassa Logo" className="h-12 sm:h-14" />
            </div>

            {/* Middle Section */}
            <div className="flex flex-col md:flex-row justify-between gap-12 py-10">
              {/* Left */}
              <div className="w-full md:w-1/2 max-w-5xl">
                <p className="text-[#737373] text-3xl  break-words">
                  We turn your property goals into <br /> reality with trust,
                  transparency,<br />
                  and expertise.
                </p>
              </div>

              {/* Right - Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-16 md:gap-20 lg:gap-28 text-sm w-full md:w-auto">
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-black">Quick Links</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/find-home">Find Property</Link></li>
                    <li><Link to="/list">List Property</Link></li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3 text-black">Contact</h3>
                  <ul className="space-y-3 break-words">
                    <p className="text-gray-600 mb-1">+91 8585 666 322</p>
                    <p className="text-gray-600 mb-1">vassaproperties@gmail.com</p>
                    <p className="text-gray-600">
                      Golden City Center,<br />
                      Chhatrapati <br /> Sambhajinagar 431001
                    </p>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3 text-black">Social Media</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li>Whatsapp</li>
                    <li>Facebook</li>
                    <li>Instagram</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Bottom Bar */}
      <div className="w-full px-4 mt-2 lg:px-10 overflow-hidden">
        <div className="max-w-10xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 text-gray-700 text-xs sm:text-sm text-center sm:text-left">
          <p>©2025 All Rights Reserved</p>

          <div className="flex items-center gap-3 whitespace-nowrap">
            <p>Developed By</p>
            <img src="/suryatech.webp" className="h-12 w-20 object-contain" alt="suryatech" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
