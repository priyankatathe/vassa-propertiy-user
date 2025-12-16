import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { IoArrowDownSharp } from "react-icons/io5";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { useGetPropertiesByIdQuery } from "../redux/api/propertyFecthApi";
import { FaDollarSign, FaHouse, FaKey, FaRulerCombined } from "react-icons/fa6";
import PropertiyOtherImg from "./PropertiyOtherImg";
import { FaFileAlt, FaMapMarkerAlt, FaTools } from "react-icons/fa";

const AddedPropertyDetail = () => {
  const location = useLocation();
  const propertyId = location.state?.propertyId;
  const detailsRef = useRef(null);

  const { data: apiResponse, isLoading, error } = useGetPropertiesByIdQuery(propertyId, {
    skip: !propertyId
  });

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
    const p = String(price).trim();

    const lac = p.match(/([\d.]+)\s*Lac/i);
    const cr = p.match(/([\d.]+)\s*Cr/i);

    if (lac) return `₹${parseFloat(lac[1]).toFixed(1).replace(/\.0$/, '')} L`;
    if (cr) return `₹${parseFloat(cr[1]).toFixed(2).replace(/\.00$/, '')} Cr`;

    const num = parseFloat(p.replace(/[^0-9.]/g, ''));
    if (isNaN(num)) return `₹${p}`;

    if (num >= 10000000) return `₹${(num / 10000000).toFixed(2).replace(/\.00$/, '')} Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(1).replace(/\.0$/, '')} L`;
    if (num >= 1000) return `₹${(num / 1000).toFixed(1)} K`;
    return `₹${num.toLocaleString()}`;
  };




  const getPropertyTypeText = (propertyType) => propertyType || "Property";

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

  const [carouselOpen, setCarouselOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const openCarouselAt = (idx) => {
    setCarouselIndex(idx);
    setCarouselOpen(true);
  };

  // Safe JSON parser
  const parseJSON = (data, fallback = {}) => {
    if (!data) return fallback;
    if (typeof data === "object" && !Array.isArray(data)) return data;
    if (typeof data === "string") {
      try {
        return JSON.parse(data);
      } catch (err) {
        console.error("Invalid JSON received:", data);
        return fallback;
      }
    }
    return fallback;
  };

  const formatMonthsToYears = (value) => {
    if (!value) return "N/A";

    const months = parseInt(value); // "660 months" → 660
    if (isNaN(months)) return value;

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (remainingMonths === 0) {
      return `${years} years`;
    }

    return `${years} years ${remainingMonths} months`;
  };

  // Use it safely
  const address = parseJSON(property?.Address);
  const area = parseJSON(property?.Area);
  const features = parseJSON(property?.Feacture);
  const lease = parseJSON(property?.Lease_Rent);
  const pricing = parseJSON(property?.pricing);
  const amenities = Array.isArray(property?.Amential)
    ? property.Amential
    : parseJSON(property?.Amential, []);

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

            {/* Main Image */}
            <img
              src={images[index] ?? "/gallery.webp"}
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
            <h2 className="text-xl sm:text-2xl font-semibold">
              <h1 className="text-4xl md:text-2xl font-bold text-gray-900">
                {property.Bedroom} • {property.property_type}
              </h1>
            </h2>
            <p className="text-lg text-gray-600 mt-2">{address.locality}, {address.city} • {property.unique_feature}</p>
            <p className="text-3xl font-bold text-yellow-600 mt-3">
              {formatPrice(pricing.expected_price)}
            </p>

          </div>
          <div
            onClick={() => detailsRef.current?.scrollIntoView({ behavior: "smooth" })}
            className="bg-yellow-400 w-full md:w-36 h-10 flex items-center justify-center gap-4 md:gap-5 text-black py-2 md:py-3 rounded-full font-medium shadow-md hover:bg-yellow-500 cursor-pointer transition">
            <p className="m-0 text-sm sm:text-base">More Info</p>
            <div className="bg-white p-1 rounded-full flex items-center justify-center">
              <IoArrowDownSharp size={18} md:size={20} />
            </div>
          </div>
        </div>

        {/* DETAILS SECTION - FULL WIDTH (Contact form removed) */}
        <div ref={detailsRef} className="mt-6 md:mt-10 rounded-2xl">
          <div className="bg-[#D9D9D940] rounded-lg p-4 md:p-5 space-y-6 md:space-y-8">
            <p className="border-b pb-4 md:pb-4 font-semibold border-[#D9D9D9] text-black">
              Property Description
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-gray-700">
              {property.Description || `Step into elegance with this beautifully designed ${property.specifications?.bedrooms} BHK ${getPropertyTypeText(property.propertyType)} located in ${property.location?.city}. The residence offers spacious interiors, premium finishes, and abundant natural light that enhances every corner.`}
            </p>

            {/* Basic Details */}
            <div className="   ">
              <p className="border-b pb-5 font-bold text-xl border-[#D9D9D9]">Basic Information</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-3">
                {[
                  ["For", property.for],
                  ["Transaction", property.transaction],
                  ["Furnishing", property.Furnishing],
                  ["Ownership", property.ownerShip],
                  ["Unique Feature", property.unique_feature],
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

            {/* Area Details */}
            <div className="">
              <p className="border-b pb-5 font-bold text-xl border-[#D9D9D9]">Area Details</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-3">
                {Object.entries(area).map(([key, value]) => value && (
                  <li key={key} className="flex items-start gap-4 bg-white rounded-full shadow-sm py-2 px-3">
                    <div className="bg-[#851524] p-3 rounded-full flex-shrink-0">
                      <FaRulerCombined size={20} color="yellow" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-black">{key.replace(/_/g, " ")}</span>
                      <span className="text-sm text-gray-700">{value}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Property Features */}
            <div className="">
              <p className="border-b pb-5 font-bold text-xl border-[#D9D9D9]">Property Features</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-3">
                {Object.entries(features).map(([key, value]) => value && (
                  <li key={key} className="flex items-start gap-4 bg-white rounded-full shadow-sm py-2 px-3">
                    <div className="bg-[#851524] p-3 rounded-full flex-shrink-0">
                      <FaKey size={20} color="yellow" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-black">{key.replace(/_/g, " ")}</span>
                      <span className="text-sm text-gray-700">{value}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Lease & Pricing */}
            {/* Lease & Pricing Section – Ab Hamesha Dikhega Jab Pricing Ho */}
            {(property.for === "Lease" || pricing?.expected_price || pricing?.monthly_rent) && (
              <div className="">
                <p className="border-b pb-5 font-bold text-xl border-[#D9D9D9]">Lease Details</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-3">
                  {[
                    // ["Expected Price", formatPrice(pricing?.expected_price)],
                    ["Monthly Rent", formatPrice(lease?.monthly_rent)],
                    ["Security Deposit", formatPrice(lease?.security_deposit)],
                    ["Lock-in Period", formatMonthsToYears(lease.lock_in_period)],
                    ["Maintenance", lease?.maintenance || "N/A"],
                    ["Lease Period", lease?.lease_period || "N/A"],
                    ["Lease Hold Charges", formatPrice(lease.lease_hold_charges)],
                    ["Commission (Landlord)", formatPrice(lease.commission_landlord)],
                    ["Rent Free Days", lease.rent_free_days],
                    ["Rent Start Date", lease.rent_start_date],
                    ["MSEB Charges", formatPrice(lease.mseb_charges)],
                    ["Rent Escalation", lease.rent_escalation && `${lease.rent_escalation}%`],
                    ["Property Tax", formatPrice(lease.property_tax)],
                    ["ROI", lease.roi && `${lease.roi}%`],
                  ]
                    .filter(([_, value]) => value && value !== "N/A" && value !== "Not Included")
                    .map(([label, value]) => (
                      <li key={label} className="flex items-start gap-4 bg-white rounded-full shadow-sm py-2 px-3">
                        <div className="bg-[#851524] p-3 rounded-full flex-shrink-0">
                          <FaDollarSign size={20} color="yellow" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-black">{label}</span>
                          <span className="text-sm text-gray-700">{value}</span>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            )}

            {/* Sale Price – Hamesha dikhe jab expected_price ho */}
            {pricing?.expected_price && property.for !== "Lease" && (
              <div>
                <p className="border-b pb-5 font-bold text-xl border-[#D9D9D9]">
                  Price Details
                </p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-3">
                  {/* Expected Price */}
                  <li className="flex items-start gap-4 bg-white rounded-full shadow-sm py-2 px-3">
                    <div className="bg-[#851524] p-3 rounded-full flex-shrink-0">
                      <FaDollarSign size={20} color="yellow" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-black">Expected Price</span>
                      <span className="text-lg font-bold text-yellow-600">
                        {formatPrice(pricing.expected_price)}
                      </span>
                    </div>
                  </li>

                  {/* Price per sqft */}
                  {pricing.price_per_sqft && (
                    <li className="flex items-start gap-4 bg-white rounded-full shadow-sm py-2 px-3">
                      <div className="bg-[#851524] p-3 rounded-full flex-shrink-0">
                        <FaRulerCombined size={20} color="yellow" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-black">Price per sqft</span>
                        <span className="text-sm text-gray-700">
                          ₹{pricing.price_per_sqft}
                        </span>
                      </div>
                    </li>
                  )}

                  {/* JV Ratio */}
                  {pricing.jv_ratio && (
                    <li className="flex items-start gap-4 bg-white rounded-full shadow-sm py-2 px-3">
                      <div className="bg-[#851524] p-3 rounded-full flex-shrink-0">
                        <FaHouse size={20} color="yellow" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-black">JV Ratio</span>
                        <span className="text-sm text-gray-700">{pricing.jv_ratio} %</span>
                      </div>
                    </li>
                  )}

                  {/* ✅ Dynamic Checkboxes */}
                  {[
                    { key: "negotiable_applicable", label: "Negotiable" },
                    { key: "paid_by_licensor", label: "Paid by Licensor" },
                    { key: "negotiable", label: "Negotiable (Flag)" },
                    { key: "refundable", label: "Refundable" },
                  ]
                    .filter((item) => pricing[item.key]) // only selected
                    .map((item) => (
                      <li
                        key={item.key}
                        className="flex items-start gap-4 bg-white rounded-full shadow-sm py-2 px-3"
                      >
                        <div className="bg-[#851524] p-3 rounded-full flex-shrink-0">
                          <FaDollarSign size={20} color="yellow" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-black">{item.label}</span>
                          <span className="text-sm text-gray-700">
                            {Boolean(pricing[item.key]) ? "Yes" : "No"}
                          </span>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            )}



            {/* Address */}
            <div className="">
              <p className="border-b pb-5 font-bold text-xl border-[#D9D9D9]">Full Address</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-3">
                {Object.entries(address)
                  .filter(([k, v]) => v && k !== "lat" && k !== "lng" && k !== "building" && k !== "state")
                  .map(([key, value]) => (
                    <li key={key} className="flex items-start gap-4 bg-white rounded-full shadow-sm py-2 px-3 hover:shadow-md transition">
                      <div className="bg-[#851524] p-3 rounded-full flex-shrink-0">
                        <FaMapMarkerAlt size={20} color="yellow" />
                      </div>
                      <div className="flex flex-col truncate">
                        <span className="font-bold text-black text-sm">
                          {key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                        <span className="text-sm text-gray-700 truncate block">
                          {value}
                        </span>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Amenities */}
            {amenities.length > 0 && (
              <div className="">
                <p className="border-b pb-5 font-bold text-xl border-[#D9D9D9]">Amenities</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-3">
                  {amenities.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 bg-white rounded-full shadow-sm py-2 px-3">
                      <div className="bg-[#851524] p-3 rounded-full">
                        <FaTools size={20} color="yellow" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-black">Amenity</span>
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* {property?.Documents && (
  <div className="mt-6">
    <button
      onClick={() => setShowDocPreview(true)}
      className="inline-flex items-center gap-3 bg-green-600 text-white px-6 py-3 rounded-full font-bold hover:bg-green-700"
    >
      <FaFileAlt /> Preview Document
    </button>

    <a
      href={property.Documents}
      target="_blank"
      rel="noopener noreferrer"
      download
      className="inline-flex items-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 ml-4"
    >
      <FaFileAlt /> Download
    </a>
  </div>
)} */}

            {/* Full Screen Document Preview Modal */}
            {/* {showDocPreview && (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl w-[90%] h-[90%] p-4 relative">

      <button
        onClick={() => setShowDocPreview(false)}
        className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded"
      >
        ✕
      </button>

      {property.Documents.match(/\.(jpg|jpeg|png|webp|gif)$/i) ? (
        <img
          src={property.Documents}
          className="w-full h-full object-contain rounded-lg"
          alt="Document Preview"
        />
      ) : (
        <iframe
          src={
            property.Documents.endsWith(".pdf")
              ? property.Documents
              : `https://docs.google.com/gview?url=${property.Documents}&embedded=true`
          }
          className="w-full h-full rounded-lg"
          title="Document Preview"
        ></iframe>
      )}
    </div>
  </div>
)} */}


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
                      Watch Property Video
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

export default AddedPropertyDetail;






















