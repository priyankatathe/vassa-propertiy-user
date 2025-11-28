import React, { useState } from "react";
import { useGetAddedPropertieQuery } from "../redux/api/listPropertiApi";
import { useNavigate } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";

// Skeleton
const PropertySkeleton = () => (
    <div className="relative overflow-hidden rounded-xl bg-gray-200 animate-pulse">
        <div className="w-full h-72 bg-gray-300" />
        <div className="p-4">
            <div className="h-6 bg-gray-400 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-400 rounded w-full" />
        </div>
    </div>
);

const YourProperties = () => {
    const { data, isLoading } = useGetAddedPropertieQuery();
    const [activeTab, setActiveTab] = useState("rent");
    const navigate = useNavigate();

    // Safe array
    const properties = Array.isArray(data?.property) ? data.property : [];

    // Counts
    const rentCount = properties.filter(p => p.listingType?.toLowerCase() === "rent").length;
    const saleCount = properties.filter(p => p.listingType?.toLowerCase() === "sale").length;

    // Filtered
    const filteredProperties = properties.filter(p =>
        p.listingType?.toLowerCase() === activeTab
    );

    // First image
    const getFirstImage = (p) => {
        return (
            p.Other_images?.[0] ||
            p.specifications?.bedroomImage ||
            p.specifications?.hallImage ||
            p.specifications?.kitchenImage ||
            "./property-placeholder.jpg"
        );
    };

    return (
        <div className="p-6 max-w-10xl mx-auto mt-10 py-16  px-4  md:px-8 lg:px-[67px]   font-manrope">

            {/* Rent / Sale Toggle Button - Left Aligned, Premium Look */}
                <div className="flex justify-start mb-10">
                    <div className="inline-flex bg-gray-100 rounded-2xl   border border-gray-200">

                        {/* For Rent Button */}
                        <button
                            onClick={() => setActiveTab("rent")}
                            className={`
          flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg
          transition-all duration-300 transform hover:scale-105
          ${activeTab === "rent"
                                    ? "bg-yellow-500 text-white shadow-xl"
                                    : "text-gray-600 hover:text-gray-900 bg-transparent"
                                }
        `}
                        >
                            For Rent
                            <span className={`
          ml-3 px-4 py-1.5 rounded-full text-sm font-bold
          ${activeTab === "rent" ? "bg-white text-yellow-600" : "bg-gray-300 text-gray-700"}
        `}>
                                {rentCount}
                            </span>
                        </button>

                        {/* For Sale Button */}
                        <button
                            onClick={() => setActiveTab("sale")}
                            className={`
          flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg
          transition-all duration-300 transform hover:scale-105
          ${activeTab === "sale"
                                    ? "bg-yellow-500 text-white shadow-xl"
                                    : "text-gray-600 hover:text-gray-900 bg-transparent"
                                }
        `}
                        >
                            For Sale
                            <span className={`
          ml-3 px-4 py-1.5 rounded-full text-sm font-bold
          ${activeTab === "sale" ? "bg-white text-yellow-600" : "bg-gray-300 text-gray-700"}
        `}>
                                {saleCount}
                            </span>
                        </button>

                    </div>
                </div>
           

            {/* Grid with EXACT SAME CARD you showed */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                {isLoading
                    ? [...Array(6)].map((_, i) => <PropertySkeleton key={i} />)
                    : filteredProperties.length === 0
                        ? (
                            <div className="col-span-full text-center py-20 text-gray-500">
                                <p className="text-2xl">
                                    No properties listed for <strong>{activeTab === "rent" ? "Rent" : "Sale"}</strong>
                                </p>
                            </div>
                        )
                        : filteredProperties.map((p) => (
                            <div
                                key={p._id}
                                onClick={() =>
                                    navigate("/addproperty-detail", {
                                        state: { propertyId: p._id }
                                    })
                                }
                                className="relative overflow-hidden rounded-xl group cursor-pointer shadow-lg hover:shadow-2xl transition-all"
                            >
                                {/* IMAGE */}
                                <img
                                    src={getFirstImage(p)}
                                    alt={p.title}
                                    className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                                />

                                {/* HOVER OVERLAY – EXACT SAME AS YOU WANTED */}
                                <div className="absolute inset-0 bg-black/50 flex items-end justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="text-white">
                                        <h3 className="text-lg font-semibold">
                                            {p.title || "Untitled Property"}
                                        </h3>
                                        <p className="text-sm mt-2 leading-tight">
                                            {p.description?.slice(0, 70) || p.location?.address || "No description"}...
                                        </p>

                                    </div>

                                    {/* Arrow Button */}
                                    <button className="bg-white text-black p-3 rounded-full hover:bg-yellow-500 transition">
                                        <GoArrowRight size={22} />
                                    </button>
                                </div>


                            </div>
                        ))}
            </div>
        </div>
    );
};

export default YourProperties;