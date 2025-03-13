import { useState } from "react";
import AllQuizPreview from "../Components/AllQuizPreview";
import addCircle from "../assets/add-circle.svg";
import QuizDetailsComp from "../Components/QuizDetailsComp";

const PokeQuizBase = () => {
    const [click, setClick] = useState(false);

    return (
        <>
            <div className="w-full mt-[1.2rem] max-w-[1200px] mx-auto px-[1rem]">
                <div className="w-full flex justify-between items-center mb-[1rem]">
                    <h1 className="text-2xl underline">All Quizzes</h1>
                    <div className="w-[50px]" onClick={() => setClick(true)}>
                        <img src={addCircle} alt="add" />
                    </div>
                </div>
                <AllQuizPreview />
            </div>
            {
                click && <QuizDetailsComp handler={setClick} />
            }
        </>
    );
};

export default PokeQuizBase;