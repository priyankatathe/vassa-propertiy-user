import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useRegisterUserMutation } from "../redux/api/userApi";

const schema = yup.object().shape({
    name: yup.string().required("Full Name is required"),
    contact: yup
        .string()
        .required("Contact No is required")
        .matches(/^[0-9]{10}$/, "Enter valid 10 digit number"),
    email: yup.string().email("Invalid Email").required("Email is required"),
    address: yup.string().required("Address is required"),
});

const Register = ({ closeModal, openLogin }) => {
    const [registerUser, { isLoading }] = useRegisterUserMutation();

    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    // ---- Toast Control (Duplicate Toast Stop) ----
    let toastShown = false;
    const showToastOnce = (message, type) => {
        if (!toastShown) {
            toastShown = true;
            type === "success" ? toast.success(message) : toast.error(message);
            setTimeout(() => (toastShown = false), 1500);
        }
    };

    const onSubmit = async (data) => {
        try {
            const res = await registerUser(data).unwrap();

            toast.success("Registered Successfully!");

            reset();
            closeModal();    // Register modal close
            openLogin();     // Login modal open
        } catch (err) {
            toast.error(err?.data?.message || "Registration Failed!");
        }
    };


    const getInputBorder = (field) => {
        if (errors[field]) return "border-red-500";
        if (touchedFields[field]) return "border-green-500";
        return "border-gray-300";
    };

    return (
        <div className="fixed inset-0 flex font-manrope items-center justify-center z-[999] p-4">
            <div className="absolute bg-black/70 backdrop-blur-md inset-0" onClick={closeModal} />

            <form onSubmit={handleSubmit(onSubmit)}
    className="relative bg-white rounded-3xl overflow-hidden
    grid grid-cols-1 md:grid-cols-2 
    w-full max-w-[850px] h-auto md:h-[500px]
    shadow-xl p-2 animate-fadeIn">



                {/* Left Image */}
                <div className="hidden md:block p-1">
                    <img
                        src="/home.webp"
                        alt="register-left"
                        className="w-full h-full rounded-2xl object-cover"
                    />
                </div>

                {/* Right Box + SCROLL FIX */}
                <div className="bg-[#851524] text-white rounded-2xl flex flex-col justify-center p-8 md:p-2 ">
                    <div className="flex flex-col items-center gap-2 mb-6">
                        <img src="/logo.webp" alt="logo" className="w-[178px] h-[59px]" />
                    </div>

                    <p className="text-sm text-center text-white mb-6">
                        Already Have an Account ? {" "}
                        <span
                            className="text-yellow-400 cursor-pointer"
                            onClick={() => {
                                closeModal();
                                openLogin();
                            }}
                        >
                            LOGIN
                        </span>
                    </p>

                    {/* Inputs */}
                    <div className="flex flex-col gap-4 px-6  ">

                        {/* Full Name */}
                        <div>
                            <input
                                type="text"
                                placeholder="Full Name"
                                {...register("name")}
                                className={`w-full px-4 py-2 rounded-lg text-black outline-none border ${getInputBorder(
                                    "fullName"
                                )}`}
                            />
                            {errors.fullName && (
                                <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Contact */}
                        <div>
                            <input
                                type="text"
                                placeholder="Contact No"
                                {...register("contact")}
                                className={`w-full px-4 py-2 rounded-lg text-black outline-none border ${getInputBorder(
                                    "contact"
                                )}`}
                            />
                            {errors.contact && (
                                <p className="text-red-400 text-sm mt-1">{errors.contact.message}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <input
                                type="text"
                                placeholder="Email"
                                {...register("email")}
                                className={`w-full px-4 py-2 rounded-lg text-black outline-none border ${getInputBorder(
                                    "email"
                                )}`}
                            />
                            {errors.email && (
                                <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Address */}
                        <div>
                            <textarea
                                placeholder="Address"
                                {...register("address")}
                                className={`w-full px-4 py-2 rounded-lg text-black outline-none h-16 resize-none border ${getInputBorder(
                                    "address"
                                )}`}
                            />
                            {errors.address && (
                                <p className="text-red-400 text-sm mt-1">{errors.address.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="text-center  ">
                        <button
                            type="submit"
                            className="mt-6  w-32 bg-[#F8CA13] text-black font-semibold py-2 rounded-full  disabled:opacity-50"
                            disabled={isLoading}
                        >
                            {isLoading ? "Registering..." : "Sign Up"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Register;
