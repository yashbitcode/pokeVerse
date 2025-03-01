import NotFound from "../Components/NotFound";
import PokemonCard from "../Components/PokemonCard";
import { Link } from "react-router";
import { BaseShimmer } from "../Components/Shimmer";
import usePokeAI from "../Utils/hooks/usePokeAI";

const PokeGPT = () => {
    const [suggestions, searchInp, setSearchInp, loading, setLoading, searchRef, fetchAISuggestions] = usePokeAI();

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