// import React, { useEffect, useRef, useState } from "react";
// import { useForm } from "react-hook-form";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// import {
//     MapContainer,
//     TileLayer,
//     Marker,
//     useMapEvents,
// } from "react-leaflet";
// import { useImgandocPropertyMutation, usePropertyAddMutation } from "../redux/api/propertiApi";

// // Leaflet marker fix
// const markerIcon = new L.Icon({
//     iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//     shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
// });

// export default function PropertyForm() {

//     const [propertyadd, { isLoading: adding }] = usePropertyAddMutation();
//     const [alldata, { isLoading: updating }] = useImgandocPropertyMutation();

//     const [step, setStep] = useState(1);
//     const [selectedOptions, setSelectedOptions] = useState([]);
//     const [isOpen, setIsOpen] = useState(false);
//     const [propertyId, setPropertyId] = useState(null)

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         setValue,
//         watch,
//         trigger,
//         reset
//     } = useForm({
//         mode: "onChange",
//         defaultValues: {

//             owner: "",
//             // step 2
//             requestDate: "",
//             for: "",
//             propertyType: "",
//             transaction: "",
//             ownership: "",
//             bedroom: "",
//             furnishing: "",
//             suitableFor: "",
//             uniqueFeature: "",
//             description: "",
//             // STEP 3
//             address: "",
//             lat: "",
//             long: "",
//             flatUnit: "",
//             surveyNumber: "",
//             surveyName: "",
//             developerName: "",
//             street: "",
//             landmark: "",
//             pinCode: "",
//             buildingProject: "",
//             city: "",
//             locality: "",
//             // STEP 4 AREA
//             area: "",
//             areaUnit: "",
//             builtUpArea: "",
//             builtUpUnit: "",
//             carpetArea: "",
//             carpetUnit: "",
//             terraceArea: "",
//             terraceUnit: "",
//             areaRange: "",
//             areaRangeUnit: "",
//             plotArea: "",
//             plotLength: "",
//             plotWidth: "",
//             propertyWidth: "",
//             propertyDepth: "",
//             expectedPrice: "",
//             expectedValue: "",
//             expectedCalc: "",
//             negotiableAmount: "",
//             negotiableApplicable: false,
//             paidByLicensor: false,
//             negotiable: false,
//             refundable: false,
//             maintenanceCharges: "",
//             securityDeposit: "",
//             jvRatio: "",
//             lockinPeriod: "",
//             leasePeriod: "",
//             leaseHoldCharges: "",
//             commissionLandlord: "",
//             rentFreeDays: "",
//             rentPerMonth: "",
//             rentStartDate: "",
//             msebCharges: "",
//             propertyTax: "",
//             // STEP 5
//             masterBedroom: "",
//             guestRoom: "",
//             childRoom: "",
//             bathCommon: "",
//             bathEnsuite: "",
//             otherRoom: "",
//             totalFloor: "",
//             propertyOnFloor: "",
//             noLift: "",
//             flooring: "",
//             facing: "",
//             amenities: "",
//             advertisement: "",
//             ageProperty: "",
//             availability: "",
//             workstation: "",
//             cabins: "",
//             conferenceRoom: "",
//             reception: "",
//             dgBackup: "",
//             powerKVA: "",
//             videoUrl: "",
//             websiteKeyword: "",
//         },
//     });

//     const input = "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-blue-500";
//     const labelBox = "flex items-center justify-between text-gray-700 text-sm font-medium mb-1";
//     const sectionTitle = "text-lg font-semibold text-gray-800 mt-10 mb-4 text-center";
//     const label = "block text-gray-700 font-semibold mb-1";

//     const toggleOption = (option) => {
//         setSelectedOptions((prev) =>
//             prev.includes(option)
//                 ? prev.filter((o) => o !== option)
//                 : [...prev, option]
//         );
//     };


//     const goToNext = async () => {
//         let isValid = true;

//         if (step === 1) {
//             isValid = await trigger(["owner", "requestDate", "for", "propertyType"]);
//             if (!isValid) return;

//             // STEP 1 → Create draft property
//             try {
//                 const step1Data = watch(); // current form values
//                 const payload = {
//                     owner_name: step1Data.owner,
//                     // Request_Date: step1Data.requestDate,
//                     // for: step1Data.for,
//                     // property_type: step1Data.propertyType,
//                     // transaction: step1Data.transaction || "",
//                     // ownerShip: step1Data.ownership || "",
//                     // Bedroom: step1Data.bedroom || "",
//                     // Furnishing: step1Data.furnishing || "",
//                     // suitable: step1Data.suitableFor || "",
//                     // unique_feature: step1Data.uniqueFeature || "",
//                     // Description: step1Data.description || "",
//                 };

//                 const response = await propertyadd(payload).unwrap();

//                 if (response.success && response.propertyId) {
//                     setPropertyId(response.propertyId);
//                     alert("Draft property created! Moving to next step...");
//                     setStep(2);
//                 }
//             } catch (err) {
//                 console.error("Property add failed:", err);
//                 alert("Failed to create draft property. Please try again.");
//             }
//             return;
//         }

//         // Other steps validation
//         if (step === 2) isValid = await trigger(["city", "locality"]);
//         if (step === 3) isValid = await trigger(["area", "areaUnit"]);

//         if (!isValid && step <= 3) return;

//         if (step < 6) {
//             setStep(step + 1);
//         }
//     };

//     const goToPrevious = () => {
//         if (step > 1) setStep(step - 1);
//     };
//     // const onSubmit = async () => {
//     //     if (!propertyId) {
//     //         alert("Property ID missing!");
//     //         return;
//     //     }

//     //     const data = watch();

//     //     // -------------------- FORM DATA --------------------
//     //     const formData = new FormData();

//     //     // Append all JSON fields directly to FormData (not as a JSON string)
//     //     formData.append("owner_name", data.owner || "");
//     //     formData.append("Request_Date", data.requestDate || "");
//     //     formData.append("for", data.for || "");
//     //     formData.append("property_type", data.propertyType || "");
//     //     formData.append("transaction", data.transaction || "");
//     //     formData.append("ownerShip", data.ownership || "");
//     //     formData.append("Bedroom", data.bedroom || "");
//     //     formData.append("Furnishing", data.furnishing || "");
//     //     formData.append("suitable_feature", data.suitableFor || "");
//     //     formData.append("unique_feature", data.uniqueFeature || "");
//     //     formData.append("Description", data.description || "");
//     //     formData.append("Video_url", data.videoUrl || "");
//     //     formData.append("website_keywords", data.websiteKeyword || "");

