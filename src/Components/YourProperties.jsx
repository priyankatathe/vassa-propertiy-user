import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBothGetQuery } from "../redux/api/propertyFecthApi";

// Skeleton UI
const Skeleton = () => (
  <div className="relative overflow-hidden rounded-xl bg-gray-200 animate-pulse">
    <div className="w-full h-72 bg-gray-300" />
  </div>
);

const PropertyCard = ({ item, navigate, getFirstImage, getPrice }) => (
  <div
    onClick={() =>
      navigate("/addproperty-detail", { state: { propertyId: item._id } })
    }
    className="bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
  >
    <div className="relative">
      <img src={getFirstImage(item)} className="w-full h-72 object-cover" alt="" />

      <div className="absolute bottom-3 left-3 right-3 bg-black/30 backdrop-blur-md rounded-xl p-3 text-white">
        <h3 className="text-lg font-semibold">
          {item.BHK || item.title || "BHK"} • {item.city || "City"}
        </h3>
        <p className="text-sm opacity-80 mt-1">
          {item.location?.address || item.address || "Address"}
        </p>
      </div>
    </div>

    <div className="p-4">
      <p className="text-yellow-600 font-bold text-xl">₹ {getPrice(item)}</p>
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

      <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md m-3 rounded-xl p-4 text-white">
        <h3 className="text-xl font-bold">
          {item.Project_Name || "Premium Project"}
        </h3>

        <p className="text-sm opacity-90">
          {item.location?.address || item.address || "Main Road"}
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

  const getPrice = (item) => {
    if (item.price) return item.price;

    if (item.pricing) {
      try {
        const parsed = JSON.parse(item.pricing);
        return parsed.expected_price || "N/A";
      } catch {
        return "N/A";
      }
    }

    return "N/A";
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
