
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { IoArrowDownSharp } from "react-icons/io5";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { useAddEnquiryMutation } from "../redux/api/propertyFecthApi";
import { useForm } from "react-hook-form";
import { FaDollarSign, FaHouse, FaKey, FaRulerCombined } from "react-icons/fa6";
import PropertiyOtherImg from "./PropertiyOtherImg";
import { useSelector } from "react-redux";
import { FaFileAlt, FaMapMarkerAlt, FaTools } from "react-icons/fa";
import { useGetProjectByIdQuery } from "../redux/api/projectApi";

const ProjectsDetail = () => {
    const { id } = useParams()
    const propertyId = id;
    const detailsRef = useRef(null);

    const { data: apiResponse, isLoading, error } = useGetProjectByIdQuery(propertyId, {
        skip: !propertyId
    });

    const [addEquiry] = useAddEnquiryMutation();
    const property = apiResponse?.data;

    const [images, setImages] = useState(["/1.png", "/3.png", "/2.png", "/10.png"]);
    const [categoryNames, setCategoryNames] = useState(["Villa", "Kitchen", "Bedroom", "Hall"]);
    const [index, setIndex] = useState(0);
    const [showDocPreview, setShowDocPreview] = useState(false);

    useEffect(() => {
        if (property) {
            const propertyImages = [];
            const categories = [];

            // ⭐ ADD ALL OTHER_IMAGES IN SLIDER
            if (property.Other_images && property.Other_images.length > 0) {
                property.Other_images.forEach((img, i) => {
                    propertyImages.push(img);
                    categories.push(`Gallery ${i + 1}`);
                });
            }

            setImages(propertyImages);
            setCategoryNames(categories);
        }
    }, [property]);

    const nextImage = () => setIndex((prev) => (prev + 1) % images.length);
    const prevImage = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

    const formatPrice = (price) => {
        if (!price) return "Price on request";

        // Clean string and remove spaces
        let p = String(price).trim();

        // Handle "1 Lac", "2 Cr" format
        if (p.match(/(\d+)\s*Lac/i)) {
            const num = parseFloat(p);
            return `₹${num} L`;
        }

        if (p.match(/(\d+)\s*Cr/i)) {
            const num = parseFloat(p);
            return `₹${num} Cr`;
        }

        // If numeric string, convert to number
        let amount = Number(p);
        if (!isNaN(amount)) {
            // Assuming Lease fields are in Lakh by default
            if (amount >= 10000000) {
                let cr = amount / 10000000;
                cr = cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(2);
                return `₹${cr} Cr`;
            }
            if (amount >= 100000) {
                let l = amount / 100000;
                l = l % 1 === 0 ? l.toFixed(0) : l.toFixed(2);
                return `₹${l} L`;
            }
            if (amount >= 1000) {
                let k = amount / 1000;
                k = k % 1 === 0 ? k.toFixed(0) : k.toFixed(2);
                return `₹${k} K`;
            }
            return `₹${amount.toLocaleString()}`;
        }

        // Otherwise return original string
        return p;
    };



    const [miniBoxPosition, setMiniBoxPosition] = useState(0);
    const buttonRefs = useRef([]);
    const [buttonIndex, setButtonIndex] = useState(0);


    useEffect(() => {
        if (buttonRefs.current[index]) {
            const button = buttonRefs.current[index];
            const containerRect = button.parentElement.getBoundingClientRect();
            const buttonRect = button.getBoundingClientRect();
            const relativeLeft = buttonRect.left - containerRect.left;
            const buttonCenter = relativeLeft + buttonRect.width / 2;
            setMiniBoxPosition(buttonCenter);
        }
    }, [index, categoryNames]);

    useEffect(() => {
        const btnIndex = Math.min(index, categoryNames.length - 1);
        setButtonIndex(btnIndex);
    }, [index, categoryNames]);


    const [carouselOpen, setCarouselOpen] = useState(false); // modal open/close
    const [carouselIndex, setCarouselIndex] = useState(0);   // modal में कौनसी image दिखानी है

    const openCarouselAt = (idx) => {
        setCarouselIndex(idx); // clicked image index
        setCarouselOpen(true); // modal open करें
    };
    const addressObj = property?.location || {};



    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const validateEmailOrPhone = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;

        if (emailRegex.test(value) || phoneRegex.test(value)) {
            return true;
        }
        return "Please enter a valid Email or 10-digit Contact Number";
    };

    const user = useSelector(state => state.auth.user)
    const onSubmit = async (data) => {
        if (!user) {
            alert("Please login ");
            // navigate("/login");
            return;
        }
        if (!propertyId) return;
        try {
            await addEquiry({
                propertyId,
                Name: data.Name,
                email_contact: data.email_contact,
                message: data.message,
                inquire_type: data.inquire_type
            }).unwrap();

            alert("Enquiry sent successfully!");
            reset();
        } catch (err) {
            console.error(err);
            alert("Something went wrong!");
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen text-gray-800 font-sans">
                <div className="sticky top-0 bg-black mx-4 sm:mx-10 md:mx-10 my-4 md:my-8 rounded-xl z-50">
                    <Navbar />
                </div>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
                        <p className="text-gray-600 mt-4">Loading property details...</p>
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
                        <p className="text-red-600 text-lg">{error ? "Error loading property details" : "Property not found"}</p>
                        {error && <p className="text-gray-600 mt-2">Please try again later</p>}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen text-gray-800 font-manrope mt-16  pb-10 px-4 md:px-8 lg:px-25">
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

                        {/* Main Image */}
                        <img
                            src={images[index] ?? "/gallery.wepb"}
                            className="rounded-2xl shadow-lg w-full h-64 sm:h-96 md:h-[480px] object-cover transition-all duration-300"
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
                        {/* RIGHT SIDE SMALL IMAGE */}
                        <img
                            src={
                                property.Other_images?.length > 0
                                    ? property.Other_images[property.Other_images.length === 1 ? 0 : 1]
                                    : property.specifications?.hallImage || "/gallery.webp"
                            }
                            className="rounded-xl shadow-md h-36 sm:h-44 md:h-[250px] object-cover transition-all duration-300"
                        />

                        {property.Other_images && (
                            <div
                                className="relative cursor-pointer"
                                onClick={() => openCarouselAt(0)}
                            >
                                <img
                                    src={
                                        property.Other_images.length === 0
                                            ? "/gallery.webp"                                           // zero → show fallback
                                            : property.Other_images.length === 1
                                                ? property.Other_images[0]                               // one → show first
                                                : property.Other_images[property.Other_images.length - 1] // many → show last
                                    }
                                    className="rounded-xl w-full shadow-md h-32 sm:h-40 md:h-[210px] object-cover transition-all duration-300"
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

                {/* Property Info */}
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
                <div
                    ref={detailsRef}
                    className="flex flex-col md:flex-row items-start justify-between gap-6 md:gap-6 mt-6 md:mt-10 rounded-2xl"
                >

                    <div className="flex-1 space-y-4 md:space-y-6 bg-[#D9D9D940] w-full sm:w-0 rounded-lg p-4 md:p-5">
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


                        {/* Media Section */}
                        {(property.Video_url || property.Virtual_video) && (
                            <div className="space-y-4">
                                <p className="border-b pb-5 font-bold text-xl border-[#D9D9D9]">Media</p>
                                <div className="flex flex-wrap gap-4">

                                    {/* Project Video */}
                                    {property.Video_url && property.Video_url !== "reeeeee.com" && (
                                        <a
                                            href={
                                                property.Video_url.includes("youtube.com") ||
                                                    property.Video_url.includes("youtu.be")
                                                    ? property.Video_url // open YouTube
                                                    : property.Video_url // open any other site
                                            }
                                            target="_blank"
                                            rel="noreferrer"
                                            className="bg-red-600 text-white px-6 py-3 rounded-full font-medium hover:bg-red-700 transition"
                                        >
                                            Watch Project Video
                                        </a>
                                    )}

                                    {/* Virtual Tour */}
                                    {property.Virtual_video && property.Virtual_video !== "ddffffffff.com" && (
                                        <a
                                            href={
                                                property.Virtual_video.includes("youtube.com") ||
                                                    property.Virtual_video.includes("youtu.be")
                                                    ? property.Virtual_video
                                                    : property.Virtual_video
                                            }
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

                    {/* CONTACT FORM */}
                    <div className="w-full md:w-1/3 flex flex-col">
                        <form className="w-full flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                            <h3 className="text-md sm:text-lg font-semibold text-gray-800 mb-4">Contact Our Team</h3>

                            {/* Name */}
                            <label className="text-black text-sm mb-1 block">Name</label>
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full border border-gray-400 px-4 py-3 md:py-2 rounded-3xl mb-3"
                                {...register("Name", { required: true })}
                            />
                            {errors.Name && <span className="text-red-500 text-xs sm:text-sm mb-3 block">Name is required</span>}

                            {/* Email / Contact */}
                            <label className="text-black text-sm mb-1 block">Email / Contact</label>

                            <input
                                type="text"
                                placeholder="Email / Contact"
                                className="w-full border border-gray-400 px-4 py-3 md:py-2 rounded-3xl mb-3"
                                {...register("email_contact", {
                                    required: "Email or Contact Number is required",
                                    validate: validateEmailOrPhone,
                                })}
                            />

                            {errors.email_contact && (
                                <span className="text-red-500 text-xs sm:text-sm mb-3 block">
                                    {errors.email_contact.message}
                                </span>
                            )}


                            {/* Message */}
                            <label className="text-black text-sm mb-1 block">Message</label>
                            <textarea
                                rows={3}
                                placeholder="Enter your message"
                                className="w-full border border-gray-400 px-4 py-3 md:py-2 rounded-3xl mb-3"
                                {...register("message", { required: true })}
                            />

                            {/* Inquiry Type */}
                            <label className="text-black text-sm mb-1 block">Inquiry Type</label>
                            <select
                                className="w-full border border-gray-400 px-4 py-3 md:py-2 rounded-3xl mb-4"
                                {...register("inquire_type", { required: true })}
                            >
                                <option value="">Select type</option>
                                <option value="project">Project</option>
                            </select>

                            <button
                                type="submit"
                                className="bg-[#F8CA13] text-black font-semibold px-4 md:px-6 py-2 md:py-3 rounded-3xl w-full hover:bg-yellow-500 transition text-sm sm:text-base"
                            >
                                Contact
                            </button>
                        </form>
                    </div>
                </div>
            </main>



        </div>
    );
};

export default ProjectsDetail;
