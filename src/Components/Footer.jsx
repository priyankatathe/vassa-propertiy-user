import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import logo from "../assets/logo2.svg";
import { Link } from "react-router-dom";
import { useAddContactMutation } from "../redux/api/contactApi";

// Yup validation schema
const schema = yup.object().shape({
  email_contact: yup
    .string()
    .required("Email or contact required")
    .test(
      "email-or-phone",
      "Enter a valid email or 10-digit phone number",
      (value) => {
        if (!value) return false;
        const phoneRegex = /^[0-9]{10}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return phoneRegex.test(value) || emailRegex.test(value);
      }
    ),
});

const Footer = () => {
  const [addSubmit, { isLoading }] = useAddContactMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await addSubmit(data).unwrap();
      alert("Message sent successfully!");
      reset();
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="p-2 overflow-x-hidden">
      <div className="bg-[#D9D9D929] rounded-lg px-4 md:px-8 lg:px-16 overflow-hidden">
        <footer className="text-black w-full">
          <div className="max-w-10xl mx-auto py-6">
            {/* Top Section */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 border-b font-playfair border-gray-300 pb-4 text-center md:text-left">
              <p className="italic font-semibold text-gray-700 text-sm md:text-base leading-relaxed break-words">
                Your trusted real estate partner helping you buy, sell, and
                <br className="hidden md:block" />
                invest in premium residential and commercial spaces.
              </p>

              <img src={logo} alt="Vassa Logo" className="h-12 sm:h-14" />
            </div>

            {/* Middle Section */}
            <div className="flex flex-col md:flex-row justify-between gap-12 py-10">
              {/* Left */}
              <div className="w-full md:w-1/2 max-w-5xl">
                <p className="text-[#737373] text-sm mb-6 break-words">
                  We turn your property goals into <br /> reality with trust,
                  transparency,<br />
                  and expertise.
                </p>

                {/* React Hook Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full">
                  <div className="flex items-center bg-white border border-gray-300 rounded-full overflow-hidden w-full">
                    <input
                      type="text"
                      placeholder="Enter Email / Contact No"
                      {...register("email_contact")}
                      className="flex-1 px-4 py-4 text-black outline-none placeholder-gray-600 text-sm rounded-l-full"
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="bg-[#851524] mr-2 rounded-full text-white font-semibold px-5 sm:px-6 py-2 hover:bg-red-800 transition whitespace-nowrap"
                    >
                      {isLoading ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                  {errors.email_contact && (
                    <div className="text-red-500 text-sm">{errors.email_contact.message}</div>
                  )}
                </form>
                {/* Form End */}
              </div>

              {/* Right - Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-16 md:gap-20 lg:gap-28 text-sm w-full md:w-auto">
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-black">Quick Links</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/find-home">Find Property</Link></li>
                    <li><Link to="/list">List Property</Link></li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3 text-black">Contact</h3>
                  <ul className="space-y-3 break-words">
                    <p className="text-gray-600 mb-1">+91 8585 666 322</p>
                    <p className="text-gray-600 mb-1">vassaproperties@gmail.com</p>
                    <p className="text-gray-600">
                      Golden City Center,<br />
                      Chhatrapati <br /> Sambhajinagar 431001
                    </p>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3 text-black">Social Media</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li>Whatsapp</li>
                    <li>Facebook</li>
                    <li>Instagram</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Bottom Bar */}
      <div className="w-full px-4 mt-2 lg:px-10 overflow-hidden">
        <div className="max-w-10xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 text-gray-700 text-xs sm:text-sm text-center sm:text-left">
          <p>©2025 All Rights Reserved</p>

          <div className="flex items-center gap-3 whitespace-nowrap">
            <p>Developed By</p>
            <img src="/suryatech.webp" className="h-12 w-20 object-contain" alt="suryatech" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
