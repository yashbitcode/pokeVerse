import { useNavigate } from "react-router";
import { getTruncatedStr } from "../Utils/helpers";
import completed from "../assets/completed.svg";

const QuizPreviewComp = ({data}) => {
    const navigate = useNavigate();
    const handleNavigation = () => navigate("/quiz/" + data.$id);

    return (
        <div className="w-full h-[70px] p-[8px] shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] rounded-[5px] flex items-center cursor-pointer" onClick={handleNavigation}>
            <h1>{getTruncatedStr(data.QuizName)}</h1>
        </div>
    );
};

export const CompletedPreview = (QuizPreview) => {
    return ({data}) => {
        return (
            <div className="relative h-full">
                <div className="top-[-10px] absolute w-[30px] right-[0px]">
                    <img src={completed} alt="completed" />
                </div>
                <QuizPreview data={data} />
            </div>
        );
    };
};

export default QuizPreviewComp;