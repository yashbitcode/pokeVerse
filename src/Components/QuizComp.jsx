import { useDispatch, useSelector } from "react-redux";
import QuizOptions from "./QuizOptions";
import QuizCompleted from "./QuizCompleted";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { storage } from "../appwrite/storage";
import { addQuizQuestions, resetData } from "../Utils/services/pokemonQuiz";
import { LoadingScreen } from "./Shimmer";
import CompletedQuizPreview from "./CompletedQuizPreview";
import back from "../assets/back.svg";
import { getTitleStr } from "../Utils/helpers";

const QuizComp = () => {
    const {quizQuestions, currentQ, name, completed} = useSelector((store) => store.pokemonQuiz);
    const dispatch = useDispatch();
    const {quizId} = useParams();
    const navigate = useNavigate();

    const getQuizData = async () => {
        const result = await storage.getIdSpecificDocument(quizId);

        dispatch(addQuizQuestions(result));
    };

    const handleBackNavigation = () => {
        dispatch(resetData());
        navigate("/pokeAIQuiz");
    };

    useEffect(() => {
        getQuizData();
    }, []);

    if(!quizQuestions) return <LoadingScreen />;
    else if(completed) return <CompletedQuizPreview />;
    else if(currentQ === quizQuestions.length) {
        storage.flagQuizCompletion({id: quizId});
        return <QuizCompleted />
    }

    return (
        <div className="mt-[2rem] w-full max-w-[800px] mx-auto px-[1rem]">
            <div className="w-[40px] mb-[2rem] mx-auto cursor-pointer" onClick={handleBackNavigation}>
                <img src={back} alt="back" />
            </div>
            <h1 className="text-2xl mb-[0.5rem]">{getTitleStr(name)}</h1>

            <div className="w-full h-[1.5px] mb-[20px] bg-black"></div>

            <div className="mt-[10px] text-xl max-[500px]:text-[1.1rem]">{`${currentQ + 1}. ${quizQuestions[currentQ].question}`}</div>

            <QuizOptions options={quizQuestions[currentQ].options} answer={quizQuestions[currentQ].answer} />

            <div className="text-[0.9rem] mx-auto w-fit mt-[1rem]">{`${currentQ + 1} of ${quizQuestions.length} Questions`}</div>
        </div>
    );
};

export default QuizComp;