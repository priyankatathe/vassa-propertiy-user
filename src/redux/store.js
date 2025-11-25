import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import authSlice from "./slice/authSlice";
import { listPropertiApi } from "./api/listPropertiApi";
import { propertyApi } from "./api/propertyFecthApi";
import { contactApi } from "./api/contactApi";

const reduxStore = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [listPropertiApi.reducerPath]: listPropertiApi.reducer,
        [propertyApi.reducerPath]: propertyApi.reducer,
        [contactApi.reducerPath]: contactApi.reducer,
        auth: authSlice,
    },

    middleware: (def) => [
        ...def(),
        userApi.middleware,
        listPropertiApi.middleware,
        propertyApi.middleware,
        contactApi.middleware,
    ],

    devTools: import.meta.env.MODE !== "production",

});

export default reduxStore;
