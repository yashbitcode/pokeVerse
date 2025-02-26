import { useEffect, useState } from "react";

const usePokemonEncounters = (pokeId) => {
    const [pokeEncounters, setPokeEncounters] = useState(null);
    
    const fetchEncounters = async () => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}/encounters`);
        const data = await response.json();

        setPokeEncounters(data);
    };

    useEffect(() => {
        fetchEncounters();
    }, [pokeId]);

    return pokeEncounters;
};

export default usePokemonEncounters;