//     //     // Address (as JSON string)
//     //     formData.append("Address", JSON.stringify({
//     //         flat_no: data.flatUnit || "",
//     //         building: data.buildingProject || "",
//     //         street: data.street || "",
//     //         landmark: data.landmark || "",
//     //         city: data.city || "",
//     //         locality: data.locality || "",
//     //         pincode: data.pinCode || "",
//     //         state: "",
//     //         lat: latLng.lat?.toString() || "",
//     //         lng: latLng.lng?.toString() || "",
//     //     }));

//     //     // Area (as JSON string)
//     //     formData.append("Area", JSON.stringify({
//     //         super_builtup: data.area ? `${data.area} ${data.areaUnit}` : "",
//     //         built_up: data.builtUpArea ? `${data.builtUpArea} ${data.builtUpUnit}` : "",
//     //         carpet_area: data.carpetArea ? `${data.carpetArea} ${data.carpetUnit}` : "",
//     //         plot_area: data.plotArea ? `${data.plotArea} ${data.plotAreaUnit}` : "",
//     //     }));

//     //     // Pricing (as JSON string)
//     //     formData.append("pricing", JSON.stringify({
//     //         expected_price: data.expectedPrice || "",
//     //         price_per_sqft: pricePerUnit || "",
//     //         tax_govt_charges: "Not Included"
//     //     }));

//     //     // Amenities (as JSON string)
//     //     if (selectedOptions && selectedOptions.length > 0) {
//     //         formData.append("amenities", JSON.stringify(selectedOptions));
//     //     }


//     //     // BedRoom (as JSON string)
//     //     formData.append("BedRoom", JSON.stringify({
//     //         bathrooms: `${data.bathCommon || 0} Common + ${data.bathEnsuite || 0} Ensuite`,
//     //         balcony: "",
//     //         additional_rooms: [
//     //             data.masterBedroom ? "Master Bedroom" : null,
//     //             data.guestRoom ? "Guest Room" : null,
//     //             data.childRoom ? "Child Room" : null,
//     //             data.otherRoom || null
//     //         ].filter(Boolean)
//     //     }));

//     //     // Feacture (as JSON string)
//     //     formData.append("Feacture", JSON.stringify({
//     //         floor_no: data.propertyOnFloor || "",
//     //         total_floor: data.totalFloor || "",
//     //         age_of_property: data.ageProperty || "",
//     //         facing: data.facing || "",
//     //         flooring: data.flooring || ""
//     //     }));

//     //     // Lease_Rent (as JSON string)
//     //     formData.append("Lease_Rent", JSON.stringify({
//     //         monthly_rent: data.rentPerMonth || "",
//     //         security_deposit: data.securityDeposit || "",
//     //         lock_in_period: data.lockinPeriod ? `${data.lockinPeriod} months` : "",
//     //         maintenance: data.maintenanceCharges || "",
//     //         lease_period: data.leasePeriod ? `${data.leasePeriod} months` : ""
//     //     }));

//     //     // Append images
//     //     if (data.projectImages?.length > 0) {
//     //         [...data.projectImages].forEach((file) => {
//     //             formData.append("Other_images", file);
//     //         });
//     //     }

//     //     // Append document
//     //     if (data.document && data.document[0]) {
//     //         formData.append("Documents", data.document[0]);
//     //     }

//     //     // -------------------- API CALL --------------------
//     //     try {
//     //         const result = await alldata({
//     //             id: propertyId,
//     //             formData // send FormData with fields + files
//     //         }).unwrap();

//     //         alert("Property submitted successfully!");
//     //         reset();
//     //         setStep(1);
//     //         setPropertyId(null);
//     //         setSelectedOptions([]);

//     //     } catch (err) {
//     //         console.error(err);
//     //         alert("Failed: " + (err?.data?.message || "Server error"));
//     //     }
//     // };

//     const onSubmit = async () => {
//         if (!propertyId) {
//             alert("Property ID missing!");
//             return;
//         }

//         const data = watch();

//         // -------------------- FORM DATA --------------------
//         const formData = new FormData();

//         // ⚠️ ONLY APPEND FIELDS THAT WERE NOT SENT IN STEP 1
//         // Step 1 already sent: owner_name, Request_Date, for, property_type, 
//         // transaction, ownerShip, Bedroom, Furnishing, suitable_feature, 
//         // unique_feature, Description

//         // Address - nested object fields
//         formData.append("Address[flat_no]", data.flatUnit || "");
//         formData.append("Address[building]", data.buildingProject || "");
//         formData.append("Address[street]", data.street || "");
//         formData.append("Address[landmark]", data.landmark || "");
//         formData.append("Address[city]", data.city || "");
//         formData.append("Address[locality]", data.locality || "");
//         formData.append("Address[pincode]", data.pinCode || "");
//         formData.append("Address[state]", "");
//         formData.append("Address[lat]", latLng.lat?.toString() || "");
//         formData.append("Address[lng]", latLng.lng?.toString() || "");

//         // Area - nested object fields
//         formData.append("Area[super_builtup]", data.area ? `${data.area} ${data.areaUnit}` : "");
//         formData.append("Area[built_up]", data.builtUpArea ? `${data.builtUpArea} ${data.builtUpUnit}` : "");
//         formData.append("Area[carpet_area]", data.carpetArea ? `${data.carpetArea} ${data.carpetUnit}` : "");
//         formData.append("Area[plot_area]", data.plotArea ? `${data.plotArea} ${data.plotAreaUnit}` : "");

//         // Pricing - nested object fields
//         formData.append("pricing[expected_price]", data.expectedPrice || "");
//         formData.append("pricing[price_per_sqft]", pricePerUnit || "");
//         formData.append("pricing[tax_govt_charges]", "Not Included");

//         // Amenities - array
//         if (selectedOptions && selectedOptions.length > 0) {
//             selectedOptions.forEach((amenity, index) => {
//                 formData.append(`amenities[${index}]`, amenity);
//             });
//         }

//         // BedRoom - nested object
//         formData.append("BedRoom[bathrooms]", `${data.bathCommon || 0} Common + ${data.bathEnsuite || 0} Ensuite`);
//         formData.append("BedRoom[balcony]", "");

