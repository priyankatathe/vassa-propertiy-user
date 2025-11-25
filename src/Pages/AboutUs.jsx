import React, { useRef, useState, useEffect } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { FaBuilding } from "react-icons/fa";
import WhatMakeUsDiffernt from "../Components/Whatsmakeusdiff";

const AboutUs = () => {
  const section1Ref = useRef(null);
  const [showScrollUp, setShowScrollUp] = useState(false);

  // Scroll down logic
  const scrollToBottom = () => {
    // dynamic scroll amount based on screen size
    const scrollAmount = window.innerWidth < 768 ? 790 : 650;
    window.scrollBy({ top: scrollAmount, behavior: "smooth" });
  };

  // Show scroll up button after scrolling 200px
  const handleScroll = () => {
    setShowScrollUp(window.scrollY > 200);
  };

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* About Section */}
      <section
        className="relative w-full min-h-screen bg-cover  bg-center bg-no-repeat flex items-center justify-center text-white  px-4  md:px-8 lg:px-20"
        style={{ backgroundImage: "url('/aboutbg.jpg')" }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Subheading / Tag */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-24 sm:top-32 md:top-36 lg:top-48 z-20">
          <button className="bg-yellow-400 text-white px-4 sm:px-8 py-3 rounded-full font-semibold shadow hover:bg-yellow-500 transition text-sm sm:text-base font-manrope">
            About Us
          </button>
        </div>

        {/* Main Title */}
        <div className="relative z-10 text-center mt-36 sm:mt-44 md:mt-48 lg:mt-52 px-2 sm:px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-relaxed sm:leading-snug md:leading-snug lg:leading-snug font-manrope">
            <span className="block">
              Connecting{" "}
              <span className="italic text-yellow-400 font-playfair">People</span>{" "}
              with Their
            </span>
            <span className="block mt-4 sm:mt-6 md:mt-8">
              <span className="italic">Perfect</span>{" "}
              <span className="italic text-yellow-400 font-playfair">Spaces</span>
            </span>
          </h1>

          {/* Scroll Down Button */}
          <div className="flex flex-col items-center  gap-2 mt-10 sm:mt-14">
            <div
              onClick={scrollToBottom}
              className="w-24 h-24 sm:w-32 sm:h-32 border-2 border-white rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
            >
              <ArrowDown size={30} />
            </div>


          </div>
          <div className="w-full flex justify-end">
            <p className="text-xs sm:text-sm tracking-widest  uppercase flex items-center gap-2">
              <span className="bg-white text-black rounded-full p-2 flex items-center justify-center">
                <FaBuilding size={16} />
              </span>
              From 2020
            </p>
          </div>

        </div>

        {/* Description */}
        <p className="absolute left-4 sm:left-6 md:left-8 lg:left-20 bottom-4 sm:bottom-6 md:bottom-8 max-w-xs sm:max-w-sm md:max-w-md text-gray-200 text-sm leading-relaxed font-manrope">
          At Vassa Properties, we believe finding a home is more than just a transaction—it's a milestone in your life. We are a modern real estate platform built to simplify how people buy, sell, and rent properties across India.
        </p>


      </section>



      {/* Example Section to Scroll To */}
      <section ref={section1Ref}>
        <WhatMakeUsDiffernt scrollToBottom={scrollToBottom} section1Ref={section1Ref} />
      </section>

      {/* Scroll Up Button */}
      {/* {showScrollUp && (
        <div
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-14 h-14 bg-yellow-400 text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-yellow-500 transition-transform"
        >
          <ArrowUp size={24} />
        </div>
      )} */}
    </>
  );
};

export default AboutUs;





























// import React, { useRef } from "react";
// import { ArrowDown } from "lucide-react";
// import { FaBuilding } from "react-icons/fa";
// import ScrollButton from "../utils/ScrollCompo";

// const AboutUs = () => {
//   const section1Ref = useRef(null);
//   const section2Ref = useRef(null);
//   return (
//     <section
//       className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center text-white px-4 sm:px-8"
//       style={{
//         backgroundImage: "url('/aboutbg.jpg')",
//       }}
//     >


//       {/* Dark Overlay */}
//       <div className="absolute inset-0 bg-black/60"></div>

//       {/* Subheading / Tag (centered at top) */}
//       <div className="absolute left-1/2 transform -translate-x-1/2 top-24 sm:top-32 md:top-36 lg:top-40 z-20">
//         <button className="bg-yellow-400 text-white px-4 sm:px-8 py-3 rounded-full font-semibold shadow hover:bg-yellow-500 transition text-sm sm:text-base font-manrope">
//           About Us
//         </button>
//       </div>

//       {/* Main Title */}
//       <div className="relative z-10 text-center mt-36 sm:mt-44 md:mt-48 lg:mt-52 px-2 sm:px-4">
//         <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-relaxed sm:leading-snug md:leading-snug lg:leading-snug font-manrope">
//           <span className="block">
//             Connecting{" "}
//             <span className="italic text-yellow-400 font-playfair">People</span>{" "}
//             with Their
//           </span>

//           <span className="block mt-4 sm:mt-6 md:mt-8">
//             <span className="italic">Perfect</span>{" "}
//             <span className="italic text-yellow-400 font-playfair">Spaces</span>
//           </span>
//         </h1>

//         {/* Scroll Down Button */}
//         <div className="flex flex-col items-center gap-2 mt-10 sm:mt-14">
//           <ScrollButton targetRef={section1Ref} offset={50} className="w-24 h-24 sm:w-32 sm:h-32 border-2 border-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
//             <ArrowDown size={30} />
//           </ScrollButton>
//           {/* <div onClick={() => ScrollButton(section1Ref, { offset: 50 })} className="w-24 h-24 sm:w-32 sm:h-32 border-2 border-white rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
//             <ArrowDown size={30} className="sm:text-xl md:text-2xl" />
//           </div> */}
//           <p className="text-xs sm:text-sm tracking-widest uppercase  flex items-center justify-center gap-2 -mr-[900px]">
//             <span className="bg-white text-black rounded-full p-2 flex items-center justify-center">
//               <FaBuilding size={16} />
//             </span>
//             From 2020
//           </p>
//         </div>
//       </div>


//       {/* Description at bottom-left */}
//       <p className="absolute left-4 sm:left-6 md:left-8 bottom-4 sm:bottom-6 md:bottom-8 max-w-xs sm:max-w-sm md:max-w-md text-gray-200  text-sm leading-relaxed md:ml-12 ml-5 font-manrope">
//         At Vassa Properties, we believe finding a home is more than just atransaction—it's a milestone in your life. We are a modern real <br /> estate platform built to simplify how people buy, sell, brand rent propertie across India.
//       </p>
//     </section>
//   );
// };

// export default AboutUs;
