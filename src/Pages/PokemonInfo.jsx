import { useEffect, useState } from "react";
import { useParams } from "react-router";
import PokemonBase from "../Components/PokemonBase";

const PokemonInfo = () => {
    const {pokeId} = useParams();
    const [pokeSpeciesInfo, setPokeSpeciesInfo] = useState(null);
    const [pokeInfo, setPokeInfo] = useState(null);
    const [evolutionChain, setEvolutionChain] = useState(null);

    const fetchPokemonSpecies = async () => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeId}`);
        return response.json();
    };

    const fetchPokemonInfo = async () => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`);
        return response.json();
    };

    const fetchEvolutionChain = async (url) => {
        const response = await fetch(url);
        const data = await response.json();

        // console.log(data);
    };

    const fetchAll = async () => {
        const [species, info] = await Promise.all([
            fetchPokemonSpecies(),
            fetchPokemonInfo()
        ]);

        setPokeSpeciesInfo(species);
        setPokeInfo(info);

        fetchEvolutionChain(species, info);
    };

    useEffect(() => {
        fetchAll();
    }, []);

    return (
        <div className="mt-[2.5rem] w-full max-w-[1300px] mx-auto">
            {
                pokeSpeciesInfo && pokeInfo && (
                    <div className="flex w-full gap-[3.5rem]">
                        <div className="w-full max-w-[430px] shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] p-[10px] rounded-[8px] ">
                            <img className="w-full" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeId}.png`} alt="" />
                        </div>
                        <PokemonBase pokeSpeciesInfo={pokeSpeciesInfo} pokeInfo={pokeInfo} />
                    </div>
                )
            }

            <div className="mt-[2rem]">
                <h1 className="text-2xl">Evolution Chain</h1>
            </div>
        </div>
    );
};

export default PokemonInfo;