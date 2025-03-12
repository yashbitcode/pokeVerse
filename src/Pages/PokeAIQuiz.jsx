import { useMemo, useRef, useState } from "react";
import { allPokemonsList } from "../Utils/constants";
import { getFormattedName } from "../Utils/helpers";
import { HashLoader } from "react-spinners";
import QuizComp from "../Components/QuizComp";
import { useDispatch, useSelector } from "react-redux";
import { addQuizQuestions } from "../Utils/services/pokemonQuiz";
import { storage } from "../appwrite/storage.js";

const PokeAIQuiz = () => {
    const [canShow, setCanShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [questionsCnt, setQuestionsCnt] = useState(5);
    const [quizName, setQuizName] = useState("");
    const [searchInp, setSearchInp] = useState("");

    const dispatch = useDispatch();

    const quizDataLS = JSON.parse(localStorage.getItem("quizData"));
    const quizData = useSelector((store) => store.pokemonQuiz.quizQuestions);
    

    if(quizDataLS && !quizData) dispatch(addQuizQuestions(quizDataLS));

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

    const fetchQuizQuestions = async () => {
        const userQuery = `give me ${questionsCnt} mcq based questions in a json format for a given pokemon: "${selectedPokemon.current}" everytime give me unique questions`;

        const response = await fetch("/api/AISuggestions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: userQuery }),
        }); 

        const data = await response.json();
        const obj = {
            quizQuestions: data.response,
            currentQ: 0,
            score: 0
        };

        dispatch(addQuizQuestions(obj)); 
        localStorage.setItem("quizData", JSON.stringify(obj));

        setIsLoading(false);
    };

    const handleQuiz = () => {
        setIsLoading(true);
        setError(null);

        setTimeout(() => {
            if(!selectedPokemon.current) {
                setError("Select Pokemon");
                setIsLoading(false);
            }
            else if(!questionsCnt || (+questionsCnt < 5 || +questionsCnt > 20)) {
                setError("Select Range B/W 5-20");
                setIsLoading(false);
            }
            else if(!quizName) {
                setError("Name The Quiz");
                setIsLoading(false);
            }
            else fetchQuizQuestions();
        }, 500);
    };

    // const handleDB = async () => {
    //     const res= await storage.createDocument({id: "212dsuhdushdsdsdd12", quizName: "SAyggy", pokeName: "SAS", totalQues: 10, quesCnt: 1});

    //     console.log(res);
    // }
    // const handleD = async () => {
    //     const res = await storage.getAllDocuments();

    //     console.log(res);
    // }

    const pokeListMemo = useMemo(getPokeList, [searchInp]);

    if(quizDataLS || quizData) return <QuizComp />

    return (
        <div className="mt-[2rem] w-full max-w-[600px] mx-auto px-[1rem]">
            <h1 className="text-3xl text-center mb-[1rem]">AI Quiz</h1>
            <div className="mx-auto max-w-[400px] w-full relative">  
                <input type="text" className="w-full border-b-[1.5px] text-2xl outline-0 pb-[4px] max-[500px]:text-xl" value={searchInp} placeholder={"Eg: Pikachu"} onChange={(e) => {
                    setSearchInp(e.target.value)
                    if(selectedPokemon.current) selectedPokemon.current = null;
                }} onFocus={handleFocus} onBlur={handleBlur} />
                
                <div className="w-full bg-white overflow-auto absolute mt-[0.5rem]">
                    <ul className={`w-full flex flex-col gap-[5px] transition-all duration-100 ${canShow ? "h-[200px]" : "h-[0px]"}`}>{pokeListMemo}</ul>
                </div>
            </div>

            <div className="mt-[2rem] flex flex-col gap-[17px] w-full items-center">
                <div className="flex gap-[10px]">
                    <span className="text-xl max-[500px]:text-[1rem] text-nowrap shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] px-[20px] py-[6px] rounded-[5px]">Type of Questions: </span>
                    <span className="text-xl max-[500px]:text-[1rem] text-nowrap shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] px-[20px] py-[6px] rounded-[5px]">MCQs</span>
                </div>
                <div className="flex gap-[10px]">
                    <span className="text-xl max-[500px]:text-[1rem] text-nowrap shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] px-[20px] py-[6px] rounded-[5px]">No. of Questions: </span>
                    
                    <input className="outline-0 text-xl border-b-[1.5px] w-[100px]" type="number" value={questionsCnt} onChange={(e) => setQuestionsCnt(e.target.value)} onKeyDown={(e) => {
                        const invalidKeys = ["e", "+", "-"];
                        if(invalidKeys.includes(e.key)) e.preventDefault();
                    }} />
                        
                </div>
                <div className="flex gap-[10px]">
                    <span className="text-xl max-[500px]:text-[1rem] text-nowrap shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] px-[20px] py-[6px] rounded-[5px]">Quiz Name: </span>

                    <input className="outline-0 text-xl border-b-[1.5px] w-full max-[500px]:text-[1rem] text-nowrap" type="text" value={quizName} placeholder="Eg: Test Quiz" onChange={(e) => setQuizName(e.target.value)} />
                        
                </div>
                
                <button className="text-xl max-[500px]:text-[1rem] rounded-[5px] bg-red-500 text-white w-[120px] h-[40px] items-center flex justify-center cursor-pointer" onClick={handleQuiz}> 
                    {
                        isLoading ? <HashLoader color="white" size={25} /> : "Submit"
                    }
                </button>
                {
                    error && (
                        <span className="text-xl max-[500px]:text-[1rem] bg-red-500 text-white py-[6px] px-[12px] rounded-[5px]">Error: {error}</span>
                    )
                }
            </div>
        </div>
    );
};

export default PokeAIQuiz;