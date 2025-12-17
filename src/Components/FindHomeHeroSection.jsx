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
    // 🏠 Residential
    { label: "Residential Apartment", value: "Residential Apartment" },
    { label: "Residential independent House/Villa", value: "Residential independent House/Villa" },
    { label: "Residential independent/Builder Floor", value: "Residential independent/Builder Floor" },
    { label: "Residential Studio Apartment", value: "Residential Studio Apartment" },
    { label: "Residential Farm House", value: "Residential Farm House" },
    { label: "Guest house/banquest hall", value: "Guest house/banquest hall" },
    { label: "Residential Row House", value: "Residential Row House" },
    { label: "Ressidential Twin Bungalow", value: "Ressidential Twin Bungalow" },
    { label: "Residential Twins Apartment", value: "Residential Twins Apartment" },
    { label: "Residential Duplex", value: "Residential Duplex" },
    { label: "Residential Terrace", value: "Residential Terrace" },
    { label: "Residential Penthouse", value: "Residential Penthouse" },
    { label: "Residential Tenement", value: "Residential Tenement" },
    { label: "Residential Bungalow", value: "Residential Bungalow" },
    { label: "Residential Triplex", value: "Residential Triplex" },
    { label: "Residential basement", value: "Residential basement" },
    { label: "Residential Row Villa", value: "Residential Row Villa" },
    { label: "Weekend Villa", value: "Weekend Villa" },
    { label: "Residential Building", value: "Residential Building" },
    { label: "Sky Villa", value: "Sky Villa" },

    // 🏢 Commercial
    { label: "Commercial Services Apartment", value: "Commercial Services Apartment" },
    { label: "Commercial Shop", value: "Commercial Shop" },
    { label: "Commercial Showroom", value: "Commercial Showroom" },
    { label: "Commercial Office/Space", value: "Commercial Office/Space" },
    { label: "Commercial Time share", value: "Commercial Time share" },
    { label: "Commercial Space in Retail Mall", value: "Commercial Space in Retail Mall" },
    { label: "Commercial Office in Business Park", value: "Commercial Office in Business Park" },
    { label: "Commercial Office in IT Park", value: "Commercial Office in IT Park" },
    { label: "Commercial Business center", value: "Commercial Business center" },
    { label: "Commercial Hotel/Resort", value: "Commercial Hotel/Resort" },
    { label: "Commercial Financial Institution", value: "Commercial Financial Institution" },
    { label: "Commercial Medical/Hospital Premise", value: "Commercial Medical/Hospital Premise" },
    { label: "Corporate House", value: "Corporate House" },
    { label: "Commercial Institutes", value: "Commercial Institutes" },
    { label: "Commercial Labor Camp", value: "Commercial Labor Camp" },
    { label: "Commercial Chemical Zone", value: "Commercial Chemical Zone" },
    { label: "Commercial Restaurant", value: "Commercial Restaurant" },
    { label: "Commercial Flat", value: "Commercial Flat" },
    { label: "Commercial Terrace Restaurant", value: "Commercial Terrace Restaurant" },
    { label: "Commercial Education Institues", value: "Commercial Education Institues" },
    { label: "Commercial Built To suit", value: "Commercial Built To suit" },
    { label: "Commercial Multiplex", value: "Commercial Multiplex" },
    { label: "Commercial basement", value: "Commercial basement" },
    { label: "Commercial bungalow", value: "Commercial bungalow" },
    { label: "Co-Working Office Spaces", value: "Co-Working Office Spaces" },
    { label: "Commercial Shop Cum Office Spaces(SCO)", value: "Commercial Shop Cum Office Spaces(SCO)" },
    { label: "Commercial Shop Cum Flat(SCF)", value: "Commercial Shop Cum Flat(SCF)" },
    { label: "Commercial Booth", value: "Commercial Booth" },
    { label: "Commercial Bay Shop", value: "Commercial Bay Shop" },
    { label: "Commercial Building", value: "Commercial Building" },
    { label: "Cloud Kitchen", value: "Cloud Kitchen" },

    // 🏫 Institutional
    { label: "Institutional Building", value: "Institutional Building" },
    { label: "Corporate Building", value: "Corporate Building" },
    { label: "Educational Building", value: "Educational Building" },
    { label: "Hostels", value: "Hostels" },
    { label: "PG", value: "PG" },
    { label: "Special Economic Zone (SEZ)", value: "Special Economic Zone (SEZ)" },

    // 🏭 Industrial
    { label: "Industrial", value: "Industrial" },
    { label: "Industrial Factory", value: "Industrial Factory" },
    { label: "Industrial Manufacturing", value: "Industrial Manufacturing" },
    { label: "Warehouse/Godown", value: "Warehouse/Godown" },
    { label: "Industrial Building", value: "Industrial Building" },
    { label: "Industrial Shed/Gala", value: "Industrial Shed/Gala" },

    // 🌾 Land / Plot
    { label: "Land/Plot", value: "Land/Plot" },
    { label: "Residential Land/Plot", value: "Residential Land/Plot" },
    { label: "Commercial Land/Plot", value: "Commercial Land/Plot" },
    { label: "Industrial Land/Plot", value: "Industrial Land/Plot" },
    { label: "Agricultural Farm/Land", value: "Agricultural Farm/Land" },
    { label: "Transfer of Development Right (TDR)", value: "Transfer of Development Right (TDR)" },
    { label: "Party Plot", value: "Party Plot" },
    { label: "Amenity Land", value: "Amenity Land" },
    { label: "Institutional Plot", value: "Institutional Plot" },
    { label: "Corporate Plots", value: "Corporate Plots" },
    { label: "OPen Plot", value: "OPen Plot" },

    // 🌍 Other
    { label: "Home stay", value: "Home stay" }
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
