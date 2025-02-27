import { getFormattedName } from "../Utils/helpers";
import usePokemonEncounters from "../Utils/hooks/usePokemonEncounters";

const PokemonEncounters = ({pokeId, name}) => {
    const pokeEncounters = usePokemonEncounters(pokeId);

    if(!pokeEncounters?.length) return;

    return (
        <div className="mt-[2.5rem]">
            <h1 className="text-2xl">{`${getFormattedName(name)} All Encounters`}</h1>
            <div className="flex flex-wrap text-nowrap gap-[10px] mt-[1rem]">
                {
                    pokeEncounters.map((el, idx) => (
                        <span key={idx} className="p-[5px] shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] rounded-[4px] px-[10px]">{getFormattedName(el.location_area.name)}</span>
                    ))
                }
            </div>
        </div>
    );
};

export default PokemonEncounters;