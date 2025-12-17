
import React, { useEffect, useRef, useState } from 'react'
import {
  User,
  Settings,
  MapPin,
  Save,
  Film,
  Globe,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link2,
  Image,
  Calendar
} from 'lucide-react';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useForm } from 'react-hook-form';
import { IoIosArrowRoundDown } from 'react-icons/io';
import { useCreateProjectMutation, useIdProjectMutation, usePdfAnImgProjectMutation } from '../redux/api/projectApi';
import Navbar from '../Components/Navbar';
import PropertyForm from '../Components/PropertyAdd';
import { useSelector } from 'react-redux';

// Leaflet marker fix
const markerIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const options = [
  // ===== FIRST + SECOND IMAGE OPTIONS (Already Added Earlier) =====
  "24/7 Security",
  "Activity Area",
  "Air Conditioning",
  "Air Conditioning Unit",
  "Amphitheatre",
  "Astro Deck",
  "Automated Car Parking System",
  "Badminton Court",
  "Balcony",
  "Bank & ATM Facility",
  "Banquet Hall",
  "Barbeque Counter",

  "Basket Ball Court",
  "Bed",
  "Business Lounge",
  "Butterfly Park",
  "Cabana",
  "Cabana Cafe",
  "Cafeteria",
  "CCTV",
  "Chess Area",
  "Chemistry",
  "Chit Chat Nook",
  "Clubhouse",
  "Community Hall",
  "Conference Room", "Conventional Fire Detection and Alarm System", "Coworking Space",
  "Cricket Net", "Cricket Pitch", "Curtains", "Dining Table", "Drainage System",
  "Earthquake Resistant", "Electrical Connection", "Entrance Car Access",
  "Entrance Towers Parking", "Entry Gate", "EV Charging Station", "Exhaust Fan", "Fans",
  "Fire Hydrant System", "Fitness Center", "Fully Air Conditioned Grand Entrance Lobby",
  "Game Zone", "Garden", "Garden View", "Gas Connection", "Gated Community", "Geyser",
  "Gazebo", "Grand Entrance Lobby", "Guard House", "Gym", "Hammock Area", "Health Club",
  "Herb Garden", "Herbal Garden", "High Ceilings", "High Speed Elevators", "Indoor Games",
  "Inhouse Restaurant", "Intercom", "Intercom Connectivity", "Internet Connection",
  "Island Seating", "Jacuzzi", "Jogging Track", "Kids Activity Room", "Kids Play Area",
  "Kids Pool", "Lake View", "Lake Viewing Deck", "Landscaped Garden", "Lap Pool",
  "Large Windows / Natural Light", "Laundry", "Lawn", "Lift", "Lights",
  "Lockers Facility", "Look Out Bar", "Lounge", "Maintenance Staff", "Meditation Platform",
  "Meditation Play Zone", "Microwave", "Mini Theatre", "Modular Kitchen",
  "Multiple Play Court",

  "Multi Music Room", "Multipurpose Hall", "North West Stand", "Outdoor Games", "Outdoor Gym",
  "Parking", "Partial Sea View", "Party Hall", "Party Lawn", "Party Lounge",
  "Pedestrian Entrance Plaza", "Performance Stage", "Pergola Sitting Area", "Personal Lift",
  "Pet Park", "Play Area", "Pool Area", "Pool Deck", "Portable Fire Extinguishers",
  "Power Backup", "Private Compound", "Private Passage", "Projection Screen",
  "Rain Water Harvesting", "Reading Alcove", "Receiving Station", "Reflexology Zone",
  "Refrigerator", "Relaxing Steam Room", "Reserved Park", "Reserved Parking",
  "Road Up To Plot", "Rock Climbing Wall", "Roof Top Garden", "Roof Top Landscaping",
  "Seating Corner", "Seating Lounger", "Security", "Senior Citizen Area",
  "Servant Quarter", "Service Counter",

  "Sewage Treatment", "Shower Room", "Skating Area", "Sky Landscaping Party Lawn",
  "Sky Garden", "Sky Lounge", "Sky Walk Way", "Sky Yoga",
  "Smoke Aspiration Detection System (VESDA)", "Society Office", "Sofa", "Solar System",
  "Spa", "Squash Court", "Stainless Steel Appliances", "Storm Water Drains", "Stove",
  "Street Light", "Sub Station", "Swimming Pool", "Temple", "Tennis Court",
  "Tennis Terrace", "Theatre Room", "Toilet", "Tree House", "Tree Planting", "UPS",
  "Vaastu", "Valet Parking", "Vaastu Compliant", "Vegetation Strip", "Video Door Phone",
  "Viewing Gallery", "Visitor waiting area", "Volleyball court", "Waiting Lounge", "Wardrobe", "Wardrobe T.V", "Washing machine", "Water connection", "Water Conservation", "Water softener", "Water sky observatory", "WiFi", "WiFi Zone", "Yoga", "Yoga Center", "Yoga Pads",

];