//         const additionalRooms = [
//             data.masterBedroom ? "Master Bedroom" : null,
//             data.guestRoom ? "Guest Room" : null,
//             data.childRoom ? "Child Room" : null,
//             data.otherRoom || null
//         ].filter(Boolean);

//         additionalRooms.forEach((room, index) => {
//             formData.append(`BedRoom[additional_rooms][${index}]`, room);
//         });

//         // Feacture - nested object fields
//         formData.append("Feacture[floor_no]", data.propertyOnFloor || "");
//         formData.append("Feacture[total_floor]", data.totalFloor || "");
//         formData.append("Feacture[age_of_property]", data.ageProperty || "");
//         formData.append("Feacture[facing]", data.facing || "");
//         formData.append("Feacture[flooring]", data.flooring || "");

//         // Lease_Rent - nested object fields
//         formData.append("Lease_Rent[monthly_rent]", data.rentPerMonth || "");
//         formData.append("Lease_Rent[security_deposit]", data.securityDeposit || "");
//         formData.append("Lease_Rent[lock_in_period]", data.lockinPeriod ? `${data.lockinPeriod} months` : "");
//         formData.append("Lease_Rent[maintenance]", data.maintenanceCharges || "");
//         formData.append("Lease_Rent[lease_period]", data.leasePeriod ? `${data.leasePeriod} months` : "");

//         // Video URL and Website Keywords (NEW)
//         formData.append("Video_url", data.videoUrl || "");
//         formData.append("website_keywords", data.websiteKeyword || "");

//         // Images
//         if (data.projectImages?.length > 0) {
//             [...data.projectImages].forEach((file) => {
//                 formData.append("Other_images", file);
//             });
//         }

//         // Document
//         if (data.document && data.document[0]) {
//             formData.append("Documents", data.document[0]);
//         }

//         // -------------------- DEBUG --------------------
//         console.log("📤 Sending Update for Property ID:", propertyId);
//         console.log("Images:", data.projectImages?.length || 0);
//         console.log("Document:", data.document?.[0]?.name || "None");

//         // -------------------- API CALL --------------------
//         try {
//             const result = await alldata({
//                 id: propertyId,
//                 formData
//             }).unwrap();

//             console.log("✅ Success:", result);
//             alert("Property submitted successfully!");

//             // Reset form
//             reset();
//             setStep(1);
//             setPropertyId(null);
//             setSelectedOptions([]);

//         } catch (err) {
//             console.error("❌ Error:", err);
//             alert("Failed: " + (err?.data?.message || "Server error"));
//         }
//     };
//     const unitOptions = [
//         "Sq. Ft",
//         "Sq. Meter",
//         "Grounds",
//         "Anakadam",
//         "Root",
//         "Chataks",
//         "Guntha",
//         "Ares",
//         "Biswa",
//         "Acres",
//         "Perch",
//         "Bigha",
//         "Kottah",
//         "Hectares",
//         "Marla",
//         "Kanal",
//         "Cents",
//         "Sq. Yard",
//         "Kanal (CHD)",
//         "Marla (CHD)",
//         "Ganda",
//         "Lecha"
//     ];
//     const forOptions = ["Rent/Lease", "Re-Development", "Joint Ventures", "Services", "PG", "Lease", "Sale"];

//     const propertyTypeOptions = [
//         "Residential Apartment", "Residential House/Villa", "Residential independent/Builder Floor", "Residential Studio Apartment", "Residential Farm House", "Guest house/banquest hall", "Residential Row House", "Guest house/banquest hall", "Residential Row house", "Ressidential  Twin Bungalow", "Residential Twins Apartment",
//         "Residenital duplex", "Residenital terracee", "Residenital Tenement", "Residenital Triplex", "Residenital basement", "Residenital Row Villa", "Residential Building", "Commercial Services Apartment", "Commercial Time share", "Commercial Office in IT Park", "Commercial Business center", "Commercial Hotel/Resort", "Commercial Financial Institution",
//         "Commercial Medical/Hospital Premise", "Corporate House", "Commercial Institutes", "Commercial Restaurant", "Cmmercial Flat", "Commercial Education Institues", "Commercial Built To suit", "Home stay", "Commercial Multiplex", "Commercial basement", "Commercial Shop Cum Flat(SCF)",
//         "Commercial Booth", "Cloud Kitchen", "Institutional Building", "Corporate Building", "Educational Building", "Hostels",
//         "Industrial", "Industrial Factory", "Industrial Manufactuing", "Industrial Building", "Industrial Shed/Gala", "Land/Plot", "Resident Land/Plot ", "Commercial Land/Plot", "Agricultural Farm/Land", "Transfer of Development Right (TDR)", "Party Plot", "Amenity Land ", "Instititional Plot", "Corporate Plots ", "OPen Plot", "Residential Twin Bungalow"];

//     const transactionOptions = [
//         "New", "Resale", "Pre Launch", "Individual", "Company", "Distress Sale", "Group Booking", "individual/Company"];

//     const ownershipOptions = [
//         "Freehold", "Lease Hold", "Co-operative Society", "Power of Attomey", "Power of Attorney"
//     ];

//     const bedroomOptions = ["1 BHK", "1.5 BHK", "2 BHK", "2.5 BHK", "3 BHK", "3.5 BHK", "4 BHK", "4.5 BHK", "5 BHK", "5.5 BHK", "6 BHK", "6.5 BHK", "7 BHK", "7.5 BHK", "8 BHK", "8.5 BHK", "9 BHK", "9.5 BHK"];

//     const furnishingOptions = [
//         "Unfurnished",
//         "Semi Furnished",
//         "Fully Furnished", "Ready to Furnished", "Bareshell", "Warmshell"
//     ];

//     const suitableForOptions = [
//         "Bank", "Cafe", "Cinema", "Clinic", "Corporate House"
//     ];

//     const uniqueFeatureOptions = [
//         "Corner Property",
//         "Park Facing",
//         "Main Road Facing",
//         "Sea View",
//         "Mountain View",
//         "Pool View"
//     ];
//     const mapRef = useRef(null);


