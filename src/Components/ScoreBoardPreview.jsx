import { useSelector } from "react-redux";

const ScoreBoardPreview = () => {
    const score = useSelector((store) => store.pokemonQuiz.score);
    const currentQ = useSelector((store) => store.pokemonQuiz.currentQ);

    return (
        <div className="w-full max-w-[200px] mt-[1rem] shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] mx-auto p-[10px] text-center rounded-[10px]">
            <h1 className="text-2xl">Score</h1>
            <h2 className="text-[1rem] mt-[0.3rem]">{`Score: ${score} / ${currentQ}`}</h2>
        </div>
    );
};

export default ScoreBoardPreview;