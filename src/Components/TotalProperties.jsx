import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FindHomeHero from "../Components/FindHomeHeroSection";
import { useGetPropertiesQuery } from "../redux/api/propertyFecthApi";
import { IoFilter } from "react-icons/io5";
import { div } from "framer-motion/client";
import FindHomeHeroSection from "../Components/FindHomeHeroSection";

const TotalProperties = () => {
  const location = useLocation();
  const navigate = useNavigate();


  const [filters, setFilters] = useState({
    propertyType: "",
    bedrooms: "",
    maxPrice: "",
    maxArea: "",
    furnishingStatus: "",
  });

  // TEMP FILTERS (User एडिट करेगा UI में)
  const [tempFilters, setTempFilters] = useState({
    propertyType: "",
    bedrooms: "",
    maxPrice: "",
    maxArea: "",
    furnishingStatus: "",
  });

  const [shrinkHero, setShrinkHero] = useState(false);
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);

  const navFilters = location.state || {}; // अगर state undefined है तो empty object

  const { data: apiResponse, isLoading, error } = useGetPropertiesQuery(
    {
      city: navFilters.city || "",
      property_type: navFilters.property_type || "",
      forType: navFilters.forType || "Sale", // default "Sale" अगर undefined हो
    },
    { skip: !navFilters.city } // तभी query run होगी अगर city मौजूद है
  );


  const properties = (apiResponse?.data || []).map(p => ({
    ...p,
    price: Number(p.price)
  }));


  // FILTERING USING ONLY > filters (NOT tempFilters)
  // const filteredProperties = properties.filter(
  //   (property) =>
  //     (!filters.propertyType || property.propertyType === filters.propertyType) &&
  //     (!filters.maxPrice || property.price <= filters.maxPrice * 100000) &&
  //     (!filters.maxArea || property.specifications?.area <= filters.maxArea) &&
  //     (!filters.furnishingStatus ||
  //       property.specifications?.furnishingStatus === filters.furnishingStatus) &&
  //     (!filters.bedrooms ||
  //       property.specifications?.bedrooms === parseInt(filters.bedrooms))
  // );

  const filteredProperties = properties.filter((property) => {
    return (
      // Property Type
      (!filters.propertyType || property.property_type === filters.propertyType) &&

      // Max Price (backend में string में है, so number में convert करें)
      (!filters.maxPrice || Number(property.pricing?.expected_price) <= filters.maxPrice * 100000) &&

      // Max Area (builtup area, number में convert करें)
      (!filters.maxArea || Number(property.Area?.builtup) <= filters.maxArea) &&

      // Furnishing Status
      (!filters.furnishingStatus || property.Furnishing === filters.furnishingStatus) &&

      // Bedrooms
      (!filters.bedrooms || Number(property.BedRoom?.bedrooms) === parseInt(filters.bedrooms))
    );
  });


  useEffect(() => {
    const timer = setTimeout(() => setShrinkHero(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const formatPrice = (price) => {
    price = Number(price); // FIX 1

    if (!price || price === 0) return "Price on request";

    if (price >= 10000000) {
      return `₹${(price / 10000000)
        .toFixed(price % 10000000 === 0 ? 0 : 1)
        .replace(".0", "")} Cr`;
    }

    if (price >= 100000) {
      return `₹${(price / 100000)
        .toFixed(price % 100000 === 0 ? 0 : 1)
        .replace(".0", "")} L`;
    }

    if (price >= 10000) {
      return `₹${(price / 1000)
        .toFixed(price % 1000 === 0 ? 0 : 1)
        .replace(".0", "")} K`;
    }

    return `₹${price.toLocaleString()}`;
  };


  const handlePropertyClick = (property) =>
    navigate("/house-details", { state: { propertyId: property._id } });

  const resetFilters = () =>
    setTempFilters({
      propertyType: "",
      bedrooms: "",
      maxPrice: "",
      maxArea: "",
      furnishingStatus: "",
    });

  const filterConfig = {
    propertyType: [
      { value: "Apartment" },
      { value: "Row House" },
      { value: "Villa" },
    ],
    bedrooms: [
      { value: "1", label: "1 BHK" },
      { value: "2", label: "2 BHK" },
      { value: "3", label: "3 BHK" },
      { value: "4", label: "4+ BHK" },
    ],
    furnishingStatus: [
      { value: "Furnished" },
      { value: "Semi-Furnished" },
      { value: "Unfurnished" },
    ],
  };

  const FilterCheckbox = ({ name, value, label, checked, onChange }) => (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
      />
      <span className="text-sm text-gray-700">{label || value}</span>
    </label>
  );

  const RangeSlider = ({ label, min, max, step, value, onChange, unit }) => {
    const percentage = value ? (value / max) * 100 : 0;
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {label}
        </label>
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>
              {min}
              {unit}
            </span>
            <span>
              {value || max}
              {unit}
            </span>
          </div>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value || 0}
            onChange={onChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`,
            }}
          />
          <div className="flex justify-center">
            <span className="text-sm font-medium text-yellow-600">
              Up to {value || "Any"} {unit}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const ActiveFilterTag = ({ label, value, onRemove }) => {
    if (!value) return null;
    return (
      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
        {label}: {value}
        <button
          onClick={onRemove}
          className="ml-1 text-yellow-600 hover:text-yellow-800"
        >
          ×
        </button>
      </span>
    );
  };

  return (
    <div className="w-full font-manrope  bg-[#F8F8F8] min-h-screen">
      <FindHomeHeroSection shrunk={shrinkHero} />

      <div className="flex justify-between   items-center  px-4  md:px-8 lg:px-24 mt-10">
        <button className="bg-yellow-400 text-black px-5 py-[6px] rounded-full text-sm font-semibold">
          Total {filteredProperties.length} Properties
        </button>

        <div className="relative ">
          <button
            onClick={() => {
              setTempFilters(filters); // जब खुले, tempFilters में current filters डाल दो
              setShowAdvancedFilter(!showAdvancedFilter);
            }}
            className="border px-4 py-2 rounded-lg shadow-sm bg-white text-gray-700 text-md font-medium flex items-center gap-2"
          >
            Advanced Filter <IoFilter />
          </button>

          {showAdvancedFilter && (
            <div className="absolute right-0 top-12 bg-white border mr-5 border-gray-200 rounded-lg p-6 w-72 lg:w-96 z-50">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Advanced Filters
                  </h3>
                  <button
                    onClick={resetFilters}
                    className="text-sm text-yellow-600 hover:text-yellow-700"
                  >
                    Reset All
                  </button>
                </div>

                {["bedrooms", "furnishingStatus"].map((filterKey) => (
                  <div key={filterKey}>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      {filterKey.replace(/([A-Z])/g, " $1").trim()}
                    </label>
                    <div
                      className={`grid ${filterKey === "furnishingStatus"
                        ? "grid-cols-1"
                        : "grid-cols-2"
                        } gap-3`}
                    >
                      {filterConfig[filterKey].map((item) => (
                        <FilterCheckbox
                          key={item.value}
                          name={filterKey}
                          value={item.value}
                          label={item.label}
                          checked={tempFilters[filterKey] === item.value}
                          onChange={(e) =>
                            setTempFilters((prev) => ({
                              ...prev,
                              [filterKey]: e.target.checked ? item.value : "",
                            }))
                          }
                        />
                      ))}
                    </div>
                  </div>
                ))}

                <RangeSlider
                  label={`Price Range: ${!tempFilters.maxPrice || tempFilters.maxPrice === 0 ? "Any" :
                    tempFilters.maxPrice < 100000
                      ? Math.round(tempFilters.maxPrice / 1000) + " K"
                      : tempFilters.maxPrice < 10000000
                        ? (tempFilters.maxPrice / 100000).toFixed(1) + " L"
                        : (tempFilters.maxPrice / 10000000).toFixed(1) + " Cr"
                    }`}
                  min={0}
                  max={100}
                  step={1}
                  value={
                    !tempFilters.maxPrice || tempFilters.maxPrice === 0 ? 0 :
                      tempFilters.maxPrice < 100000
                        ? (tempFilters.maxPrice / 100000) * 30  // 0-30% for K
                        : tempFilters.maxPrice < 10000000
                          ? 30 + ((tempFilters.maxPrice - 100000) / (10000000 - 100000)) * 40  // 30-70% for L
                          : 70 + ((tempFilters.maxPrice - 10000000) / (100000000 - 10000000)) * 30  // 70-100% for Cr
                  }
                  unit=""
                  onChange={(e) => {
                    const sliderValue = Number(e.target.value);
                    let actualPrice;

                    if (sliderValue === 0) {
                      actualPrice = 0; // "Any" price
                    } else if (sliderValue <= 30) {
                      // K section: 0-30% = 1K to 1L
                      actualPrice = Math.round((sliderValue / 30) * 100000);
                    } else if (sliderValue <= 70) {
                      // L section: 30-70% = 1L to 1Cr
                      const progress = (sliderValue - 30) / 40;
                      actualPrice = Math.round(100000 + progress * (10000000 - 100000));
                    } else {
                      // Cr section: 70-100% = 1Cr to 100Cr
                      const progress = (sliderValue - 70) / 30;
                      actualPrice = Math.round(10000000 + progress * (100000000 - 10000000));
                    }

                    setTempFilters(prev => ({
                      ...prev,
                      maxPrice: actualPrice,
                    }));
                  }}
                />


                <RangeSlider
                  label="Area Range"
                  min={0}
                  max={5000}
                  step={100}
                  value={tempFilters.maxArea}
                  unit="sq.ft"
                  onChange={(e) =>
                    setTempFilters((prev) => ({
                      ...prev,
                      maxArea: e.target.value,
                    }))
                  }
                />

                {/* APPLY BUTTON */}
                <button
                  onClick={() => {
                    setFilters(tempFilters); // APPLY
                    setShowAdvancedFilter(false);
                  }}
                  className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition-colors font-medium"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-6 md:px-12 mt-4">
        <div className="flex flex-wrap gap-2">
          <ActiveFilterTag
            label="Type"
            value={filters.propertyType}
            onRemove={() =>
              setFilters((prev) => ({ ...prev, propertyType: "" }))
            }
          />
          <ActiveFilterTag
            label="BHK"
            value={filters.bedrooms && `${filters.bedrooms} BHK`}
            onRemove={() =>
              setFilters((prev) => ({ ...prev, bedrooms: "" }))
            }
          />
          <ActiveFilterTag
            label="Price"
            value={filters.maxPrice && `Up to ₹${filters.maxPrice}L`}
            onRemove={() =>
              setFilters((prev) => ({ ...prev, maxPrice: "" }))
            }
          />
          <ActiveFilterTag
            label="Area"
            value={filters.maxArea && `Up to ${filters.maxArea} sq.ft`}
            onRemove={() => setFilters((prev) => ({ ...prev, maxArea: "" }))}
          />
          <ActiveFilterTag
            label="Furnishing"
            value={filters.furnishingStatus}
            onRemove={() =>
              setFilters((prev) => ({ ...prev, furnishingStatus: "" }))
            }
          />
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading properties...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="text-center py-20">
          <p className="text-red-600 text-lg">Error loading properties</p>
          <p className="text-gray-600 mt-2">Please try again later</p>
        </div>
      )}

      {!isLoading && !error && filteredProperties.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-600 text-lg">No properties found</p>
          <p className="text-gray-500 mt-2">Try adjusting your filters</p>
        </div>
      )}

      <div className="px-6 md:px-12 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProperties.map((property) => (
            <div key={property._id}>
              <div
                onClick={() => handlePropertyClick(property)}
                className="relative overflow-hidden rounded-xl cursor-pointer"
              >
                <img
                  src={property.Other_images?.[0] || "./property-placeholder.jpg"}
                  alt={`Property ${property._id}`}
                  className="w-full h-72 sm:h-80 lg:h-96 object-cover"
                />

                <div className="absolute bottom-0 m-3 rounded-lg inset-x-0 bg-black/30 backdrop-blur-sm p-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-white text-lg md:text-xl font-semibold">
                      {property.BedRoom?.bedrooms} BHK • {property.Address?.city}
                    </h3>
                    <p className="text-white text-sm mt-1 leading-tight">
                      {property.Address?.full_address}
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-2 py-3">
                <p className="text-gray-800 font-semibold text-xl">
                  {formatPrice(property.pricing?.expected_price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAdvancedFilter && (
        <div
          className="fixed inset-0 bg-transparent z-40"
          onClick={() => setShowAdvancedFilter(false)}
        />

      )}

      <style>{`
          .slider::-webkit-slider-thumb { 
            appearance: none; 
            height: 20px; 
            width: 20px; 
            border-radius: 50%; 
            background: #f59e0b; 
            cursor: pointer; 
            border: 2px solid #fff; 
            box-shadow: 0 2px 4px rgba(0,0,0,0.2); 
          }
          .slider::-moz-range-thumb { 
            height: 20px; 
            width: 20px; 
            border-radius: 50%; 
            background: #f59e0b; 
            cursor: pointer; 
            border: 2px solid #fff; 
            box-shadow: 0 2px 4px rgba(0,0,0,0.2); 
          }
        `}</style>
    </div>
  );
};

export default TotalProperties;