//     const unitToSqFt = {
//         "Sq. Ft": 1,
//         "Sq. Meter": 10.7639,
//         "Grounds": 2400,
//         "Anakadam": 72,
//         "Root": 121,
//         "Chataks": 180,
//         "Guntha": 1089,
//         "Ares": 1076.39,
//         "Biswa": 1361,
//         "Acres": 43560,
//         "Perch": 272.25,
//         "Bigha": 27225,
//         "Kottah": 720,
//         "Hectares": 107639,
//         "Marla": 272.25,
//         "Kanal": 5445,
//         "Cents": 435.6,
//         "Sq. Yard": 9,
//         "Kanal (CHD)": 5445,
//         "Marla (CHD)": 272.25,
//         "Ganda": 36,
//         "Lecha": 144
//     };


//     // FLOORING OPTIONS
//     const flooringOptions = [
//         "Marble", "Tiles", "Others", "Vitrified", "Wodden", "Kota", "Mosaic", "Trimex", "Ceramic", "Granite"
//     ];

//     // FACING OPTIONS
//     const facingOptions = [
//         "East",
//         "West",
//         "North",
//         "South",
//         "North-East",
//         "North-West",
//         "South-East",
//         "South-West"
//     ];

//     // AMENITIES OPTIONS
//     const options = [

//         // ===== FIRST + SECOND IMAGE OPTIONS (Already Added Earlier) =====
//         "24/7 Security",
//         "Activity Area",
//         "Air Conditioning",
//         "Air Conditioning Unit",
//         "Amphitheatre",
//         "Astro Deck",
//         "Automated Car Parking System",
//         "Badminton Court",
//         "Balcony",
//         "Bank & ATM Facility",
//         "Banquet Hall",
//         "Barbeque Counter",

//         "Basket Ball Court",
//         "Bed",
//         "Business Lounge",
//         "Butterfly Park",
//         "Cabana",
//         "Cabana Cafe",
//         "Cafeteria",
//         "CCTV",
//         "Chess Area",
//         "Chemistry",
//         "Chit Chat Nook",
//         "Clubhouse",
//         "Community Hall",
//         "Conference Room", "Conventional Fire Detection and Alarm System", "Coworking Space",
//         "Cricket Net", "Cricket Pitch", "Curtains", "Dining Table", "Drainage System",
//         "Earthquake Resistant", "Electrical Connection", "Entrance Car Access",
//         "Entrance Towers Parking", "Entry Gate", "EV Charging Station", "Exhaust Fan", "Fans",
//         "Fire Hydrant System", "Fitness Center", "Fully Air Conditioned Grand Entrance Lobby",
//         "Game Zone", "Garden", "Garden View", "Gas Connection", "Gated Community", "Geyser",
//         "Gazebo", "Grand Entrance Lobby", "Guard House", "Gym", "Hammock Area", "Health Club",
//         "Herb Garden", "Herbal Garden", "High Ceilings", "High Speed Elevators", "Indoor Games",
//         "Inhouse Restaurant", "Intercom", "Intercom Connectivity", "Internet Connection",
//         "Island Seating", "Jacuzzi", "Jogging Track", "Kids Activity Room", "Kids Play Area",
//         "Kids Pool", "Lake View", "Lake Viewing Deck", "Landscaped Garden", "Lap Pool",
//         "Large Windows / Natural Light", "Laundry", "Lawn", "Lift", "Lights",
//         "Lockers Facility", "Look Out Bar", "Lounge", "Maintenance Staff", "Meditation Platform",
//         "Meditation Play Zone", "Microwave", "Mini Theatre", "Modular Kitchen",
//         "Multiple Play Court",

//         "Multi Music Room", "Multipurpose Hall", "North West Stand", "Outdoor Games", "Outdoor Gym",
//         "Parking", "Partial Sea View", "Party Hall", "Party Lawn", "Party Lounge",
//         "Pedestrian Entrance Plaza", "Performance Stage", "Pergola Sitting Area", "Personal Lift",
//         "Pet Park", "Play Area", "Pool Area", "Pool Deck", "Portable Fire Extinguishers",
//         "Power Backup", "Private Compound", "Private Passage", "Projection Screen",
//         "Rain Water Harvesting", "Reading Alcove", "Receiving Station", "Reflexology Zone",
//         "Refrigerator", "Relaxing Steam Room", "Reserved Park", "Reserved Parking",
//         "Road Up To Plot", "Rock Climbing Wall", "Roof Top Garden", "Roof Top Landscaping",
//         "Seating Corner", "Seating Lounger", "Security", "Senior Citizen Area",
//         "Servant Quarter", "Service Counter",

//         "Sewage Treatment", "Shower Room", "Skating Area", "Sky Landscaping Party Lawn",
//         "Sky Garden", "Sky Lounge", "Sky Walk Way", "Sky Yoga",
//         "Smoke Aspiration Detection System (VESDA)", "Society Office", "Sofa", "Solar System",
//         "Spa", "Squash Court", "Stainless Steel Appliances", "Storm Water Drains", "Stove",
//         "Street Light", "Sub Station", "Swimming Pool", "Temple", "Tennis Court",
//         "Tennis Terrace", "Theatre Room", "Toilet", "Tree House", "Tree Planting", "UPS",
//         "Vaastu", "Valet Parking", "Vaastu Compliant", "Vegetation Strip", "Video Door Phone",
//         "Viewing Gallery", "Waiting Lounge", "Wardrobe", "WiFi Zone", "Yoga", "Yoga Center",


//     ];

//     // ADVERTISEMENT OPTIONS
//     const advertisementOptions = [
//         "Banner",
//         "Website Listing",
//         "Premium Listing",
//         "Social Media",
//         "No Advertisement"
//     ];

//     // AGE OF PROPERTY OPTIONS
//     const agePropertyOptions = [

//         "Under Construction", "Less Than 5 years", "5-10 Years", "10-20 Years", "More Than 20  years ", "Less Than 6 months", "Less than 1 year", "Less than 1.5years", "Less than 2 years", "Less than 3 Years", "New", "Ready For Sale"


//     ];

//     // AVAILABILITY OPTIONS
//     const availabilityOptions = [
//         "Immediate",
//         "Within 1 Month",
//         "Within 3 Months",
//         "Within 6 Months",
//         "Ready to Move",
//         "Under Construction"
//     ];


//     const [priceNumber, setPriceNumber] = useState("");
//     const [showDropdown, setShowDropdown] = useState(false);
//     const [pricePerUnit, setPricePerUnit] = useState("");

