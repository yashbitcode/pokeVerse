import { Link, useParams } from "react-router";
import PokemonBase from "../Components/PokemonBase";
import PokemonCard from "../Components/PokemonCard";
import PokemonMoves from "../Components/PokemonMoves";
import PokemonEncounters from "../Components/PokemonEncounters";
import usePokemonSpecific from "../Utils/hooks/usePokemonSpecific";

const PokemonInfo = () => {
    const {pokeId} = useParams();
    const [pokeSpeciesInfo, pokeInfo, evolutionChain] = usePokemonSpecific(pokeId);

    return (
        <div className="mt-[2.5rem] w-full max-w-[1150px] mx-auto relative">
            {
                pokeSpeciesInfo && pokeInfo && (
                    <div className="flex w-full gap-[3.5rem] max-xs:flex-col">
                        <div className="w-full max-w-[370px] max-xs:mx-auto flex items-center shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] p-[10px] rounded-[8px] ">
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
                        <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] mx-auto mt-[1rem] gap-[20px]">
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