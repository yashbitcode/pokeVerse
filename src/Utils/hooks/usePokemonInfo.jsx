import { useEffect, useRef, useState } from "react";
import { fetchPokemonSpecies } from "../helpers";
import { useNavigate, useParams } from "react-router";

const usePokemonInfo = () => {
    const {pageId} = useParams();

    const [pokemonInfo, setPokemonInfo] = useState(null);
    const [totalPages, setTotalPages] = useState(null);
    const navigate = useNavigate();

    const limit = 10;
    const searchRef = useRef("");

    const fetchSpecificInfo = (data) => {
        return data.map((el) => fetchPokemonSpecies(el.name));
    };

    const fetchPokemonInfo = async () => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${(pageId - 1) * limit}`);
        const data = await response.json();
        
        const mainInfo = fetchSpecificInfo(data.results);
        setTotalPages(Math.ceil(data.count / limit));

        Promise.all(mainInfo).then(setPokemonInfo);
    };

    const handleNextPage = () => {
        if((+pageId + 1) <= totalPages) navigate(`/pokemons/${+pageId + 1}`);
    };
    
    const handlePrevPage = () => {
        if((+pageId - 1) >= 0) navigate(`/pokemons/${+pageId - 1}`);
    };

    const getSearchData = async () => {
        Promise.all(fetchSpecificInfo([
            {
                name: pageId
            }
        ]))
        .then(setPokemonInfo);
    };

    useEffect(() => {
        if(!/[a-zA-Z]/g.test(pageId)) fetchPokemonInfo();
        else {
            setTotalPages(1);
            getSearchData();
        }

    }, [pageId]);

    return {pokemonInfo, pageId, totalPages, searchRef, fetchPokemonInfo, fetchSpecificInfo, handleNextPage, handlePrevPage};
}

export default usePokemonInfo;