import React from "react";
import sampleImg from "/100.webp";
import { ArrowDown } from "lucide-react";

const WhatMakeUsDiffernt = ({ section1Ref, scrollToBottom }) => {
  return (
    <section
      ref={section1Ref}
      className="bg-white text-white py-16 md:px-8 lg:px-20 overflow-hidden"
    >
      <div className="max-w-10xl mx-auto grid md:grid-cols-3 gap-12 items-center relative">

        {/* LEFT TEXT */}
        <div className="relative md:mb-[500px] mb-10 flex flex-col items-center md:items-start text-center md:text-left">
          <p className="text-yellow-400 font-manrope text-base md:text-lg">
            What Makes Us Different
          </p>

          <h1
            className="
              text-3xl text-black  font-semibold sm:text-4xl md:-mt-14 md:text-5xl 
               leading-tight  
              relative md:absolute md:top-[120px] md:left-0 md:w-[700px] z-30
            "
          >
            Where Trust, <span className="font-playfair text-[#F8CA13] italic">Technology,</span>  <br /> and Transparency <br /> Come Together
          </h1>
        </div>

        {/* CENTER IMAGE */}
        <div className="relative flex justify-center z-10 lg:ml-16">
          <img
            src={sampleImg}
            alt="building"
            className="
              w-[260px] h-[360px] 
              sm:w-[300px] sm:h-[420px] 
              md:w-[380px] md:h-[570px] 
              object-cover rounded-3xl transition-all duration-300
            "
          />
        </div>

        {/* RIGHT TEXT */}
        <div className="relative text-gray-600 leading-relaxed pr-2 md:pr-10 z-20 text-sm sm:text-base 
                        hidden md:block">
          <p>
            we’re not just another real estate platform — we’re your dedicated
            partner in the journey to finding, selling, or renting your dream
            space. Our difference lies in the experience we create — one that’s
            seamless, reliable, and built around you.
          </p>

          {/* Decorative Circle Scroll */}
          <div className="flex flex-col items-start gap-2 mt-10 sm:mt-14">
            <div
              onClick={scrollToBottom}
              className="
                w-24 h-24 sm:w-32 sm:h-32 
                border-2 border-black 
                rounded-full flex items-center justify-center 
                hover:scale-110 transition-transform cursor-pointer
              "
            >
              <ArrowDown size={30} className="sm:text-xl md:text-2xl" />
            </div>
          </div>
        </div>

        {/* MOBILE ONLY - center texts below image */}
        <div className="md:hidden mt-6 flex flex-col items-center text-center px-4 gap-4">
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            we’re not just another real estate platform — we’re your dedicated
            partner in the journey to finding, selling, or renting your dream
            space. Our difference lies in the experience we create — one that’s
            seamless, reliable, and built around you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatMakeUsDiffernt;
