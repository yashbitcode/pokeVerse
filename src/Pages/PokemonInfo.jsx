import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import PokemonBase from "../Components/PokemonBase";
import { fetchPokemonInfo, fetchPokemonSpecies, getAllEvolutions } from "../Utils/constants";
import PokemonCard from "../Components/PokemonCard";
import PokemonMoves from "../Components/PokemonMoves";
import PokemonEncounters from "../Components/PokemonEncounters";

const PokemonInfo = () => {
    const {pokeId} = useParams();
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

    return (
        <div className="mt-[2.5rem] w-full max-w-[1150px] mx-auto relative">
            {
                pokeSpeciesInfo && pokeInfo && (
                    <div className="flex w-full gap-[3.5rem]">
                        <div className="w-full max-w-[370px] flex items-center shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] p-[10px] rounded-[8px] ">
                            <img className="w-full" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeId}.png`} alt="" />
                        </div>
                        <PokemonBase pokeSpeciesInfo={pokeSpeciesInfo} pokeInfo={pokeInfo} />
                    </div>
                )
            }

            {
                evolutionChain && (
                    <div className="mt-[2.5rem]">
                        <h1 className="text-2xl">Evolution Chain</h1>
                        <div className="w-full grid grid-cols-4 mx-auto mt-[1rem] gap-[20px]">
                            {
                                evolutionChain.map((el) => (
                                    <Link key={el.id} to={`/pokeInfo/${el.id}`}>
                                        <PokemonCard data={el} />
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                )
            }
            <PokemonMoves pokeInfo={pokeInfo} />
            {
                pokeInfo && <PokemonEncounters pokeId={pokeId} name={pokeInfo.name} />
            }
        </div>
    );
};

export default PokemonInfo;