//     const area = watch("area");
//     const areaUnit = watch("areaUnit");
//     const expectedCalcValue = watch("expectedCalc");

//     const [address, setAddress] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [position, setPosition] = useState(null);
//     const [latLng, setLatLng] = useState({ lat: "", lng: "" });

//     // AUTO CALCULATION OF PRICE PER UNIT
//     React.useEffect(() => {
//         if (area && areaUnit && expectedCalcValue) {
//             const baseSqFt = Number(area) * (unitToSqFt[areaUnit] || 1);
//             const perUnit = expectedCalcValue / baseSqFt;
//             setPricePerUnit(perUnit.toFixed(2));
//         }
//     }, [area, areaUnit, expectedCalcValue]);

//     // Auto location
//     useEffect(() => {
//         if (!navigator.geolocation) {
//             console.log("Geolocation is not supported");
//             return;
//         }

//         let watcher = null;

//         watcher = navigator.geolocation.watchPosition(
//             (pos) => {
//                 const lat = pos.coords.latitude;
//                 const lng = pos.coords.longitude;

//                 // Set map marker position
//                 setPosition([lat, lng]);

//                 // 👉 Set latitude & longitude into input fields
//                 setLatLng({ lat, lng });

//                 // Center map
//                 if (mapRef.current) {
//                     mapRef.current.setView([lat, lng], 16);
//                 }

//                 // Fetch address
//                 setLoading(true);
//                 fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`)
//                     .then(res => res.json())
//                     .then(data => {
//                         setAddress(data.display_name || "Location found");
//                     })
//                     .catch(() => setAddress(`Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`))
//                     .finally(() => setLoading(false));

//                 // Stop watching after accuracy threshold
//                 if (pos.coords.accuracy <= 50) {
//                     navigator.geolocation.clearWatch(watcher);
//                     console.log("High accuracy location found & watcher stopped");
//                 }
//             },
//             (error) => {
//                 console.log("GPS Error:", error.message);
//                 setAddress("Location access denied or unavailable");
//             },
//             {
//                 enableHighAccuracy: true,
//                 timeout: 15000,
//                 maximumAge: 0
//             }
//         );

//         return () => {
//             if (watcher) navigator.geolocation.clearWatch(watcher);
//         };
//     }, []);

//     function LocationMarker() {
//         useMapEvents({
//             click(e) {
//                 const { lat, lng } = e.latlng;

//                 setPosition([lat, lng]);

//                 // 👉👇 NEW — Lat/Lng set in state
//                 setLatLng({ lat, lng });

//                 setLoading(true);
//                 setAddress("Fetching address...");

//                 fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`)
//                     .then(res => res.json())
//                     .then(data => setAddress(data?.display_name || `Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`))
//                     .catch(() => setAddress("Address not found"))
//                     .finally(() => setLoading(false));
//             },
//         });

//         return position ? <Marker position={position} icon={markerIcon}></Marker> : null;
//     }

//     useEffect(() => {
//         const today = new Date().toISOString().split("T")[0];
//         setValue("requestDate", today); // force set (always works)
//     }, [setValue])

//     const steps = [
//         { id: 1, label: "Owner Detail", },
//         { id: 2, label: "Contact Information", },
//         { id: 3, label: "Location", },
//         { id: 4, label: "Area and Pricing", },
//         { id: 5, label: "Additional Pricing Details", },
//         { id: 6, label: "Other details", },
//     ];

//     return (
//         <div className=" mx-auto p-5">

//             {/* TOP STEPPER */}
//             <div className="flex items-center justify-between w-full py-10 max-w-xl mx-auto">
//                 {steps.map((s, i) => (
//                     <React.Fragment key={i}>
//                         {/* Circle */}
//                         <div
//                             className={`flex items-center justify-center text-white font-bold rounded-full w-12 h-12 text-lg transition-all duration-300 ${step >= s.id ? 'bg-yellow-500' : 'bg-gray-400'
//                                 }`}
//                         >
//                             {i + 1}
//                         </div>

//                         {/* Line between circles */}
//                         {i < steps.length - 1 && (
//                             <div
//                                 className={`flex-1 h-1 mx-2 transition-all duration-300 ${step > s.id ? 'bg-yellow-500' : 'bg-gray-400'
//                                     }`}
//                             />
//                         )}
//                     </React.Fragment>
//                 ))}
//             </div>
//             {/* FORM */}
//             <form onSubmit={handleSubmit(onSubmit)}>

//                 {step === 1 && (
//                     <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 md:p-8">
//                         <h3 className="text-center text-xl font-semibold mb-6">
//                             Give us some information about Owner / Landlord
//                         </h3>

//                         {/* 2 COLUMN LAYOUT START */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//                             {/* OWNER */}
//                             <div>
//                                 <label className="font-semibold">Owner *</label>

//                                 <input
//                                     type="text"
//                                     {...register("owner", { required: "Owner is required" })}
//                                     className={input}
//                                     placeholder="Enter Owner Name"
//                                 />

//                                 {errors.owner && (
//                                     <p className="text-red-500 text-sm">{errors.owner.message}</p>
//                                 )}
//                             </div>

//                         </div>
//                         {/* 2 COLUMN LAYOUT END */}

//                         <div className="flex justify-end mt-8 gap-4">

//                             <button
//                                 type="button"
//                                 onClick={goToNext}
//                                 className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//                             >
//                                 Next →
//                             </button>
//                         </div>
//                     </div>

//                 )}
//                 {step === 2 && (
//                     <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 md:p-8">
//                         <h3 className="text-center text-xl font-semibold mb-6">
//                             Give us some information about Owner / Landlord
//                         </h3>

//                         {/* 2 COLUMN LAYOUT START */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">



//                             {/* REQUEST DATE */}
//                             <div>
//                                 <label className="font-semibold block">Request Date *</label>
//                                 <input
//                                     type="date"
//                                     {...register("requestDate", { required: "Request date is required" })}
//                                     readOnly
//                                     className={`${input} bg-gray-100 cursor-not-allowed`}
//                                 />
//                                 {errors.requestDate && (
//                                     <p className="text-red-500 text-sm">{errors.requestDate.message}</p>
//                                 )}
//                             </div>



