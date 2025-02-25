const StatBase = ({head, stat, color}) => {
    return (
        <div className="flex items-center gap-[10px]">
            <h2 className="w-[30px] text-nowrap pr-[3rem] text-end">{head}</h2>
            <div className="shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] h-[13px] rounded-xl w-full max-w-[400px]">
                <div className={"h-full rounded-xl " + color} style={{width:`${stat > 100 ? 100 : stat}%`}}></div>
            </div>
            <h2 className="">{stat > 100 ? 100 : stat}</h2>
        </div>
    )
};

export default StatBase;