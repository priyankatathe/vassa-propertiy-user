import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import authSlice from "./slice/authSlice";
import { propertyApi } from "./api/propertyFecthApi";
import { contactApi } from "./api/contactApi";
import { projectApi } from "./api/projectApi";
import { propertiApi } from "./api/propertiApi";

const reduxStore = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [propertyApi.reducerPath]: propertyApi.reducer,
        [contactApi.reducerPath]: contactApi.reducer,
        [projectApi.reducerPath]: projectApi.reducer,
        [propertiApi.reducerPath]: propertiApi.reducer,
        auth: authSlice,
    },

    middleware: (def) => [
        ...def(),
        userApi.middleware,
        propertyApi.middleware,
        contactApi.middleware,
        projectApi.middleware,
        propertiApi.middleware,
    ],

    devTools: import.meta.env.MODE !== "production",

});

export default reduxStore;
