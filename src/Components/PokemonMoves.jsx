import { useSelector } from "react-redux";
import { getFormattedName } from "../Utils/constants";

const PokemonMoves = () => {
    const pokeInfo = useSelector((store) => store.pokemon.pokeInfo);
    
    if(!pokeInfo?.moves?.length) return;

    return (
        <div className="mt-[2.5rem]">
            <h1 className="text-2xl">{`${getFormattedName(pokeInfo.name)} All Moves`}</h1>
            <div className="flex flex-wrap text-nowrap gap-[10px] mt-[1rem]">
                {
                    pokeInfo.moves.map((el, idx) => (
                        <span key={idx} className="p-[5px] shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] rounded-[4px] px-[10px]">{getFormattedName(el.move.name)}</span>
                    ))
                }
            </div>
        </div>
    );
};

export default PokemonMoves;