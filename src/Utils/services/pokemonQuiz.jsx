import { createSlice } from "@reduxjs/toolkit";

const pokemonQuiz = createSlice({
    name: "pokequiz",
    initialState: {
        quizQuestions: null,
        currentQ: null,
        score: null,
    },
    reducers: {
        addQuizQuestions: (state, action) => {
            const {quizQuestions, currentQ, score} = action.payload;
            state.quizQuestions = quizQuestions;
            state.currentQ = currentQ;
            state.score = score || 0;
        },
        increamentCnt: (state) => {
            state.currentQ++;
        },
        scoreIncrement: (state) => {
            state.score++;
        },
        resetData: (state) => {
            state.quizQuestions = null;
            state.currentQ = null;
            state.score = null;
        }
    }
});

export const {addQuizQuestions, increamentCnt, resetData, scoreIncrement} = pokemonQuiz.actions;
export default pokemonQuiz.reducer;