export default function ProjectForm() {

  const [createProject, { isLoading: creating }] = useCreateProjectMutation();
  const [idProject, { isLoading: updating }] = useIdProjectMutation();
  const [uploadMedia, { isLoading: uploadingMedia }] = usePdfAnImgProjectMutation();

  const [currentStep, setCurrentStep] = useState(1); // Start from 1
  const [possession, setPossession] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [latLng, setLatLng] = useState({ lat: "", lng: "" });
  const [activeTab, setActiveTab] = useState('Project');

  // MOST IMPORTANT: Store Project ID after Step 1
  const [projectId, setProjectId] = useState(null);

  // For file upload (PDF)
  const [pdfFile, setPdfFile] = useState(null);
  const [uploadedMedia, setUploadedMedia] = useState({
    pdfUrl: null,
    imageUrls: []
  });
  const toggleOption = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };
  const mapRef = useRef(null);

  // useForm में defaultValues दो (सिर्फ एक बार)
  const { register, handleSubmit, formState: { errors, touchedFields }, trigger, getValues, reset } = useForm({
    mode: "onTouched",
    defaultValues: {
      projectOwner: "",
      launchDate: "",
      completionDate: "",
      projectName: "",
      developerName: "",
      reraNumber: "",
      publicCodeName: "",
      lockingDuration: "",
      projectArea: "",
      projectAreaUnit: "",
      possession: "",
      possessionDate: "",
      transactionType: "",
      description: "",
      approvedBy: "",
      commencementCertificate: false,
      occupancyCertificate: false,
      openSpace: "",
      videoUrl: "",
      virtualTourUrl: "",
      websiteKeywords: "",
      specification: "",
      document: null,
      projectImages: null,
      buildingPremises: "",
      city: "",
      area: "",
      pincode: "",
      landmark: "",
      latitude: "",
      longitude: "",
    }
  });
  // Step-wise data save (हर Next पर)

  // Auto location
  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported");
      return;
    }

    let watcher = null;

    watcher = navigator.geolocation.watchPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        // Set map marker position
        setPosition([lat, lng]);

        // 👉 Set latitude & longitude into input fields
        setLatLng({ lat, lng });

        // Center map
        if (mapRef.current) {
          mapRef.current.setView([lat, lng], 16);
        }

        // Fetch address
        setLoading(true);
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`)
          .then(res => res.json())
          .then(data => {
            setAddress(data.display_name || "Location found");
          })
          .catch(() => setAddress(`Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`))
          .finally(() => setLoading(false));

        // Stop watching after accuracy threshold
        if (pos.coords.accuracy <= 50) {
          navigator.geolocation.clearWatch(watcher);
          // console.log("High accuracy location found & watcher stopped");
        }
      },
      (error) => {
        // console.log("GPS Error:", error.message);
        setAddress("Location access denied or unavailable");
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      }
    );

    return () => {
      if (watcher) navigator.geolocation.clearWatch(watcher);
    };
  }, []);

  function LocationMarker() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;

        setPosition([lat, lng]);

        // 👉👇 NEW — Lat/Lng set in state
        setLatLng({ lat, lng });

        setLoading(true);
        setAddress("Fetching address...");

        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`)
          .then(res => res.json())
          .then(data => setAddress(data?.display_name || `Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`))
          .catch(() => setAddress("Address not found"))
          .finally(() => setLoading(false));
      },
    });

    return position ? <Marker position={position} icon={markerIcon}></Marker> : null;
  }

  const steps = [
    { id: 1, label: "Contact Information", icon: User },
    { id: 2, label: "Basic Information", icon: Settings },
    { id: 3, label: "Specification", icon: Settings },
    { id: 4, label: "Location", icon: MapPin },
  ];


  // Step 1: Create Draft Project
  const user = useSelector((state) => state.auth.user);
  const handleStep1Next = async () => {

    if (!user) {
      alert("Please login first");
      return;
    }

    const isValid = await trigger("projectOwner");
    if (!isValid) return;

    const owner = getValues("projectOwner");

    try {
      const result = await createProject({ Project_owner: owner }).unwrap();
      if (result.success && result.ProjectId) {
        setProjectId(result.ProjectId);
        setCurrentStep(2);
        // alert("Draft project created! You can now continue.");
      }
    } catch (err) {
      console.error("Create project failed:", err);
      alert("Failed to create project. Please try again.");
    }
  };
  // Generic Next Handler → फक्त Step 2 आणि Step 3 साठी (Auto-save)
  const handleNext = async () => {
    if (currentStep === 4) {
      return;  // <-- VERY IMPORTANT
    }

    let isValid = true;
    if (currentStep === 2) {
      isValid = await trigger(["launchDate", "completionDate", "projectName"]);
    }
    if (!isValid || !projectId) return;

    const formValues = getValues();
    let updatePayload = { id: projectId };

    // Step 2 - Basic Info
    if (currentStep === 2) {
      updatePayload = {
        ...updatePayload,
        Project_Name: formValues.projectName?.trim(),
        Developer_Name: formValues.developerName?.trim(),
        Launch_Date: formValues.launchDate,
        Completion_Date: formValues.completionDate,
        Rera_hira_Number: formValues.reraNumber?.trim(),
        Public_code_Name: formValues.publicCodeName?.trim(),
        Locking_Duration: formValues.lockingDuration ? `${formValues.lockingDuration} Days` : undefined,
        Project_Area: formValues.projectArea && formValues.projectAreaUnit
          ? `${formValues.projectArea} ${formValues.projectAreaUnit.replace(/_/g, ' ')}`.trim()
          : undefined,
        Possession: possession === "specify"
          ? formValues.possessionDate
          : possession === "immediately"
            ? "Immediately"
            : undefined,   // ← removeEmpty हटा देगा
        Transaction_Type: formValues.transactionType,
        Desciption: formValues.description?.trim(),
        Approved_by: formValues.approvedBy?.trim(),
        certificates: {
          commencement: !!formValues.commencementCertificate,
          occupancy: !!formValues.occupancyCertificate
        }
      };

      const cleanPayload = removeEmpty(updatePayload);
      await idProject(cleanPayload).unwrap();
      setCurrentStep(3);
      return;
    }

    // Step 3 - Specification + Files
    if (currentStep === 3) {
      const mediaFormData = new FormData();

      // PDF
      if (formValues.document?.[0]) {
        mediaFormData.append("pdf_doc", formValues.document[0]); // ← backend key
      }

      // Images → यह बिल्कुल सही key है आपके backend के लिए
      if (formValues.projectImages && formValues.projectImages.length > 0) {
        Array.from(formValues.projectImages).forEach((file) => {
          mediaFormData.append("Other_images", file);
        });
      }
      let mediaResponse = null;
      // Upload files if any
      if (mediaFormData.has("pdf_doc") || mediaFormData.has("Other_images")) {
        try {
          mediaResponse = await uploadMedia({ id: projectId, body: mediaFormData }).unwrap();
          console.log("Upload successful:", mediaResponse);

          // यहाँ से URLs निकालो (अपने backend response के हिसाब से)
          setUploadedMedia({
            pdfUrl: mediaResponse?.pdf_doc || mediaResponse?.data?.pdf_doc || null,
            imageUrls: mediaResponse?.Other_images || mediaResponse?.data?.Other_images || []
          });

        } catch (err) {
          console.error("Upload failed:", err);
          alert("Files upload failed, but you can continue...");
          // continue anyway
        }
      }

      // Save text data
      updatePayload = {
        ...updatePayload,
        Open_Space: formValues.openSpace ? `${formValues.openSpace}%` : undefined,
        amenities: selectedOptions.length > 0 ? selectedOptions : undefined,
        Video_url: formValues.videoUrl?.trim() || undefined,
        Virtual_video: formValues.virtualTourUrl?.trim() || undefined,
        website_keywords: formValues.websiteKeywords
          ? formValues.websiteKeywords.split(',').map(k => k.trim()).filter(Boolean)
          : undefined,
        Specification: formValues.specification?.trim() || undefined,
      };

      const cleanPayload = removeEmpty(updatePayload);
      await idProject(cleanPayload).unwrap();
      setCurrentStep(4);
    }
  };

  // Yeh function recursively object se empty values hata deta hai
  const removeEmpty = (obj) => {
    if (obj === null || obj === undefined || obj === '') return undefined;
    if (Array.isArray(obj)) {
      const filtered = obj.map(removeEmpty).filter(v => v !== undefined);
      return filtered.length > 0 ? filtered : undefined;
    }
    if (typeof obj === 'object' && obj !== null) {
      const cleaned = {};
      Object.keys(obj).forEach(key => {
        const value = removeEmpty(obj[key]);
        if (value !== undefined) cleaned[key] = value;
      });
      return Object.keys(cleaned).length > 0 ? cleaned : undefined;
    }
    return obj;
  };


  // ← नवीन & FINAL onSubmit (हा paste करा)

  const onSubmit = async (data) => {
    if (!projectId) {
      alert("Project ID missing!");
      return;
    }

    const payload = {
      id: projectId,
      status: "pending_review",

      // Step 1 - Yeh mandatory hai, isliye null nahi hona chahiye
      Project_owner: data.projectOwner?.trim(),

      // Step 2 - Sab mein .trim() laga do aur undefined rehne do
      Project_Name: data.projectName?.trim(),
      Developer_Name: data.developerName?.trim(),                    // null nahi
      Launch_Date: data.launchDate || undefined,                     // agar blank to undefined
      Completion_Date: data.completionDate || undefined,
      Rera_hira_Number: data.reraNumber?.trim() || undefined,
      Public_code_Name: data.publicCodeName?.trim() || undefined,
      Locking_Duration: data.lockingDuration ? `${data.lockingDuration} Days` : undefined,
      Project_Area: data.projectArea && data.projectAreaUnit
        ? `${data.projectArea} ${data.projectAreaUnit.replace(/_/g, ' ')}`.trim()
        : undefined,
      Possession: possession === "specify"
        ? data.possessionDate
        : (possession === "immediately" ? "Immediately" : "Ready"),
      Transaction_Type: data.transactionType || undefined,
      Desciption: data.description?.trim() || undefined,

      // Step 3
      Open_Space: data.openSpace ? `${data.openSpace}%` : undefined,
      amenities: selectedOptions.length > 0 ? selectedOptions : undefined,
      Video_url: data.videoUrl?.trim() || undefined,
      Virtual_video: data.virtualTourUrl?.trim() || undefined,
      website_keywords: data.websiteKeywords
        ? data.websiteKeywords.split(',').map(k => k.trim()).filter(Boolean)
        : undefined,
      Specification: data.specification?.trim() || undefined,

      // Step 4 - Location
      location: removeEmpty({  // nested object ko bhi clean karo
        address: address?.trim(),
        Building: data.buildingPremises?.trim(),
        city: data.city?.trim(),
        area_Locality: data.area?.trim(),
        pincode: data.pincode?.trim(),
        landmark: data.landmark?.trim(),
        coordinates: removeEmpty({
          lat: latLng.lat ? Number(latLng.lat) : undefined,
          lng: latLng.lng ? Number(latLng.lng) : undefined,
        })
      }),
    };

    // Final clean - sab null/undefined/empty remove
    const finalPayload = removeEmpty(payload);

    // console.log("FINAL CLEAN PAYLOAD →", finalPayload);

    try {
      await idProject(finalPayload).unwrap();
      alert("Project submitted successfully!");
     
      // सही तरीके से reset करो
      reset({
        projectOwner: "",
        launchDate: "",
        completionDate: "",
        projectName: "",
        developerName: "",
        reraNumber: "",
        publicCodeName: "",
        lockingDuration: "",
        projectArea: "",
        projectAreaUnit: "",
        possession: "",
        possessionDate: "",
        transactionType: "",
        description: "",
      
        openSpace: "",
        videoUrl: "",
        virtualTourUrl: "",
        websiteKeywords: "",
        specification: "",
        document: null,
        projectImages: null,
        buildingPremises: "",
        city: "",
        area: "",
        pincode: "",
        landmark: "",
      });

      // बाकी सारे states reset करो
      setCurrentStep(1);
      setProjectId(null);                    // बहुत जरूरी
      setSelectedOptions([]);
      setPossession("");
      setAddress("");
      setPosition(null);
      setLatLng({ lat: "", lng: "" });
      setUploadedMedia({ pdfUrl: null, imageUrls: [] });
      setPdfFile(null);
      setIsOpen(false);

      // File inputs clear
      document.querySelectorAll('input[type="file"]').forEach(input => {
        input.value = "";
      });

      // Map reset
      if (mapRef.current) {
        mapRef.current.setView([20.5937, 78.9629], 5.5);
        mapRef.current.eachLayer(layer => {
          if (layer instanceof L.Marker) {
            mapRef.current.removeLayer(layer);
          }
        });
      }
    } catch (err) {
      // console.error(err);
      alert("Failed: " + (err?.data?.message || "Server Error"));
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };


  const formRef = useRef(null);
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth" });
  return (
    <section className="relative bg-cover bg-center bg-no-repeat min-h-screen py-12 px-4 sm:px-6 lg:px-16 font-manrope"
      style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/propbg.webp')` }}>
      <Navbar />

      {/* Hero */}
      <div className="text-center mt-20">
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

      <div className="flex justify-center my-12">
        <div className="inline-flex bg-gray-100 rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
          <button
            onClick={() => setActiveTab('Property')}
            className={`px-12 py-5 font-bold text-lg transition-all duration-300 ${activeTab === 'Property'
              ? 'bg-yellow-400 text-white shadow-md'
              : 'text-gray-700 hover:bg-gray-200'
              }`}
          >
            Property
          </button>
          <button
            onClick={() => setActiveTab('Project')}
            className={`px-12 py-5 font-bold text-lg transition-all duration-300 ${activeTab === 'Project'
              ? 'bg-yellow-400 text-white shadow-md'
              : 'text-gray-700 hover:bg-gray-200'
              }`}
          >
            Project
          </button>
        </div>
      </div>

      {/* Progress Bar - फक्त Project टॅब वर दिसेल */}
      {activeTab === 'Project' && (
        <div className="max-w-5xl mx-auto mt-10 px-4">
          <div className="flex items-center justify-between w-full max-w-xl mx-auto">
            {steps.map((step, i) => (
              <React.Fragment key={i}>
                <div className={`flex items-center justify-center text-white font-bold rounded-full w-12 h-12 text-lg ${currentStep >= step.id ? 'bg-yellow-500' : 'bg-gray-400'}`}>
                  {i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 ${currentStep > step.id ? 'bg-yellow-500' : 'bg-gray-400'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Form */}
      <div ref={formRef} className="max-w-5xl mx-auto mt-10">
        {activeTab === 'Property' ? (
          <PropertyForm />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

            {/* STEP 1: Project Owner */}
            {currentStep === 1 && (
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 text-center mb-12">
                  Give us some information about project owner
                </h2>
                <div className="space-y-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Owner <span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register("projectOwner", { required: "Project Owner is required" })}
                      className={`w-full h-12 px-4 border rounded-md ${errors.projectOwner ? "border-red-500" : touchedFields.projectOwner ? "border-green-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="">Select Project Owner</option>
                      <option value="builder">Builder</option>
                      <option value="broker">Broker</option>
                      <option value="developer">Developer</option>
                    </select>
                    {errors.projectOwner && <p className="text-red-500 text-sm mt-1">{errors.projectOwner.message}</p>}
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button type="button" onClick={handleStep1Next}
                      disabled={creating}
                      className="px-8 py-3 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 flex items-center gap-2 disabled:opacity-50">
                      {creating ? "Creating..." : "Next →"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Basic Information */}
            {currentStep === 2 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8 lg:p-10">
                <h2 className="text-xl font-medium text-gray-900 text-center mb-8">
                  Give us some basic information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* Launch Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Launch date <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <input
                        type="date"
                        {...register("launchDate", { required: "Launch date is required" })}
                        className={`w-full px-4 py-2 border rounded-md pr-10 
                          ${errors.launchDate ? "border-red-500" : touchedFields.launchDate ? "border-green-500" : "border-gray-300"}
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      />
                    </div>

                    {errors.launchDate && (
                      <p className="text-red-500 text-sm mt-1">{errors.launchDate.message}</p>
                    )}
                  </div>

                  {/* Completion Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Completion date <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <input
                        type="date"
                        {...register("completionDate", { required: "Completion date is required" })}
                        className={`w-full px-4 py-2 border rounded-md pr-10 
                          ${errors.completionDate ? "border-red-500" : touchedFields.completionDate ? "border-green-500" : "border-gray-300"}
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      />
                    </div>

                    {errors.completionDate && (
                      <p className="text-red-500 text-sm mt-1">{errors.completionDate.message}</p>
                    )}
                  </div>

                  {/* Project Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Name <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      {...register("projectName", { required: "Project name is required" })}
                      className={`w-full px-4 py-2 border rounded-md
                      ${errors.projectName ? "border-red-500" : touchedFields.projectName ? "border-green-500" : "border-gray-300"}
                      focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    />

                    {errors.projectName && (
                      <p className="text-red-500 text-sm mt-1">{errors.projectName.message}</p>
                    )}
                  </div>

                  {/* Developer Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Developer Name
                    </label>
                    <input
                      type="text"
                      {...register("developerName")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* RERA/HIRA Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      RERA/HIRA Number
                    </label>
                    <input
                      type="text"
                      {...register("reraNumber")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Public/Code Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Public/Code Name
                    </label>
                    <input
                      type="text"
                      {...register("publicCodeName")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Locking Duration */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Locking Duration(Days)
                    </label>
                    <input
                      type="number"
                      {...register("lockingDuration")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Project Area */}
                  <div className="mb-6 w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Area
                    </label>

                    <div className="flex flex-col sm:flex-row sm:items-center w-full">
                      <input
                        type="number"
                        {...register("projectArea")}
                        placeholder="Enter area"
                        className="px-4 py-2 border border-gray-300 rounded-md sm:rounded-l-md sm:rounded-r-none w-full sm:w-1/2 mb-3 sm:mb-0"
                      />

                      <select
                        {...register("projectAreaUnit")}
                        className="px-4 py-2 border border-gray-300 rounded-md sm:rounded-r-md sm:rounded-l-none bg-white focus:outline-none w-full sm:w-1/2"
                      >
                        <option value="">-- Select Unit --</option>
                        <option value="sq_ft">Sq. ft</option>
                        <option value="sq_meters">Sq. Meters</option>
                        <option value="grounds">Grounds</option>
                        <option value="aankadam">Aankadam</option>
                        <option value="rood">Rood</option>
                        <option value="chataks">Chataks</option>
                        <option value="guntha">Guntha</option>
                        <option value="area">Area</option>
                        <option value="biswa">Biswa</option>
                        <option value="acres">Acres</option>
                        <option value="perch">Perch</option>
                        <option value="bigha">Bigha</option>
                        <option value="kothah">Kothah</option>
                        <option value="hectare">Hectare</option>
                        <option value="marla">Marla</option>
                        <option value="kanal">Kanal</option>
                        <option value="cents">Cents</option>
                        <option value="sq_yard">Sq. Yard</option>
                        <option value="kanal_chd">Kanal (CHD)</option>
                        <option value="marla_chd">Marla (CHD)</option>
                        <option value="ganda">Ganda</option>
                        <option value="lecha">Lecha</option>
                      </select>
                    </div>
                  </div>

                  {/* Possession */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Possession
                      </label>

                      <select
                        {...register("possession")}
                        onChange={(e) => {
                          register("possession").onChange(e); // react-hook-form को बताओ
                          setPossession(e.target.value);     // ← यही missing था!
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select</option>
                        <option value="immediately">Immediately</option>
                        <option value="specify">Specify Time</option>
                      </select>
                    </div>

                    {/* अब यह सही से दिखेगा */}
                    {possession === "specify" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Select Date
                        </label>
                        <input
                          type="date"
                          {...register("possessionDate")}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    )}
                  </div>

                  {/* Transaction Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Transaction Type
                    </label>
                    <select
                      {...register("transactionType")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select</option>
                      <option value="resale">Resale</option>
                      <option value="prelaunch">Pre launch</option>
                      <option value="prelease">Pre Lease / Pre Rented</option>
                      <option value="individual">Individual</option>
                      <option value="company">Company</option>
                      <option value="distressSale">Distress Sale</option>
                      <option value="groupBooking">Group Booking</option>
                      <option value="individualCompany">Individual / Company</option>
                    </select>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      rows={6}
                      maxLength={2000}
                      {...register("description")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    />
                  </div>

                  
                </div>

                <div className="mt-8 flex justify-between">
                  <button type="button" onClick={handlePrev} className="px-6 py-3 border rounded-md">Previous</button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={updating}
                    className="px-8 py-3 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 flex items-center gap-2 disabled:opacity-50"
                  >
                    {updating ? "Saving..." : "Next →"}
                  </button>
                </div>
              </div>


            )}

            {/* STEP 3: Specification & Amenities */}
            {currentStep === 3 && (
              <div className="bg-white  rounded-lg  border overflow-hidden">
                <div className="p-6 sm:p-8 lg:p-10">

                  <h2 className="text-2xl font-semibold text-gray-900 text-center mb-10">
                    Important Specifications
                  </h2>

                  <div className="space-y-4">

                    {/* Top Inputs */}
                    <div className="grid grid-cols-2 gap-4">

                      <div>
                        <label className="block text-sm font-medium mb-2">Open Space(%)</label>
                        <input
                          {...register("openSpace")}
                          type="number"
                          className="w-full px-4 py-2 border rounded-md "
                        />
                      </div>
                      {/* amenities */}
                      <div className="w-full   mx-auto  relative">
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                          Select Amenities
                        </label>

                        <div
                          className="border border-gray-300 rounded p-2 cursor-pointer flex justify-between items-center"
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          <span>
                            {selectedOptions.length > 0
                              ? selectedOptions.join(", ")
                              : "Select amenities"}
                          </span>
                          <span className="transform transition-transform duration-200">
                            {isOpen ? "▲" : "▼"}
                          </span>
                        </div>

                        {isOpen && (
                          <div className="absolute mt-1 w-full border border-gray-300 rounded bg-white z-10 max-h-40 overflow-y-auto">
                            {options.map((option) => (
                              <div
                                key={option}
                                className={`p-2 cursor-pointer hover:bg-blue-100 flex items-center gap-2 ${selectedOptions.includes(option) ? "bg-blue-100" : ""
                                  }`}
                                onClick={() => toggleOption(option)}
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedOptions.includes(option)}
                                  onChange={() => toggleOption(option)}
                                />
                                <span>{option}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Document PDF
                        </label>

                        <input
                          type="file"
                          accept="application/pdf"
                          {...register("document")}
                          onChange={(e) => {
                            if (e.target.files[0]) setPdfFile(e.target.files[0]);
                          }}
                          className="block w-full border rounded p-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Video (Youtube/Vimeo)</label>
                        <div className="relative">
                          <Film className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                          <input
                            {...register("videoUrl")}
                            type="text"
                            placeholder="Enter youtube/vimeo url"
                            className="w-full pl-12 pr-4 py-2 border rounded-md"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Virtual Video</label>
                        <div className="relative">
                          <Globe className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                          <input
                            {...register("virtualTourUrl")}
                            type="text"
                            placeholder="Enter url"
                            className="w-full pl-12 pr-4 py-2 border rounded-md"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Website Keywords</label>
                        <input
                          {...register("websiteKeywords")}
                          type="text"
                          placeholder="Enter Website Keyword"
                          className="w-full px-4 py-2 border rounded-md"
                          onKeyDown={(e) => {
                            if (/[0-9]/.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                        />
                      </div>


                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Project Images
                        </label>

                        <div className="w-full border rounded-md px-3 py-2 bg-white">
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            {...register("projectImages")}
                            className="block w-full text-sm text-gray-700
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border file:border-gray-300
          file:bg-gray-100 file:text-gray-700
          hover:file:bg-gray-200 cursor-pointer"
                          />
                        </div>

                        <p className="text-xs text-gray-500 mt-1">
                          You can select multiple images
                        </p>
                      </div>

                    </div>

                    {/* Specification Textarea */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4">Specification</label>
                      <div className="border border-gray-300 rounded-lg overflow-hidden">
                        <textarea
                          {...register("specification")}
                          className="w-full min-h-48 p-5 resize-none focus:outline-none"
                          placeholder="Write detailed project specifications here..."
                        ></textarea>
                      </div>
                    </div>

                  </div>


                  {/* Buttons */}
                  <div className="mt-8 flex justify-between">
                    <button type="button" onClick={handlePrev} className="px-6 py-3 border rounded-md">Previous</button>
                    <button type="button" onClick={handleNext}
                      disabled={updating}
                      className="px-8 py-3 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 flex items-center gap-2 disabled:opacity-50">
                      {updating ? "Saving..." : "Next →"}
                    </button>
                  </div>

                </div>
              </div>

            )}

            {/* STEP 4: Location */}

            {currentStep === 4 && (
              <div className='w-full bg-white p-5 rounded-lg flex justify-center'>

                <div className="max-w-5xl w-full  space-y-6">
                  {/* ---------- MAP + ADDRESS SECTION ---------- */}
                  <div className=" space-y-5">
                    <h1 className='text-center text-3xl'>Location</h1>

                    {/* MAP */}
                    <div className="rounded-2xl overflow-hidden border-4 border-blue-200 mt-20">
                      <div className="relative w-full">
                        <MapContainer
                          center={[23.5, 82.5]}
                          zoom={5.5}
                          minZoom={5}
                          maxZoom={18}
                          scrollWheelZoom={true}
                          style={{ height: "45vh", width: "100%", position: "relative", zIndex: 1 }}
                          maxBounds={[
                            [6.0, 68.0],
                            [37.5, 97.5],
                          ]}
                          maxBoundsViscosity={1.0}
                          ref={mapRef}
                        >
                          <TileLayer
                            attribution="Map data © OpenStreetMap contributors"
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          />
                          <LocationMarker />
                        </MapContainer>
                      </div>
                    </div>

                    {/* Address from map */}
                    <div className="flex flex-col md:flex-row gap-3">
                      <input
                        type="text"
                        readOnly
                        value={loading ? "Loading..." : address || "Click on the map to get address"}
                        className="w-full px-5 py-2 text-base bg-gray-50 border-2 border-gray-300 rounded-lg"
                      />
                    </div>

                    {/* Lat Long */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                      <div>
                        <label className="block mb-1 font-semibold">Latitude</label>
                        <input
                          {...register("latitude")}
                          type="text"
                          value={latLng.lat}
                          readOnly
                          // name="latitude"
                          className="w-full border rounded px-3 py-2"
                        />
                      </div>

                      <div>
                        <label className="block mb-1 font-semibold">Longitude</label>
                        <input
                          {...register("longitude")}
                          type="text"
                          value={latLng.lng}
                          readOnly
                          // name="longitude"
                          className="w-full border rounded px-3 py-2"
                        />
                      </div>

                    </div>
                  </div>

                  {/* ---------- ADDRESS FORM FIELDS ---------- */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div>
                      <label className="block mb-1 font-semibold">Building / Premises</label>
                      <input
                        {...register("buildingPremises")}
                        type="text"
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>

                    {/* City */}
                    <div>
                      <label className="block mb-1 font-semibold">City <span className="text-red-500">*</span></label>

                      <input
                        type="text"
                        {...register("city", { required: "City is required" })}
                        className={`w-full border rounded px-3 py-2
          ${errors.city ? "border-red-500" : touchedFields.city ? "border-green-500" : "border-gray-300"}
          focus:ring-2 focus:ring-blue-500`}
                      />

                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                    </div>

                    {/* Area / Locality */}
                    <div>
                      <label className="block mb-1 font-semibold">Area / Locality <span className="text-red-500">*</span></label>

                      <input
                        type="text"
                        {...register("area", { required: "Area / Locality is required" })}
                        className={`w-full border rounded px-3 py-2
          ${errors.area ? "border-red-500" : touchedFields.area ? "border-green-500" : "border-gray-300"}
          focus:ring-2 focus:ring-blue-500`}
                      />

                      {errors.area && <p className="text-red-500 text-sm mt-1">{errors.area.message}</p>}
                    </div>

                    <div>
                      <label className="block mb-1 font-semibold">
                        Pincode <span className="text-red-500">*</span>
                      </label>

                      <input
                        type="text"
                        maxLength={6}
                        {...register("pincode", {
                          required: "Pincode is required",
                          pattern: {
                            value: /^[0-9]{6}$/,
                            message: "Enter valid 6-digit pincode"
                          }
                        })}
                        onKeyDown={(e) => {
                          // Allow only numbers, backspace, tab
                          if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
                            e.preventDefault();
                          }
                        }}

                        className={`w-full border rounded px-3 py-2 
        ${errors.pincode ? "border-red-500" : "border-gray-300"} 
        focus:ring-2 focus:ring-blue-500`}
                      />

                      {errors.pincode && (
                        <p className="text-red-500 text-sm mt-1">{errors.pincode.message}</p>
                      )}
                    </div>


                    {/* Full width */}
                    <div className="md:col-span-2">
                      <label className="block mb-1 font-semibold">Landmark</label>
                      <input
                        type="text"
                        {...register("landmark")}
                        name="landmark"
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>

                  </div>
                  <div className="mt-8 flex justify-between">
                    <button type="button" onClick={handlePrev} className="px-6 py-3 border rounded-md">Previous</button>
                    <button type="submit"
                      disabled={updating}
                      className="px-8 py-3 bg-yellow-500 text-black font-bold rounded-md hover:bg-yellow-600 disabled:opacity-50">
                      {updating ? "Submitting..." : "Submit Form"}
                    </button>
                  </div>
                </div>
              </div>
            )}

          </form>
        )}
      </div>
    </section>
  );
}







