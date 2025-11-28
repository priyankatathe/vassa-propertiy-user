import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const listPropertiApi = createApi({
    reducerPath: "listPropertiApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/user`, credentials: "include" }),
    tagTypes: ["user"],
    endpoints: (builder) => {
        return {
            getAddedPropertie: builder.query({
                query: () => {
                    return {
                        url: "/get/added/property",
                        method: "GET"
                    }
                },
                providesTags: ["user"]
            }),
            addProperties: builder.mutation({
                query: userData => {
                    return {
                        url: "/add/property",
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
    useAddPropertiesMutation,
    useGetAddedPropertieQuery
} = listPropertiApi
