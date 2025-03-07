import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./pokemon";
import pokemonQuizReducer from "./pokemonQuiz";
import questionReducer from "./questionSlice";
import recognizeReducer from "./pokemonRecognizer";

const appStore = configureStore({
    reducer: {
        pokemon: pokemonReducer,
        pokemonQuiz: pokemonQuizReducer,
        question: questionReducer,
        recognize: recognizeReducer
    }
});

export default appStore;