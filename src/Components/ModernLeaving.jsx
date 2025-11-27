import React, { useState, useEffect } from "react";
import houseIcon from "../../public/house.webp";
import c1 from "../../public/c1.webp";
import c2 from "../../public/c2.webp";
import c3 from "../../public/c3.webp";
import c4 from "../../public/c4.webp";
import { MdArrowOutward } from "react-icons/md";

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
    <section className="bg-white font-manrope overflow-hidden px-4 md:px-8 lg:px-16">
      <div className="max-w-10xl mx-auto py-16 lg:py-24">

        {/* TOP SECTION */}
        <div className="hidden lg:block mb-8">

          {/* Description TEXT */}
          <p
            className="
              text-base
              sm:text-2xl
              sm:max-w-2xl
              sm:text-gray-600
              max-w-sm
              mx-auto
              mb-7
              md:ml-[440px] ml-0 md:-mb-32 lg:text-xs
              text-center sm:text-left
            "
          >
            Experience the perfect balance of comfort, style,
            <br className="hidden sm:block" />
            and smart living spaces designed for today's lifestyle
          </p>

          {/* Heading + CTA */}
          <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-10 lg:gap-8 text-center lg:text-left">

            {/* LEFT TEXT */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-tight">
                We bring a new
              </h1>

              <div className="flex justify-center lg:justify-start items-center gap-3 mt-2 flex-wrap">
                <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900">
                  evolution of
                </h1>

                <img
                  src={houseIcon}
                  alt="house"
                  className="w-12 h-12 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
                />

                <h2 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl italic font-serif text-yellow-500">
                  modern living
                </h2>
              </div>
            </div>

            {/* CTA BUTTON */}
            <div className="flex-shrink-0 border-l-0 sm:border-l-2 p-0 sm:p-4 w-full sm:w-auto flex justify-center">
              <button
                className="
                  bg-gradient-to-br from-red-900 to-red-800
                  text-white px-8 py-6 rounded-2xl
                  transition-all duration-300
                  w-72 sm:w-[300px]
                  h-48 sm:h-64 lg:h-60
                "
              >
                <div className="flex flex-col justify-between h-full text-right">
                  <div className="flex items-start justify-end gap-2 text-xs lg:text-[20px] sm:text-xs font-semibold uppercase tracking-wider">
                    FIND NOW
                    <MdArrowOutward />
                  </div>

                  <div className="text-start font-playfair">
                    <div className="text-2xl sm:text-lg lg:text-3xl italic leading-tight">
                      Homes built for
                    </div>
                    <div className="text-2xl sm:text-lg lg:text-3xl italic leading-tight">
                      every dream
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="lg:hidden mb-8">

          {/* MOBILE FIRST — TEXT BELOW, HEADING ABOVE */}
          <div className="flex flex-col sm:flex-col lg:flex-row items-center justify-center lg:justify-between gap-10 lg:gap-8 text-center lg:text-left">

            {/* LEFT TEXT + HEADING WRAPPER */}
            <div className="flex flex-col-reverse sm:flex-col flex-1 text-center lg:text-left">

              {/* 🔻 MOBILE: PARAGRAPH AFTER HEADING */}
              <p
                className="
          text-lg              /* bigger for mobile */
          xl:text-base
          sm:text-2xl
          sm:max-w-2xl
          sm:text-gray-600
          max-w-sm
          mx-auto
          mb-7
          md:ml-[440px] ml-0 md:-mb-32 lg:text-xs
          text-center sm:text-left
        "
              >
                Experience the perfect balance of comfort, style,
                <br className="hidden sm:block" />
                and smart living spaces designed for today's lifestyle
              </p>

              {/* 🔺 MOBILE: HEADING ABOVE PARAGRAPH */}
              <div>
                <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-tight">
                  We bring a new
                </h1>

                <div className="flex justify-center lg:justify-start items-center gap-3 mt-2 flex-wrap">
                  <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900">
                    evolution of
                  </h1>

                  <img
                    src={houseIcon}
                    alt="house"
                    className="w-12 h-12 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
                  />

                  <h2 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl italic font-serif text-yellow-500">
                    modern living
                  </h2>
                </div>
              </div>
            </div>

            {/* CTA BUTTON */}
            <div className="flex-shrink-0 border-l-0 sm:border-l-2 p-0 sm:p-4 w-full sm:w-auto flex justify-center">
              <button
                className="
          bg-gradient-to-br from-red-900 to-red-800
          text-white px-8 py-6 rounded-2xl
          transition-all duration-300
          w-72 sm:w-[300px]
          h-48 sm:h-64 lg:h-60
        "
              >
                <div className="flex flex-col justify-between h-full text-right">
                  <div className="flex items-start justify-end gap-2 text-xs lg:text-[20px] sm:text-xs font-semibold uppercase tracking-wider">
                    FIND NOW
                    <MdArrowOutward />
                  </div>

                  <div className="text-start font-playfair">
                    <div className="text-2xl sm:text-lg lg:text-3xl italic leading-tight">
                      Homes built for
                    </div>
                    <div className="text-2xl sm:text-lg lg:text-3xl italic leading-tight">
                      every dream
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>


        {/* BOTTOM SECTION - DESKTOP ONLY */}
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-8 items-start relative">

          {/* Vertical Divider */}
          <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 w-px bg-gray-300"></div>

          {/* LEFT CARD */}
          <div className="border-t-2 border-b-2 p-4">
            <div className="bg-[#D9D9D929] rounded-3xl p-10 lg:p-12 flex flex-col justify-end h-full min-h-[400px]">
              <h2 className="text-3xl lg:text-2xl font-bold text-gray-900 leading-tight mb-4">
                Available now across Maharashtra.
              </h2>
              <p className="text-[#737373] text-base lg:text-2xl">
                Real homes starting at ₹35L or custom EMI plans available.
              </p>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="border-t-2 border-b-2 p-6">
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

        {/* BOTTOM SECTION - MOBILE ONLY (REVERSED ORDER) */}
        <div className="grid grid-cols-1 gap-8 lg:hidden mt-10">

          {/* IMAGE FIRST ON MOBILE */}
          <div className="border-t-2 border-b-2 p-6">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-lg">
                <img
                  src={images[activeIndex]}
                  alt="Beautiful Home"
                  className="w-full h-80 object-cover transition-all duration-700 ease-in-out"
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

          {/* TEXT SECOND ON MOBILE */}
          <div className="border-t-2 border-b-2 p-4">
            <div className="bg-[#D9D9D929] rounded-3xl p-10 flex flex-col justify-end h-full min-h-[300px]">
              <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-4">
                Available now across Maharashtra.
              </h2>
              <p className="text-[#737373] text-base">
                Real homes starting at ₹35L or custom EMI plans available.
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER TEXT */}
        <div className="text-right mt-6">
          <p className="text-black text-xl font-bold lg:text-2xl">
            <span className="font-playfair italic">Not in your city?</span>
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
