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
  const [propertyFor, setPropertyFor] = useState("");
  const [propertyType, setPropertyType] = useState("");


  const navigate = useNavigate();

  const goToProperties = () => {
    if (!isFormValid) return; // अगर form valid नहीं है तो button काम नहीं करेगा

    navigate("/total-properties", {
      state: {
        city: location,
        property_type: propertyType,
        forType: propertyFor,
      },
    });
  };

  const forOptions = [
    "Rent/Lease",
    "Re-Development",
    "Joint Ventures",
    "Services",
    "PG",
    "Lease",
    "Sale"
  ];

  const propertyTypeOptions = [
    { label: "Residential Apartment", value: "Apartment" },
    { label: "Residential House/Villa", value: "Villa" },
    { label: "Residential independent/Builder Floor", value: "House" },
    { label: "Residential Studio Apartment", value: "Apartment" },
    { label: "Residential Farm House", value: "House" },
    { label: "Guest house/banquest hall", value: "House" },
    { label: "Residential Row House", value: "House" },
    { label: "Ressidential Twin Bungalow", value: "House" },
    { label: "Residential Twins Apartment", value: "Apartment" },
    { label: "Residenital duplex", value: "House" },
    { label: "Residenital terracee", value: "House" },
    { label: "Residenital Tenement", value: "House" },
    { label: "Residenital Triplex", value: "House" },
    { label: "Residenital basement", value: "House" },
    { label: "Residenital Row Villa", value: "Villa" },
    { label: "Residential Building", value: "House" },
    { label: "Commercial Services Apartment", value: "Commercial" },
    { label: "Commercial Time share", value: "Commercial" },
    { label: "Commercial Office in IT Park", value: "Office" },
    { label: "Commercial Business center", value: "Commercial" },
    { label: "Commercial Hotel/Resort", value: "Commercial" },
    { label: "Commercial Financial Institution", value: "Commercial" },
    { label: "Commercial Medical/Hospital Premise", value: "Commercial" },
    { label: "Corporate House", value: "Commercial" },
    { label: "Commercial Institutes", value: "Institutional" },
    { label: "Commercial Restaurant", value: "Commercial" },
    { label: "Cmmercial Flat", value: "Apartment" },
    { label: "Commercial Education Institues", value: "Institutional" },
    { label: "Commercial Built To suit", value: "Commercial" },
    { label: "Home stay", value: "Other" },
    { label: "Commercial Multiplex", value: "Commercial" },
    { label: "Commercial basement", value: "Commercial" },
    { label: "Commercial Shop Cum Flat(SCF)", value: "Commercial" },
    { label: "Commercial Booth", value: "Commercial" },
    { label: "Cloud Kitchen", value: "Commercial" },
    { label: "Institutional Building", value: "Institutional" },
    { label: "Corporate Building", value: "Commercial" },
    { label: "Educational Building", value: "Institutional" },
    { label: "Hostels", value: "Institutional" },
    { label: "Industrial", value: "Industrial" },
    { label: "Industrial Factory", value: "Industrial" },
    { label: "Industrial Manufactuing", value: "Industrial" },
    { label: "Industrial Building", value: "Industrial" },
    { label: "Industrial Shed/Gala", value: "Industrial" },
    { label: "Land/Plot", value: "Land" },
    { label: "Resident Land/Plot", value: "Land" },
    { label: "Commercial Land/Plot", value: "Land" },
    { label: "Agricultural Farm/Land", value: "Land" },
    { label: "Transfer of Development Right (TDR)", value: "Land" },
    { label: "Party Plot", value: "Land" },
    { label: "Amenity Land", value: "Land" },
    { label: "Instititional Plot", value: "Institutional" },
    { label: "Corporate Plots", value: "Commercial" },
    { label: "Open Plot", value: "Land" },
    { label: "Residential Twin Bungalow", value: "House" }
  ];


  const isFormValid = location && propertyFor && propertyType;

  return (
    <div
      className={`
  relative w-full 
  ${shrunk ? "h-[37vh]" : "h-[90vh] sm:h-screen"} 
  sm:${shrunk ? "h-[30vh]" : "h-[80vh] "} /* force desktop height to 35vh */
  bg-cover bg-center 
  rounded-bl-[40px] sm:rounded-bl-[90px]
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
            <span className="text-yellow-400 italic font-playfair mr-2">Discover</span>
            Spaces That Match <br className="hidden sm:block" />
            Your <span className="text-yellow-400 italic font-playfair">Lifestyle</span>
          </h1>
        )}

        {/* Filter Bar */}
        <div
          className={`
      relative mt-0 sm:mt-10 w-full sm:w-[85%] md:w-[78%] lg:w-[65%]
      bg-white/10 backdrop-blur-xl
      rounded-2xl border border-white/40
      flex flex-col  gap-3 sm:flex-row items-center justify-between
      shadow-[0_8px_40px_rgba(0,0,0,0.25)]
      transition-all duration-700
      py-2 lg:py-4 px-5
    `}
        >
          {/* Row 1: City + Category */}
          <div className="flex w-full  gap-3 flex-wrap sm:flex-nowrap">
            {/* City */}
            <div className="flex-1  lg:items-center flex flex-col sm:flex-row gap-1 sm:gap-3">
              <label className="text-white text-[13px] text-start lg:text-center tracking-wide opacity-90 sm:w-24">
                City
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter city"
                className="px-4 py-3 sm:py-2 rounded-lg bg-white/15 text-white text-base outline-none w-full"
              />
            </div>
            {/* forType */}
            <div className="flex-1 lg:items-center flex flex-col sm:flex-row gap-1 sm:gap-3">
              <label className="text-white text-[13px] text-start lg:text-center tracking-wide opacity-90 sm:w-24">
                For
              </label>

              <select
                value={propertyFor}
                onChange={(e) => setPropertyFor(e.target.value)}
                className="px-3 py-3 sm:py-2 rounded-lg bg-white/15 text-white text-base outline-none w-full"
              >
                <option className="text-black" value="">
                  Select
                </option>

                {forOptions.map((item, index) => (
                  <option key={index} className="text-black" value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Row 2: Property Type + Button */}
          <div className="flex w-full gap-3   flex-wrap sm:flex-nowrap items-center sm:items-stretch">
            {/* Category */}
            <div className="flex-1 lg:items-center flex flex-col sm:flex-row gap-1 sm:gap-2">
              <label className="text-white text-[13px] text-start lg:text-center tracking-wide opacity-90 sm:w-24">
                Property
              </label>

              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="px-3 py-3 sm:py-2 rounded-lg bg-white/15 text-white text-base outline-none w-full"
              >
                <option value="" className="text-black">Select</option>
                {propertyTypeOptions.map((item, index) => (
                  <option key={index} value={item.value} className="text-black">
                    {item.label}
                  </option>
                ))}
              </select>

            </div>


            {/* Mobile Button */}
            <div className="flex justify-center  mt-6 w-20 sm:hidden">
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
