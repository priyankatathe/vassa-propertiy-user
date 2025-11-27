import { createSlice } from "@reduxjs/toolkit";
// import { authApi } from "../api/authApi";
import { userApi } from "../api/userApi";

const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        user: JSON.parse(localStorage.getItem("user")),
    },
    reducers: {
        userLogout: (state, { payload }) => {
            localStorage.removeItem("user")
            state.customer = null
        },
    },
    extraReducers: builder => builder
        .addMatcher(
            userApi.endpoints.LoginUser.matchFulfilled,
            (state, { payload }) => {
                state.user = payload;
                localStorage.setItem("user", JSON.stringify(payload));
            }
        )
        .addMatcher(
            userApi.endpoints.LogoutUser.matchFulfilled,
            (state, { payload }) => {
                state.user = null;
                localStorage.removeItem("user");
            }
        )

})

export const {
    userLogout
} = authSlice.actions
export default authSlice.reducer