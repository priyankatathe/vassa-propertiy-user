import React from "react";
import bgImage from "/about4bg.webp"; // Your image path

const About4 = () => {
  const buttons = [
    "Rent Your Home",
    "Sell Your Properties",
    "Find Properties",
    "Buy Home",
    "More Options",
  ];

  return (
    <section className="relative w-full  py-16 md:py-16 lg:pb-32 px-4 sm:px-6 md:px-16 lg:px-20 overflow-hidden">
      <div
        className="mx-auto w-full max-w-10xl h-[500px] md:h-[500px] lg:h-[650px]  rounded-lg overflow-hidden"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Buttons Carousel inside the centered background container */}
        <div className="flex items-center h-full">
          <div className="w-full overflow-hidden">
            <div className="flex animate-marquee gap-6 px-2">
              {[...buttons, ...buttons].map((text, index) => (
                <button
                  key={index}
                  className="bg-[#FFFFFF] w-72 py-4 text-lg md:text-xl rounded-full shadow-lg hover:shadow-2xl transition text-center flex-shrink-0"
                >
                  {text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Inline CSS animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 15s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default About4;
