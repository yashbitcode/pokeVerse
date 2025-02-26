import { fetchPokemonInfo, fetchPokemonSpecies, getAllEvolutions } from "../constants";
import { useEffect, useState } from "react";

const usePokemonSpecific = (pokeId) => {
    const [pokeSpeciesInfo, setPokeSpeciesInfo] = useState(null);
    const [pokeInfo, setPokeInfo] = useState(null);
    const [evolutionChain, setEvolutionChain] = useState(null);

    const fetchEvolutionChain = async (url) => {
        const response = await fetch(url);
        const data = await response.json();

        const evolutionArr = [];
        getAllEvolutions(evolutionArr, data.chain);
        
        const evChain = evolutionArr.map(async (el) => {
            return await fetchPokemonSpecies(el);
        });

        const allEv = await Promise.all(evChain);
        setEvolutionChain(allEv);
    };

    const fetchAll = async () => {
        const [species, info] = await Promise.all([
            fetchPokemonSpecies(pokeId),
            fetchPokemonInfo(pokeId)
        ]);

        setPokeSpeciesInfo(species);
        setPokeInfo(info);

        fetchEvolutionChain(species.evolution_chain.url);
    };

    useEffect(() => {
        fetchAll();
    }, [pokeId]);

    return [pokeSpeciesInfo, pokeInfo, evolutionChain];
};

export default usePokemonSpecific;