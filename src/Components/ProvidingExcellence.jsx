import React from "react";
import { CheckCircle, Shield, Lightbulb, Award } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { LuWorkflow } from "react-icons/lu";
import { FaHandshakeAngle } from "react-icons/fa6";

const ProvidingExcellence = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, x: -200 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      ref={ref}
      className="py-16 lg:py-20 lg:mb-10 px-5 sm:px-8 md:px-16 lg:px-20 bg-white overflow-hidden"
      initial="hidden"
      animate={controls}
      variants={variants}
    >

      {/* ---------------- MOBILE VERSION (Center Everything) ---------------- */}
      <div className="md:hidden text-center">

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-3xl sm:text-4xl font-semibold text-black"
        >
          Providing <span className="text-[#F8CA13] italic font-playfair">Excellence</span>
          <span className="block mt-2 sm:mt-4">in Every Step</span>
        </motion.h1>

        {/* CARDS CENTERED */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-10 place-items-center">

          {[
            { Icon: Shield, title: "Trusted Expertise", text: "Our team brings years of real estate experience, offering guidance that ensures every decision is informed, confident, and secure." },
            { Icon: LuWorkflow, title: "Seamless Experience", text: "We simplify the entire process — from listing to ownership with smart tools and personalized assistance at every stage." },
            { Icon: Lightbulb, title: "Innovative Approach", text: "We blend technology with human touch, using data-driven insights to match you with the right property faster and smarter." },
            { Icon: FaHandshakeAngle, title: "Dedicated Support", text: "Our dedicated support team is always by your side, ensuring quick responses and complete peace of mind throughout your journey." },
          ].map((card, index) => (
            <motion.div
              key={index}
              className="text-center max-w-xs"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
            >
              <div className="w-12 h-12 bg-[#F8CA13] rounded-full flex items-center justify-center mx-auto mb-3">
                <card.Icon className="text-black w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg sm:text-xl mb-2">{card.title}</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {card.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ---------------- DESKTOP VERSION (Original Code — No Changes) ---------------- */}
      <div className="hidden md:flex flex-col md:flex-row items-start gap-8 md:gap-12 lg:gap-11">

        {/* LEFT: HEADLINE */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-3xl sm:text-4xl md:text-5xl font-semibold text-black 
                     text-center md:text-left w-full md:w-auto"
        >
          Providing <span className="text-[#F8CA13] italic font-playfair">Excellence</span>
          <span className="block mt-2 sm:mt-4">in Every Step</span>
        </motion.h1>

        {/* RIGHT: CARDS */}
        <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 
                        mt-8 md:mt-32 lg:mt-40">

          {[
            { Icon: Shield, title: "Trusted Expertise", text: "Our team brings years of real estate experience, offering guidance that ensures every decision is informed, confident, and secure." },
            { Icon: LuWorkflow, title: "Seamless Experience", text: "We simplify the entire process — from listing to ownership with smart tools and personalized assistance at every stage." },
            { Icon: Lightbulb, title: "Innovative Approach", text: "We blend technology with human touch, using data-driven insights to match you with the right property faster and smarter." },
            { Icon: FaHandshakeAngle, title: "Dedicated Support", text: "Our dedicated support team is always by your side, ensuring quick responses and complete peace of mind throughout your journey." },
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F8CA13] rounded-full flex items-center justify-center mb-3">
                <card.Icon className="text-black w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              <h3 className="font-semibold text-lg sm:text-xl mb-1 sm:mb-2">{card.title}</h3>

              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {card.text}
              </p>
            </motion.div>
          ))}

        </div>
      </div>
    </motion.section>
  );
};

export default ProvidingExcellence;
  