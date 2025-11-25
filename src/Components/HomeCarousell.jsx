import React, { useMemo } from "react";

import rowhouseImg from "../../public/p4.webp";
import villaImg from "../../public/p3.webp";
import luxuryImg from "../../public/p2.webp";
import farmImg from "../../public/p1.webp";

const HomeCarousell = () => {
    const slides = [
        { title: "ROW HOUSES", img: rowhouseImg },
        { title: "VILLA’S", img: villaImg },
        { title: "LUXURIOUS FLATS", img: luxuryImg },
        { title: "FARM HOUSES", img: farmImg },
    ];

    // 🔥 Generate a VERY long array (true infinite effect)
    const infiniteSlides = useMemo(
        () => Array(50).fill(slides).flat(), // 50 times repeat → no end
        []
    );

    return (
        <div className="w-full bg-white overflow-hidden py-3">

            <style>
                {`
                .infinite-track {
                    display: flex;
                    width: max-content;
                    animation: scrollInf 200s linear infinite;
                }

                @keyframes scrollInf {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-30%); }
                }
                `}
            </style>

            <div className="infinite-track">
                {infiniteSlides.map((s, i) => (
                    <div
                        key={i}
                        className="w-80 flex-shrink-0  text-center mr-6"   /* no gap, no padding */
                    >
                        <h3 className="text-blue-900 text-sm font-semibold mb-2">
                            {s.title}
                        </h3>

                        <img
                            src={s.img}
                            alt={s.title}
                            className="w-full  h-56 sm:h-60 md:h-96  object-cover rounded-xl"
                        />
                    </div>
                ))}
            </div>

        </div>
    );
};

export default HomeCarousell;
