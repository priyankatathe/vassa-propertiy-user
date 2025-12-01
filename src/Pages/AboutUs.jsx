import React, { useRef, useState, useEffect } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { FaBuilding } from "react-icons/fa";
import WhatMakeUsDiffernt from "../Components/Whatsmakeusdiff";

const AboutUs = () => {
  const section1Ref = useRef(null);
  const [showScrollUp, setShowScrollUp] = useState(false);

  const scrollToBottom = () => {
    const scrollAmount = window.innerWidth < 768 ? 790 : 650;
    window.scrollBy({ top: scrollAmount, behavior: "smooth" });
  };

  const handleScroll = () => {
    setShowScrollUp(window.scrollY > 200);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* About Section */}
      <section
        className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center text-white px-4 md:px-8 lg:px-20"
        style={{ backgroundImage: "url('/aboutbg.webp')" }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* DESKTOP BUTTON */}
        <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 top-24 sm:top-32 md:top-36 lg:top-44 z-20">
          <button className="bg-yellow-400 text-white px-4 sm:px-8 py-3 rounded-full font-semibold shadow hover:bg-yellow-500 transition text-sm sm:text-base font-manrope">
            About Us
          </button>
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center px-2 sm:px-4 mt-36 sm:mt-44 md:mt-48 lg:mt-52 flex flex-col items-center gap-4">

          {/* MOBILE ONLY: About Us button above heading */}
          <button className="sm:hidden  bg-yellow-400 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-yellow-500 transition text-base font-manrope">
            About Us
          </button>

          {/* MOBILE & DESKTOP Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-relaxed sm:leading-snug md:leading-snug lg:leading-snug font-manrope">
            <span className="block">
              Connecting <span className="italic text-yellow-400 font-playfair">People</span> with Their
            </span>
            <span className="block mt-2 sm:mt-6">
              <span className="italic">Perfect</span>{" "}
              <span className="italic text-yellow-400 font-playfair">Spaces</span>
            </span>
          </h1>

          {/* MOBILE ONLY Description below heading */}
          <p className="sm:hidden text-center text-gray-200 text-sm leading-relaxed max-w-xs px-2 font-manrope">
            At Vassa Properties, we believe finding a home is more than just a transaction—it's a milestone in your life. We are a modern real estate platform built to simplify how people buy, sell, and rent properties across India.
          </p>

          {/* DESKTOP: Scroll Arrow & From 2020 */}
          <div className="hidden sm:flex flex-col items-center gap-2 mt-10 sm:mt-14">
            <div
              onClick={scrollToBottom}
              className="w-24 h-24 sm:w-32 sm:h-32 border-2 border-white rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
            >
              <ArrowDown size={30} />
            </div>
          </div>

          <div className="hidden sm:flex w-full justify-end">
            <p className="text-xs sm:text-sm tracking-widest uppercase flex items-center gap-2">
              <span className="bg-white text-black rounded-full p-2 flex items-center justify-center">
                <FaBuilding size={16} />
              </span>
              From 2020
            </p>
          </div>
        </div>

        {/* DESKTOP description */}
        <p className="hidden sm:block absolute left-4 sm:left-6 md:left-8 lg:left-20 bottom-4 sm:bottom-6 md:bottom-8 max-w-xs sm:max-w-sm md:max-w-md text-gray-200 text-sm leading-relaxed font-manrope">
          At Vassa Properties, we believe finding a home is more than just a transaction—it's a milestone in your life. We are a modern real estate platform built to simplify how people buy, sell, and rent properties across India.
        </p>
      </section>

      {/* Example Section to Scroll To */}
      <section ref={section1Ref}>
        <WhatMakeUsDiffernt scrollToBottom={scrollToBottom} section1Ref={section1Ref} />
      </section>
    </>
  );
};

export default AboutUs;
