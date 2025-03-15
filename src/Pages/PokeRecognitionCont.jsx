import { ReactTyped } from "react-typed";
import NotFound from "../Components/NotFound";
import PokemonCard, { RecognizedPokeCard } from "../Components/PokemonCard";
import { Link } from "react-router";
import { BaseShimmer, LoadingScreen } from "../Components/Shimmer";
import usePokeRecognition from "../Utils/hooks/usePokeRecognition";
import conf from "../conf/conf";
import { getTitleStr } from "../Utils/helpers";

const PokeRecognitionCont = () => {
    const [recognizedData] = usePokeRecognition();
    if(!recognizedData) return <LoadingScreen />;

    const {recogPokemons, summary, imageId, name} = recognizedData;

    const RecognizedCard = RecognizedPokeCard(PokemonCard);

    if(!summary)  return null;
    
    return (
        <div className="mt-[2rem] px-[1rem]">
            <div className="w-full max-w-[800px] mx-auto flex flex-col gap-[20px]">
                <h1 className="text-3xl mb-[0.5rem] underline text-center">{getTitleStr(name)}</h1>

                <div className="w-full max-w-[400px] mx-auto rounded-[5px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)]">
                    <img src={`https://cloud.appwrite.io/v1/storage/buckets/${conf.appwriteBucketId}/files/${imageId}/view?project=${conf.appwriteProjectId}&mode=admin`} alt="" />
                </div>

                <div className="text-center w-full mx-auto">
                    <h1 className="text-[1.2rem] leading-[38px]">
                        {
                            <ReactTyped strings={[summary]} typeSpeed={20} backSpeed={20} cursorChar="|" showCursor={true} />
                        }
                    </h1>
                </div>
            </div>

            {
                recogPokemons ? (
                    <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(250px,280px))] justify-center max-w-[1270px] mx-auto mt-[3rem] gap-[25px]">
                        {
                            recogPokemons.map((el) => {
                                if(el === "error") return <NotFound key={"err"} />;
                                return (
                                    <Link key={el.id} to={`/pokeInfo/${el.id}`}>
                                        <RecognizedCard data={el} />
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