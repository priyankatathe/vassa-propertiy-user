import React from "react";
// Replace these with your actual image paths
import stamp from "../../public/stamp.webp";
import propertyImg from "../../public/11.webp";

const PropertyDreamToReality = () => {
  return (
    <section className="min-h-screen bg-[#FAFAFA] font-manrope py-16 lg:py-24 px-4  md:px-8 lg:px-16 ">
      <div className="max-w-10xl mx-auto ">
        {/* Main Card */}
        <div className="rounded-3xl overflow-hidden">
          {/* Top: Heading + Small Description */}
          <div className="grid  grid-cols-1 lg:grid-cols-2 gap-10 items-start text-center lg:text-left">
            <div className="text-start">
            
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-simebold text-gray-900">
                Turning Property
                <br className="mb-4" />
                <div className="flex">
                  <span className="text-yellow-400 italic font-playfair block mt-5">
                    Dreams
                  </span>{" "}
                  <span className="text-black mt-5 ml-4 font-simebold italic-none">
                    Into Reality
                  </span>
                </div>
              </h1>

            </div>



            <div className="flex justify-center items-center mt-20">
              <p className="text-gray-600 text-start text-sm sm:text-base md:text-sm leading-relaxed max-w-lg">
                Vassa Properties is a trusted real estate company <br /> dedicated to helping you find homes that truly fit your <br /> lifestyle and budget.
              </p>
            </div>

          </div>

          {/* Bottom: Stats + Right Image Card */}
          <div className="mt-12  sm:mt-14 md:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
            {/* Left: Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mt-5 sm:gap-6">
              {/* Card 1 */}
              <div className="bg-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm text-left">
                <div className="text-3xl sm:text-4xl md:text-2xl font-bold text-gray-900">500+</div>
                <p className="mt-16 text-sm sm:text-lg text-gray-700">Properties Listed</p>
              </div>

              {/* Card 2 - Highlighted Yellow */}
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl p-6 sm:p-8 shadow-md text-left text-white">
                <div className="text-3xl sm:text-4xl md:text-2xl font-bold">1,200+</div>
                <p className="mt-16 text-sm sm:text-lg">Happy Customers</p>
              </div>

              {/* Card 3 */}
              <div className="bg-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm text-left">
                <div className="text-3xl sm:text-4xl md:text-2xl font-bold text-gray-900">50+</div>
                <p className="mt-16 text-sm sm:text-lg text-gray-700">Ongoing Projects</p>
              </div>

              {/* Card 4 */}
              <div className="bg-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm text-left">
                <div className="text-3xl sm:text-4xl md:text-2xl font-bold text-gray-900">10+</div>
                <p className="mt-16 text-sm sm:text-lg text-gray-700">Cities Covered</p>
              </div>
            </div>


            {/* Right: Text + Stamp + Image Card */}
            <div className="bg-gray-100/50 rounded-3xl p-6 sm:p-8 lg:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Left Text & Stamp */}
                <div className="flex flex-col justify-between">
                  <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed">
                    From luxury apartments and villas to affordable homes and investment plots our expert team ensures a seamless property experience.
                  </p>

                  {/* Circular Stamp */}
                  <div className="mt-8 sm:mt-10 flex justify-center md:justify-start">
                    <div className="relative w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44">
                      <img
                        src={stamp}
                        alt="Trusted Expertise"
                        className="w-full h-full object-contain drop-shadow-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Image */}
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <div className="aspect-[3/4] sm:aspect-[4/5] lg:aspect-[4/5]">
                    <img
                      src={propertyImg}
                      alt="Luxury Property"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyDreamToReality;
