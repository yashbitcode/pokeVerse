import { useSelector } from "react-redux";
import { Link } from "react-router";
import PokemonCard from "./PokemonCard";
import { BaseShimmer } from "./Shimmer";

const EvolutionChainCont = () => {
    const evolutionChain = useSelector((store) => store.pokemon.evolutionChain);

    if(!evolutionChain) return <BaseShimmer limit={3} />;
    
    return (
        <div className="mt-[2.5rem]">
            <h1 className="text-2xl">Evolution Chain</h1>
            <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(250px,280px))] mx-auto mt-[1rem] gap-[20px]">
                {
                    evolutionChain.map((el) => (
                        <Link key={el.id} to={`/pokeInfo/${el.id}`}>
                            <PokemonCard data={el} />
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};

export default EvolutionChainCont;