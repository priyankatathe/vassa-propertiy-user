import React, { useState, useEffect } from "react";
import houseIcon from "../../public/house.webp";
import c1 from "../../public/c1.webp";
import c2 from "../../public/c2.webp";
import c3 from "../../public/c3.webp";
import c4 from "../../public/c4.webp";
import { MdArrowOutward } from "react-icons/md";
import { CiSearch } from "react-icons/ci";

const ModernCitySection = () => {
  const images = [c1, c2, c3, c4];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white font-manrope overflow-hidden px-4  md:px-8 lg:px-16">
      <div className="max-w-10xl mx-auto  py-16 lg:py-24">

        {/* TOP SECTION - Banner */}
        <div className="mb-8">
          {/* Description text responsive */}
          <p className="text-gray-500 text-start text-xs sm:text-sm max-w-3xl mx-auto mb-7 md:ml-[440px] ml-0 md:-mb-32">
            Experience the perfect balance of comfort, style, <br className="hidden sm:block" />
            and smart living spaces designed for today's lifestyle
          </p>

          <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-10 lg:gap-8">

            {/* Left Text Section */}
            <div className="flex-1 text-center  lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-tight">
                We bring a new
              </h1>

              <div className="flex justify-center lg:justify-start items-center gap-3 mt-2 flex-wrap">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900">
                  evolution of
                </h1>
                <img
                  src={houseIcon}
                  alt="house"
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
                />
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic font-serif text-yellow-500">
                  modern living
                </h2>
              </div>
            </div>

            {/* Right CTA Button */}
            <div className="flex-shrink-0 border-l-2 p-4">
              <button className="bg-gradient-to-br from-red-900 to-red-800 text-white px-6 sm:px-8 py-5  sm:py-6 rounded-2xl  transition-all duration-300  w-full lg:w-[300px] h-56 lg:h-60  sm:h-64">

                <div className="flex flex-col justify-between h-full text-right">
                  {/* Top: FIND NOW */}
                  <div className="flex items-start justify-end gap-2 text-[10px] lg:text-[20px] sm:text-xs font-semibold uppercase tracking-wider">
                    FIND NOW
                    <MdArrowOutward />
                  </div>

                  {/* Bottom: Homes built text */}
                  <div className="text-start font-playfair">
                    <div className="text-xl sm:text-lg lg:text-3xl font-playfair italic leading-tight">
                      Homes built for
                    </div>
                    <div className="text-xl sm:text-lg lg:text-3xl font-playfair italic leading-tight">
                      every dream
                    </div>
                  </div>
                </div>

              </button>
            </div>

          </div>
        </div>


        {/* BOTTOM SECTION - 2 Cards Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start relative">

          {/* Center Vertical Border (DESKTOP ONLY) */}
          <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 w-px bg-gray-300"></div>

          {/* LEFT CARD */}
          <div className="border-t-2 border-b-2 p-4">
            <div className="bg-[#D9D9D929]   rounded-3xl p-10 lg:p-12 flex flex-col justify-end h-full min-h-[400px]">
              <h2 className="text-3xl lg:text-2xl font-bold text-gray-900 leading-tight mb-4">
                Available now across Maharashtra.
              </h2>
              <p className="text-[#737373] text-base lg:text-2xl">
                Real homes starting at ₹35L or custom EMI plans available.
              </p>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="border-t-2 border-b-2  p-6">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-lg">
                <img
                  src={images[activeIndex]}
                  alt="Beautiful Home"
                  className="w-full h-80 lg:h-96 object-cover transition-all duration-700 ease-in-out"
                />
              </div>

              <div className="absolute bottom-4 right-4 flex gap-2 bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-lg">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all ${activeIndex === i
                      ? "border-yellow-500 scale-110"
                      : "border-white opacity-70 hover:opacity-100"
                      }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>


        <div className="text-right mt-6">
          <p className="text-black text-xl font-bold lg:text-2xl">
            <span className=" font-playfair italic ">Not in your city?</span>{" "}
            <span className="underline ml-2 font-light cursor-pointer hover:text-black transition-colors">
              Tell us where to expand next →
            </span>
          </p>
        </div>


      </div>
    </section>
  );
};

export default ModernCitySection;