//                             {/* FOR */}
//                             <div>
//                                 <label className="font-semibold block">For *</label>
//                                 <select {...register("for", { required: "For is required" })} className={input}>
//                                     <option value="">Select</option>
//                                     {forOptions.map((o) => (
//                                         <option key={o}>{o}</option>
//                                     ))}
//                                 </select>
//                                 {errors.for && <p className="text-red-500 text-sm">{errors.for.message}</p>}
//                             </div>

//                             {/* PROPERTY TYPE */}
//                             <div>
//                                 <label className="font-semibold block">Property Type *</label>
//                                 <select {...register("propertyType")} className={input}>
//                                     <option value="">Select</option>
//                                     {propertyTypeOptions.map((o) => (
//                                         <option key={o}>{o}</option>
//                                     ))}
//                                 </select>
//                                 {errors.propertyType && <p className="text-red-500 text-sm">{errors.propertyType.message}</p>}
//                             </div>

//                             {/* TRANSACTION */}
//                             <div>
//                                 <label className="font-semibold block">Transaction</label>
//                                 <select {...register("transaction")} className={input}>
//                                     <option value="">Select</option>
//                                     {transactionOptions.map((o) => (
//                                         <option key={o}>{o}</option>
//                                     ))}
//                                 </select>
//                             </div>

//                             {/* OWNERSHIP */}
//                             <div>
//                                 <label className="font-semibold block">Ownership</label>
//                                 <select {...register("ownership")} className={input}>
//                                     <option value="">Select</option>
//                                     {ownershipOptions.map((o) => (
//                                         <option key={o}>{o}</option>
//                                     ))}
//                                 </select>
//                             </div>

//                             {/* BEDROOM */}
//                             <div>
//                                 <label className="font-semibold block">Bedroom</label>
//                                 <select {...register("bedroom")} className={input}>
//                                     <option value="">Select</option>
//                                     {bedroomOptions.map((o) => (
//                                         <option key={o}>{o}</option>
//                                     ))}
//                                 </select>
//                             </div>

//                             {/* FURNISHING */}
//                             <div>
//                                 <label className="font-semibold block">Furnishing</label>
//                                 <select {...register("furnishing")} className={input}>
//                                     <option value="">Select</option>
//                                     {furnishingOptions.map((o) => (
//                                         <option key={o}>{o}</option>
//                                     ))}
//                                 </select>
//                             </div>

//                             {/* SUITABLE FOR */}
//                             <div>
//                                 <label className="font-semibold block">Suitable For</label>
//                                 <select {...register("suitableFor")} className={input}>
//                                     <option value="">Select</option>
//                                     {suitableForOptions.map((o) => (
//                                         <option key={o}>{o}</option>
//                                     ))}
//                                 </select>
//                             </div>

//                             {/* UNIQUE FEATURE */}
//                             <div>
//                                 <label className="font-semibold block">Unique Feature</label>
//                                 <select {...register("uniqueFeature")} className={input}>
//                                     <option value="">Select</option>
//                                     {uniqueFeatureOptions.map((o) => (
//                                         <option key={o}>{o}</option>
//                                     ))}
//                                 </select>
//                             </div>

//                             {/* DESCRIPTION */}
//                             <div className="md:col-span-2">
//                                 <label className="font-semibold block">Description</label>
//                                 <textarea {...register("description")} rows="3" className={input} />
//                             </div>

//                         </div>
//                         {/* 2 COLUMN LAYOUT END */}

//                         <div className="flex justify-end mt-8 gap-4">

//                             <button
//                                 type="button"
//                                 onClick={goToNext}
//                                 className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//                             >
//                                 Next →
//                             </button>
//                         </div>
//                     </div>

//                 )}



//                 {/* ------------------------ STEP 3 ------------------------- */}
//                 {step === 3 && (
//                     <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 md:p-8">
//                         <div className=" mx-auto space-y-5">

//                             {/* MAP */}
//                             <div className="rounded-2xl overflow-hidden border-4 border-blue-200 mt-20">
//                                 <div className="relative w-full">
//                                     <MapContainer
//                                         center={[23.5, 82.5]}
//                                         zoom={5.5}
//                                         minZoom={5}
//                                         maxZoom={18}
//                                         scrollWheelZoom={true}
//                                         style={{ height: "45vh", width: "100%", position: "relative", zIndex: 1 }}
//                                         maxBounds={[
//                                             [6.0, 68.0],
//                                             [37.5, 97.5],
//                                         ]}
//                                         maxBoundsViscosity={1.0}
//                                         ref={mapRef}
//                                     >
//                                         <TileLayer
//                                             attribution="Map data © OpenStreetMap contributors"
//                                             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                                         />
//                                         <LocationMarker />
//                                     </MapContainer>
//                                 </div>
//                             </div>

//                             {/* Address from map */}
//                             <div className="flex flex-col md:flex-row gap-3">
//                                 <input
//                                     type="text"
//                                     readOnly
//                                     value={loading ? "Loading..." : address || "Click on the map to get address"}
//                                     className="w-full px-5 py-2 text-base bg-gray-50 border-2 border-gray-300 rounded-lg"
//                                 />
//                             </div>

//                             {/* Lat Long */}
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//                                 <div>
//                                     <label className="block mb-1 font-semibold">Latitude</label>
//                                     <input
//                                         type="text"
//                                         value={latLng.lat}
//                                         readOnly
//                                         // name="latitude"
//                                         className="w-full border rounded px-3 py-2"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block mb-1 font-semibold">Longitude</label>
//                                     <input
//                                         type="text"
//                                         value={latLng.lng}
//                                         readOnly
//                                         // name="longitude"
//                                         className="w-full border rounded px-3 py-2"
//                                     />
//                                 </div>

//                             </div>
//                         </div>

//                         {/* MORE FIELDS */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             {[
//                                 { name: "flatUnit", label: "Flat/Office/Unit No." },
//                                 { name: "surveyNumber", label: "Survey Number" },
//                                 { name: "surveyName", label: "Survey Name" },
//                                 { name: "developerName", label: "Developer Name" },
//                                 { name: "street", label: "Street" },
//                                 { name: "landmark", label: "Landmark" },
//                                 { name: "pinCode", label: "Pin Code" },
//                                 { name: "building/Tower/Project", label: "building/Tower/Project" },
//                             ].map((f) => (
//                                 <div key={f.name} className="mt-4">
//                                     <label className="font-semibold">{f.label}</label>
//                                     <input {...register(f.name)} className="w-full p-2 border rounded" />
//                                 </div>
//                             ))}
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

