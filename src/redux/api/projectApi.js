import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const projectApi = createApi({
    reducerPath: "projectApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}`, credentials: "include" }),

    tagTypes: ["user"],
    endpoints: (builder) => {
        return {
            getProject: builder.query({
                query: () => {
                    return {
                        url: "/project",
                        method: "GET"
                    }
                },
                providesTags: ["user"]
            }),
            getProjectById: builder.query({
                query: (id) => ({
                    url: `/properties/project/${id}`
                })
            }),
            createProject: builder.mutation({
                query: userData => {
                    return {
                        url: "/project/create",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["user"]
            }),
            idProject: builder.mutation({
                query: userData => {
                    return {
                        url: `/project/update/${userData.id}`,
                        method: "PATCH",
                        body: userData
                    }
                },
                invalidatesTags: ["user"]
            }),

            pdfAnImgProject: builder.mutation({
                query: ({ id, body }) => ({
                    url: `/project/upload-pdf/${id}`,
                    method: 'PATCH',
                    body: body,

                }),
                invalidatesTags: ['Project', 'user']
            }),

            // imgProject: builder.mutation({
            //     query: ({ id, body }) => ({
            //         url: `/project/upload-img/${id}`,
            //         method: 'PATCH',
            //         body: body,

            //     }),
            //     invalidatesTags: ['Project', 'user']
            // }),

        }
    }
})

export const {
    useCreateProjectMutation,
    useIdProjectMutation,
    usePdfAnImgProjectMutation,
    useGetProjectQuery,
    useGetProjectByIdQuery
} = projectApi
