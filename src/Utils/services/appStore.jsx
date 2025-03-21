import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./pokemon";
import pokemonQuizReducer from "./pokemonQuiz";
import questionReducer from "./questionSlice";
import userInfoReducer from "./userInfoSlice";

const appStore = configureStore({
    reducer: {
        pokemon: pokemonReducer,
        pokemonQuiz: pokemonQuizReducer,
        question: questionReducer,
        userInfo: userInfoReducer
    }
});

export default appStore;