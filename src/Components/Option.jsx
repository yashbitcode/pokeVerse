import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { flagCompletion } from "../Utils/services/questionSlice";
import { addAnswer, increamentCnt, scoreIncrement } from "../Utils/services/pokemonQuiz";
import { storage } from "../appwrite/storage";

const Option = ({op, isRight}) => {
    const [isClicked, setIsClicked] = useState(false);
    const optionRef = useRef(null);
    
    const completed = useSelector((store) => store.question.completed);

    const score = useSelector((store) => store.pokemonQuiz.score);
    const id = useSelector((store) => store.pokemonQuiz.quizId);
    const cnt = useSelector((store) => store.pokemonQuiz.currentQ);
    const allAnswers = [...useSelector((store) => store.pokemonQuiz.allAnswers)];
    
    const dispatch = useDispatch();

    const handleOptionClick = (op) => {
        if(completed) return;

        dispatch(flagCompletion());
        setIsClicked(true);

        setTimeout(() => {
            allAnswers.push(op);

            dispatch(increamentCnt());
            dispatch(addAnswer(allAnswers));

            dispatch(flagCompletion());

            if(isRight) {
                storage.updateQuizEssentials({id, QuestionCnt: cnt + 1, AllAnswers: JSON.stringify(allAnswers), Score: score + 1});

                dispatch(scoreIncrement());
            }
            else storage.updateQuizEssentials({id, QuestionCnt: cnt + 1, AllAnswers: JSON.stringify(allAnswers), Score: score});

            setIsClicked(false);
        }, 1000);
    };

    return (
        <div ref={optionRef} className={`border-[1px] p-[7px] cursor-pointer transition-all ${completed && ((isClicked && !isRight) ? "bg-red-500" : isRight && "bg-green-500")}`} onClick={() => handleOptionClick(op)}>{op}</div>
    );
};

export default Option;