//                             {/* CITY */}
//                             <div>
//                                 <label className="font-semibold block">City *</label>
//                                 <select
//                                     {...register("city", { required: "City is required" })}
//                                     className="w-full p-2 border rounded"
//                                 >
//                                     {options.map((o) => (
//                                         <option key={o}>{o}</option>
//                                     ))}
//                                 </select>
//                                 {errors.city && <p className="text-red-500">{errors.city.message}</p>}
//                             </div>

//                             {/* LOCALITY */}
//                             <div>
//                                 <label className="font-semibold block">Locality *</label>
//                                 <select
//                                     {...register("locality", { required: "Locality is required" })}
//                                     className="w-full p-2 border rounded"
//                                 >
//                                     {options.map((o) => (
//                                         <option key={o}>{o}</option>
//                                     ))}
//                                 </select>
//                                 {errors.locality && <p className="text-red-500">{errors.locality.message}</p>}
//                             </div>
//                         </div>

//                         {/* BUTTONS */}
//                         <div className="flex justify-between mt-10">
//                             <button
//                                 type="button"
//                                 onClick={goToPrevious}
//                                 className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//                             >
//                                 Previous
//                             </button>
//                             <button
//                                 type="button"
//                                 onClick={goToNext}
//                                 className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                             >
//                                 Next →
//                             </button>
//                         </div>
//                     </div>
//                 )}
//                 {step === 4 && (
//                     <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 md:p-8">
//                         <h3 className="text-center text-2xl font-semibold mb-10 text-gray-800">
//                             Area & Pricing Details
//                         </h3>

//                         {/* ---------- AREA 2 COLUMN SECTION ---------- */}
//                         <div className="grid grid-cols-2 gap-8">

//                             {/* LEFT COLUMN */}
//                             <div className="space-y-6">
//                                 <div>
//                                     <label className={labelBox}>Area *</label>
//                                     <input {...register("area")} className={input} />
//                                 </div>

//                                 <div>
//                                     <label className={labelBox}>Built-Up Area</label>
//                                     <input {...register("builtUpArea")} className={input} />
//                                 </div>

//                                 <div>
//                                     <label className={labelBox}>Carpet Area</label>
//                                     <input {...register("carpetArea")} className={input} />
//                                 </div>

//                                 <div>
//                                     <label className={labelBox}>Terrace Area</label>
//                                     <input {...register("terraceArea")} className={input} />
//                                 </div>

//                                 <div>
//                                     <label className={labelBox}>Area Range</label>
//                                     <input {...register("areaRange")} className={input} />
//                                 </div>

//                                 <div>
//                                     <label className={labelBox}>Plot Area</label>
//                                     <input {...register("plotArea")} className={input} />
//                                 </div>
//                             </div>

//                             {/* RIGHT COLUMN (Units) */}
//                             <div className="space-y-6">
//                                 {[
//                                     "areaUnit",
//                                     "builtUpUnit",
//                                     "carpetUnit",
//                                     "terraceUnit",
//                                     "areaRangeUnit",
//                                     "plotAreaUnit"
//                                 ].map((field, idx) => (
//                                     <div key={idx}>
//                                         <label className={labelBox}>Unit</label>
//                                         <select {...register(field)} className={input}>
//                                             <option value="">Select</option>
//                                             {unitOptions.map((opt, i) => (
//                                                 <option key={i} value={opt}>{opt}</option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>


//                         {/* BUTTONS */}
//                         <div className="flex justify-between mt-10">
//                             <button
//                                 type="button"
//                                 onClick={goToPrevious}
//                                 className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//                             >
//                                 Previous
//                             </button>
//                             <button
//                                 type="button"
//                                 onClick={goToNext}
//                                 className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                             >
//                                 Next →
//                             </button>
//                         </div>
//                     </div>
//                 )}
//                 {step === 5 && (
//                     <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 md:p-8">

//                         {/* ---------- ADDITIONAL PRICING DETAILS ---------- */}
//                         <h3 className={sectionTitle}>Additional Pricing Details</h3>

//                         {/* ---------- EXPECTED PRICE + PRICE PER UNIT (SIDE BY SIDE) ---------- */}
//                         <div className="grid grid-cols-2 gap-6 mb-6">

//                             {/* EXPECTED PRICE + DROPDOWN */}
//                             <div className="relative">
//                                 <label className={labelBox}>Expected Price *</label>

//                                 <input
//                                     type="number"
//                                     className={input}
//                                     placeholder="Enter Number (e.g. 3)"
//                                     value={priceNumber}
//                                     onChange={(e) => setPriceNumber(e.target.value)}
//                                     onFocus={() => setShowDropdown(true)}
//                                 />

//                                 {/* ▼ BUTTON
//                                 <button
//                                     type="button"
//                                     onClick={() => setShowDropdown(!showDropdown)}
//                                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
//                                 >
//                                     ▼
//                                 </button> */}

//                                 {/* OPTIONS */}
//                                 {showDropdown && priceNumber && (
//                                     <div className="absolute bg-white shadow-lg border rounded w-full mt-1 z-[999]">

//                                         <div
//                                             className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
//                                             onClick={() => {
//                                                 setValue("expectedPrice", `${priceNumber} Th`);
//                                                 setValue("expectedCalc", priceNumber * 1000);
//                                                 setShowDropdown(false);
//                                             }}
//                                         >
//                                             {priceNumber} Th
//                                         </div>

//                                         <div
//                                             className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
//                                             onClick={() => {
//                                                 setValue("expectedPrice", ` ${priceNumber} Lac`);
//                                                 setValue("expectedCalc", priceNumber * 100000);
//                                                 setShowDropdown(false);
//                                             }}
//                                         >
//                                             {priceNumber} Lac
//                                         </div>

//                                         <div
//                                             className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
//                                             onClick={() => {
//                                                 setValue("expectedPrice", `${priceNumber} Cr`);
//                                                 setValue("expectedCalc", priceNumber * 10000000);
//                                                 setShowDropdown(false);
//                                             }}
//                                         >
//                                             {priceNumber} Cr
//                                         </div>

//                                     </div>
//                                 )}
//                             </div>

//                             {/* PRICE PER UNIT */}
//                             <div>
//                                 <label className={labelBox}>
//                                     Price Per {areaUnit || "Unit"}
//                                 </label>

