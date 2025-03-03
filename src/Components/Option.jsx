import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { flagCompletion } from "../Utils/services/questionSlice";
import { increamentCnt, scoreIncrement } from "../Utils/services/pokemonQuiz";

const Option = ({op, isRight}) => {
    const [isClicked, setIsClicked] = useState(false);
    const optionRef = useRef(null);
    
    const completed = useSelector((store) => store.question.completed);
    const dispatch = useDispatch();

    const handleOptionClick = () => {
        if(completed) return;

        dispatch(flagCompletion());
        setIsClicked(true);

        setTimeout(() => {
            const {quizQuestions, currentQ, score} = JSON.parse(localStorage.getItem("quizData"));
            
            localStorage.setItem("quizData", JSON.stringify({quizQuestions: quizQuestions, currentQ: currentQ + 1, score: (isRight ? score + 1 : score)}));

            dispatch(increamentCnt());
            dispatch(flagCompletion());

            if(isRight) dispatch(scoreIncrement());

            setIsClicked(false);
        }, 1000);
    };

    return (
        <div ref={optionRef} className={`border-[1px] p-[7px] cursor-pointer transition-all ${completed && ((isClicked && !isRight) ? "bg-red-500 border-red-500" : isRight && "bg-green-500 border-green-500")}`} onClick={handleOptionClick}>{op}</div>
    )
};

export default Option;