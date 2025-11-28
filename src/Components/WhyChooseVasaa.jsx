import React from "react";
import logo from "../../public/logo.webp";
import { FaHome, FaLeaf, FaShieldAlt, FaGem, FaRegLightbulb } from "react-icons/fa";
import { RiHome7Fill, RiSofaLine } from "react-icons/ri";
import { CiLock } from "react-icons/ci";

const WhyChooseVassa = () => {
  return (
    <section className="w-full bg-white py-16  px-4  md:px-8 lg:px-16   font-manrope">

      {/* Title Section */}
      <div className="text-center mb-5 sm:mb-10 lg:mb-12">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-manrope leading-snug">
          Why Choose{" "}
          <span className="italic underline font-playfair text-yellow-500 mr-2">
            Vassa
          </span>
          <br />
          <span className="italic underline font-playfair text-yellow-500 mt-0 sm:mt-2 lg:mt-4 inline-block">
            Properties ?
          </span>
        </h1>

      </div>

      {/* Subtext */}
      <p className="text-black font-semibold text-lg mb-5 sm:mb-7 lg:mb-10 text-start">
        The Smarter Way to Find, Buy & Own <br className="hidden md:block" />
        Your Dream Property.
      </p>

      {/* Responsive Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT – IMAGE WITH LOGO CENTERED ON IMAGE */}
        <div className="relative">
          <img
            src="/c1.webp"
            alt="Property"
            className="w-full h-[260px] sm:h-[300px] md:h-[360px] lg:h-[420px] object-cover rounded-xl shadow-lg"
          />

          {/* LOGO CENTERED ON IMAGE */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <img
              src={logo} // Replace with your actual logo path
              alt="Vassa Properties Logo"
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 object-contain drop-shadow-2xl"
            />
          </div>
        </div>


        {/* right section */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* CARD 1 */}
          <div className="relative p-6 rounded-xl shadow bg-[#851524] text-white h-full overflow-hidden">
            <h3 className="text-lg font-semibold mb-2 pr-16">
              Architectural Excellence
            </h3>
            <p className="text-sm leading-relaxed">
              Every villa is a fusion of modern design and timeless aesthetics,
              built with precision and passion to deliver unmatched elegance and comfort.
            </p>
            {/* Circle Icon - Top Right */}
            <div className="absolute top-3 right-2 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <RiHome7Fill className="text-2xl text-white" />
            </div>
          </div>

          {/* CARD 2 */}
          <div className="relative p-6 rounded-xl shadow bg-white text-gray-900 border h-full overflow-hidden">
            <h3 className="text-lg font-semibold mb-2 pr-16">
              Smart & Sustainable Living
            </h3>
            <p className="text-sm leading-relaxed">
              Equipped with home automation, energy-efficient <br /> systems, and eco-friendly
              materials for a smarter, <br /> greener lifestyle.
            </p>
            <div className="absolute top-3 right-2 w-12 h-12 bg-[#851524] rounded-full flex items-center justify-center">
              <FaRegLightbulb className="text-2xl text-white" />
            </div>
          </div>

          {/* CARD 3 */}
          <div className="relative p-6 rounded-xl shadow bg-white text-gray-900 border h-full overflow-hidden">
            <h3 className="text-lg font-semibold mb-2 pr-16">
              Premium Interiors & Finishes
            </h3>
            <p className="text-sm leading-relaxed">
              From Italian marble flooring to designer styling, every <br /> detail inside
              reflects superior craftsmanship and sophistication.
            </p>
            <div className="absolute top-3 right-2 w-12 h-12 bg-[#851524] rounded-full flex items-center justify-center">
              <RiSofaLine className="text-2xl text-white" />
            </div>
          </div>

          {/* CARD 4 */}
          <div className="relative p-6 rounded-xl shadow bg-white text-gray-900 border h-full overflow-hidden">
            <h3 className="text-lg font-semibold mb-2 pr-16">
              Secure & Private Community
            </h3>
            <p className="text-sm leading-relaxed">
              Enjoy 24×7 surveillance, gated security, and complete <br /> privacy —
              because your safety is our priority.
            </p>
            <div className="absolute top-3 right-2 w-12 h-12 bg-[#851524] rounded-full flex items-center justify-center">
              <CiLock className="text-2xl text-white" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseVassa;
