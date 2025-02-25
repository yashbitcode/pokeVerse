import { getFormattedDesc, getFormattedName } from "../Utils/constants";
import PokemonEssentials from "./PokemonEssentials";
import StatsCont from "./StatsCont";

const PokemonBase = ({pokeSpeciesInfo, pokeInfo}) => {
    return (
        <div className="flex flex-col gap-[13px]">
            <h1 className="text-3xl">
                {
                    (() => {
                        const pokedexNumber = pokeSpeciesInfo.pokedex_numbers.filter((el) => el.pokedex.name === "national")[0]?.entry_number + "";

                        return `${getFormattedName(pokeSpeciesInfo.name)} (PokeDex: #${pokedexNumber.padStart(3,0)})`;
                    })()
                }
            </h1>
            <p className="text-[1.2rem] leading-[35px]">
                {
                    getFormattedDesc(pokeSpeciesInfo.flavor_text_entries)
                }
            </p>

            <StatsCont pokeInfo={pokeInfo} />
            <PokemonEssentials pokeInfo={pokeInfo} />
        </div>
    );
};

export default PokemonBase;