import { useMemo, useRef, useState } from "react";
import { allPokemonsList } from "../Utils/constants";
import { getFormattedName } from "../Utils/helpers";
import { HashLoader } from "react-spinners";
import QuizComp from "../Components/QuizComp";

const PokeAIQuiz = () => {
    const [canShow, setCanShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [quizSetup, setQuizSetup] = useState(false);
    const [error, setError] = useState(null);
    const [questionsCnt, setQuestionsCnt] = useState(5);
    const [quizName, setQuizName] = useState("");
    const [searchInp, setSearchInp] = useState("");

    const selectedPokemon = useRef(null);

    const handleFocus = () => setCanShow(true);
    
    const handleBlur = () => {
        setTimeout(() => {
            setCanShow(false);
        }, 200);
    };

    const handleSelection = (name) => {
        selectedPokemon.current = name;
        setSearchInp(name);
    };

    const getPokeList = () => {
        return allPokemonsList.map((el, idx) => {
            const name = getFormattedName(el);
    
            return (name.toLowerCase().includes(searchInp.toLowerCase())) ? (
                <li className="p-[8px] cursor-pointer hover:bg-gray-200" key={idx} onClick={() => handleSelection(name)}>{name}</li>
            ) : null;    
        });
    };

    const handleQuiz = () => {
        setIsLoading(true);
        setError(null);

        setTimeout(() => {
            if(!selectedPokemon.current) setError("Select Pokemon");
            else if(!questionsCnt || (+questionsCnt < 5 || +questionsCnt > 20)) setError("Select Range B/W 5-20");
            else if(!quizName) setError("Name The Quiz");
            else setQuizSetup(true);

            setIsLoading(false);

        }, 500);
    };

    // const fetchQuizQuestions = () => {

    // };

    const pokeListMemo = useMemo(getPokeList, [searchInp]);

    if(quizSetup) return <QuizComp />

    return (
        <div className="mt-[2rem] w-full max-w-[600px] mx-auto">
            <h1 className="text-3xl text-center mb-[1rem]">AI Quiz</h1>
            <div className="mx-auto max-w-[400px] w-full relative">  
                <input type="text" className="w-full border-b-[1.5px] text-2xl outline-0 pb-[4px]" value={searchInp} placeholder={"Eg: Pikachu"} onChange={(e) => setSearchInp(e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
                
                <div className="w-full bg-white overflow-auto absolute mt-[0.5rem]">
                    <ul className={`w-full flex flex-col gap-[5px] transition-all duration-100 ${canShow ? "h-[200px]" : "h-[0px]"}`}>{pokeListMemo}</ul>
                </div>
            </div>

            <div className="mt-[2rem] flex flex-col gap-[17px] w-full items-center">
                <div className="flex gap-[10px]">
                    <span className="text-xl shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] px-[20px] py-[6px] rounded-[5px]">Type of Questions: </span>
                    <span className="text-xl shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] px-[20px] py-[6px] rounded-[5px]">MCQs</span>
                </div>
                <div className="flex gap-[10px]">
                    <span className="text-xl shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] px-[20px] py-[6px] rounded-[5px]">Number of Questions: </span>
                    
                    <input className="outline-0 text-xl border-b-[1.5px] w-[100px]" type="number" value={questionsCnt} onChange={(e) => setQuestionsCnt(e.target.value)} onKeyDown={(e) => {
                        const invalidKeys = ["e", "+", "-"];
                        if(invalidKeys.includes(e.key)) e.preventDefault();
                    }} />
                        
                </div>
                <div className="flex gap-[10px]">
                    <span className="text-xl shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] px-[20px] py-[6px] rounded-[5px] text-nowrap">Quiz Name: </span>

                    <input className="outline-0 text-xl border-b-[1.5px] w-full" type="text" value={quizName} placeholder="Eg: Test Quiz" onChange={(e) => setQuizName(e.target.value)} />
                        
                </div>
                
                <button className="text-xl rounded-[5px] bg-red-500 text-white w-[120px] h-[40px] items-center flex justify-center cursor-pointer" onClick={handleQuiz}> 
                    {
                        isLoading ? <HashLoader color="white" size={25} /> : "Submit"
                    }
                </button>
                {
                    error && (
                        <span className="text-xl bg-red-500 text-white py-[6px] px-[12px] rounded-[5px]">Error: {error}</span>
                    )
                }
            </div>
        </div>
    );
};

export default PokeAIQuiz;