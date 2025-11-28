import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import clsx from "clsx";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useLoginUserMutation, useSendOtpMutation } from "../redux/api/userApi";

const Login = ({ closeModal, openRegister }) => {
    const [step, setStep] = useState(1);
    const [timer, setTimer] = useState(0);
    const [otpExpired, setOtpExpired] = useState(false);
    const [isToastActive, setIsToastActive] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [otpKey, setOtpKey] = useState(0);
    const [otpSent, setOtpSent] = useState(false);
    const [isUserExist, setIsUserExist] = useState(true);

    const [sendOtp] = useSendOtpMutation();
    const [loginUser] = useLoginUserMutation();

    // OTP TIMER
    useEffect(() => {
        if (!otpSent) return;
        let countdown;
        setTimer(60);
        countdown = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(countdown);
                    setOtpExpired(true);
                    if (!isToastActive) {
                        toast.info("OTP has expired! Please resend OTP.");
                    }
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, [otpKey, otpSent]);

    const formik = useFormik({
        initialValues: { contact: "", otp: "" },
        validationSchema: Yup.object({
            contact: Yup.string()
                .matches(/^[0-9]{10}$/, "Enter valid 10-digit contact number")
                .required("Contact number is required"),
            otp: Yup.string()
                .test("otp-required", "OTP is required", function (value) {
                    if (otpSent && !value) return false;
                    return true;
                })
                .matches(/^[0-9]{4,6}$/, "Enter valid OTP"),
        }),
        onSubmit: async (values, { resetForm }) => {
            if (!navigator.onLine) {
                toast.error("No internet connection!");
                return;
            }

            if (isProcessing) return;
            setIsProcessing(true);

            try {
                if (!otpSent || otpExpired) {
                    const res = await sendOtp({ contact: values.contact }).unwrap();
                    if (res?.success === false) {
                        setIsUserExist(false);
                        if (!isToastActive) {
                            setIsToastActive(true);
                            toast.error(res?.message || "Contact does not exists!", { onClose: () => setIsToastActive(false) });
                        }
                        return;
                    }

                    // ✅ success
                    setIsUserExist(true);
                    if (!isToastActive) {
                        setIsToastActive(true);
                        toast.success(res?.message || "OTP sent successfully!", { onClose: () => setIsToastActive(false) });
                    }
                    setOtpSent(true);
                    setOtpExpired(false);
                    setOtpKey((prev) => prev + 1);
                    setStep(2);

                } else {
                    if (otpExpired) {
                        toast.error("OTP expired! Please resend OTP.");
                        return;
                    }

                    const res = await loginUser({ contact: values.contact, otp: values.otp }).unwrap();
                    toast.success(res.message || "Login successful!");
                    resetForm();
                    setOtpSent(false);
                    setOtpExpired(false);
                    closeModal();
                }
            } catch (err) {
                const errorMsg = err?.data?.message || "Something went wrong!";
                if (!isToastActive) {
                    setIsToastActive(true);
                    toast.error(errorMsg, { onClose: () => setIsToastActive(false) });
                }
                if (errorMsg.toLowerCase().includes("not exist")) setIsUserExist(false);
            } finally {
                setIsProcessing(false);
            }
        },
    });

    const handleResendOtp = async () => {
        if (isProcessing || !otpExpired || !formik.values.contact) return;
        setIsProcessing(true);
        try {
            const res = await sendOtp({ contact: formik.values.contact }).unwrap();
            toast.success(res.message || "OTP resent successfully!");
            setOtpExpired(false);
            setOtpSent(true);
            setOtpKey((prev) => prev + 1);
        } catch (err) {
            toast.error(err?.data?.message || "Error sending OTP!");
        } finally {
            setIsProcessing(false);
        }
    };

    const getInputBorder = (field) => {
        if (formik.touched[field] && formik.errors[field]) return "border-red-500";
        if (formik.touched[field] && !formik.errors[field]) return "border-green-500";
        return "border-gray-300";
    };

    const formatContactInput = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 10) value = value.slice(0, 10);
        formik.setFieldValue("contact", value, true);
        setIsUserExist(true);
    };

    return (
        <div className="fixed inset-0 z-[9999] font-manrope flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-md"
                onClick={closeModal}
            />


            <div className="
  relative bg-white rounded-3xl overflow-hidden
  grid grid-cols-1 md:grid-cols-2 
  w-[90%] sm:w-[80%] md:w-full 
  max-w-[850px]
  h-auto md:h-[500px]
  shadow-xl p-2 animate__animated animate__zoomIn
">

                <div className="hidden md:block p-1">
                    <img src="/home.webp" alt="login-left" className="w-full h-full rounded-2xl object-cover" />
                </div>

                <div className="bg-[#851524] text-white rounded-2xl flex flex-col justify-between p-8 md:p-12 overflow-y-auto">
                    <div className="flex flex-col items-center gap-2 mb-6">
                        <img src="/logo.webp" alt="logo" className="w-30 h-20" />
                    </div>



                    <form onSubmit={formik.handleSubmit} className="flex flex-col justify-center mb-16 gap-3">
                        <p className="text-sm text-center text-gray-300 mb-6">
                            Don't Have an Account?{" "}
                            <span className="text-yellow-400 cursor-pointer" onClick={openRegister}>
                                SIGN UP
                            </span>
                        </p>
                        {step === 1 && (
                            <>
                                <input
                                    type="text"
                                    placeholder="Contact No"
                                    value={formik.values.contact}
                                    onChange={formatContactInput}
                                    onBlur={formik.handleBlur}
                                    className={`w-full px-4 py-3 rounded-2xl text-black outline-none border ${getInputBorder(
                                        "contact"
                                    )}`}
                                />
                                {formik.touched.contact && formik.errors.contact && (
                                    <p className="text-red-400 text-sm ml-2">{formik.errors.contact}</p>
                                )}
                                {!isUserExist && formik.values.contact && (
                                    <p className="text-red-400 text-sm ml-2">Contact does not exists!</p>
                                )}
                                <div className="text-center mt-20">
                                    <button
                                        type="submit"
                                        disabled={isProcessing}
                                        className="bg-yellow-400 text-black font-semibold py-3 rounded-full w-36"
                                    >
                                        {isProcessing ? "Sending..." : "Send OTP"}
                                    </button>
                                </div>
                            </>
                        )}

                        {step === 2 && otpSent && (
                            <>
                                <input
                                    type="text"
                                    value={formik.values.contact}
                                    readOnly
                                    className="w-full px-4 py-3 rounded-2xl text-black bg-gray-200 border border-gray-400"
                                />
                                <input
                                    type="text"
                                    placeholder="OTP"
                                    value={formik.values.otp}
                                    onChange={(e) =>
                                        formik.setFieldValue("otp", e.target.value.replace(/\D/g, "").slice(0, 6), true)
                                    }
                                    onBlur={formik.handleBlur}
                                    maxLength={6}
                                    className={`w-full px-4 py-3 rounded-2xl text-black outline-none border ${getInputBorder(
                                        "otp"
                                    )}`}
                                    disabled={otpExpired || isProcessing}
                                />
                                {formik.touched.otp && formik.errors.otp && (
                                    <p className="text-red-400 text-sm ml-2">{formik.errors.otp}</p>
                                )}

                                <div className="flex justify-between text-xs text-gray-400 ">
                                    <span>{!otpExpired ? `Time Left: ${timer}s` : "OTP expired!"}</span>
                                    <span
                                        className={clsx(
                                            "text-yellow-400 cursor-pointer",
                                            (!otpExpired || isProcessing) && "cursor-not-allowed"
                                        )}
                                        onClick={handleResendOtp}
                                    >
                                        {isProcessing ? "Sending..." : "Reset OTP"}
                                    </span>
                                </div>

                                <div className="text-center mt-20">
                                    <button
                                        type="submit"
                                        disabled={isProcessing}
                                        className="mt-2 bg-yellow-400  text-black font-semibold py-3 rounded-full w-32"
                                    >
                                        {isProcessing ? "Logging in..." : "Login"}
                                    </button>
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
