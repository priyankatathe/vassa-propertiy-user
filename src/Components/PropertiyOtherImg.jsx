import React, { useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const PropertiyOtherImg = ({ property, startIndex = 0, onClose }) => {
  const images =
    property.Other_images && property.Other_images.length > 0
      ? property.Other_images
      : [property.specifications?.kitchenImage || "/Rectangle 135.png"];

  const [currentIndex, setCurrentIndex] = useState(startIndex);

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextSlide = () =>
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50 p-4">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-3xl p-2 rounded-full hover:bg-white/20 transition"
      >
        ×
      </button>

      {/* Main Image */}
      <div className="relative w-full max-w-7xl">
        <img
          src={images[currentIndex]}
          className="rounded-xl w-full max-h-[80vh] object-contain"
        />
        {/* Prev / Next Arrows */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white text-3xl p-2 rounded-full hover:bg-white/20 transition"
        >
          <MdArrowBackIos />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white text-3xl p-2 rounded-full hover:bg-white/20 transition"
        >
          <MdArrowForwardIos />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 mt-4 overflow-x-auto">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            onClick={() => setCurrentIndex(idx)}
            className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
              idx === currentIndex ? "border-yellow-500" : "border-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertiyOtherImg;
