
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MdArrowRight } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.6], [0, -800]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.4]);

  return (
    <motion.div
      className="relative w-full h-screen bg-cover bg-center overflow-hidden flex items-center"
      style={{
        backgroundImage: `url('./1.webp')`,
      }}
    >
      {/* BORDER LINES — HIDDEN ON MOBILE */}
      <div className="hidden md:block absolute top-20 left-0 w-full h-[1px] bg-white/50 z-0"></div>
      <div className="hidden md:block absolute bottom-20 left-0 w-full h-[1px] bg-white/15 z-0"></div>
      <div className="hidden md:block absolute top-0 left-12 w-[1px] h-full bg-white/50 z-0"></div>
      <div className="hidden md:block absolute top-0 right-12 w-[1px] h-full bg-white/50 z-0"></div>

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 w-full h-full px-5 sm:px-10 md:px-20 lg:px-25 flex flex-col justify-center md:justify-start items-center md:items-start text-center md:text-left">

        {/* LEFT SECTION — HEADING */}
        <div className="mt-10 sm:mt-10 md:mt-52 space-y-2 w-full md:w-[90%]">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white leading-snug">
            Find Your Perfect{" "}
            <span className="text-[#F8CA13] text-4xl sm:text-5xl md:text-7xl font-playfair">Home</span> with
          </h1>
          <h1 className="text-4xl  sm:text-7xl md:text-8xl italic font-playfair">
            <span className="text-[#F8CA13] italic font-semibold">Vassa</span>{" "}
            <span className="text-white italic font-semibold">Properties</span>
          </h1>

        </div>

        <div className="relative flex  items-center justify-center px-10 py-5">
          <Link to="/find-home"
            className="mt-4 px-8 py-3 bg-[#F8CA13] text-white font-semibold text-lg rounded-full 
                 transition-all duration-300"
          >
            Get Started
          </Link>

          <Link
            to="/find-home"
            className="border border-white mt-5 ml-2 rounded-full h-14 w-14 flex items-center justify-center text-2xl"
          >
            <FaArrowRight className="text-white" />
          </Link>

        </div>


        {/* RIGHT SECTION DESCRIPTION — HIDDEN ON MOBILE */}
        <div className="hidden md:block absolute right-20 bottom-40 w-[28%]">
          <p className="text-gray-200 leading-relaxed text-lg">
            Discover premium homes, apartments, and plots across
            the finest locations — all verified and handpicked for
            your lifestyle and budget.
          </p>
        </div>

      </div>

      {/* Scroll Down Circle — CENTERED ON MOBILE */}
      <div className="absolute bottom-5  left-1/2 -translate-x-1/2 z-30">
        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 
                  rounded-full bg-[#D9D9D940] opacity-60 
                  flex items-center justify-center 
                  border border-white/20">
          <span className="text-white text-center text-xs sm:text-xl md:text-lg font-bold">
            Scroll Down
          </span>
        </div>
      </div>

    </motion.div>
  );
};

export default HeroSection;

