import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./pokemon";

const appStore = configureStore({
    reducer: {
        pokemon: pokemonReducer
    }
});

export default appStore;