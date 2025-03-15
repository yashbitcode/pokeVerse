import { useEffect, useState } from "react";
import PreviewComp, { ModifiedPreview } from "./PreviewComp.jsx";
import completed from "../assets/completed.svg";
import show from "../assets/show.svg";
import { LoadingScreen } from "./Shimmer.jsx";
import NotFound from "./NotFound.jsx";

const AllBasePreview = ({handler, previewType}) => {
    const [allPreviews, setAllPreviews] = useState(null);

    const ModifiedPreviewComp = ModifiedPreview(PreviewComp);

    const getAllPreviews = async () => {
        const result = await handler();
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