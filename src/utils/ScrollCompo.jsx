import React from "react";

/**
 * ScrollButton - reusable scroll button
 * @param {React.RefObject} targetRef - ref of the target element
 * @param {number} offset - optional offset for fixed headers
 * @param {string} behavior - 'smooth' or 'auto'
 * @param {string} className - optional custom styles
 * @param {React.ReactNode} children - button content
 */
const ScrollButton = ({ targetRef, offset = 0, behavior = "smooth", className = "", children }) => {
    const handleScroll = () => {
        if (!targetRef?.current) return;

        const targetPosition = targetRef.current.getBoundingClientRect().top + window.scrollY + offset;

        window.scrollTo({
            top: targetPosition,
            behavior,
        });
    };

    return (
        <div onClick={handleScroll} className={`cursor-pointer ${className}`}>
            {children}
        </div>
    );
};

export default ScrollButton;














// // utils/scrollTo.js
// export const scrollToPosition = (targetRef, options = {}) => {
//     if (!targetRef?.current) return;

//     const { behavior = "smooth", offset = 0 } = options;
//     const top =
//         targetRef.current.getBoundingClientRect().top + window.scrollY + offset;

//     window.scrollTo({
//         top,
//         behavior,
//     });
// };
