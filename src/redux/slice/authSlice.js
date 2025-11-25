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
    // .addMatcher(
    //     userApi.endpoints.updateProfile.matchFulfilled,
    //     (state, { payload }) => {
    //         console.log("Updated user payload:", payload);

    //         // since backend sends user: updatedUserData
    //         const updatedUser = payload?.user;

    //         // update redux state
    //         state.user = { ...state.user, data: updatedUser };

    //         // persist in localStorage
    //         localStorage.setItem(
    //             "user",
    //             JSON.stringify({ ...state.user, data: updatedUser })
    //         );
    //     }
    // )


})

export const {
    userLogout
} = authSlice.actions
export default authSlice.reducer