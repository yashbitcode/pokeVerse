import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./pokemon";
import pokemonQuizReducer from "./pokemonQuiz";
import questionReducer from "./questionSlice";

const appStore = configureStore({
    reducer: {
        pokemon: pokemonReducer,
        pokemonQuiz: pokemonQuizReducer,
        question: questionReducer
    }
});

export default appStore;