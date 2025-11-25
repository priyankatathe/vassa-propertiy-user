import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const propertyApi = createApi({
    reducerPath: "propertyApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/user`,
        credentials: "include",
    }),
    tagTypes: ["property"],
    endpoints: (builder) => ({

        getProperties: builder.query({
            query: ({ city, property_type, listingType }) => ({
                url: `/fetch/property`,
                method: "GET",
                params: {
                    city,
                    property_type,
                    listingType
                }
            }),
            providesTags: ["property"],
        }),
        getPropertiesById: builder.query({
            query: (id) => ({
                url: `/fetch/property/${id}`
            })
        }),
        getAllPropertie: builder.query({
            query: () => {
                return {
                    url: "/fetch/top",
                    method: "GET"
                }
            },
            providesTags: ["user"]
        }),
        addEnquiry: builder.mutation({
            query: userData => {
                return {
                    url: "/inquire/property",
                    method: "POST",
                    body: userData
                }
            },
            invalidatesTags: ["user"]
        }),
    }),
});

export const {
    useGetPropertiesQuery, useGetPropertiesByIdQuery, useAddEnquiryMutation, useGetAllPropertieQuery
} = propertyApi;
