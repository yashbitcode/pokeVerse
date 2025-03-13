import { createSlice } from "@reduxjs/toolkit";

const pokemonQuiz = createSlice({
    name: "pokequiz",
    initialState: {
        quizQuestions: null,
        currentQ: null,
        score: null,
        name: null,
        quizId: null,
        allAnswers: [],
        completed: null
    },
    reducers: {
        addQuizQuestions: (state, action) => {
            const {AllQuizzes, QuestionCnt, Score, QuizName, $id, Completed, AllAnswers} = action.payload;

            state.quizQuestions = JSON.parse(AllQuizzes);
            state.currentQ = +QuestionCnt;
            state.score = +Score || 0;
            state.name = QuizName;
            state.quizId = $id;
            state.allAnswers = JSON.parse(AllAnswers) || [];
            state.completed = Completed;
        },
        addAnswer: (state, action) => {
            state.allAnswers = action.payload;
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
            state.name = null;
            state.quizId = null;
            state.allAnswers = [];
            state.completed = null;
        }
    }
});

export const {addQuizQuestions, increamentCnt, resetData, scoreIncrement, addAnswer} = pokemonQuiz.actions;
export default pokemonQuiz.reducer;