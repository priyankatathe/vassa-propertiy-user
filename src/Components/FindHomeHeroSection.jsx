import React, { useState } from "react";
import Navbar from "./Navbar";
import { MdArrowRight } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";

const FindHomeHeroSection = ({ shrunk }) => {
  const locationPath = useLocation().pathname;

  // ⭐ Sticky ONLY for total-properties page
  const isSticky = locationPath === "/total-properties";

  // ⭐ STATES FOR FILTERS  
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const navigate = useNavigate();

  const goToProperties = () => {

    const property_type =
      propertyType === "Apartment" ? "Apartment" :
        propertyType === "Villa" ? "Villa" :
          propertyType === "House" ? "House" :
            propertyType === "Commercial" ? "Commercial" :
              propertyType === "Land" ? "Land" :
                propertyType === "Office" ? "Office" :
                  "";

    const listingType =
      category === "On Rent" ? "Rent" :
        category === "On Sale" ? "Sale" :
          "";

    navigate("/total-properties", {
      state: {
        city: location,
        property_type: propertyType,
        listingType
      },
    });
  };

  const isFormValid = location && category && propertyType;

  return (
    <div
      className={`
  relative w-full 
  ${shrunk ? "h-[45vh]" : "h-[90vh] sm:h-screen"} 
  sm:${shrunk ? "h-[35vh]" : "h-[90vh]"} /* force desktop height to 35vh */
  bg-cover bg-center 
  rounded-bl-[60px] sm:rounded-bl-[90px]
  transition-all duration-700 ease-in-out
  ${isSticky ? "sticky top-0 left-0 z-[999]" : ""}
`}

      style={{ backgroundImage: `url('./findhome.webp')` }}
    >
      {/* Navbar */}
      <div className="absolute top-0 left-0 w-full z-20">
        <Navbar />
      </div>

      {/* Content */}
      <div
        className="
          relative z-10 flex flex-col items-center text-center h-full px-4 md:px-20
          justify-center sm:justify-center 
         pt-20 sm:pt-0
        "
      >

        {/* Headline (hidden when shrunk) */}
        {!shrunk && (
          <h1 className="text-white font-bold leading-snug md:leading-tight text-3xl sm:text-4xl md:text-6xl transition-all">
            <span className="text-yellow-400 italic font-playfair">Discover</span>
            Spaces That Match <br className="hidden sm:block" />
            Your <span className="text-yellow-400 italic font-playfair">Lifestyle</span>
          </h1>
        )}

        {/* Filter Bar */}
          <div
            className={`
      relative mt-5 sm:mt-10 w-full sm:w-[85%] md:w-[78%] lg:w-[65%]
      bg-white/10 backdrop-blur-xl
      rounded-2xl border border-white/40
      flex flex-col  gap-3 sm:flex-row items-center justify-between
      shadow-[0_8px_40px_rgba(0,0,0,0.25)]
      transition-all duration-700
      py-4 px-5
    `}
          >
            {/* Row 1: City + Category */}
            <div className="flex w-full gap-3 flex-wrap sm:flex-nowrap">
              {/* City */}
              <div className="flex-1 flex flex-col sm:flex-row gap-1 sm:gap-3">
                <label className="text-white text-[13px] text-start lg:text-center tracking-wide opacity-90 sm:w-24">
                  City
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter city"
                  className="px-3 py-3 sm:py-2 rounded-lg bg-white/15 text-white text-sm outline-none w-full"
                />
              </div>

              {/* Property Type */}
              <div className="flex-1 flex flex-col sm:flex-row gap-1 sm:gap-3">
                <label className="text-white text-[13px] text-start lg:text-center tracking-wide opacity-90 sm:w-24">
                  Category Type
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="px-3 py-3 sm:py-2 rounded-lg bg-white/15 text-white text-sm outline-none w-full"
                >
                  <option className="text-black" value="">
                    Select
                  </option>
                  <option className="text-black" value="Apartment">
                    Apartment
                  </option>
                  <option className="text-black" value="Villa">
                    Villa
                  </option>
                  <option className="text-black" value="House">
                    House
                  </option>
                  <option className="text-black" value="Commercial">
                    Commercial
                  </option>
                  <option className="text-black" value="Land">
                    Land
                  </option>
                  <option className="text-black" value="Office">
                    Office
                  </option>
                </select>
              </div>

            </div>

            {/* Row 2: Property Type + Button */}
            <div className="flex w-full gap-3  flex-wrap sm:flex-nowrap items-center sm:items-stretch">
              {/* Category */}
              <div className="flex-1 flex flex-col sm:flex-row gap-1 sm:gap-2">
                <label className="text-white text-[13px] text-start lg:text-center tracking-wide opacity-90 sm:w-24">
                  Property Type
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="px-3 py-3 sm:py-2 rounded-lg bg-white/15 text-white text-sm outline-none w-[150px] lg:w-full"
                >
                  <option className="text-black" value="">
                    Select
                  </option>
                  <option className="text-black">On Rent</option>
                  <option className="text-black">On Sale</option>
                </select>
              </div>

              {/* Mobile Button */}
              <div className="flex justify-center mr-16 mt-6 w-20 sm:hidden">
                <button
                  onClick={goToProperties}
                  disabled={!isFormValid}
                  className={`
            w-full h-12 rounded-lg flex justify-center items-center 
            text-black text-2xl shadow-[0_4px_15px_rgba(255,255,255,0.4)] 
            transition
            ${isFormValid ? "bg-yellow-400 hover:bg-yellow-500" : "bg-gray-400 cursor-not-allowed"}
          `}
                >
                  <MdArrowRight />
                </button>
              </div>
            </div>

            {/* Desktop Button */}
            <button
              onClick={goToProperties}
              disabled={!isFormValid}
              className={`
        hidden sm:flex absolute top-50 -translate-y-1/2 w-14 h-14 mt-16 
        rounded-full text-white flex items-center justify-center text-2xl 
        shadow-[0_4px_15px_rgba(255,255,255,0.4)] transition 
        right-[-40px] md:right-[-55px] lg:right-[-70px]
        ${isFormValid ? "bg-yellow-400 hover:bg-yellow-500" : "bg-gray-400 cursor-not-allowed"}
      `}
            >
              <MdArrowRight />
            </button>
          </div>

      </div>
    </div>
  );
};

export default FindHomeHeroSection;
