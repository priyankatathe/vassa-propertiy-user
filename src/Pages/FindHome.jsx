import React, { useState } from "react";
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import FindHomeHeroSection from "../Components/FindHomeHeroSection";
import { useGetAllPropertieQuery } from "../redux/api/propertyFecthApi";

// ⭐ SKELETON CARD
const PropertySkeleton = () => {
  return (
    <div className="animate-pulse rounded-xl overflow-hidden">
      <div className="bg-gray-300 h-72 w-full"></div>

      <div className="p-4 space-y-3">
        <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
        <div className="h-3 w-3/4 bg-gray-300 rounded"></div>
        <div className="h-3 w-2/3 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

const FindHome = ({ shrunk = false }) => {
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  // ⭐ API CALL
  const { data, isLoading } = useGetAllPropertieQuery();

  // ⭐ DATA FROM API (properties array)
  const properties = data?.properties || [];

  return (
    <>
      <FindHomeHeroSection shrunk={shrunk} />

      {shrunk && <div className="h-[32vh]"></div>}

      <div className="w-full font-manrope mx-auto px-4 md:px-20 lg:px-25 py-12">
        <div className="mb-10 max-w-10xl md:flex md:justify-between md:items-center text-center md:text-left gap-6">
          <p className="text-gray-600 max-w-xl mx-auto md:mx-0 mb-4 md:mb-0 text-sm md:text-base">
            Explore a wide range of verified properties tailored to fit your
            budget, style, and location preferences. Whether you're searching for
            your dream villa, a modern apartment, or an investment opportunity
            Vassa Properties helps you find it effortlessly.
          </p>

          <h2 className="text-3xl md:text-6xl font-playfair italic flex justify-center md:justify-start gap-3">
            <span className="text-yellow-500">Find</span> Properties
          </h2>
        </div>

        {/* ⭐ GRID — SAME UI, FIXED KEYS ACCORDING TO RESPONSE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {isLoading
            ? [...Array(6)].map((_, index) => <PropertySkeleton key={index} />)
            : properties.map((p) => (
              <div
                key={p._id}
                onClick={() =>
                  navigate("/house-details", {
                    state: { propertyId: p._id },
                  })
                }
                className="relative overflow-hidden rounded-xl group cursor-pointer"
              >
                {/* ⭐ IMAGE FROM API */}
                <img
                  src={
                    p.Other_images?.[0] ||
                    "./gallery.jpg"
                  }
                  alt={p.property_type}
                  className="w-full h-72 object-cover transition-transform group-hover:scale-105"
                />

                {/* ⭐ HOVER OVERLAY */}
                <div className="absolute inset-0 bg-black/50 flex items-end justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div>
                    {/* ⭐ TITLE = property_type */}
                    <h3 className="text-white text-lg font-semibold">
                      {p.property_type}
                    </h3>

                    {/* ⭐ SHORT DESCRIPTION */}
                    <p className="text-white text-sm mt-2 leading-tight">
                      {p?.Description?.slice(0, 50)}...
                    </p>


                  </div>

                  <button className="flex items-center bg-white text-black px-2 py-2 rounded-full">
                    <GoArrowRight size={22} />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default FindHome;
