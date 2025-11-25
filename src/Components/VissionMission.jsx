import React from "react";

const VisionMission = () => {
  return (
    <section className="w-full bg-white py-16 md:py-16 lg:py-20 px-4 sm:px-6 md:px-16 lg:px-16 -mt-24">
      <div className="max-w-5xl font-manrope mx-auto flex flex-col gap-8">

        {/* IMAGE TOP */}
        <div className="w-full">
          <img
            src="/187.webp"
            alt="vision"
            className="h-[400px] sm:h-[450px] md:h-[500px] object-cover rounded-md"
          />
        </div>

        {/* TEXT UNDER IMAGE */}
        <div className="relative">
          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair leading-tight 
                        text-left sm:text-left md:text-left lg:text-left
                        ml-0 sm:ml-0 md:ml-0 lg:ml-0
                        mt-0 sm:mt-0 md:mt-0 lg:-mt-16">
            <span className="text-yellow-500 italic font-semibold">Our</span>{" "}
            <span className="italic">Vision &</span> <br />
            <span className="italic">Mission</span>
          </h2>

          {/* Paragraph */}
          <p className="text-[#737373] font-medium mt-4 sm:mt-6 md:mt-8 lg:-mt-24 max-w-full md:max-w-lg
                        ml-0 sm:ml-0 md:ml-0 lg:ml-auto leading-relaxed">
            Our mission and vision drive us to make property ownership
            not just a process but a seamless journey toward finding the
            perfect place to call home.
          </p>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
