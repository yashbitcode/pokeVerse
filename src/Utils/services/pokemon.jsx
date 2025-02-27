import { createSlice } from "@reduxjs/toolkit";

const pokemonSlice = createSlice({
    name: "pokemon",
    initialState: {
        pokeSpeciesInfo: null,
        pokeInfo: null,
        evolutionChain: null
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
        removeData: () => {
            return {
                pokeSpeciesInfo: null,
                pokeInfo: null,
                evolutionChain: null
            };
        }
    }
});

export const {addPokeSpecies, addPokeInfo, addEvolutionChain, removeData} = pokemonSlice.actions;
export default pokemonSlice.reducer;