import React from "react";
import Navbar from "../Components/Navbar";
import { useAddContactMutation } from "../redux/api/contactApi";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const ContactUs = () => {
  const [addContact, { isLoading }] = useAddContactMutation();

  // Validation Schema
  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email_contact: yup
      .string()
      .required("Email or contact required")
      .min(5, "Enter valid info"),
    message: yup.string().required("Message is required"),
  });

  // React Hook Form
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
      await addContact(data).unwrap();
      alert("Message Sent Successfully!");
      reset(); // Clear form
    } catch (error) {
      alert("Failed to send message");
    }
  };

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat min-h-screen flex flex-col"
      style={{ backgroundImage: "url('/contact.webp')" }}
    >
      {/* Navbar */}
      <div className="w-full z-20">
        <Navbar />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center mt-20 justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 py-16 gap-12">
        {/* Left Section */}
        <div className="text-white space-y-6 max-w-lg text-center lg:text-left">
          <button className="bg-yellow-400 text-black px-5 py-2 rounded-full font-medium shadow-md hover:bg-yellow-500 transition">
            Contact Us
          </button>

          <h1 className="text-4xl sm:text-4xl md:text-5xl font-bold leading-tight">
            We’re Here to Help <br />
            You Find Your{" "}
            <span className="text-yellow-400 italic">Perfect Property</span>
          </h1>

          <p className="text-gray-200 leading-relaxed text-sm sm:text-base">
            Have a question, need assistance, or want to list your property?
            Our team is always ready to guide you.
          </p>
        </div>

        {/* Right — Contact Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-md mx-auto">
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                {...register("name")}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email or Contact */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email / Contact
              </label>
              <input
                type="text"
                placeholder="Enter"
                {...register("email_contact")}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />
              {errors.email_contact && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email_contact.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Enter"
                {...register("message")}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none resize-none"
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-yellow-400 text-black font-semibold py-3 rounded-full transition 
    ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-500"}`}
            >
              {isLoading ? "Sending..." : "Contact"}
            </button>

          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
