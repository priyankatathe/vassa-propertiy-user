import React from "react";

/**
 * ScrollButton - reusable scroll button
 * @param {React.RefObject} targetRef - ref of the target element
 * @param {number} offset - optional offset for fixed headers
 * @param {string} behavior - 'smooth' or 'auto'
 * @param {string} className - optional custom styles
 * @param {React.ReactNode} children - button content
 * @param {boolean} asButton - if true, renders <button> instead of <div>
 */
const ScrollButton = ({ targetRef, offset = 0, behavior = "smooth", className = "", children, asButton = false }) => {
    const handleScroll = () => {
        if (!targetRef?.current) return;

        const targetPosition = targetRef.current.getBoundingClientRect().top + window.scrollY + offset;

        window.scrollTo({
            top: targetPosition,
            behavior,
        });
    };

    if (asButton) {
        return (
            <button type="button" onClick={handleScroll} className={`cursor-pointer ${className}`}>
                {children}
            </button>
        );
    }

    return (
        <div onClick={handleScroll} className={`cursor-pointer ${className}`}>
            {children}
        </div>
    );
};

export default ScrollButton;
