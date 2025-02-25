import StatBase from "../Components/StatBase";
import { statConstants } from "../Utils/constants";

const StatsCont = ({pokeInfo}) => {
    return (
        <div className="flex flex-col mt-[12px] w-full max-w-[550px] gap-[10px]">
            {
                pokeInfo.stats.map((el, idx) => (
                    <StatBase key={statConstants[idx].name} head={statConstants[idx].name} stat={el.base_stat} color={statConstants[idx].color} />
                ))
            }
        </div>
    );
};

export default StatsCont;