import { createSlice } from "@reduxjs/toolkit";

const pokemonRecognizer = createSlice({
    name: "poke-recog",
    initialState: {
        summary: null,
        pokeList: null
    },
    reducers: {
        addSummary: (state, action) => {
            state.summary = action.payload
        },
        addPokeList: (state, action) => {
            state.pokeList = action.payload;
        },
        resetData: (state) => {
            state.summary = null;
            state.pokeList = null;
        }
    }
});

export const {addSummary, addPokeList, resetData} = pokemonRecognizer.actions;
export default pokemonRecognizer.reducer;
