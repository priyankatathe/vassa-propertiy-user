import React from "react";
import HouseImg from "/house.webp"; // <-- your house image

const DreamHomeCTA = () => {
  return (
    <section className="w-full font-manrope py-14  px-4  md:px-8 lg:px-16  ">
      <div className="
        bg-yellow-400 
        rounded-3xl 
        p-6 md:p-12 
        flex flex-col md:flex-row 
        items-center 
        gap-10 
        shadow-lg
        h-auto md:h-60
      ">

        {/* LEFT — House Image */}
        <div className="w-full md:w-auto flex justify-center">
          <img
            src={HouseImg}
            alt="Dream Home"
            className="
              h-40 sm:h-48 md:h-60 
              object-contain 
              drop-shadow-xl 
              z-20 
              mb-10 md:mb-36
            "
          />
        </div>

        {/* RIGHT — Text Area */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-white font-playfair  italic">
            Ready to Find Your <span className="font-bold text-[#851524]">Dream Home?</span>
          </h2>

          <p className="text-gray-800 mt-3 text-sm sm:text-base md:text-lg leading-relaxed max-w-md mx-auto md:mx-0">
            Whether you're looking to buy, invest, or explore luxury living,
            we're here to guide you every step of the way.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start">
            <button className="bg-white text-gray-900 font-semibold px-6 py-2 rounded-full shadow hover:shadow-md duration-200">
              Explore Properties
            </button>

            <button className="border border-white text-gray-900 bg-yellow-300 font-semibold px-6 py-2 rounded-full shadow hover:shadow-md duration-200">
              Contact Team
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default DreamHomeCTA;
