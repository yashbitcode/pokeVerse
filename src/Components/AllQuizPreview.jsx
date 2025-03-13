import { useEffect, useState } from "react";
import { storage } from "../appwrite/storage.js";
import QuizPreviewComp, { CompletedPreview } from "./QuizPreviewComp.jsx";

const AllQuizPreview = () => {
    const [allPreviews, setAllPreviews] = useState(null);
    const CompletedPreviewComp = CompletedPreview(QuizPreviewComp);

    const getAllPreviews = async () => {
        try {
            const result = await storage.getAllDocuments();
            setAllPreviews(result.documents);

            console.log(result);
        }
        catch(err) {
            setAllPreviews([]);
        }
    };

    useEffect(() => {
        getAllPreviews();
    }, []);

    return (
        <div className="w-full grid gap-[1rem] justify-center grid-cols-[repeat(auto-fit,minmax(100px,180px))]">
            {
                allPreviews?.map((el) => el.Completed ? <CompletedPreviewComp key={el.$id} data={el} /> : <QuizPreviewComp key={el.$id} data={el} /> )
            }        
        </div>
    );
};

export default AllQuizPreview;