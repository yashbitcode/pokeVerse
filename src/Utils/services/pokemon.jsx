import { createSlice } from "@reduxjs/toolkit";

const pokemonSlice = createSlice({
    name: "pokemon",
    initialState: {
        pokeSpeciesInfo: null,
        pokeInfo: null,
        evolutionChain: null,
        pokeGPTResult: null
    },
    reducers: {
        addPokeSpecies: (state, action) => {
            state.pokeSpeciesInfo = action.payload;
        },
        addPokeInfo: (state, action) => {
            state.pokeInfo = action.payload;
        },
        addEvolutionChain: (state, action) => {
            state.evolutionChain = action.payload;
        },
        addPokeGPTResult: (state, action) => {
            state.pokeGPTResult = action.payload;
        },
        removeData: (state) => {
            state.pokeSpeciesInfo = null;
            state.pokeInfo = null;
            state.evolutionChain = null;
        }
    }
});

export const {addPokeSpecies, addPokeInfo, addEvolutionChain, addPokeGPTResult, removeData} = pokemonSlice.actions;
export default pokemonSlice.reducer;