import { getFormattedDesc, getFormattedName } from "../Utils/constants";

const PokemonCard = ({data}) => {
    const name = getFormattedName(data.name);
    const description = getFormattedDesc(data.flavor_text_entries);

    return (
        <div className="h-full shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] gap-[8px] p-[1rem] flex flex-col rounded-[10px]">
            <div className="w-full max-w-[250px] mx-auto">
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`} alt="pokemon" />
            </div>
            <div className="flex flex-col gap-[5px]">
                <h1 className="text-[1.3rem]">{name}</h1>
                <p className="leading-[30px] mt-[4px]">{description}</p>
            </div>
        </div>
    );
};

export default PokemonCard;