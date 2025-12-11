import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const propertiApi = createApi({
    reducerPath: "propertiApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}`, credentials: "include" }),
    tagTypes: ["user"],
    endpoints: (builder) => {
        return {
             getPropety: builder.query({
                query: () => {
                    return {
                        url: "/properties",
                        method: "GET"
                    }
                },
                providesTags: ["user"]
            }),
            PropertyAdd: builder.mutation({
                query: userData => {
                    return {
                        url: "/user/add/property",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["user"]
            }),

            imgandocProperty: builder.mutation({
                query: ({ id, formData }) => ({
                    url: `/properties/updateproperty/${id}`,
                    method: 'PATCH',
                    body: formData,

                }),
                invalidatesTags: ['Project', 'user']
            }),

        }
    }
})

export const {
    usePropertyAddMutation,
    useImgandocPropertyMutation,
    useGetPropetyQuery
} = propertiApi
