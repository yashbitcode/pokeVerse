import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPokeGPTResult } from "../services/pokemon";
import { fetchPokemonSpecies } from "../helpers";

const usePokeAI = () => {
    const searchRef = useRef(null);
    const dispatch = useDispatch();
    
    const pokeAISuggestions = useSelector((store) => store.pokemon.pokeGPTResult);
    const [suggestions, setSuggestions] = useState(null);
    const [searchInp, setSearchInp] = useState(pokeAISuggestions?.searchQuery || "");
    const [loading, setLoading] = useState(false);

    const fetchAISuggestions = async (query) => {
        const userQuery = `give me the list of atmax 5 common pokemon names like for (Alolan Exeggutor) give me (Exeggutor), for (Mega Metagross) give me (Metagross) and etc. Based on the user query which can be found on "pokeapi.co": "${query}" just focus on the context and give me atmax 5 common unique pokemon names only and if you unable to understand or process the user query give the empty array as output`;

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
        const dataArr = pokeAISuggestions.data.map((el) => {
            let searchVal = "";

            el.split(" ").forEach((el) => {
                if(el && !searchVal) searchVal += el.toLowerCase();
                else if(el) searchVal += `-${el.toLowerCase()}`;
            }); 

            searchVal = searchVal.replace(/\./g, "");

            return fetchPokemonSpecies(searchVal);
        });

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

    return [suggestions, searchInp, setSearchInp, loading, setLoading, searchRef, fetchAISuggestions];
};

export default usePokeAI;