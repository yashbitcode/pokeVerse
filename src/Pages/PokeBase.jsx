import { useState } from "react";
import addCircle from "../assets/add-circle.svg";

const PokeBase = ({PreviewComp, DetailsComp, previewType}) => {
    const [click, setClick] = useState(false);

    return (
        <>
            <div className="w-full mt-[1.2rem] max-w-[1200px] mx-auto px-[1rem]">
                <div className="w-full flex justify-between items-center mb-[1rem]">
                    <h1 className="text-2xl underline">{((previewType === "quiz") ? "All Quizzes" : "All Recognition")}</h1>
                    <div className="w-[50px]" onClick={() => setClick(true)}>
                        <img src={addCircle} alt="add" />
                    </div>
                </div>
                <PreviewComp previewType={previewType} />
            </div>
            {
                click && <DetailsComp handler={setClick} />
            }
        </>
    );
};

export default PokeBase;