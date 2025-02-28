import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPokeGPTResult } from "../Utils/services/pokemon";
import { fetchPokemonSpecies } from "../Utils/helpers";
import NotFound from "../Components/NotFound";
import PokemonCard from "../Components/PokemonCard";
import { Link } from "react-router";
import { BaseShimmer } from "../Components/Shimmer";

const PokeGPT = () => {
    const searchRef = useRef(null);
    const dispatch = useDispatch();
    
    const pokeAISuggestions = useSelector((store) => store.pokemon.pokeGPTResult);
    const [suggestions, setSuggestions] = useState(null);
    const [searchInp, setSearchInp] = useState(pokeAISuggestions?.searchQuery || "");
    const [loading, setLoading] = useState(false);

    const fetchAISuggestions = async (query) => {
        const userQuery = `give me the list of atmax 5 common pokemon names like for (Alolan Exeggutor) give me (Exeggutor), for (Mega Metagross) give me (Metagross) and etc. Based on the user query which can be found on "pokeapi.co": "${query}" just focus on the context and give me atmax 5 common pokemon names only and if you unable to understand or process the user query give the empty array as output`;

        const response = await fetch("/api/AISuggestions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: userQuery }),
        }); 

        const data = await response.json();   

        console.log(data.response);
        
        dispatch(addPokeGPTResult({
            searchQuery: query,
            data: data.response
        }));
    };

    const fetchResults = async () => {
        const dataArr = pokeAISuggestions.data.map((el) => fetchPokemonSpecies(el));

        if(dataArr.length) {
            try {
                const result = await Promise.all(dataArr);

                setSuggestions(result);
            }
            catch(err) {
                setSuggestions(["error"]);
            }
        }
        else setSuggestions(["error"]);

        setLoading(false);
    };

    useEffect(() => {
        if(pokeAISuggestions) fetchResults();
    }, [pokeAISuggestions]);

    if(loading) return <BaseShimmer limit={5} />;

    return (
        <div className="mt-[2.5rem]">
            <div className="w-full text-center">
                <div>
                    <form className="flex items-center w-full max-w-[550px] max-xsl:max-w-[280px] mx-auto gap-[10px]" onSubmit={(e) => {
                            e.preventDefault();
                            if(!searchRef.current.value) return;

                            setLoading(true);

                            fetchAISuggestions(searchRef.current.value);
                        }}>

                        <input value={searchInp} className="text-3xl max-xsl:text-xl pb-[4px] outline-0 border-b-[1.5px] w-full" type="text" ref={searchRef} placeholder="Eg: Best Pokemons" onChange={(e) => setSearchInp(e.target.value)} />

                        <button className="outline-0">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Magnifying_glass_icon.svg" alt="search" className="w-9 max-xsl:w-[20px]" />
                        </button>
                    </form>
                </div>

                {
                    suggestions && (
                        <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(250px,280px))] justify-center max-w-[1270px] mx-auto mt-[2rem] gap-[20px]">
                            {
                                suggestions.map((el) => {
                                    if(el === "error") return <NotFound key={"err"} />;
                                    return (
                                        <Link key={el.id} to={`/pokeInfo/${el.id}`}>
                                            <PokemonCard data={el} />
                                        </Link>
                                    );
                                })
                            }
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default PokeGPT;