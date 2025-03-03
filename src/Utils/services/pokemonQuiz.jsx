import { createSlice } from "@reduxjs/toolkit";

const pokemonQuiz = createSlice({
    name: "pokequiz",
    initialState: {
        quizQuestions: null,
        currentQ: null
    },
    reducers: {
        addQuizQuestions: (state, action) => {
            const {quizQuestions, currentQ} = action.payload;
            state.quizQuestions = quizQuestions;
            state.currentQ = currentQ;
        },
        increamentCnt: (state) => {
            if((state.currentQ + 1) > state.quizQuestions.length) state.completed = true;
            else state.currentQ++;
        }
    }
});

export const {addQuizQuestions, increamentCnt} = pokemonQuiz.actions;
export default pokemonQuiz.reducer;