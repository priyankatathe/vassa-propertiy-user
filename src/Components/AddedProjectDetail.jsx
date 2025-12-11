import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { IoArrowDownSharp } from "react-icons/io5";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { FaDollarSign, FaHouse, FaKey, FaRulerCombined } from "react-icons/fa6";
import PropertiyOtherImg from "./PropertiyOtherImg";
import { FaFileAlt, FaMapMarkerAlt, FaTools } from "react-icons/fa";
import { useGetProjectByIdQuery } from "../redux/api/projectApi";

const AddedProjectDetail = () => {
    const location = useLocation();
    const projectId = location.state?.projectId;
    const detailsRef = useRef(null);
    const { data: apiResponse, isLoading, error } = useGetProjectByIdQuery(projectId, {
        skip: !projectId
    });

    const property = apiResponse?.data;

    const [images, setImages] = useState([]);
    const [categoryNames, setCategoryNames] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (property) {
            const propertyImages = [];
            const categories = [];

            // Other images ko slider mein add karo
            if (property.Other_images && property.Other_images.length > 0) {
                property.Other_images.forEach((img, i) => {
                    propertyImages.push(img);
                    categories.push(i === 0 ? "Main View" : `Gallery ${i}`);
                });
            } else {
                propertyImages.push("/gallery.jpg");
                categories.push("Main View");
            }

            setImages(propertyImages);
            setCategoryNames(categories);
        }
    }, [property]);

    const nextImage = () => setIndex((prev) => (prev + 1) % images.length);
    const prevImage = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

    const [carouselOpen, setCarouselOpen] = useState(false);
    const [carouselIndex, setCarouselIndex] = useState(0);

    const openCarouselAt = (idx) => {
        setCarouselIndex(idx);
        setCarouselOpen(true);
    };

    // Address parsing
    const addressObj = property?.location || {};

    if (isLoading) {
        return (
            <div className="min-h-screen text-gray-800 font-sans">
                <div className="sticky top-0 bg-black mx-4 sm:mx-10 md:mx-10 my-4 md:my-8 rounded-xl z-50">
                    <Navbar />
                </div>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
                        <p className="text-gray-600 mt-4">Loading project details...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !property) {
        return (
            <div className="min-h-screen text-gray-800 font-sans">
                <div className="sticky top-0 bg-black mx-4 md:mx-10 my-4 md:my-8 rounded-xl z-50">
                    <Navbar />
                </div>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <p className="text-red-600 text-lg">{error ? "Error loading project details" : "Project not found"}</p>
                        {error && <p className="text-gray-600 mt-2">Please try again later</p>}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen text-gray-800 font-manrope mt-16 pb-10 px-4 md:px-8 lg:px-25">
            {/* Header */}
            <div className="sticky max-w-10xl top-0 bg-black mx-0 md:mx-10 my-4 md:my-8 rounded-xl z-50">
                <Navbar />
            </div>

            {/* Main Content */}
            <main className="mx-auto px-0 md:px-10 space-y-10">
                {/* IMAGE SECTION */}
                <div className="flex flex-col md:flex-row gap-6">
                    {/* LEFT MAIN SLIDER AREA */}
                    <div className="flex-1 relative mt-6 md:mt-20">
                        <img
                            src={images[index] ?? "/gallery.jpg"}
                            className="rounded-2xl shadow-lg w-full h-64 sm:h-96 md:h-[480px] object-cover transition-all duration-300"
                            alt="Project"
                        />
                        {/* ARROWS */}
                        <div className="absolute top-4 right-4 flex gap-2 md:gap-3 z-10">
                            <button
                                onClick={prevImage}
                                className="bg-white shadow-lg p-2 md:p-3 rounded-full hover:bg-gray-100 transition"
                            >
                                <MdArrowBack size={20} />
                            </button>
                            <button
                                onClick={nextImage}
                                className="bg-white shadow-lg p-2 md:p-3 rounded-full hover:bg-gray-100 transition"
                            >
                                <MdArrowForward size={20} />
                            </button>
                        </div>
                    </div>

                    {/* RIGHT SIDE SMALL IMAGES */}
                    <div className="flex flex-col gap-4 w-full md:w-1/3 mt-4 md:mt-20">
                        <img
                            src={property.Other_images?.[1] || property.Other_images?.[0] || "/gallery.jpg"}
                            className="rounded-xl shadow-md h-36 sm:h-44 md:h-[250px] object-cover transition-all duration-300"
                            alt="Secondary"
                        />
                        {property.Other_images && property.Other_images.length > 0 && (
                            <div
                                className="relative cursor-pointer"
                                onClick={() => openCarouselAt(0)}
                            >
                                <img
                                    src={property.Other_images[property.Other_images.length - 1]}
                                    className="rounded-xl w-full shadow-md h-32 sm:h-40 md:h-[210px] object-cover transition-all duration-300"
                                    alt="More"
                                />
                                <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center">
                                    <p className="text-white text-base sm:text-lg md:text-xl font-semibold">
                                        +{property.Other_images.length}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Carousel Modal */}
                    {carouselOpen && (
                        <PropertiyOtherImg
                            property={property}
                            startIndex={carouselIndex}
                            onClose={() => setCarouselOpen(false)}
                        />
                    )}
                </div>

                {/* Project Title & Info */}
                <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-10">
                    <div>
                        <h1 className="text-4xl md:text-3xl mb-2 font-bold text-gray-900">
                            {property.Project_Name || "Untitled Project"}
                        </h1>
                        <p className="text-lg md:text-xl font-bold text-gray-900">
                            {property.Launch_Date|| "Untitled Project"}
                        </p>
                        {/* <p className="text-lg text-gray-600 mt-2">
                            {addressObj.address || addressObj.area_Locality || "Location not available"}
                        </p> */}
                        {/* <p className="text-xl font-semibold text-gray-700 mt-2">
                            By {property.Developer_Name || "Developer"}
                        </p> */}
                    </div>
                    <div
                        onClick={() => detailsRef.current?.scrollIntoView({ behavior: "smooth" })}
                        className="bg-yellow-400 w-full md:w-36 h-10 flex items-center justify-center gap-4 md:gap-5 text-black py-2 md:py-3 rounded-full font-medium shadow-md hover:bg-yellow-500 cursor-pointer transition"
                    >
                        <p className="m-0 text-sm sm:text-base">More Info</p>
                        <div className="bg-white p-1 rounded-full flex items-center justify-center">
                            <IoArrowDownSharp size={18} />
                        </div>
                    </div>
                </div>

                {/* DETAILS SECTION */}
                <div ref={detailsRef} className="mt-6 md:mt-10 rounded-2xl">
                    <div className="bg-[#D9D9D940] rounded-lg p-4 md:p-5 space-y-6 md:space-y-8">
                        <p className="border-b pb-4 md:pb-4 font-semibold border-[#D9D9D9] text-black">
                            Project Description
                        </p>
                        <p className="text-sm sm:text-base leading-relaxed text-gray-700">
                            {property.Desciption || "No description available."}
                        </p>

                        {/* Basic Project Info */}
                        <div>
                            <p className="border-b pb-5 font-bold text-xl border-[#D9D9D9]">Project Overview</p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-3">
                                {[
                                    ["Transaction Type", property.Transaction_Type],
                                    ["Possession", property.Possession],
                                    ["Launch Date", property.Launch_Date],
                                    ["Completion Date", property.Completion_Date],
                                    ["RERA / HIRA Number", property.Rera_hira_Number],
                                    ["Locking Duration", property.Locking_Duration],
                                    ["Project Area", property.Project_Area],
                                    ["Open Space", property.Open_Space],
                                ].map(([label, value]) => value && (
                                    <li key={label} className="flex items-start gap-4 bg-white rounded-full shadow-sm py-2 px-3">
                                        <div className="bg-[#851524] p-3 rounded-full flex-shrink-0">
                                            <FaHouse size={20} color="yellow" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-black">{label}</span>
                                            <span className="text-sm text-gray-700">{value}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Location Details */}
                        <div>
                            <p className="border-b pb-5 font-bold text-xl border-[#D9D9D9]">Location Details</p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-3">
                                {Object.entries(addressObj).map(([key, value]) => {
                                    if (!value || key === "coordinates") return null;
                                    const label = key
                                        .replace(/_/g, " ")
                                        .replace(/\b\w/g, (l) => l.toUpperCase());
                                    return (
                                        <li key={key} className="flex items-start gap-4 bg-white rounded-full shadow-sm py-2 px-3">
                                            <div className="bg-[#851524] p-3 rounded-full flex-shrink-0">
                                                <FaMapMarkerAlt size={20} color="yellow" />
                                            </div>
                                            <div className="flex flex-col truncate">
                                                <span className="font-bold text-black text-sm">{label}</span>
                                                <span className="text-sm text-gray-700 truncate">{value}</span>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        {/* Amenities */}
                        {property.amenities && property.amenities.length > 0 && (
                            <div>
                                <p className="border-b pb-5 font-bold text-xl border-[#D9D9D9]">Amenities</p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-3">
                                    {property.amenities.map((amenity, i) => (
                                        <li key={i} className="flex items-start gap-4 bg-white rounded-full shadow-sm py-2 px-3">
                                            <div className="bg-[#851524] p-3 rounded-full">
                                                <FaTools size={20} color="yellow" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-black">Amenity</span>
                                                <span className="text-sm text-gray-700">{amenity}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Specification */}
                        {property.Specification && (
                            <div>
                                <p className="border-b pb-5 font-bold text-xl border-[#D9D9D9]">Specifications</p>
                                <p className="text-sm sm:text-base leading-relaxed text-gray-700 mt-4">
                                    {property.Specification}
                                </p>
                            </div>
                        )}

                        {/* Documents & Brochure */}
                        {property.pdf_doc && (
                            <div className="text-start">
                                <a
                                    href={property.pdf_doc}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition"
                                >
                                    <FaFileAlt /> Download Brochure / Documents
                                </a>
                            </div>
                        )}

                        {/* Video Links */}
                        {(property.Video_url || property.Virtual_video) && (
                            <div className="space-y-4">
                                <p className="border-b pb-5 font-bold text-xl border-[#D9D9D9]">Media</p>
                                <div className="flex flex-wrap gap-4">
                                    {property.Video_url && property.Video_url !== "reeeeee.com" && (
                                        <a
                                            href={property.Video_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="bg-red-600 text-white px-6 py-3 rounded-full font-medium hover:bg-red-700 transition"
                                        >
                                            Watch Project Video
                                        </a>
                                    )}
                                    {property.Virtual_video && property.Virtual_video !== "ddffffffff.com" && (
                                        <a
                                            href={property.Virtual_video}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="bg-purple-600 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-700 transition"
                                        >
                                            Virtual Tour
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AddedProjectDetail;





















// import React, { useState, useEffect, useRef, useMemo } from "react";
// import { useLocation } from "react-router-dom";
// import Navbar from "./Navbar";
// import { IoArrowDownSharp } from "react-icons/io5";
// import { MdArrowBack, MdArrowForward } from "react-icons/md";
// import PropertiyOtherImg from "./PropertiyOtherImg";
// import { useGetProjectByIdQuery } from "../redux/api/projectApi";
// import { FaFileAlt, FaMapMarkerAlt, FaTools } from "react-icons/fa";
// import { FaHouse } from "react-icons/fa6";

// const AddedProjectDetail = () => {
//     const location = useLocation();
//     const projectId = location.state?.projectId;
//     const detailsRef = useRef(null);
//     const { data: apiResponse, isLoading, error } = useGetProjectByIdQuery(projectId, {
//         skip: !projectId,
//     });

//     const property = apiResponse?.data;

//     const [index, setIndex] = useState(0);
//     const [carouselOpen, setCarouselOpen] = useState(false);
//     const [carouselIndex, setCarouselIndex] = useState(0);

//     // Safely build images array with fallbacks
//     const images = useMemo(() => {
//         if (!property?.Other_images || property.Other_images.length === 0) {
//             return [{ url: "/gallery.jpg", category: "Main View" }];
//         }

//         return property.Other_images.map((img, i) => ({
//             url: img,
//             category: i === 0 ? "Main View" : `Gallery ${i}`,
//         }));
//     }, [property?.Other_images]);

//     // Reset index when images change
//     useEffect(() => {
//         setIndex(0);
//     }, [images]);

//     const nextImage = () => setIndex((prev) => (prev + 1) % images.length);
//     const prevImage = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

//     const openCarouselAt = (idx) => {
//         setCarouselIndex(idx);
//         setCarouselOpen(true);
//     };

//     // Address parsing
//     const addressObj = property?.location || {};

//     // Loading State
//     if (isLoading) {
//         return (
//             <div className="min-h-screen text-gray-800 font-sans bg-gray-50">
//                 <div className="sticky top-0 z-50">
//                     <Navbar />
//                 </div>
//                 <div className="flex items-center justify-center min-h-screen">
//                     <div className="text-center">
//                         <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-yellow-500 mx-auto"></div>
//                         <p className="mt-6 text-xl text-gray-600">Loading project details...</p>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     // Error or Not Found
//     if (error || !property) {
//         return (
//             <div className="min-h-screen text-gray-800 font-sans bg-gray-50">
//                 <div className="sticky top-0 z-50">
//                     <Navbar />
//                 </div>
//                 <div className="flex items-center justify-center min-h-screen">
//                     <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
//                         <p className="text-2xl font-bold text-red-600">
//                             {error ? "Failed to load project" : "Project not found"}
//                         </p>
//                         <p className="text-gray-600 mt-4">Please check your connection or try again later.</p>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-50 text-gray-800 font-manrope">
//             {/* Navbar */}
//             <div className="sticky top-0 z-50 bg-white shadow-md">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <Navbar />
//                 </div>
//             </div>

//             <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-8 space-y-12">
//                 {/* Hero Image Section */}
//                 <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     {/* Main Large Image */}
//                     <div className="md:col-span-2 relative group">
//                         <img
//                             src={images[index]?.url || "/gallery.jpg"}
//                             alt={`Project view - ${images[index]?.category || "Main"}`}
//                             className="w-full h-96 md:h-full max-h-screen object-cover rounded-2xl shadow-xl transition-transform duration-500 group-hover:scale-[1.02]"
//                         />

//                         {/* Navigation Arrows */}
//                         {images.length > 1 && (
//                             <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
//                                 <button
//                                     onClick={prevImage}
//                                     className="bg-white/90 hover:bg-white shadow-lg p-3 rounded-full pointer-events-auto transition backdrop-blur-sm"
//                                     aria-label="Previous image"
//                                 >
//                                     <MdArrowBack size={28} />
//                                 </button>
//                                 <button
//                                     onClick={nextImage}
//                                     className="bg-white/90 hover:bg-white shadow-lg p-3 rounded-full pointer-events-auto transition backdrop-blur-sm"
//                                     aria-label="Next image"
//                                 >
//                                     <MdArrowForward size={28} />
//                                 </button>
//                             </div>
//                         )}

//                         {/* Image Counter */}
//                         {images.length > 1 && (
//                             <div className="absolute bottom-4 left-4 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur">
//                                 {index + 1} / {images.length}
//                             </div>
//                         )}
//                     </div>

//                     {/* Right Side Thumbnails */}
//                     <div className="space-y-4">
//                         {/* First secondary image */}
//                         {images[1] && (
//                             <img
//                                 src={images[1].url}
//                                 alt="Secondary view"
//                                 className="w-full h-48 object-cover rounded-xl shadow-md cursor-pointer hover:opacity-90 transition"
//                                 onClick={() => openCarouselAt(1)}
//                             />
//                         )}

//                         {/* "View All" overlay */}
//                         {images.length > 2 && (
//                             <div
//                                 className="relative h-48 cursor-pointer overflow-hidden rounded-xl shadow-md"
//                                 onClick={() => openCarouselAt(0)}
//                             >
//                                 <img
//                                     src={images[images.length - 1].url}
//                                     alt="More images"
//                                     className="w-full h-full object-cover brightness-75"
//                                 />
//                                 <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//                                     <p className="text-white text-3xl font-bold">+{images.length - 2}</p>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </section>

//                 {/* Title & CTA */}
//                 <section className="flex flex-col md:flex-row justify-between items-start gap-8">
//                     <div>
//                         <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
//                             {property.Project_Name || "Untitled Project"}
//                         </h1>
//                         <p className="text-xl text-gray-600 mt-3 flex items-center gap-2">
//                             <FaMapMarkerAlt className="text-red-600" />
//                             {addressObj.address || addressObj.area_Locality || "Location not specified"}
//                         </p>
//                         <p className="text-lg font-medium text-gray-700 mt-2">
//                             By <span className="font-bold">{property.Developer_Name || "Unknown Developer"}</span>
//                         </p>
//                     </div>

//                     <button
//                         onClick={() => detailsRef.current?.scrollIntoView({ behavior: "smooth" })}
//                         className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-full shadow-lg flex items-center gap-3 transition transform hover:scale-105"
//                     >
//                         View All Details
//                         <IoArrowDownSharp size={22} />
//                     </button>
//                 </section>

//                 {/* Details Section */}
//                 <section ref={detailsRef} className="bg-white rounded-3xl shadow-xl p-8 md:p-12 space-y-10">
//                     <div>
//                         <h2 className="text-2xl font-bold border-b-2 border-gray-200 pb-4">Project Description</h2>
//                         <p className="mt-6 text-gray-700 leading-relaxed text-base">
//                             {property.Description || property.Desciption || "No description available for this project."}
//                         </p>
//                     </div>

//                     {/* Project Overview */}
//                     <div>
//                         <h2 className="text-2xl font-bold border-b-2 border-gray-200 pb-4">Project Overview</h2>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
//                             {[
//                                 ["Transaction Type", property.Transaction_Type],
//                                 ["Possession", property.Possession],
//                                 ["Launch Date", property.Launch_Date],
//                                 ["Completion Date", property.Completion_Date],
//                                 ["RERA ID", property.Rera_hira_Number],
//                                 ["Lock-in Period", property.Locking_Duration],
//                                 ["Project Area", property.Project_Area],
//                                 ["Open Space", property.Open_Space],
//                             ].map(([label, value]) => value ? (
//                                 <div key={label} className="flex gap-4 bg-gradient-to-r from-yellow-50 to-white p-5 rounded-2xl shadow">
//                                     <div className="bg-red-900 p-3 rounded-full">
//                                         <FaHouse size={22} className="text-yellow-400" />
//                                     </div>
//                                     <div>
//                                         <p className="font-bold text-gray-800">{label}</p>
//                                         <p className="text-gray-600">{value}</p>
//                                     </div>
//                                 </div>
//                             ) : null)}
//                         </div>
//                     </div>

//                     {/* Location Details */}
//                     <div>
//                         <p className="border-b pb-5 font-bold text-xl border-[#D9D9D9]">Location Details</p>
//                         <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-3">
//                             {Object.entries(addressObj).map(([key, value]) => {
//                                 if (!value || key === "coordinates") return null;
//                                 const label = key
//                                     .replace(/_/g, " ")
//                                     .replace(/\b\w/g, (l) => l.toUpperCase());
//                                 return (
//                                     <li key={key} className="flex items-start gap-4 bg-white rounded-full shadow-sm py-2 px-3">
//                                         <div className="bg-[#851524] p-3 rounded-full flex-shrink-0">
//                                             <FaMapMarkerAlt size={20} color="yellow" />
//                                         </div>
//                                         <div className="flex flex-col truncate">
//                                             <span className="font-bold text-black text-sm">{label}</span>
//                                             <span className="text-sm text-gray-700 truncate">{value}</span>
//                                         </div>
//                                     </li>
//                                 );
//                             })}
//                         </ul>
//                     </div>

//                     {/* Amenities */}
//                     {property.amenities && property.amenities.length > 0 && (
//                         <div>
//                             <p className="border-b pb-5 font-bold text-xl border-[#D9D9D9]">Amenities</p>
//                             <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-3">
//                                 {property.amenities.map((amenity, i) => (
//                                     <li key={i} className="flex items-start gap-4 bg-white rounded-full shadow-sm py-2 px-3">
//                                         <div className="bg-[#851524] p-3 rounded-full">
//                                             <FaTools size={20} color="yellow" />
//                                         </div>
//                                         <div className="flex flex-col">
//                                             <span className="font-bold text-black">Amenity</span>
//                                             <span className="text-sm text-gray-700">{amenity}</span>
//                                         </div>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     )}

//                     {/* Media & Downloads */}
//                     <div className="flex flex-wrap gap-4">
//                         {property.pdf_doc && (
//                             <a
//                                 href={property.pdf_doc}
//                                 target="_blank"
//                                 rel="noreferrer"
//                                 className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full flex items-center gap-3 transition"
//                             >
//                                 <FaFileAlt /> Download Brochure
//                             </a>
//                         )}
//                         {property.Video_url && !property.Video_url.includes("reeeeee.com") && (
//                             <a href={property.Video_url} target="_blank" rel="noreferrer" className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full">
//                                 Watch Video
//                             </a>
//                         )}
//                         {property.Virtual_video && !property.Virtual_video.includes("ddffffffff.com") && (
//                             <a href={property.Virtual_video} target="_blank" rel="noreferrer" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-full">
//                                 360° Virtual Tour
//                             </a>
//                         )}
//                     </div>
//                 </section>
//             </main>

//             {/* Fullscreen Carousel Modal */}
//             {carouselOpen && (
//                 <PropertiyOtherImg
//                     property={property}
//                     startIndex={carouselIndex}
//                     onClose={() => setCarouselOpen(false)}
//                 />
//             )}
//         </div>
//     );
// };

// export default AddedProjectDetail;