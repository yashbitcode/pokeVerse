import { useSelector } from "react-redux";
import CompletedQuizOptions from "./CompletedQuizOptions";

const CompletedQuestions = () => {
    const quizQuestions = useSelector((store) => store.pokemonQuiz.quizQuestions);
    const allAnswers = useSelector((store) => store.pokemonQuiz.allAnswers);

    return quizQuestions.map((el, idx) => (
        <div key={idx}>
            <div>
                <div className="mt-[10px] text-xl max-[500px]:text-[1.1rem]">{`${idx + 1}. ${el.question}`}</div>

                <CompletedQuizOptions options={el.options} rightAns={el.answer} userAns={allAnswers[idx]} />
            </div>
            <div className="w-[60px] h-[3px] bg-black mx-auto my-[2rem]"></div>
        </div>
    ));
};

export default CompletedQuestions;