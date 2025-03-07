import { useSelector } from "react-redux";
import { fetchPokemonSpecies } from "../helpers";
import { useEffect, useState } from "react";

const usePokeRecognition = () => {
    const {summary, pokeList} = useSelector((store) => store.recognize);
    const [suggestions, setSuggestions] = useState(null);

    const fetchResults = async () => {
        const dataArr = pokeList.map((el) => {
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
    };

    useEffect(() => {
        if(pokeList) fetchResults();
    }, [pokeList]);

    return [summary, suggestions];
};

export default usePokeRecognition;