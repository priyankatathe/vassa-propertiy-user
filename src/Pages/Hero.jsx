

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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
      {/* ⭐ BORDER LINES — EXACTLY LIKE YOUR IMAGE */}
      {/* TOP LINE */}
      <div className="absolute top-20 left-0 w-full h-[1px] bg-white/50 z-0"></div>

      {/* BOTTOM LINE */}
      <div className="absolute bottom-20 left-0 w-full h-[1px] bg-white/50 z-0"></div>

      {/* LEFT LINE */}
      <div className="absolute top-0 left-12 w-[1px] h-full bg-white/50 z-0"></div>

      {/* RIGHT LINE */}
      <div className="absolute top-0 right-12 w-[1px] h-full bg-white/50 z-0"></div>


      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 w-full h-full px-5 sm:px-10 md:px-20 lg:px-25">

        {/* LEFT SECTION — HEADING */}
        <div className="flex flex-col justify-center mt-40 md:mt-52 space-y-6 w-full md:w-[90%]">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white leading-snug">
            Find Your Perfect{" "}
            <span className="text-[#F8CA13] text-7xl font-playfair">Home</span> with
          </h1>

          <h1 className="text-4xl sm:text-6xl md:text-8xl italic font-playfair">
            <span className="text-[#F8CA13] italic font-semibold">Vassa</span>{" "}
            <span className="text-white italic font-semibold">Properties</span>
          </h1>
        </div>

        {/* RIGHT SECTION DESCRIPTION */}
        <div className="hidden md:block absolute right-20 bottom-40 w-[28%]">
          <p className="text-gray-200 leading-relaxed text-lg">
            Discover premium homes, apartments, and plots across
            the finest locations — all verified and handpicked for
            your lifestyle and budget.
          </p>
        </div>

      </div>

      {/* Scroll Down Circle */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 
                  rounded-full bg-[#D9D9D940] opacity-60 
                  flex items-center justify-center 
                  border border-white/20">
          <span className="text-white text-sm sm:text-base md:text-lg font-medium">
            Scroll Down
          </span>
        </div>
      </div>

    </motion.div>
  );
};

export default HeroSection;

