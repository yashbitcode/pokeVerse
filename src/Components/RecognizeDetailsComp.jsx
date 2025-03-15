import { useState } from "react";
import { HashLoader } from "react-spinners";
import { storage } from "../appwrite/storage";
import { ID } from "appwrite";
import { useNavigate } from "react-router";

const RecognizeDetailsComp = ({handler}) => {
    const [selectedImg, setSelectedImg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [recogName, setRecogName] = useState("");
    const navigate = useNavigate();

    const handleImage = (e) => setSelectedImg(e.target.files[0]);

    const fetchAISuggestions = async (imageBase64) => {
        const response = await fetch("/api/Recognizer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ base64: imageBase64 })
        }); 

        const data = await response.json();
        const mainResponse = JSON.parse(data.response);

        const fileId = ID.unique();
        const docId = ID.unique();

        await storage.createFile({id: fileId, ImageData: selectedImg})
        await storage.addRecognizationDetails({
            id: docId,
            Name: recogName,
            ImageSummary: mainResponse[0],
            RecognizedPokemons: JSON.stringify(mainResponse[1]),
            ImageId: fileId
        });
        
        setIsLoading(false);
        navigate("/recognize/" + docId);
    };

    const handleSubmit = () => {
        setIsLoading(true);
        setError(null);

        if(!selectedImg || !recogName) {
            setTimeout(() => {
                setIsLoading(false);
                setError(!recogName ? "Name The Recog." : "Upload The Image");
            }, 1000);
            return;
        }

        const reader = new FileReader();
        
        reader.onload = (e) => {
            fetchAISuggestions(e.target.result);
        }

        reader.readAsDataURL(selectedImg);        
    };   
        
    return (
        <div className="w-screen h-screen z-[10] fixed top-0 flex items-center justify-center"> 
            <div className="absolute z-[-1] w-screen h-[100vh] bg-black opacity-40" onClick={(e) => {
                e.stopPropagation();
                handler(false);
            }}></div>

            <div className="px-[1rem] bg-slate-200 rounded-[5px] mx-[1rem] py-[0.6rem]">
                <div className="flex gap-[10px] mt-[1rem]">
                    <span className="text-xl max-[500px]:text-[1rem] text-nowrap shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] px-[20px] py-[6px] rounded-[5px]">Name: </span>

                    <input className="outline-0 text-xl border-b-[1.5px] w-full max-[500px]:text-[1rem] text-nowrap" type="text" value={recogName} onChange={(e) => setRecogName(e.target.value)} />
                </div>
                <form className="flex flex-col items-center w-full max-w-[600px] mx-auto border-[2px] rounded-[5px] group border-dashed border-red-500 mt-[2rem] py-[1.1rem] px-[1rem] hover:border-red-700 transition-all">
                    <label htmlFor="img-file" >
                        <i className="fa-solid fa-cloud-arrow-up text-red-500 group-hover:text-red-700 transition-all fa-2xl"></i>
                    </label>
                    <label className="text-red-500 text-center group-hover:text-red-700 transition-all text-[1rem] mt-[0.5rem]">{`${selectedImg ? selectedImg.name : "Choose a file"}`}</label>
                    <label htmlFor="img-file" className="text-white bg-red-500 group-hover:bg-red-700 transition-all p-[8px] mt-[0.7rem] rounded-[2px] cursor-pointer text-[1rem]">Browse Image</label>
                    <input type="file" className="absolute invisible w-10"  name="img-file" id="img-file" accept="image/jpeg, image/png, image/webp" onChange={handleImage} />
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
            </div>
        </div>
    )
};

export default RecognizeDetailsComp;