import React from "react";
import { motion } from "framer-motion";

const RouteToOwnership = () => {
  return (
    <section className="flex flex-col items-center justify-center py-20 bg-white text-center overflow-hidden">
      <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-10">
        Route To Your{" "}
        <span className="text-yellow-500 italic font-semibold">Ownership</span>
      </h2>

      <div className="relative flex justify-center items-center w-[400px] h-[400px]">
        {/* Left Circle - Bottom Left of Triangle */}
        <motion.div
          animate={{
            x: [0, -120, -120, 0],
            y: [0, 0, 120, 0],
            scale: [1, 1, 1, 1],
          }}
          transition={{
            duration: 12,
            ease: "easeInOut",
            repeat: Infinity,
            times: [0, 0.25, 0.75, 1],
          }}
          className="absolute"
        >
          <img src="/21.png" alt="Discover" className="w-36 sm:w-44" />
          <p className="absolute inset-0 flex items-center justify-center text-gray-400 font-semibold">
            Discover
          </p>
        </motion.div>

        {/* Right Circle - Bottom Right of Triangle */}
        <motion.div
          animate={{
            x: [0, 120, 120, 0],
            y: [0, 0, 120, 0],
            scale: [1, 1, 1, 1],
          }}
          transition={{
            duration: 12,
            ease: "easeInOut",
            repeat: Infinity,
            times: [0, 0.25, 0.75, 1],
          }}
          className="absolute"
        >
          <img src="/21.png" alt="Connect" className="w-36 sm:w-44" />
          <p className="absolute inset-0 flex items-center justify-center text-gray-400 font-semibold">
            Connect
          </p>
        </motion.div>

        {/* Center Circle - Fixed (No Animation) */}
        <div className="absolute">
          <img src="/21.png" alt="Visit" className="w-36 sm:w-44" />
          <p className="absolute inset-0 flex items-center justify-center text-gray-400 font-semibold">
            Visit
          </p>
        </div>
      </div>
    </section>
  );
};

export default RouteToOwnership;
