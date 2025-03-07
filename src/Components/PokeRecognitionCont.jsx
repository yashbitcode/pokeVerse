import { ReactTyped } from "react-typed";
import NotFound from "./NotFound";
import PokemonCard from "./PokemonCard";
import { Link } from "react-router";
import { BaseShimmer } from "./Shimmer";
import usePokeRecognition from "../Utils/hooks/usePokeRecognition";

const PokeRecognitionCont = () => {
    const [summary, suggestions] = usePokeRecognition();

    if(!summary)  return null;
    
    return (
        <div className="mt-[2rem]">
            <div className="text-center w-full max-w-[800px] mx-auto">
                <h1 className="text-[1.2rem] leading-[38px]">
                    {
                        <ReactTyped strings={[summary]} typeSpeed={20} backSpeed={20} cursorChar="|" showCursor={true} />
                    }
                </h1>
            </div>

            {
                suggestions ? (
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
                ) : <BaseShimmer limit={5} />
            }
        </div>
    );
};

export default PokeRecognitionCont;