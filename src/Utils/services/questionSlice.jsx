import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
    name: "question-slice",
    initialState: {
        completed: false,
    },
    reducers: {
        flagCompletion: (state) => {
            state.completed = !state.completed;
        }
    }
});

export const {flagCompletion} = questionSlice.actions;
export default questionSlice.reducer;