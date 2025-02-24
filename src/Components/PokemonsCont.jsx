import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";

const PokemonsCont = () => {
    const [pokemonInfo, setPokemonInfo] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const limit = 15;

    const fetchSpecificInfo = (data) => {
        return data.map(async (el) => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${el.name}`);
            const data = await response.json();

            return data;
        });
    };

    const fetchPokemonInfo = async () => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${(pageNumber - 1) * limit}`);
        const data = (await response.json()).results;

        const mainInfo = fetchSpecificInfo(data);

        Promise.all(mainInfo).then((info) => setPokemonInfo(info));
    };
    
    useEffect(() => {
        fetchPokemonInfo();
    }, [pageNumber]);

    return (
        <div className="mt-[2.5rem]">
            <div className="w-full text-center">
                <div className="flex items-center w-full max-w-[550px] mx-auto gap-[15px]">
                    <input className="text-3xl pb-[6px] outline-0 border-b-2 w-full" type="text" />

                    <button className="outline-0">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Magnifying_glass_icon.svg" alt="search" className="w-9" />
                    </button>
                </div>
            </div>

            <div className="w-full grid grid-cols-4 max-w-[1250px] mx-auto mt-[2rem] gap-[20px]">
                {
                    pokemonInfo && (
                        pokemonInfo.map((el) => <PokemonCard data={el} />)
                    )
                }
            </div>

            <div className="flex gap-[15px] items-center my-[1.5rem]">
                <button className="text-4xl font-semibold shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] px-[15px]">+</button>
                <span className="px-[1rem] py-[10px] text-2xl shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)]">{`${pageNumber} of 1300`}</span>
                <button className="text-4xl font-semibold shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] px-[15px]">-</button>
            </div>
        </div>
    );
};

export default PokemonsCont;