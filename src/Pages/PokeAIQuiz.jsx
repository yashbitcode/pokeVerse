import { useState } from "react";
import { allPokemonsList } from "../Utils/constants";
import { getFormattedName } from "../Utils/helpers";

const PokeAIQuiz = () => {
    const [canShow, setCanShow] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [searchInp, setSearchInp] = useState("");

    const handleFocus = () => setCanShow(true);
    const handleBlur = () => {
        setTimeout(() => {
            setCanShow(false);
        }, 50);
    };
    const handleSelection = (name) => {
        setSelectedPokemon(name);
        setSearchInp(name);
    };

    return (
        <div className="mt-[2rem] w-full max-w-[600px] mx-auto">
            <div className="mx-auto max-w-[400px] w-full">  
                <input type="text" className="w-full border-b-[1.5px] text-2xl outline-0 pb-[4px]" value={searchInp} onChange={(e) => setSearchInp(e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
                
                {
                    canShow && (
                        <div className="w-full h-[200px] bg-white overflow-auto mt-[0.5rem]">
                            <ul className="w-full flex flex-col gap-[5px]">
                                {
                                    allPokemonsList.map((el, idx) => {
                                        const name = getFormattedName(el);

                                        return (name.toLowerCase().includes(searchInp.toLowerCase())) ? (
                                            <li className="p-[8px] cursor-pointer hover:bg-gray-200" key={idx} onClick={() => handleSelection(name)}>{name}</li>
                                        ) : null;
                                    })
                                }
                            </ul>
                        </div>
                    )
                }
            </div>

            <div>
                <div className="shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] w-fit px-[20px] py-[10px]">
                    <span className="text-2xl">MCQs</span>
                </div>
            </div>
        </div>
    );
};

export default PokeAIQuiz;