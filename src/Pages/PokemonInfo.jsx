import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import PokemonBase from "../Components/PokemonBase";
import { fetchPokemonInfo, fetchPokemonSpecies, getAllEvolutions } from "../Utils/constants";
import PokemonCard from "../Components/PokemonCard";

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
                <div className="w-full grid grid-cols-4 max-w-[1250px] mx-auto mt-[2rem] gap-[20px]">
                    {
                        evolutionChain && (
                            evolutionChain.map((el) => (
                                <Link key={el.id} to={`/pokeInfo/${el.id}`}>
                                    <PokemonCard data={el} />
                                </Link>
                            ))
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default PokemonInfo;