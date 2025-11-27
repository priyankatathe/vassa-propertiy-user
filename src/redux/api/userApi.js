import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/user`, credentials: "include" }),
    tagTypes: ["user"],
    endpoints: (builder) => {
        return {

            LoginUser: builder.mutation({
                query: userData => {
                    return {
                        url: "/login",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["user"],
            }),
            sendOtp: builder.mutation({
                query: userData => ({
                    url: "/send/otp",
                    method: "POST",
                    body: JSON.stringify(userData),          // <-- FORCE JSON STRING
                    headers: {
                        "Content-Type": "application/json",    // <-- FIXES COOKIE ISSUE
                    },
                }),
                invalidatesTags: ["user"],
            }),

            RegisterUser: builder.mutation({
                query: userData => {
                    return {
                        url: "/register",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["user"]
            }),
            LogoutUser: builder.mutation({
                query: userData => {
                    return {
                        url: "/logout",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["user"]
            }),

        }
    }
})

export const {
    useLoginUserMutation,
    useRegisterUserMutation,
    useLogoutUserMutation,
    useSendOtpMutation
} = userApi
