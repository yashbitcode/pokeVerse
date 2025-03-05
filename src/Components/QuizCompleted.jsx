import { useDispatch, useSelector } from "react-redux";
import { resetData } from "../Utils/services/pokemonQuiz";

const QuizCompleted = () => {
    const dispatch = useDispatch();
    const {currentQ, score} = useSelector((store) => store.pokemonQuiz);

    const handleContinue = () => {
        localStorage.clear();
        dispatch(resetData());
    }

    return (
        <>
            <div className="w-full max-w-[300px] mt-[5rem] shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] mx-auto p-[10px] text-center rounded-[10px]">
                <h1 className="text-3xl max-[500px]:text-2xl">Quiz Completed</h1>
                <h2 className="text-[1.3rem] mt-[0.8rem]">{`Score: ${score} / ${currentQ}`}</h2>
            </div>
            <div className="text-center mt-[2rem] max-[500px]:mt-[1rem]">
                <button className="text-xl max-[500px]:text-[1.1rem] p-[10px] bg-red-500 text-white rounded-[10px] cursor-pointer" onClick={handleContinue}>Continue</button>
            </div>
        </>
    );
};

export default QuizCompleted;