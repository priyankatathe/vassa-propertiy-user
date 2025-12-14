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
    const [showDocPreview, setShowDocPreview] = useState(false);


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
                propertyImages.push("/gallery.webp");
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
                            src={images[index] ?? "/gallery.webp"}
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
                            src={property.Other_images?.[1] || property.Other_images?.[0] || "/gallery.webp"}
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
                            {property.Launch_Date || "Untitled Project"}
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
                        {property?.pdf_doc && (
                            <div className="mt-6">
                                <button
                                    onClick={() => setShowDocPreview(true)}
                                    className="inline-flex items-center gap-3 bg-green-600 text-white px-6 py-3 rounded-full font-bold hover:bg-green-700"
                                >
                                    <FaFileAlt /> Preview Document
                                </button>

                                <a
                                    href={property.pdf_doc}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download
                                    className="inline-flex items-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 ml-4"
                                >
                                    <FaFileAlt /> Download
                                </a>
                            </div>
                        )}

                        {/* Full Screen Document Preview Modal */}
                        {showDocPreview && (
                            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                                <div className="bg-white rounded-xl w-[90%] h-[90%] p-4 relative">

                                    {/* Close Button */}
                                    <button
                                        onClick={() => setShowDocPreview(false)}
                                        className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded"
                                    >
                                        ✕
                                    </button>

                                    {/* Detect file type and preview accordingly */}
                                    {property.pdf_doc.match(/\.(jpg|jpeg|png|webp|gif)$/i) ? (
                                        // ---- IMAGE PREVIEW ----
                                        <img
                                            src={property.pdf_doc}
                                            className="w-full h-full object-contain rounded-lg"
                                            alt="Document Preview"
                                        />
                                    ) : (
                                        // ---- PDF / DOCX PREVIEW ----
                                        <iframe
                                            src={
                                                property.pdf_doc.endsWith(".pdf")
                                                    ? property.pdf_doc
                                                    : `https://docs.google.com/gview?url=${property.pdf_doc}&embedded=true`
                                            }
                                            className="w-full h-full rounded-lg"
                                            title="Document Preview"
                                        ></iframe>
                                    )}
                                </div>
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


















