import React, { useState } from "react";
import { FaParking, FaBuilding, FaShieldAlt, FaTree, FaChild, FaPrayingHands, FaLightbulb, FaTint, FaBatteryFull, FaDumbbell } from "react-icons/fa";
const propertyTypes = ["Flat", "Row House", "Plot", "Shop"];
const bhkOptions = ["1 BHK", "2 BHK", "3 BHK", "4 BHK"];
const facingOptions = ["East", "West", "North", "South"];
const furnishingOptions = ["Unfurnished", "Semi", "Fully"];
const ageOptions = ["New", "0-2 years", "2-5 years", "5+ years"];

const DetailedForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        // Basic Details
        projectName: "",
        propertyType: "",
        bhk: "",
        floorNo: "",
        totalFloors: "",
        facing: "",
        furnishing: "",
        age: "",
        possession: "",
        availableFrom: "",
        // Area Details
        carpetArea: "",
        builtUpArea: "",
        plotArea: "",
        dimensions: "",
        roadWidth: "",
        // Pricing Details
        totalPrice: "",
        pricePerSqft: "",
        govtTaxes: "",
        maintenanceCharges: "",
        bookingAmount: "",
        otherCharges: "",
        // Location Details
        fullAddress: "",
        city: "",
        area: "",
        landmark: "",
        pincode: "",
        googleMap: "",
        nearbySchools: "",
        nearbyHospitals: "",
        nearbyMarkets: "",
        nearbyHighways: "",
        // Amenities
        amenities: [],
        // Description / Highlights
        description: "",
        sellingPoints: "",
        offers: "",
        // Builder Info
        builderName: "",
        builderLogo: "",
        builderBio: "",
        reraRegistration: "",
        builderLink: "",
    });



    const amenitiesList = [
        { name: "Parking", icon: <FaParking /> },
        { name: "Lift", icon: <FaBuilding /> },
        { name: "Security", icon: <FaShieldAlt /> },
        { name: "Garden", icon: <FaTree /> },
        { name: "Children Play Area", icon: <FaChild /> },
        { name: "Temple", icon: <FaPrayingHands /> },
        { name: "Street Lights", icon: <FaLightbulb /> },
        { name: "Water Supply", icon: <FaTint /> },
        { name: "Power Backup", icon: <FaBatteryFull /> },
        { name: "Club House / Gym", icon: <FaDumbbell /> },
    ];

    const handleNext = () => setStep(step + 1);
    const handlePrev = () => setStep(step - 1);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            if (checked) {
                setFormData({ ...formData, amenities: [...formData.amenities, value] });
            } else {
                setFormData({
                    ...formData,
                    amenities: formData.amenities.filter((a) => a !== value),
                });
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 mt-20 bg-gray-100 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Step {step}</h2>

            {/* Step 1: Basic Details */}
            {step === 1 && (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">

                        <div>
                            <label className="block mb-1 font-semibold">Project Name</label>
                            <input
                                type="text"
                                name="projectName"
                                value={formData.projectName}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div>
                            <div>
                                <label className="block mb-1 font-semibold">Property Type</label>
                                <select
                                    name="propertyType"
                                    value={formData.propertyType}
                                    onChange={handleChange}
                                    className="w-full border rounded px-3 py-2"
                                >
                                    <option value="">Select Property Type</option>
                                    {propertyTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Conditional fields */}
                            {formData.propertyType === "Flat" && (
                                <>
                                    <div>
                                        <label className="block mb-1 font-semibold">BHK</label>
                                        <select
                                            name="bhk"
                                            value={formData.bhk}
                                            onChange={handleChange}
                                            className="w-full border rounded px-3 py-2"
                                        >
                                            <option value="">Select BHK</option>
                                            {bhkOptions.map((bhk) => (
                                                <option key={bhk} value={bhk}>
                                                    {bhk}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label className="block mb-1 font-semibold">Floor No</label>
                                            <input
                                                type="number"
                                                name="floorNo"
                                                value={formData.floorNo}
                                                onChange={handleChange}
                                                className="w-full border rounded px-3 py-2"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label className="block mb-1 font-semibold">Total Floors</label>
                                            <input
                                                type="number"
                                                name="totalFloors"
                                                value={formData.totalFloors}
                                                onChange={handleChange}
                                                className="w-full border rounded px-3 py-2"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            {(formData.propertyType === "Row House" ||
                                formData.propertyType === "Plot") && (
                                    <div>
                                        <label className="block mb-1 font-semibold">Plot Area (sqft)</label>
                                        <input
                                            type="number"
                                            name="plotArea"
                                            value={formData.plotArea}
                                            onChange={handleChange}
                                            className="w-full border rounded px-3 py-2"
                                        />
                                    </div>
                                )}

                            {formData.propertyType === "Shop" && (
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <label className="block mb-1 font-semibold">Floor No</label>
                                        <input
                                            type="number"
                                            name="floorNo"
                                            value={formData.floorNo}
                                            onChange={handleChange}
                                            className="w-full border rounded px-3 py-2"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block mb-1 font-semibold">Total Floors</label>
                                        <input
                                            type="number"
                                            name="totalFloors"
                                            value={formData.totalFloors}
                                            onChange={handleChange}
                                            className="w-full border rounded px-3 py-2"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>


                    <div className="grid grid-cols-2 gap-4">

                        <div>
                            <label className="block mb-1 font-semibold">Facing</label>
                            <select
                                name="facing"
                                value={formData.facing}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="">Select Facing</option>
                                {facingOptions.map((face) => (
                                    <option key={face} value={face}>
                                        {face}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block mb-1 font-semibold">Furnishing</label>
                            <select
                                name="furnishing"
                                value={formData.furnishing}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="">Select Furnishing</option>
                                {furnishingOptions.map((furn) => (
                                    <option key={furn} value={furn}>
                                        {furn}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>


                    <div className="grid grid-cols-2 gap-4">

                        {/* Age of Property */}
                        <div>
                            <label className="block mb-1 font-semibold">Age of Property</label>
                            <select
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="">Select Age</option>
                                {ageOptions.map((age) => (
                                    <option key={age} value={age}>
                                        {age}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Possession */}
                        <div className="space-y-4">
                            <div>
                                <label className="block mb-1 font-semibold">Possession</label>
                                <select
                                    name="possessionType"
                                    value={formData.possessionType || ""}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            possessionType: e.target.value,
                                            possessionValue: "",
                                        })
                                    }
                                    className="w-full border rounded px-3 py-2"
                                >
                                    <option value="">Select Possession</option>
                                    <option value="Immediate">Immediate</option>
                                    <option value="Date">Date</option>
                                    <option value="UnderConstruction">Under Construction (Month-Year)</option>
                                    <option value="AvailableFrom">Available From</option>
                                </select>

                                {/* Dynamic Input */}
                                {formData.possessionType === "Date" && (
                                    <input
                                        type="date"
                                        name="possessionValue"
                                        value={formData.possessionValue || ""}
                                        onChange={handleChange}
                                        className="w-full mt-2 border rounded px-3 py-2"
                                    />
                                )}

                                {formData.possessionType === "UnderConstruction" && (
                                    <input
                                        type="month"
                                        name="possessionValue"
                                        value={formData.possessionValue || ""}
                                        onChange={handleChange}
                                        className="w-full mt-2 border rounded px-3 py-2"
                                    />
                                )}

                                {formData.possessionType === "Immediate" && (
                                    <input
                                        type="text"
                                        value="Immediate"
                                        readOnly
                                        className="w-full mt-2 border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
                                    />
                                )}

                                {formData.possessionType === "AvailableFrom" && (
                                    <input
                                        type="date"
                                        name="possessionValue"
                                        value={formData.possessionValue || ""}
                                        onChange={handleChange}
                                        className="w-full mt-2 border rounded px-3 py-2"
                                    />
                                )}
                            </div>
                        </div>

                    </div>


                </div>
            )}

            {/* Step 2: Area Details */}
            {step === 2 && (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">

                        <div>
                            <label className="block mb-1 font-semibold">Carpet Area (sqft)</label>
                            <input
                                type="number"
                                name="carpetArea"
                                value={formData.carpetArea}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-semibold">
                                Plot Area (for Row House / Bungalow / Plot)
                            </label>

                            <select
                                name="plotAreaType"
                                value={formData.plotAreaType || ""}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="">Select Type</option>
                                <option value="Row House">Row House</option>
                                <option value="Bungalow">Bungalow</option>
                                <option value="Plot">Plot</option>
                            </select>
                        </div>

                    </div>


                    <div>
                        <label className="block mb-1 font-semibold">Dimensions (optional)</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                name="length"
                                placeholder="Length"
                                value={formData.length || ""}
                                onChange={handleChange}
                                className="flex-1 border rounded px-3 py-2"
                            />
                            <input
                                type="text"
                                name="width"
                                placeholder="Width"
                                value={formData.width || ""}
                                onChange={handleChange}
                                className="flex-1 border rounded px-3 py-2"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 font-semibold">Road Width (उदा. 9 m, 12 m)</label>
                        <input
                            type="text"
                            name="roadWidth"
                            value={formData.roadWidth}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                </div>
            )}

            {/* Step 3: Pricing Details */}
            {step === 3 && (
                <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">

                        <div>
                            <label className="block mb-1 font-semibold">Total Price</label>
                            <input
                                type="number"
                                name="totalPrice"
                                value={formData.totalPrice}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-semibold">Price per sqft</label>
                            <input
                                type="number"
                                name="pricePerSqft"
                                value={formData.pricePerSqft}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-semibold">Govt. taxes extra?</label>
                            <select
                                name="govtTaxes"
                                value={formData.govtTaxes}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>

                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div>
                            <label className="block mb-1 font-semibold">Maintenance Charges</label>
                            <input
                                type="number"
                                name="maintenanceCharges"
                                value={formData.maintenanceCharges}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-semibold">Booking Amount</label>
                            <input
                                type="number"
                                name="bookingAmount"
                                value={formData.bookingAmount}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                    </div>

                    <div>
                        <label className="block mb-1 font-semibold">
                            Other Charges (Parking, Floor Rise, Club House, etc.)
                        </label>

                        <div className="flex gap-2">
                            {/* Dropdown */}
                            <select
                                name="otherChargeType"
                                value={formData.otherChargeType || ""}
                                onChange={handleChange}
                                className="w-1/2 border rounded px-3 py-2"
                            >
                                <option value="">Select Charge</option>
                                <option value="Parking">Parking</option>
                                <option value="Floor Rise">Floor Rise</option>
                                <option value="Club House">Club House</option>
                                <option value="Maintenance">Maintenance</option>
                                <option value="Others">Others</option>
                            </select>

                            {/* Price Input */}
                            <input
                                type="number"
                                name="otherChargePrice"
                                placeholder="Price"
                                value={formData.otherChargePrice || ""}
                                onChange={handleChange}
                                className="w-1/2 border rounded px-3 py-2"
                            />
                        </div>
                    </div>

                </div>
            )}

            {/* Step 4: Location Details */}
            {step === 4 && (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        <div>
                            <label className="block mb-1 font-semibold">Full Address</label>
                            <input
                                type="text"
                                name="fullAddress"
                                value={formData.fullAddress}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-semibold">City</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-semibold">Area / Locality</label>
                            <input
                                type="text"
                                name="area"
                                value={formData.area}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-semibold">Landmark</label>
                            <input
                                type="text"
                                name="landmark"
                                value={formData.landmark}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-semibold">Pincode</label>
                            <input
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-semibold">Google Map Embed (lat/long)</label>
                            <input
                                type="text"
                                name="googleMap"
                                value={formData.googleMap}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                    </div>


                    {/* 3 Column Layout for Last 3 Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div>
                            <label className="block mb-1 font-semibold">Nearby</label>
                            <select
                                name="nearby"
                                value={formData.nearby || ""}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="">Select Nearby Option</option>
                                <option value="Schools">Schools</option>
                                <option value="Hospitals">Hospitals</option>
                                <option value="Markets">Markets</option>
                                <option value="Highways / Main Roads">Highways / Main Roads</option>
                            </select>
                        </div>

                        <div>
                            <label className="block mb-1 font-semibold">Nearby Distance (KM)</label>
                            <input
                                type="text"
                                name="nearbyDistance"
                                value={formData.nearbyDistance || ""}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-semibold">Nearby Description</label>
                            <input
                                type="text"
                                name="nearbyDescription"
                                value={formData.nearbyDescription || ""}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                    </div>


                </div>
            )}

            {/* Step 5: Amenities */}
            {step === 5 && (
                <div className="space-y-2">
                    <label className="block mb-2 font-semibold">Amenities</label>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {amenitiesList.map((item) => (
                            <label
                                key={item.name}
                                className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition 
                ${formData.amenities.includes(item.name) ? "bg-blue-100 border-blue-500" : "bg-white"}`}
                            >
                                <input
                                    type="checkbox"
                                    value={item.name}
                                    checked={formData.amenities.includes(item.name)}
                                    onChange={handleChange}
                                    className="w-5 h-5"
                                />

                                <span className="text-xl">{item.icon}</span>

                                <span className="font-medium">{item.name}</span>
                            </label>
                        ))}
                    </div>
                </div>

            )}

            {/* Step 6: Description / Highlights */}
            {step === 6 && (
                <div className="space-y-4">
                    <div>
                        <label className="block mb-1 font-semibold">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={6}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Unique Selling Points</label>
                        <textarea
                            name="sellingPoints"
                            value={formData.sellingPoints}
                            onChange={handleChange}
                            rows={3}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Offers / Schemes</label>
                        <textarea
                            name="offers"
                            value={formData.offers}
                            onChange={handleChange}
                            rows={3}
                            className="w-full border rounded px-3 py-2"
                            placeholder='उदा. "Free Furniture", "No Floor Rise", "Limited Period Offer"'
                        />
                    </div>
                </div>
            )}

            {/* Step 7: Builder Info */}
            {step === 7 && (
                <div className="space-y-4">
                    <div>
                        <label className="block mb-1 font-semibold">Builder Name / Company</label>
                        <input
                            type="text"
                            name="builderName"
                            value={formData.builderName}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Logo URL (optional)</label>
                        <input
                            type="text"
                            name="builderLogo"
                            value={formData.builderLogo}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">About Builder (short bio)</label>
                        <textarea
                            name="builderBio"
                            value={formData.builderBio}
                            onChange={handleChange}
                            rows={3}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    {/* <div>
                        <label className="block mb-1 font-semibold">RERA Registration</label>
                        <input
                            type="text"
                            name="reraRegistration"
                            value={formData.reraRegistration}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Link: View all listings from this Builder</label>
                        <input
                            type="text"
                            name="builderLink"
                            value={formData.builderLink}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div> */}
                </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
                {step > 1 && (
                    <button
                        type="button"
                        onClick={handlePrev}
                        className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Previous
                    </button>
                )}
                {step < 7 ? (
                    <button
                        type="button"
                        onClick={handleNext}
                        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ml-auto"
                    >
                        Next
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={() => alert("Form Submitted!")}
                        className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 ml-auto"
                    >
                        Submit
                    </button>
                )}
            </div>
        </div>
    );
};

export default DetailedForm;
