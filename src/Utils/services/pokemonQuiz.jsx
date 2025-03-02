import { createSlice } from "@reduxjs/toolkit";

const pokemonQuiz = createSlice({
    name: "pokequiz",
    initialState: {
        quizQuestions: null,
        currentQ: null,
        completed: null
    },
    reducers: {
        addQuizQuestions: (state, action) => {
            state.quizQuestions = action.payload;
        },
        increamentCnt: (state) => {
            if((state.currentQ + 1) > state.quizQuestions.length) state.completed = true;
            else state.currentQ++;
        }
    }
});

export const {addQuizQuestions, increamentCnt} = pokemonQuiz.actions;
export default pokemonQuiz.reducer;