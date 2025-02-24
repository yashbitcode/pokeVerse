import { useEffect, useRef, useState } from "react";

const usePokemonInfo = () => {
    const [pokemonInfo, setPokemonInfo] = useState(null);
    const [totalPages, setTotalPages] = useState(null);

    const limit = 10;
    const searchRef = useRef("");
    const pageNumber = useRef(1);

    const fetchSpecificInfo = (data) => {
        return data.map(async (el) => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${el.name}`);
            
            return response.json();
        });
    };

    const fetchPokemonInfo = async () => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${(pageNumber.current - 1) * limit}`);
        const data = await response.json();
        
        const mainInfo = fetchSpecificInfo(data.results);
        setTotalPages(Math.ceil(data.count / limit));

        Promise.all(mainInfo).then((info) => setPokemonInfo(info));
    };

    const handleNextPage = () => {
        if((pageNumber.current + 1) <= totalPages) {
            pageNumber.current++;
            fetchPokemonInfo();
        }
    };
    
    const handlePrevPage = () => {
        if((pageNumber.current - 1) > 0) {
            pageNumber.current--;
            fetchPokemonInfo();
        }
    };

    const setSearchData = (data) => {
        setPokemonInfo(data);

        pageNumber.current = 1;
        setTotalPages(1);
    };

    useEffect(() => {
        fetchPokemonInfo();
    }, []);

    return {pokemonInfo, totalPages, searchRef, pageNumber, handleNextPage, handlePrevPage, setSearchData, fetchPokemonInfo, fetchSpecificInfo};
}

export default usePokemonInfo;