import PokemonBase from "../Components/PokemonBase";
import PokemonMoves from "../Components/PokemonMoves";
import PokemonEncounters from "../Components/PokemonEncounters";
import usePokemonSpecific from "../Utils/hooks/usePokemonSpecific";
import { useSelector } from "react-redux";
import EvolutionChainCont from "../Components/EvolutionChainCont";
import { useParams } from "react-router";

const PokemonInfo = () => {
    const {pokeId} = useParams();
    
    usePokemonSpecific(pokeId);

    const pokeSpeciesInfo = useSelector((store) => store.pokemon.pokeSpeciesInfo);
    const pokeInfo = useSelector((store) => store.pokemon.pokeInfo);

    return (
        <div className="mt-[2.5rem] w-full max-w-[1150px] mx-auto relative">
            {
                pokeSpeciesInfo && pokeInfo && (
                    <div className="flex w-full gap-[3.5rem] max-xs:flex-col">
                        <div className="w-full max-w-[370px] max-xs:mx-auto flex items-center shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] p-[10px] rounded-[8px] ">
                            <img className="w-full" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeId}.png`} alt="" />
                        </div>
                        <PokemonBase />
                    </div>
                )
            }
            
            <EvolutionChainCont />
            <PokemonMoves />
            
            {
                pokeInfo && <PokemonEncounters pokeId={pokeId} name={pokeInfo.name} />
            }
        </div>
    );
};

export default PokemonInfo;