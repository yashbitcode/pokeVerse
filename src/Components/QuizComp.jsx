import { useSelector } from "react-redux";
import QuizOptions from "./QuizOptions";
import QuizCompleted from "./QuizCompleted";

const QuizComp = () => {
    const {quizQuestions, currentQ} = useSelector((store) => store.pokemonQuiz);

    if(currentQ === quizQuestions.length) return <QuizCompleted />

    return (
        <div className="mt-[2rem] w-full max-w-[800px] mx-auto">
            <h1 className="text-2xl mb-[0.5rem]">PokeAI Quiz</h1>

            <div className="w-full h-[1.5px] mb-[20px] bg-black "></div>

            <div className="mt-[10px] text-xl">{`${currentQ + 1}. ${quizQuestions[currentQ].question}`}</div>

            <QuizOptions options={quizQuestions[currentQ].options} answer={quizQuestions[currentQ].answer} />

            <div className="text-[0.9rem] mx-auto w-fit mt-[1rem]">{`${currentQ + 1} of ${quizQuestions.length} Questions`}</div>
        </div>
    );
};

export default QuizComp;