//                                 <input
//                                     value={pricePerUnit}
//                                     readOnly
//                                     className={input}
//                                     placeholder="0.00"
//                                 />
//                             </div>

//                         </div>

//                         {/* Maintenance / Deposit / JV */}
//                         <div className="grid grid-cols-3 gap-6 mb-6">

//                             <div>
//                                 <label className={labelBox}>Maintenance Charges</label>
//                                 <input {...register("maintenanceCharges")} className={input} />
//                             </div>

//                             <div>
//                                 <label className={labelBox}>Security Deposit</label>
//                                 <input {...register("securityDeposit")} className={input} />
//                             </div>

//                             <div>
//                                 <label className={labelBox}>JV Ratio</label>
//                                 <input {...register("jvRatio")} className={input} />
//                             </div>

//                         </div>

//                         {/* CHECKBOXES — 4 IN ONE LINE */}
//                         <div className="grid grid-cols-4 gap-6 mb-12">

//                             <label className="flex items-center gap-2">
//                                 <input type="checkbox" {...register("negotiableApplicable")} />
//                                 Negotiable Applicable
//                             </label>

//                             <label className="flex items-center gap-2">
//                                 <input type="checkbox" {...register("paidByLicensor")} />
//                                 Paid By Licensor
//                             </label>

//                             <label className="flex items-center gap-2">
//                                 <input type="checkbox" {...register("negotiable")} />
//                                 Negotiable
//                             </label>

//                             <label className="flex items-center gap-2">
//                                 <input type="checkbox" {...register("refundable")} />
//                                 Refundable
//                             </label>

//                         </div>

//                         {/* ---------- PRE LEASE DETAILS ---------- */}
//                         <h3 className="text-xl font-semibold text-gray-800 text-center mb-6">
//                             Pre Lease / Pre Rented Details
//                         </h3>

//                         <div className="space-y-4">

//                             {/* Row 1 */}
//                             <div className="flex gap-6">
//                                 <div className="flex-1">
//                                     <label className={labelBox}>Lock-in Period (Years)</label>
//                                     <input {...register("lockinPeriod")} className={input} />
//                                 </div>

//                                 <div className="flex-1">
//                                     <label className={labelBox}>Lease Period (Months)</label>
//                                     <input {...register("leasePeriod")} className={input} />
//                                 </div>
//                             </div>

//                             {/* Row 2 */}
//                             <div className="flex gap-6">
//                                 <div className="flex-1">
//                                     <label className={labelBox}>Lease Hold Charges</label>
//                                     <input {...register("leaseHoldCharges")} className={input} />
//                                 </div>

//                                 <div className="flex-1">
//                                     <label className={labelBox}>Commission Payable (Landlord)</label>
//                                     <input {...register("commissionLandlord")} className={input} />
//                                 </div>
//                             </div>

//                             {/* Row 3 */}
//                             <div className="flex gap-6">
//                                 <div className="flex-1">
//                                     <label className={labelBox}>Rent Free Period (Days)</label>
//                                     <input {...register("rentFreeDays")} className={input} />
//                                 </div>

//                                 <div className="flex-1">
//                                     <label className={labelBox}>Rent Start Date</label>
//                                     <input type="date" {...register("rentStartDate")} className={input} />
//                                 </div>
//                             </div>

//                             {/* Row 4 */}
//                             <div className="flex gap-6">
//                                 <div className="flex-1">
//                                     <label className={labelBox}>Rent Per Month</label>
//                                     <input {...register("rentPerMonth")} className={input} />
//                                 </div>

//                                 <div className="flex-1">
//                                     <label className={labelBox}>MSEB Charges</label>
//                                     <input {...register("msebCharges")} className={input} />
//                                 </div>
//                             </div>

//                             {/* Row 5 */}
//                             <div className="flex gap-6">
//                                 <div className="flex-1">
//                                     <label className={labelBox}>Rent Escalation (%)</label>
//                                     <input {...register("rentEscalation")} className={input} />
//                                 </div>

//                                 <div className="flex-1">
//                                     <label className={labelBox}>Property Tax</label>
//                                     <input {...register("propertyTax")} className={input} />
//                                 </div>
//                             </div>

//                             {/* ROI */}
//                             <div>
//                                 <label className={labelBox}>ROI (%)</label>
//                                 <input {...register("roi")} className={input} />
//                             </div>
//                         </div>

//                         {/* BUTTONS */}
//                         <div className="flex justify-between mt-10">
//                             <button
//                                 type="button"
//                                 onClick={goToPrevious}
//                                 className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//                             >
//                                 Previous
//                             </button>
//                             <button
//                                 type="button"
//                                 onClick={goToNext}
//                                 className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                             >
//                                 Next →
//                             </button>
//                         </div>
//                     </div>
//                 )}

//                 {/* ------------------------ STEP 5 ------------------------- */}
//                 {step === 6 && (
//                     <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 md:p-8">
//                         <h3 className="text-center text-2xl font-semibold mb-10 text-gray-800">
//                             BedRoom Details
//                         </h3>

//                         {/* ----------- BEDROOM DETAILS (3 FIELDS IN A ROW) ------------- */}
//                         <div className="grid grid-cols-3 gap-6 mb-3">

//                             <div>
//                                 <label className={label}>Master Bedroom</label>
//                                 <input {...register("masterBedroom")} className={input} />
//                             </div>

//                             <div>
//                                 <label className={label}>Guest Room</label>
//                                 <input {...register("guestRoom")} className={input} />
//                             </div>

//                             <div>
//                                 <label className={label}>Child Room</label>
//                                 <input {...register("childRoom")} className={input} />
//                             </div>
//                         </div>

//                         {/* ----------- BATHROOM ROW (COMMON + ENSUITE) ------------- */}
//                         <div className="grid grid-cols-2 gap-6 mb-3">
//                             <div>
//                                 <label className={label}>Bathroom (Common)</label>
//                                 <input {...register("bathCommon")} className={input} />
//                             </div>
//                             <div>
//                                 <label className={label}>Bathroom (Ensuite)</label>
//                                 <input {...register("bathEnsuite")} className={input} />
//                             </div>
//                         </div>





import React from 'react'

const Practice = () => {
  return (
    <div>Practice</div>
  )
}

export default Practice