import { useNavigate } from "react-router";
import { getTitleStr, getTruncatedStr } from "../Utils/helpers";

const PreviewComp = ({name, nav}) => {
    const navigate = useNavigate();
    const truncatedName = getTitleStr(getTruncatedStr(name));

    const handleNavigation = () => navigate(nav);

    return (
        <div className="w-full h-[70px] p-[8px] shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] rounded-[5px] flex items-center cursor-pointer" onClick={handleNavigation}>
            <h1>{truncatedName}</h1>
        </div>
    );
};

export const ModifiedPreview = (PreviewComp) => {
    return ({name, nav, icon}) => {
        return (
            <div className="relative h-full">
                <div className="top-[-10px] absolute w-[30px] right-[0px]">
                    <img src={icon} alt="icon" />
                </div>
                <PreviewComp name={name} nav={nav} />
            </div>
        );
    };
};

export default PreviewComp;