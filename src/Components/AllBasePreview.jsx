import { useEffect, useState } from "react";
import PreviewComp, { ModifiedPreview } from "./PreviewComp.jsx";
import completed from "../assets/completed.svg";
import show from "../assets/show.svg";
import { LoadingScreen } from "./Shimmer.jsx";
import NotFound from "./NotFound.jsx";
import { useSelector } from "react-redux";
import { storage } from "../appwrite/storage.js";

const AllBasePreview = ({previewType}) => {
    const [allPreviews, setAllPreviews] = useState(null);
    const userId = useSelector((store) => store.userInfo.accStatus?.$id);

    const ModifiedPreviewComp = ModifiedPreview(PreviewComp);

    const getAllQuizPreview = async () => {
        try {
            const result = await storage.getAllDocuments(userId);
            return result.documents;
        }
        catch(err) {
            return [];
        }
    };
    
    const getAllRecognizePreview = async () => {
        try {
            const result = await storage.getAllRecognizeDocuments(userId);
            return result.documents;
        }
        catch(err) {
            return [];
        }
    };

    const getAllPreviews = async () => {
        const result = await ((previewType === "quiz") ? getAllQuizPreview() : getAllRecognizePreview());

        setAllPreviews(result);
    };
    
    const quizPreviews = () => {
        return allPreviews?.map((el) => el.Completed ? <ModifiedPreviewComp icon={completed} key={el.$id} name={el.QuizName} nav={"/quiz/" + el.$id} /> : <PreviewComp key={el.$id} name={el.QuizName} nav={"/quiz/" + el.$id} /> );
    };

    const recognizationPreview = () => {
        return allPreviews?.map((el) => <ModifiedPreviewComp icon={show} name={el.Name} nav={"/recognize/" + el.$id} key={el.$id} /> )
    }

    useEffect(() => {
        getAllPreviews();
    }, []);

    if(!allPreviews) return <LoadingScreen />;

    if(allPreviews.length === 0) return <NotFound />

    return allPreviews && (
        <div className="w-full grid gap-[1rem] justify-center grid-cols-[repeat(auto-fit,minmax(100px,180px))]">
            {
                (previewType === "quiz") ? quizPreviews() : recognizationPreview() 
            }        
        </div>
    );
};

export default AllBasePreview;