import { getFormattedName } from "../Utils/constants";

const PokemonEssentials = ({pokeInfo}) => {
    return (
        <div className="mt-[20px] flex items-center gap-[25px] flex-wrap">
            <div className="flex items-center gap-[10px]">
                <h1 className="text-[1.15rem]">Type: </h1>
                <div className="flex gap-[10px]">
                    {
                        pokeInfo.types.map((el, idx) => (
                            <span key={idx} className="p-[5px] shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] rounded-[4px] px-[10px]">{getFormattedName(el.type.name)}</span>
                        ))
                    }
                </div>
            </div>
            
            <div className="flex items-center gap-[10px]">
                <h1 className="text-[1.15rem]">Height: </h1>
                <span className="p-[5px] shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] rounded-[4px] px-[10px]">{pokeInfo.height + "m"}</span>
            </div>
            
            <div className="flex items-center gap-[10px]">
                <h1 className="text-[1.15rem]">Weight: </h1>
                <span className="p-[5px] shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] rounded-[4px] px-[10px]">{pokeInfo.weight + "kg"}</span>
            </div>

            <div className="flex items-center gap-[10px]">
                <h1 className="text-[1.15rem]">Base Experience: </h1>
                <span className="p-[5px] shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] rounded-[4px] px-[10px]">{pokeInfo.base_experience + "EXP"}</span>
            </div>

            <div className="flex items-center gap-[10px]">
                <h1 className="text-[1.15rem]">Abilities: </h1>
                <div className="flex gap-[10px]">
                    {
                        pokeInfo.abilities.map((el, idx) => (
                            <span key={idx} className="p-[5px] shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] rounded-[4px] px-[10px]">{getFormattedName(el.ability.name)}</span>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default PokemonEssentials;