import { useRef } from "react";
import runQuery from "../Utils/services/gemini";

const PokeGPT = () => {
    const searchRef = useRef(null);
    const fetchAISuggestions = async (query) => {
        const userQuery = `give me the list of atmax 5 pokemons based on the user query which can be found on "pokeapi.co" and give different result everytime: "${query}" just focus on the context and give me atmax 5 pokemons only and if you don't understand the output give me the empty array`;

        const response = await runQuery(userQuery);

        console.log(response);
    };

    return (
        <div className="mt-[2.5rem]">
            <div className="w-full text-center">
                <div>
                    <form className="flex items-center w-full max-w-[550px] mx-auto gap-[15px]" onSubmit={(e) => {
                            e.preventDefault();
                            if(!searchRef.current.value) return;

                            fetchAISuggestions(searchRef.current.value);
                        }}>

                        <input className="text-3xl pb-[4px] outline-0 border-b-2 w-full" type="text" ref={searchRef} placeholder="Eg: Best Powerfull Pokemons" />

                        <button className="outline-0">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Magnifying_glass_icon.svg" alt="search" className="w-9" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PokeGPT;