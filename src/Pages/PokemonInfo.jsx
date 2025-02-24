import { useParams } from "react-router";

const PokemonInfo = () => {
    const {pokeId} = useParams();

    console.log(pokeId);
};

export default PokemonInfo;