import { fetchPokemonInfo, fetchPokemonSpecies, getAllEvolutions } from "../helpers";
import { useEffect } from "react";
import { addEvolutionChain, addPokeInfo, addPokeSpecies, removeData } from "../services/pokemon";
import { useDispatch } from "react-redux";

const usePokemonSpecific = (pokeId) => {
    const dispatch = useDispatch();

    const fetchEvolutionChain = async (url) => {
        const response = await fetch(url);
        const data = await response.json();

        const evolutionArr = [];
        getAllEvolutions(evolutionArr, data.chain);
        
        const evChain = evolutionArr.map(async (el) => {
            return await fetchPokemonSpecies(el);
        });

        const allEv = await Promise.all(evChain);
        dispatch(addEvolutionChain(allEv));
    };

    const fetchAll = async () => {
        const [species, info] = await Promise.all([
            fetchPokemonSpecies(pokeId),
            fetchPokemonInfo(pokeId)
        ]);

        dispatch(addPokeSpecies(species));
        dispatch(addPokeInfo(info));

        fetchEvolutionChain(species.evolution_chain.url);
    };

    useEffect(() => {
        fetchAll();

        return () => dispatch(removeData());
    }, [pokeId]);
};

export default usePokemonSpecific;