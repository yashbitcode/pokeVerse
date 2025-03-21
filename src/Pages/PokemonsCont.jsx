import PokemonCard from "../Components/PokemonCard";
import NEXT from "../assets/next.svg";
import PREVIOUS from "../assets/previous.svg";
import NotFound from "../Components/NotFound";
import usePokemonInfo from "../Utils/hooks/usePokemonInfo";
import { Link, useNavigate } from "react-router";
import { BaseShimmer } from "../Components/Shimmer";

const PokemonsCont = () => {
    const {pokemonInfo, pageId, totalPages, searchRef, handleNextPage, handlePrevPage} = usePokemonInfo();

    const navigate = useNavigate();

    return (
        <div className="mt-[2.5rem] mx-[1rem]">
            <div className="w-full text-center">
                <div>
                    <form className="flex items-center w-full max-w-[550px] max-xsl:max-w-[280px] mx-auto gap-[10px]" onSubmit={(e) => {
                        e.preventDefault();

                        let searchVal = "";

                        searchRef.current.value.split(" ").forEach((el) => {
                            if(el && !searchVal) searchVal += el.toLowerCase();
                            else if(el) searchVal += `-${el.toLowerCase()}`;
                        }); 

                        searchVal = searchVal.replace(/\./g, "");
                        
                        navigate("/pokemons/" + searchVal);
                    }}>
                        <input className="text-3xl max-xsl:text-xl pb-[4px] outline-0 border-b-[1.5px] w-full" type="text" ref={searchRef} placeholder="Eg: Pikachu" />

                        <button className="outline-0">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Magnifying_glass_icon.svg" alt="search" className="w-9 max-xsl:w-[20px]" />
                        </button>
                    </form>
                </div>
            </div>

            {
                pokemonInfo ? (
                    <>
                        <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(250px,280px))] justify-center max-w-[1270px] mx-auto mt-[2rem] gap-[20px]">
                            {
                                pokemonInfo.map((el) => {
                                    if(el === "error") return <NotFound key={"err"} />;
                                    return (
                                        <Link key={el.id} to={`/pokeInfo/${el.id}`}>
                                            <PokemonCard data={el} />
                                        </Link>
                                    );
                                })
                            }
                        </div>

                        <div className="flex gap-[15px] items-center my-[1.8rem] justify-center">
                            <button className="font-semibold shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] p-[5px] rounded-[5px]" onClick={handlePrevPage}>
                                <img className="cursor-pointer w-[30px]" src={PREVIOUS} alt="prev-page" />
                            </button>
                            <span className="rounded-[5px] px-[1rem] py-[10px] text-2xl shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)]">{`${(!/[a-zA-Z]/g.test(pageId) && pageId) || 1} of ${totalPages || 1}`}</span>
                            <button className="font-semibold shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] p-[5px] rounded-[5px]" onClick={handleNextPage}>
                                <img className="cursor-pointer w-[30px]" src={NEXT} alt="next-page" />
                            </button>
                        </div>
                    </>
                ) : <BaseShimmer limit={10} />
            }
        </div>
    );
};

export default PokemonsCont;