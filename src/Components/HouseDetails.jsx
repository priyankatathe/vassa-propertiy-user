
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { IoArrowDownSharp } from "react-icons/io5";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { useAddEnquiryMutation, useGetPropertiesByIdQuery } from "../redux/api/propertyFecthApi";
import { useForm } from "react-hook-form";
import { FaHouse } from "react-icons/fa6";
import PropertiyOtherImg from "./PropertiyOtherImg";
import { useSelector } from "react-redux";

const HouseDetails = () => {
  const location = useLocation();
  const propertyId = location.state?.propertyId;
  const detailsRef = useRef(null);

  const { data: apiResponse, isLoading, error } = useGetPropertiesByIdQuery(propertyId, {
    skip: !propertyId
  });

  const [addEquiry] = useAddEnquiryMutation();
  const property = apiResponse?.data;

  const [images, setImages] = useState(["/1.png", "/3.png", "/2.png", "/10.png"]);
  const [categoryNames, setCategoryNames] = useState(["Villa", "Kitchen", "Bedroom", "Hall"]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (property) {
      const propertyImages = [];
      const categories = [];

      if (property.specifications?.mainImage) {
        propertyImages.push(property.specifications.mainImage);
        categories.push("Villa");
      }
      if (property.specifications?.kitchenImage) {
        propertyImages.push(property.specifications.kitchenImage);
        categories.push("Kitchen");
      }
      if (property.specifications?.bedroomImage) {
        propertyImages.push(property.specifications.bedroomImage);
        categories.push("Bedroom");
      }
      if (property.specifications?.hallImage) {
        propertyImages.push(property.specifications.hallImage);
        categories.push("Hall");
      }
      if (property.Other_images && property.Other_images.length > 0) {
        propertyImages.push(property.Other_images[0]);
        categories.push("Gallery");
      }

      setImages(propertyImages);
      setCategoryNames(categories);
    }
  }, [property]);

  const nextImage = () => setIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  const formatPrice = (price) => {
    if (!price) return "Price on request";
    if (price < 100000) return `₹${price.toLocaleString()}`; // show exact rupees
    const priceInLakhs = price / 100000;
    if (priceInLakhs >= 100) {
      const priceInCrores = priceInLakhs / 100;
      return `₹${priceInCrores.toFixed(2)} Cr`;
    }
    return `₹${priceInLakhs.toFixed(2)} L`; // optional: keep 2 decimal places
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


  const [carouselOpen, setCarouselOpen] = useState(false); // modal open/close
  const [carouselIndex, setCarouselIndex] = useState(0);   // modal में कौनसी image दिखानी है

  const openCarouselAt = (idx) => {
    setCarouselIndex(idx); // clicked image index
    setCarouselOpen(true); // modal open करें
  };

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
              src={images[index]}
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

            {/* MINI PREVIEW BOX */}
            <div
              className="absolute bottom-14 sm:bottom-16 md:bottom-[100px] z-20 bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl flex items-center px-1 py-1 border border-white transition-all duration-700 ease-in-out"
              style={{
                left: buttonRefs.current[index]
                  ? buttonRefs.current[index].offsetLeft +
                  buttonRefs.current[index].offsetWidth / 1.6 +
                  (window.innerWidth >= 768 ? 150 : 0) // md breakpoint ~768px
                  : "50%",
                transform: "translateX(-50%)"
              }}

            >
              <img
                src={images[index]}
                className="w-16 sm:w-20 md:w-28 h-10 sm:h-14 md:h-16 rounded-xl object-cover border border-white transition-all duration-300"
              />
            </div>

            {/* CATEGORY TABS */}
            <div className="absolute bottom-4 sm:bottom-5 md:bottom-10 left-2 md:left-40 flex flex-wrap gap-5 sm:gap-9 md:gap-10">
              {categoryNames.map((c, i) => (
                <button
                  key={i}
                  ref={(el) => (buttonRefs.current[i] = el)}
                  onClick={() => setIndex(i)}
                  className={`
            px-3 sm:px-4 md:px-6 py-1 sm:py-1.5 md:py-2 rounded-full text-xs sm:text-sm md:text-sm backdrop-blur-lg border transition
            ${index === i
                      ? "bg-white/70 text-black border-white shadow-md font-semibold"
                      : "bg-white/30 text-black border-transparent hover:bg-white/50"
                    }
          `}
                >
                  {c}
                </button>
              ))}
            </div>

          </div>

          {/* RIGHT SIDE SMALL IMAGES */}
          <div className="flex flex-col gap-4 w-full md:w-1/3 mt-4 md:mt-20">

            <img
              src={property.specifications?.hallImage || "/Rectangle 134.png"}
              className="rounded-xl shadow-md h-36 sm:h-44 md:h-[250px] object-cover transition-all duration-300"
            />

            {property.Other_images && property.Other_images.length > 0 && (
              <div
                className="relative cursor-pointer"
                onClick={() => openCarouselAt(0)}
              >
                <img
                  src={property.Other_images[0]}
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
              {property.title || `Luxury ${property.specifications?.bedrooms} BHK ${getPropertyTypeText(property.propertyType)}`}{" "}
              <span className="text-gray-500 text-sm sm:text-lg">
                ({property.location?.address}, {property.location?.city})
              </span>
            </h2>
            <p className="text-2xl sm:text-4xl mt-2 sm:mt-4 font-semibold text-black">
              {formatPrice(property.price)}
            </p>
          </div>
          <div
            onClick={() => detailsRef.current?.scrollIntoView({ behavior: "smooth" })}
            className="
    bg-yellow-400 
    w-28 h-9              /* Mobile small size */
    sm:w-32 sm:h-10       /* Tablet */
    md:w-36 md:h-10       /* Desktop normal size */

    flex items-center justify-center 
    gap-2 sm:gap-3 md:gap-5
    text-black 
    py-1 sm:py-2 md:py-3 
    rounded-full font-medium shadow-md 
    hover:bg-yellow-500 cursor-pointer transition
  "
          >
            <p className="m-0 text-xs sm:text-sm md:text-base">More Info</p>

            <div className="bg-white p-1 rounded-full flex items-center justify-center">
              <IoArrowDownSharp className="text-black" size={16} />
            </div>
          </div>

        </div>

        {/* DETAILS SECTION */}
        <div
          ref={detailsRef}
          className="flex flex-col md:flex-row items-start justify-between gap-6 md:gap-6 mt-6 md:mt-10 rounded-2xl"
        >
          {/* LEFT */}
          <div className="flex-1 space-y-4 md:space-y-6 bg-[#D9D9D940] w-full sm:w-0 rounded-lg p-4 md:p-5">
            <p className="border-b pb-4 md:pb-6 font-semibold border-[#D9D9D9] text-black">Property Description</p>
            <p className="text-sm sm:text-base leading-relaxed text-gray-700">
              {property.description || `Step into elegance with this beautifully designed ${property.specifications?.bedrooms} BHK ${getPropertyTypeText(property.propertyType)} located in ${property.location?.city}. The residence offers spacious interiors, premium finishes, and abundant natural light that enhances every corner.`}
            </p>

            <div>
              <p className="text-black pb-4 font-bold md:pb-6 border-b border-[#D9D9D9]">Property Features</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 text-sm mt-4 md:mt-16 text-gray-600">
                {[["Type:", getPropertyTypeText(property.propertyType)], ["Area:", `${property.specifications?.area || "N/A"} sqft`], ["Bedrooms:", property.specifications?.bedrooms || "N/A"], ["Bathrooms:", property.specifications?.bathrooms || "N/A"], ["Kitchen:", property.specifications?.kitchen || "N/A"], ["Hall:", property.specifications?.hall || "N/A"], ["Parking:", property.specifications?.parkingSpaces ? "Yes" : "No"], ["Furnishing:", property.specifications?.furnishingStatus || "N/A"]].map(([label, value], i) => (
                  <li key={i} className="flex items-center gap-3 bg-white rounded-full shadow-sm w-full md:w-56">
                    <div className="bg-[#851524] p-4 rounded-full">
                      <FaHouse size={20} color="yellow" />
                    </div>
                    <div>
                      <h1 className="text-black font-bold text-sm sm:text-base">{label}</h1>
                      <span className="text-xs sm:text-sm">{value}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
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
                className="w-full border border-gray-400 px-3 py-3 md:py-2 rounded-3xl mb-3"
                {...register("Name", { required: true })}
              />
              {errors.Name && <span className="text-red-500 text-xs sm:text-sm mb-3 block">Name is required</span>}

              {/* Email / Contact */}
              <label className="text-black text-sm mb-1 block">Email / Contact</label>

              <input
                type="text"
                placeholder="Email / Contact"
                className="w-full border border-gray-400 px-3 py-3 md:py-2 rounded-3xl mb-3"
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
                className="w-full border border-gray-400 px-3 py-3 md:py-2 rounded-3xl mb-3"
                {...register("message", { required: true })}
              />

              {/* Inquiry Type */}
              <label className="text-black text-sm mb-1 block">Inquiry Type</label>
              <select
                className="w-full border border-gray-400 px-3 py-3 md:py-2 rounded-3xl mb-4"
                {...register("inquire_type", { required: true })}
              >
                <option value="">Select type</option>
                <option value="Rent">Rent</option>
                <option value="Buy">Buy</option>
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

export default HouseDetails;
