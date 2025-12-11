import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetProjectSearchQuery } from "../redux/api/propertyFecthApi";

const ProjectSearch = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const city = new URLSearchParams(search).get("city");

    const { data, isLoading } = useGetProjectSearchQuery({ city });

    // Navigate to details page
    const handlePropertyClick = (property) => {
        navigate(`/project-detail/${property._id}`, { state: property });
    };

    // Skeleton cards
    const SkeletonCard = () => (
        <div className="rounded-2xl overflow-hidden shadow-md animate-pulse">
            <div className="w-full h-72 bg-gray-300"></div>
            <div className="p-4">
                <div className="h-6 bg-gray-400 rounded mb-2"></div>
                <div className="h-4 bg-gray-400 rounded mb-1"></div>
                <div className="h-4 bg-gray-400 rounded"></div>
            </div>
        </div>
    );

    return (
        <div className="p-10 mt-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading
                    ? // Show 6 skeleton cards while loading
                    Array.from({ length: 6 }).map((_, idx) => <SkeletonCard key={idx} />)
                    : data?.data?.length > 0
                        ? data.data.map((property) => (
                            <div
                                key={property._id}
                                onClick={() => handlePropertyClick(property)}
                                className="cursor-pointer"
                            >
                                <div className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition">
                                    {/* IMAGE */}
                                    <img
                                        src={
                                            property.Other_images && property.Other_images.length > 0
                                                ? property.Other_images[0]
                                                : "/gallery.jpg"
                                        }
                                        className="w-full h-72 object-cover"
                                        alt="Property"
                                    />

                                    {/* OVERLAY */}
                                    <div
                                        className="absolute bottom-0 left-0 right-0 m-3 mb-6 
                                        bg-black/30 backdrop-blur-md 
                                        p-4 rounded-xl text-white"
                                    >
                                        <h3 className="text-lg font-semibold">
                                            {property.Project_Name}
                                        </h3>
                                        <p className="text-sm opacity-90 mt-1">
                                            {property.location?.address || property.address} ,{" "}
                                            {property.location?.city || property.address}
                                        </p>
                                        <p className="text-sm opacity-90 mt-1">
                                            Launch Date: {property.Launch_Date || "N/A"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                        : <p>No properties found.</p>}
            </div>
        </div>
    );
};

export default ProjectSearch;
