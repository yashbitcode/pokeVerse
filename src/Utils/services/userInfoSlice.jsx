import { createSlice } from "@reduxjs/toolkit";

const userInfoSlice = createSlice({
    name: "user-info",
    initialState: {
        accStatus: null
    },
    reducers: {
        addAccStatus: (state, action) => {
            state.accStatus = action.payload;
        }
    }
});

export const {addAccStatus} = userInfoSlice.actions;
export default userInfoSlice.reducer;