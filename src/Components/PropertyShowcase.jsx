
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PropertyShowcase = () => {
  const images = ["/c1.png", "/c2.png", "/c3.png"];
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <section className="w-full px-4  md:px-8 lg:px-16    font-manrope">

      <div className="bg-gray-100 rounded-2xl p-10">
        {/* === TOP HEADLINE === */}
        <div className="max-w-10xl   ">
          {/* Wrapping both lines in a flex container */}
          <div className=" mx-auto px-4 mb-5 ">
            <div className="flex flex-col md:flex-row md:items-start justify-end">

              {/* Left Small Text */}
              <p className="text-[10px] text-right mt-5 sm:text-xs font-medium md:text-sm text-gray-500 
                    mb-3 md:mb-0 md:-mr-48 leading-tight">
                Where design meets comfort, and <br className="hidden md:block " />
                every corner tells a story.
              </p>

              {/* Right Big Heading */}
              <h1 className="font-manrope  text-black leading-tight 
                    text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-right">
                Your dream home
                <div className="h-4 sm:h-4"></div>   {/* ⭐ This adds space */}
                deserves all the{" "}
                <span className="text-yellow-500 italic font-playfair">attention</span>
              </h1>

            </div>
          </div>
        </div>

        {/* === MAIN 3-COLUMN LAYOUT === */}
        <div className="grid grid-cols-1  lg:grid-cols-12 gap-6 lg:gap-8   items-start">

          <div className="lg:col-span-6 relative">
            <div className="rounded-2xl overflow-hidden ">
              <img
                src={images[index]}
                alt="Property"
                className="w-full h-96 md:h-[300px] lg:h-[450px] object-cover"

              />
            </div>

            {/* Thumbnails - Bilkul waise hi, koi change nahi */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-full flex gap-2 ">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-10 h-10 rounded-full overflow-hidden ring-2 ring-offset-2 transition-all ${index === i
                    ? "ring-yellow-500 opacity-100"
                    : "ring-transparent opacity-60 hover:opacity-90"
                    }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* MIDDLE: YELLOW CARD + PARAGRAPH */}
          <div className="lg:col-span-3 flex flex-col items-center">
            {/* Yellow Card */}
            <div className="bg-[#F8CA13] rounded-2xl p-10 md:p-11 w-full max-w-sm text-center">
              <h3 className="text-white text-lg md:text-xl font-bold mb-3">
                Luxury that feels like home
              </h3>
              <p className="text-white  text-sm md:text-sm leading-relaxed mb-4">
                Step into Vassa Heights, a modern residential project crafted for elegant living.
                Spacious interiors, green surroundings, and world-class amenities designed to
                match your aspirations.
              </p>
              <button className="bg-white text-yellow-600 font-semibold px-6 py-2 rounded-full text-sm shadow-md hover:shadow-lg transition-shadow">
                More Info
              </button>
            </div>

            {/* Bottom Paragraph */}
            <p className="text-gray-600 text-sm md:text-sm leading-relaxed mt-6 text-start max-w-sm">
              All homes include premium interiors, modular kitchens, private balconies,
              and sustainable smart-home features.
            </p>
          </div>

          {/* RIGHT: SMALL CARD + ARROWS */}
          <div className="lg:col-span-3 flex flex-col items-center justify-between">
            {/* Small White Card */}
            <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-sm text-center">
              <div className="rounded-xl overflow-hidden mb-3">
                <img
                  src={images[index]}
                  alt="3BHK"
                  className="w-full h-40 object-cover"
                />
              </div>
              <p className="text-sm font-semibold text-gray-800">
                Premium 3BHK Apartments<br />
                <span className="text-black">from ₹68 Lakhs</span>
              </p>
              <div className="text-center mt-4">
                <button className="bg-[#F8CA13] text-black font-semibold px-6 py-2 rounded-full text-sm shadow-md hover:shadow-lg transition-shadow">
                  Reserve For You
                </button>
              </div>
            </div>

            {/* Arrow Buttons */}
            <div className="w-full flex justify-end gap-3 mt-8 px-10">
              <button
                onClick={prev}
                className="bg-[#851524] p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              >
                <FaArrowLeft className="text-white text-xl" />
              </button>
              <button
                onClick={next}
                className="bg-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border-2 border-gray-300"
              >
                <FaArrowRight className="text-gray-800 text-xl" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PropertyShowcase;