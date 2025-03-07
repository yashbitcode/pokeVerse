import { useState } from "react";
import { useDispatch } from "react-redux";
import { HashLoader } from "react-spinners";
import { addSummary, addPokeList, resetData } from "../Utils/services/pokemonRecognizer";
import PokeRecognitionCont from "../Components/PokeRecognitionCont";

const PokeAIRecognizer = () => {    
    const [selectedImg, setSelectedImg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const handleImage = (e) => setSelectedImg(e.target.files[0]);

    const handleSubmit = async () => {
        dispatch(resetData());
        setIsLoading(true);
        setError(null);

        if(!selectedImg) {
            setTimeout(() => {
                setIsLoading(false);
                setError("Upload The Image");
            }, 1000);
            return;
        }

        const formData= new FormData();
        formData.append("image", selectedImg);

        const fetchOptions = {
            method: 'post',
            body: formData
        };
        
        const res = await fetch("https://httpbin.org/post", fetchOptions);
        const imageBase64 = (await res.json()).files.image;

        const response = await fetch("/api/Recognizer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ base64: imageBase64 })
        }); 

        const data = await response.json();
        const mainResponse = JSON.parse(data.response);

        dispatch(addSummary(mainResponse[0]));
        dispatch(addPokeList(mainResponse[1]));
        
        setIsLoading(false);
    };        
      
    return (
        <div className="px-[1rem] ">
            <form className="flex flex-col items-center w-full max-w-[300px] mx-auto border-[2px] rounded-[5px] group border-dashed border-red-500 mt-[2rem] py-[1.1rem] px-[1rem] hover:border-red-700 transition-all">
                <label htmlFor="img-file">
                    <i className="fa-solid fa-cloud-arrow-up text-red-500 group-hover:text-red-700 transition-all fa-2xl"></i>
                </label>
                <label className="text-red-500 text-center group-hover:text-red-700 transition-all text-[1rem] mt-[0.5rem]">{`${selectedImg ? selectedImg.name : "Choose a file"}`}</label>
                <label htmlFor="img-file" className="text-white bg-red-500 group-hover:bg-red-700 transition-all p-[8px] mt-[0.7rem] rounded-[2px] cursor-pointer text-[1rem]">Browse Image</label>
                <input type="file" className="invisible absolute" name="img-file" id="img-file" accept="image/jpeg, image/png, image/webp" onChange={handleImage} />
            </form>

            <div className="w-full text-center">
                <button className="text-white bg-red-500 transition-all p-[8px] mt-[0.7rem] rounded-[2px] cursor-pointer text-[1rem] w-[100px] h-[45px] flex justify-center items-center mx-auto mb-[1rem]" onClick={handleSubmit}>
                    {
                        isLoading ? <HashLoader color="white" size={25} /> : "Submit"
                    }
                </button>
                {
                    error && (
                        <span className="text-[1rem] bg-red-500 text-white py-[6px] px-[12px] rounded-[2px]">Error: {error}</span>
                    )
                }
            </div>
            
            <PokeRecognitionCont />
        </div>
    );
};

export default PokeAIRecognizer;