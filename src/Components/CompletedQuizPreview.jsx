import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { storage } from "../appwrite/storage";
import { addQuizQuestions, resetData } from "../Utils/services/pokemonQuiz";
import { useEffect } from "react";
import CompletedQuestions from "./CompletedQuestions";
import ScoreBoardPreview from "./ScoreBoardPreview";
import back from "../assets/back.svg";

const CompletedQuizPreview = () => {
    const name = useSelector((store) => store.pokemonQuiz.name);

    const {quizId} = useParams();
    const dispatch = useDispatch();
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

    return (
        <div className="mt-[2rem] w-full max-w-[800px] mx-auto px-[1rem]">
            <div className="w-[40px] mb-[2rem] mx-auto cursor-pointer" onClick={handleBackNavigation}>
                <img src={back} alt="back" />
            </div>
            <h1 className="text-2xl mb-[0.5rem]">{name}</h1>
            <div className="w-full h-[1.5px] mb-[20px] bg-black"></div>

            <CompletedQuestions />
            <ScoreBoardPreview />
        </div>
    )
};

export default CompletedQuizPreview;