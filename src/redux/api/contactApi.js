import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const contactApi = createApi({
    reducerPath: "contactApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}`, credentials: "include" }),
    tagTypes: ["user"],
    endpoints: (builder) => {
        return {

            addContact: builder.mutation({
                query: userData => {
                    return {
                        url: "/contact/add",
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
    useAddContactMutation
} = contactApi
