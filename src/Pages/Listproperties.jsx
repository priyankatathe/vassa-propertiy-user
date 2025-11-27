
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Components/Navbar";
import { LuUpload, LuX } from "react-icons/lu";
import { IoIosArrowRoundDown } from "react-icons/io";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAddPropertiesMutation } from "../redux/api/listPropertiApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Corrected Schema (otherImage duplicate removed + proper mixed/array)
const schema = yup.object({
  title: yup.string().required("Property Title is required"),
  type: yup.string().required("Property Type is required"),
  price: yup.string().required("Price is required"),
  bedrooms: yup.string().required("Number of Bedrooms is required"),
  size: yup.string().required("Property Size is required"),
  bathrooms: yup.string().required("Number of Bathrooms is required"),
  city: yup.string().required("City is required"),
  area: yup.string().required("Area is required"),
  address: yup.string().required("Full Address is required"),
  furnishingStatus: yup
    .string()
    .oneOf(["Furnished", "Semi-Furnished", "Unfurnished"])
    .required("Furnishing Status is required"),
  listingType: yup
    .string()
    .oneOf(["Sale", "Rent"])
    .required("Listing Type is required"),
  amenities: yup
    .object()
    .test("at-least-one", "Select at least one amenity", (value) =>
      Object.values(value || {}).some(v => v === true)
    ),
  state: yup.string().required("State is required"),
  pincode: yup
    .string()
    .length(6, "Pincode must be 6 digits")
    .required("Pincode is required"),
  description: yup
    .string()
    .min(10, "Description too short")
    .required("Description is required"),
  ownerName: yup.string().required("Owner Name is required"),
  ownerEmail: yup.string().email("Invalid email").required("Email is required"),
  ownerPhone: yup
    .string()
    .matches(/^\d{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),

  // Images - using mixed() for file inputs
  bedroomImage: yup.mixed().required("Bedroom image is required"),
  hallImage: yup.mixed().required("Hall image is required"),
  kitchenImage: yup.mixed().required("Kitchen image is required"),
  otherImage: yup
    .mixed()
    .test("fileList", "At least one other image required", (value) => {
      return value && value.length > 0;
    }),
});

const steps = [
  "Basic Information",
  "Location Details",
  "Description",
  "Amenities",
  "Images",
  "Owner Info"
];

const ListProperty = () => {

  const [currentStep, setCurrentStep] = useState(0);
  const [addProperties, { isLoading, isError, error }] = useAddPropertiesMutation();

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  // Image States
  const [bedroomPreview, setBedroomPreview] = useState(null);
  const [hallPreview, setHallPreview] = useState(null);
  const [kitchenPreview, setKitchenPreview] = useState(null);
  const [othersPreview, setOthersPreview] = useState([]);

  const [bedroomFile, setBedroomFile] = useState(null);
  const [hallFile, setHallFile] = useState(null);
  const [kitchenFile, setKitchenFile] = useState(null);
  const [otherFile, setOtherFile] = useState([]);

  const formRef = useRef(null);
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth" });

  // Validation + Next Step
  const handleNext = async () => {
    let fields = [];
    if (currentStep === 0) fields = ["title", "type", "price", "bedrooms", "size", "bathrooms", "furnishingStatus", "listingType"];
    if (currentStep === 1) fields = ["city", "area", "state", "pincode", "address"];
    if (currentStep === 2) fields = ["description"];
    if (currentStep === 3) fields = ["amenities"];
    if (currentStep === 4) fields = ["bedroomImage", "hallImage", "kitchenImage", "otherImage"];
    if (currentStep === 5) fields = ["ownerName", "ownerEmail", "ownerPhone"];

    const result = await trigger(fields);
    if (result && currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => currentStep > 0 && setCurrentStep(prev => prev - 1);

  // Image Handlers
  const handleImageChange = (e, setPreview, setFile, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setValue(fieldName, file, { shouldValidate: true });
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleMultipleImages = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newPreviews = files.map((file) => URL.createObjectURL(file));

    // Update state
    setOthersPreview((prev) => [...prev, ...newPreviews]);
    setOtherFile((prev) => [...prev, ...files]);

    // Correctly set value in RHF
    const updatedFiles = [...otherFile, ...files];
    setValue("otherImage", updatedFiles, { shouldValidate: true });

    e.target.value = null; // reset input
  };

  const removeOtherImage = (index) => {
    const updatedFiles = otherFile.filter((_, i) => i !== index);
    const updatedPreviews = othersPreview.filter((_, i) => i !== index);

    setOtherFile(updatedFiles);
    setOthersPreview(updatedPreviews);
    setValue("otherImage", updatedFiles, { shouldValidate: true });
  };

  const removeImage = (setPreview, setFile, fieldName) => {
    setPreview(null);
    setFile(null);
    setValue(fieldName, null, { shouldValidate: true });
  };
  // ListProperty component च्या बाहेर किंवा onSubmit च्या आत हे टाका
  const getUserId = () => {
    const userData = localStorage.getItem("user");

    if (!userData) return null;

    try {
      const parsed = JSON.parse(userData);

      // Case 1: { data: { _id: ... } } → तुझ्या current backend चा format
      if (parsed?.data?._id) return parsed.data._id;

      // Case 2: { user: { _id: ... } } → खूप common format
      if (parsed?.user?._id) return parsed.user._id;

      // Case 3: direct user object → { _id: ..., name: ... }
      if (parsed?._id) return parsed._id;

      return null;
    } catch (e) {
      console.error("Error parsing user from localStorage", e);
      return null;
    }
  };
  // const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"));

  const onSubmit = async (data) => {
    const userId = getUserId()
    if (!userId) {
      alert("Please login first to add a property!");
      // navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("propertyType", data.type);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("listingType", data.listingType);

    const amenitiesObj = {
      parking: data.amenities?.parking || false,
      lift: data.amenities?.lift || false,
      security: data.amenities?.security || false,
      waterSupply: data.amenities?.waterSupply || false,
      gym: data.amenities?.gym || false,
      swimmingPool: data.amenities?.swimmingPool || false,
    };
    formData.append("amenities", JSON.stringify(amenitiesObj));

    formData.append("location", JSON.stringify({
      address: data.address,
      city: data.city,
      state: data.state,
      zipCode: data.pincode,
      country: "India",
      coordinates: { lat: 18.5204, lng: 73.8567 }
    }));

    formData.append("specifications", JSON.stringify({
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      area: data.size,
      hall: 1,
      kitchen: 1,
      parkingSpaces: 1,
      floors: 1,
      furnishingStatus: data.furnishingStatus,
    }));

    formData.append("owner", JSON.stringify({
      name: data.ownerName || "",
      email: data.ownerEmail,
      phone: data.ownerPhone,
    }));

    if (bedroomFile) formData.append("bedroomImage", bedroomFile);
    if (hallFile) formData.append("hallImage", hallFile);
    if (kitchenFile) formData.append("kitchenImage", kitchenFile);
    if (otherFile.length > 0) {
      otherFile.forEach(file => formData.append("Other_images", file));
    }

    try {
      await addProperties(formData).unwrap();
      alert("Property added successfully!");
      reset();
      setCurrentStep(0);
      setBedroomPreview(null); setHallPreview(null); setKitchenPreview(null); setOthersPreview([]);
      setBedroomFile(null); setHallFile(null); setKitchenFile(null); setOtherFile([]);
    } catch (err) {
      alert("Failed to add property!");
    }
  };

  return (
    <section
      className="relative bg-cover bg-center  bg-no-repeat min-h-screen py-12 px-4 sm:px-6 lg:px-16 font-manrope"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/propbg.webp')`,
      }}
    >
      <Navbar />

      {/* Hero */}
      <div className="text-center mt-20 ">
        <h1 className="px-6 py-2 bg-[#F8CA13] text-white font-bold rounded-full text-lg inline-block">List Your Property</h1>
        <h1 className="text-3xl sm:text-5xl text-[#F8CA13] font-semibold mt-6">
          <span className="font-playfair">Sell or Rent</span>
          <span className="text-white italic"> Your Property <br /> with Confidence</span>
        </h1>
        <div className="flex justify-center mt-10">
          <button onClick={scrollToForm} className="w-12 h-12 text-white rounded-full bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center text-3xl">
            <IoIosArrowRoundDown />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-5xl mx-auto mt-10  flex justify-center">
        <div className="flex items-center gap-4">
          {steps.map((step, i) => (
            <React.Fragment key={i}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${i <= currentStep ? 'bg-yellow-500' : 'bg-gray-400'}`}>
                {i + 1}
              </div>
              {i < steps.length - 1 && <div className={`w-24 h-1 ${i < currentStep ? 'bg-yellow-500' : 'bg-gray-400'}`} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Form */}
      <div ref={formRef} className="max-w-5xl lg:py-10 mx-auto mt-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

          {/* ==================== STEP 1: Basic Info ==================== */}
          {currentStep === 0 && (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6">Basic Information</h2>
                {/* ← आपका पूरा Basic Info grid यहाँ → */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { name: "title", placeholder: "Property Title" },
                    { name: "type", placeholder: "Property Type", options: ["Apartment", "Villa", "House", "Commercial", "Land", "Office"] },
                    { name: "price", placeholder: "Price" },
                    { name: "bedrooms", placeholder: "Number of Bedrooms" },
                    { name: "size", placeholder: "Property Size in Sq.ft" },
                    { name: "bathrooms", placeholder: "Number of Bathrooms" },
                    { name: "furnishingStatus", placeholder: "Furnishing Status", options: ["Furnished", "Semi-Furnished", "Unfurnished"] },
                    { name: "listingType", placeholder: "Listing Type", options: ["Sale", "Rent"] },
                  ].map((field) => (
                    <div key={field.name}>
                      {field.options ? (
                        <select
                          {...register(field.name)}
                          className={`w-full px-4 py-2 rounded-lg border-2 transition-all focus:outline-none focus:ring-4 ${errors[field.name] ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:border-green-500 focus:ring-green-300"
                            }`}
                        >
                          <option value="">{field.placeholder}</option>
                          {field.options.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          {...register(field.name)}
                          placeholder={field.placeholder}
                          className={`w-full px-4 py-2 rounded-lg border-2 transition-all focus:outline-none focus:ring-4 ${errors[field.name] ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:border-green-500 focus:ring-green-300"
                            }`}
                        />
                      )}
                      {errors[field.name] && <p className="text-red-600 text-sm mt-1">{errors[field.name]?.message}</p>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Buttons inside the same card */}
              <div className="bg-gray-50 px-8 py-5 flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-full"
                >
                  Next
                </button>
              </div>
            </div>
          )}


          {/* ==================== STEP 2: Location ==================== */}
          {currentStep === 1 && (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6">Location Details</h2>
                {/* ← आपका पूरा Location grid यहाँ → */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {["city", "area", "state", "pincode"].map((field, index) => (
                    <div key={field} className={index === 3 ? "sm:col-span-1" : ""}>
                      <input
                        {...register(field)}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        className={`w-full px-4 py-2 rounded-lg border-2 transition-all focus:outline-none focus:ring-4 ${errors[field] ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:border-green-500 focus:ring-green-300"
                          }`}
                      />
                      {errors[field] && <p className="text-red-600 text-sm mt-1">{errors[field].message}</p>}
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <input
                      {...register("address")}
                      placeholder="Full Address"
                      className={`w-full px-4 py-2 rounded-lg border-2 transition-all focus:outline-none focus:ring-4 ${errors.address ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:border-green-500 focus:ring-green-300"
                        }`}
                    />
                    {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-8 py-5 flex justify-between">
                <button type="button" onClick={handlePrev} className="px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-full">
                  Previous
                </button>
                <button type="button" onClick={handleNext} className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-full">
                  Next
                </button>
              </div>
            </div>
          )}


          {/* ==================== STEP 3: Description ==================== */}
          {currentStep === 2 && (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-4">Property Description</h2>
                <textarea
                  {...register("description")}
                  placeholder="Write about your property..."
                  className={`w-full h-32 px-4 py-2 rounded-lg border-2 transition-all resize-none focus:outline-none focus:ring-4 ${errors.description ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:border-green-500 focus:ring-green-300"
                    }`}
                />
                {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>}
              </div>

              <div className="bg-gray-50 px-8 py-5 flex justify-between">
                <button type="button" onClick={handlePrev} className="px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-full">
                  Previous
                </button>
                <button type="button" onClick={handleNext} className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-full">
                  Next
                </button>
              </div>
            </div>
          )}


          {/* ==================== STEP 4: Amenities ==================== */}
          {currentStep === 3 && (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                  {[
                    { key: "parking", label: "Parking" },
                    { key: "lift", label: "Lift" },
                    { key: "security", label: "Security" },
                    { key: "waterSupply", label: "Water Supply" },
                    { key: "gym", label: "Gym" },
                    { key: "swimmingPool", label: "Swimming Pool" },
                  ].map((item) => (
                    <label key={item.key} className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" {...register(`amenities.${item.key}`)} className="w-6 h-6 rounded accent-yellow-500" />
                      <span className="text-gray-700">{item.label}</span>
                    </label>
                  ))}
                </div>
                {errors.amenities && <p className="text-red-500 text-sm mt-2">{errors.amenities.message}</p>}
              </div>

              <div className="bg-gray-50 px-8 py-5 flex justify-between">
                <button type="button" onClick={handlePrev} className="px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-full">
                  Previous
                </button>
                <button type="button" onClick={handleNext} className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-full">
                  Next
                </button>
              </div>
            </div>
          )}


          {/* ==================== STEP 5: Images ==================== */}
          {currentStep === 4 && (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-white rounded-2xl  p-8">
                <h1 className="text-2xl font-bold mb-10">Property Images (Required)</h1>

                {/* 3 Images Side by Side */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">

                  {/* Bedroom */}
                  <div>
                    <h2 className="text-lg font-medium mb-4">Bedroom Image *</h2>
                    <label
                      className={`relative block w-full h-64 border-2 rounded-xl cursor-pointer overflow-hidden transition-all bg-gray-50 hover:border-yellow-400 ${errors.bedroomImage
                        ? "border-red-500"
                        : bedroomPreview
                          ? "border-green-500"
                          : "border-dashed border-gray-300"
                        }`}
                    >
                      {bedroomPreview ? (
                        <div className="relative w-full h-full">
                          <img
                            src={bedroomPreview}
                            alt="Bedroom"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              removeImage(setBedroomPreview, setBedroomFile, "bedroomImage")
                            }
                            className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-gray-100"
                          >
                            <LuX className="w-6 h-6 text-red-600" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center px-6">
                          <LuUpload className="w-14 h-14 text-gray-400 mb-4" />
                          <p className="text-gray-600 font-medium">Drop Bedroom Photo Here</p>
                          <p className="text-sm text-gray-500 mt-1">
                            or{" "}
                            <span className="text-yellow-600 underline font-medium">
                              Select from device
                            </span>
                          </p>
                        </div>
                      )}

                      <input
                        type="file"
                        accept="image/*"
                        name="bedroomImage"
                        {...register("bedroomImage")}
                        onChange={(e) =>
                          handleImageChange(e, setBedroomPreview, setBedroomFile)
                        }
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </label>
                    {errors.bedroomImage && (
                      <p className="text-red-600 text-sm mt-2">
                        {errors.bedroomImage.message}
                      </p>
                    )}
                  </div>

                  {/* Hall */}
                  <div>
                    <h2 className="text-lg font-medium mb-4">Hall Image *</h2>
                    <label
                      className={`relative block w-full h-64 border-2 rounded-xl cursor-pointer overflow-hidden transition-all bg-gray-50 hover:border-yellow-400 ${errors.hallImage
                        ? "border-red-500"
                        : hallPreview
                          ? "border-green-500"
                          : "border-dashed border-gray-300"
                        }`}
                    >
                      {hallPreview ? (
                        <div className="relative w-full h-full">
                          <img
                            src={hallPreview}
                            alt="Hall"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              removeImage(setHallPreview, setHallFile, "hallImage")
                            }
                            className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-gray-100"
                          >
                            <LuX className="w-6 h-6 text-red-600" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center px-6">
                          <LuUpload className="w-14 h-14 text-gray-400 mb-4" />
                          <p className="text-gray-600 font-medium">Drop Hall Photo Here</p>
                          <p className="text-sm text-gray-500 mt-1">
                            or{" "}
                            <span className="text-yellow-600 underline font-medium">
                              Select from device
                            </span>
                          </p>
                        </div>
                      )}

                      <input
                        type="file"
                        accept="image/*"
                        name="hallImage"
                        {...register("hallImage")}
                        onChange={(e) => handleImageChange(e, setHallPreview, setHallFile)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </label>
                    {errors.hallImage && (
                      <p className="text-red-600 text-sm mt-2">
                        {errors.hallImage.message}
                      </p>
                    )}
                  </div>

                  {/* Kitchen */}
                  <div>
                    <h2 className="text-lg font-medium mb-4">Kitchen Image *</h2>
                    <label
                      className={`relative block w-full h-64 border-2 rounded-xl cursor-pointer overflow-hidden transition-all bg-gray-50 hover:border-yellow-400 ${errors.kitchenImage
                        ? "border-red-500"
                        : kitchenPreview
                          ? "border-green-500"
                          : "border-dashed border-gray-300"
                        }`}
                    >
                      {kitchenPreview ? (
                        <div className="relative w-full h-full">
                          <img
                            src={kitchenPreview}
                            alt="Kitchen"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              removeImage(setKitchenPreview, setKitchenFile, "kitchenImage")
                            }
                            className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-gray-100"
                          >
                            <LuX className="w-6 h-6 text-red-600" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center px-6">
                          <LuUpload className="w-14 h-14 text-gray-400 mb-4" />
                          <p className="text-gray-600 font-medium">Drop Kitchen Photo Here</p>
                          <p className="text-sm text-gray-500 mt-1">
                            or{" "}
                            <span className="text-yellow-600 underline font-medium">
                              Select from device
                            </span>
                          </p>
                        </div>
                      )}

                      <input
                        type="file"
                        accept="image/*"
                        name="kitchenImage"
                        {...register("kitchenImage")}
                        onChange={(e) =>
                          handleImageChange(e, setKitchenPreview, setKitchenFile)
                        }
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </label>
                    {errors.kitchenImage && (
                      <p className="text-red-600 text-sm mt-2">
                        {errors.kitchenImage.message}
                      </p>
                    )}
                  </div>

                </div>

                {/* Other Images Section — UNTOUCHED */}
                <div className="mb-10">
                  <h2 className="text-lg font-medium mb-4">Other Images *</h2>

                  <div className="space-y-4">
                    {othersPreview.length > 0 && (
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                        {othersPreview.map((preview, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={preview}
                              alt={`Other ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg border-2 border-gray-300"
                            />
                            <button
                              type="button"
                              onClick={() => removeOtherImage(index)}
                              className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                            >
                              <LuX className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <label
                      className={`relative block w-full h-48 border-2 rounded-xl cursor-pointer overflow-hidden transition-all bg-gray-50 hover:border-yellow-400 ${errors.otherImage
                        ? "border-red-500"
                        : othersPreview.length > 0
                          ? "border-green-500"
                          : "border-dashed border-gray-400"
                        }`}
                    >
                      <div className="flex flex-col items-center justify-center h-full text-center px-6">
                        <LuUpload className="w-14 h-14 text-gray-400 mb-4" />
                        <p className="text-gray-700 font-medium">Drop more photos here</p>
                        <p className="text-sm text-gray-500 mt-1">
                          or <span className="text-yellow-600 underline font-medium">Click to select</span>
                        </p>
                        <span className="text-xs text-gray-400 mt-2">You can select multiple images</span>
                      </div>

                      {/* register हटाया गया है — सिर्फ onChange रहेगा */}
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleMultipleImages}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </label>

                    {errors.otherImage && (
                      <p className="text-red-600 text-sm mt-2">{errors.otherImage.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-8 py-5 flex justify-between">
                <button type="button" onClick={handlePrev} className="px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-full">
                  Previous
                </button>
                <button type="button" onClick={handleNext} className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-full">
                  Next
                </button>
              </div>
            </div>
          )}




          {/* ==================== STEP 6: Owner Info ==================== */}
          {currentStep === 5 && (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6">Owner Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input {...register("ownerName")} placeholder="Name" className={`w-full px-4 py-2 rounded-lg border-2 transition-all focus:outline-none focus:ring-4 ${errors.ownerName ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:border-green-500 focus:ring-green-300"}`} />
                    {errors.ownerName && <p className="text-red-600 text-sm mt-1">{errors.ownerName.message}</p>}
                  </div>
                  <div>
                    <input {...register("ownerEmail")} placeholder="Email" className={`w-full px-4 py-2 rounded-lg border-2 transition-all focus:outline-none focus:ring-4 ${errors.ownerEmail ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:border-green-500 focus:ring-green-300"}`} />
                    {errors.ownerEmail && <p className="text-red-600 text-sm mt-1">{errors.ownerEmail.message}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <input
                      {...register("ownerPhone")}
                      placeholder="Contact No."
                      maxLength={10}
                      className={`w-full px-4 py-2 rounded-lg border-2 transition-all focus:outline-none focus:ring-4 ${errors.ownerPhone ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:border-green-500 focus:ring-green-300"}`}
                    />
                    {errors.ownerPhone && <p className="text-red-600 text-sm mt-1">{errors.ownerPhone.message}</p>}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-8 py-5 flex justify-between">
                <button type="button" onClick={handlePrev} className="px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-full">
                  Previous
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-12 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-full flex items-center gap-3 ${isLoading && "opacity-70 cursor-not-allowed"}`}
                >
                  {isLoading ? "Submitting..." : "Submit Property"}
                </button>
              </div>
            </div>
          )}

        </form>

        {isError && <p className="text-center text-red-600 mt-4">{error?.data?.message || "Something went wrong!"}</p>}
      </div>
    </section>
  );
};

export default ListProperty;
















