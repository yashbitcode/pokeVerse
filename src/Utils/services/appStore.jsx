import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./pokemon";
import pokemonQuizReducer from "./pokemonQuiz";

const appStore = configureStore({
    reducer: {
        pokemon: pokemonReducer,
        pokemonQuiz: pokemonQuizReducer
    }
});

export default appStore;