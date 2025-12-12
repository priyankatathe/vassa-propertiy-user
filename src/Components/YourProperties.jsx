import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBothGetQuery } from "../redux/api/propertyFecthApi";
import { div } from "framer-motion/client";

// Skeleton UI
const Skeleton = () => (
  <div className="relative overflow-hidden rounded-xl bg-gray-200 animate-pulse">
    <div className="w-full h-72 bg-gray-300" />
  </div>
);

const PropertyCard = ({ item, navigate, getFirstImage, getPrice }) => (
  <div>
    <div
      onClick={() =>
        navigate("/addproperty-detail", { state: { propertyId: item._id } })
      }
      className="bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
    >
      <div className="relative">
        <img src={getFirstImage(item)} className="w-full h-72 object-cover" alt="" />

        <div className="absolute bottom-3 left-3 right-3 bg-black/20 backdrop-blur-sm rounded-xl p-3 text-white">
          <h3 className="text-lg font-semibold">
            {item.Bedroom || item.title || "BHK"} 
          </h3>
          <p className="text-sm opacity-80 mt-1">
            {item?.Address?.city || item?.Address?.locality || "Address"}
          </p>

        </div>
      </div>

    </div>
    <div className="p-2">
      <p className="text-yellow-600 font-bold text-xl">{getPrice(item)}</p>
    </div>
  </div>
);

const ProjectCard = ({ item, navigate, getFirstImage, getPrice }) => (
  <div
    onClick={() =>
      navigate("/addproject-detail", { state: { projectId: item._id } })
    }
    className="relative rounded-2xl overflow-hidden shadow-md cursor-pointer hover:shadow-xl transition-all duration-300"
  >
    <div className="relative">
      <img src={getFirstImage(item)} className="w-full h-72 object-cover" alt="" />

      <div className="absolute bottom-0 left-0 right-0 bg-black/20 backdrop-blur-sm m-3 rounded-xl p-4 text-white">
        <h3 className="text-xl font-bold">
          {item.Project_Name || "Premium Project"}
        </h3>

        <p className="text-sm opacity-90">
          {item.location?.city || item.address || "Main Road"}
        </p>
      </div>
    </div>


  </div>
);

const YourProperties = () => {
  const [activeTab, setActiveTab] = useState("property");
  const navigate = useNavigate();

  const { data, isLoading } = useBothGetQuery();

  // Backend से data property और project अलग-अलग मिलता है
  const properties = data?.property || [];
  const projects = data?.project || [];

  const activeData = activeTab === "property" ? properties : projects;

  const getFirstImage = (item) => {
    if (item.Other_images?.length > 0) return item.Other_images[0];
    if (item.specifications) {
      return (
        item.specifications.bedroomImage ||
        item.specifications.hallImage ||
        item.specifications.kitchenImage
      );
    }
    return "/gallery.jpg";
  };

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

  const getPrice = (item) => {
    // Case 1: Agar direct price field hai (kuch purane data mein)
    if (item.price) return formatPrice(item.price);

    // Case 2: Agar pricing object hai (naya format)
    if (item.pricing) {
      let pricingObj;

      // Agar pricing string hai (purana backend)
      if (typeof item.pricing === "string") {
        try {
          pricingObj = JSON.parse(item.pricing);
        } catch (e) {
          return "Price on request";
        }
      }
      // Agar pricing already object hai (naya backend)
      else if (typeof item.pricing === "object") {
        pricingObj = item.pricing;
      }

      const expectedPrice = pricingObj?.expected_price || pricingObj?.price || null;
      return formatPrice(expectedPrice);
    }

    return "Price on request";
  };

  return (
    <div className="p-6 mt-16">
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab("property")}
          className={`px-6 py-3 rounded-xl font-semibold ${activeTab === "property"
            ? "bg-yellow-500 text-white"
            : "bg-gray-200 text-gray-800"
            }`}
        >
          Property ({properties.length})
        </button>

        <button
          onClick={() => setActiveTab("project")}
          className={`px-6 py-3 rounded-xl font-semibold ${activeTab === "project"
            ? "bg-yellow-500 text-white"
            : "bg-gray-200 text-gray-800"
            }`}
        >
          Project ({projects.length})
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? [...Array(6)].map((_, i) => <Skeleton key={i} />)
          : activeData.map((item) =>
            activeTab === "property" ? (
              <PropertyCard
                key={item._id}
                item={item}
                navigate={navigate}
                getFirstImage={getFirstImage}
                getPrice={getPrice}
              />
            ) : (
              <ProjectCard
                key={item._id}
                item={item}
                navigate={navigate}
                getFirstImage={getFirstImage}
                getPrice={getPrice}
              />
            )
          )}
      </div>
    </div>
  );
};

export default YourProperties;
