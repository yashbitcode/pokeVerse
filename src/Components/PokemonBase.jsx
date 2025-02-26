import { getFormattedDesc, getFormattedName } from "../Utils/constants";
import PokemonEssentials from "./PokemonEssentials";
import StatsCont from "./StatsCont";

const PokemonBase = ({pokeSpeciesInfo, pokeInfo}) => {
    return (
        <div className="flex flex-col gap-[13px] max-xss:gap-[0px]">
            <div className="flex items-center">
                <span className="text-3xl max-xs:text-2xl max-xss:text-[1.1rem]">
                    {
                        (() => {
                            const pokedexNumber = pokeSpeciesInfo.pokedex_numbers.filter((el) => el.pokedex.name === "national")[0]?.entry_number + "";

                            return `${getFormattedName(pokeSpeciesInfo.name)} (PokeDex: #${pokedexNumber.padStart(3,0)})`;
                        })()
                    }
                </span>
                <div className="w-full max-w-[60px] max-xss:max-w-[50px]">
                    <img src={`https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/${pokeInfo.name}.png`} alt="" />
                </div>
            </div>
            <p className="text-[1.2rem] max-xss:text-[0.9rem] leading-[35px] max-xss:leading-[28px]">
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