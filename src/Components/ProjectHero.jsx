import React, { useState } from "react";
import project from "../../public/projecthero.webp";
import { IoSearchOutline } from "react-icons/io5";
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useGetTopProjectQuery } from "../redux/api/propertyFecthApi";

// Optional: Skeleton component while loading
const PropertySkeleton = () => (
    <div className="w-full h-72 bg-gray-200 animate-pulse rounded-xl"></div>
);

const ProjectHero = () => {
    const { data, isLoading } = useGetTopProjectQuery();
    const projects = data?.projects || [];

    const [city, setCity] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (!city.trim()) {
            alert("Please enter a city name");
            return;
        }
        navigate(`/project-search?city=${city}`);
    };

    return (
        <div className="w-full font-manrope">
            {/* Hero Section */}
            <div className="relative w-full h-[600px] sm:h-[500px] md:h-[700px] lg:h-[700px] overflow-hidden">
                {/* White base behind curve */}
                <div className="absolute inset-0 bg-white"></div>

                {/* Curved Image */}
                <div className="absolute inset-0 z-0 rounded-bl-[100px] overflow-hidden">
                    <img
                        src={project}
                        alt="Luxury Homes"
                        className="w-full h-full object-cover"
                    />
                    {/* Black overlay */}
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>

                {/* Gradient overlay with text */}
                <div className="absolute inset-0 rounded-bl-[100px] bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-center items-center text-center px-6">
                    <div className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight p-5 max-w-5xl">
                        <h1 className="mb-4">
                            <span className="italic font-playfair text-yellow-400 mr-4">
                                Discover
                            </span>
                            thoughtfully planned
                        </h1>
                        <h1 className="mb-3">homes crafted to elevate your</h1>
                        <span className="italic font-playfair text-yellow-400">lifestyle</span>
                    </div>

                    {/* Search Input */}
                    <div className="relative w-full mt-5 max-w-xs">
                        <input
                            type="text"
                            placeholder="Search By Location"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full px-6 py-4 pr-14 rounded-full bg-white backdrop-blur-sm text-gray-700 placeholder-gray-500 text-lg outline-none transition"
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-yellow-500 text-white rounded-full p-3 transition transform"
                            onClick={handleSearch}
                        >
                            <IoSearchOutline className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Intro Text and Featured Projects */}
            <div className="px-5 sm:px-5 md:px-8 lg:px-16">
                <div className="max-w-10xl mx-auto mt-10 flex flex-col md:flex-row justify-between items-start gap-10">
                    <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
                        We design spaces that inspire modern living. From luxury villas to
                        smart apartments, each project reflects exceptional craftsmanship,
                        prime location advantages, and future-ready amenities.
                    </p>

                    <h2 className="text-3xl md:text-4xl font-semibold whitespace-nowrap">
                        <span className="text-yellow-500 italic">Featured</span> Projects
                    </h2>
                </div>

                {/* Featured Projects Grid */}
                <div className="max-w-10xl mx-auto mt-12 pb-20">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                        {isLoading
                            ? [...Array(6)].map((_, index) => <PropertySkeleton key={index} />)
                            : projects.map((p) => (
                                <div
                                    key={p._id}
                                    onClick={() => navigate(`/project-detail/${p._id}`)}
                                    className="relative overflow-hidden rounded-xl group cursor-pointer"
                                >
                                    {/* Project Image */}
                                    <img
                                        src={p.Other_images?.[0] || "./gallery.jpg"}
                                        alt={p.Project_Name || p.category}
                                        className="w-full h-72 object-cover transition-transform group-hover:scale-105"
                                    />

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-black/50 flex items-end justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {/* Left: Project Name + Description */}
                                        <div className="flex flex-col max-w-[70%]">
                                            <h3 className="text-white text-lg font-semibold">
                                                {p.Project_Name || p.category}
                                            </h3>
                                            <p className="text-white text-sm mt-2 leading-tight break-words">
                                                {p.location?.city || p?.Desciption?.slice(0, 50)}...
                                            </p>
                                        </div>

                                        {/* Right: Arrow Button */}
                                        <button className="flex items-center justify-center bg-white text-black px-3 py-3 rounded-full">
                                            <GoArrowRight size={22} />
                                        </button>
                                    </div>

                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectHero;
