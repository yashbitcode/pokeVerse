export const BaseShimmer = ({limit}) => {
    return (
        <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(250px,280px))] justify-center max-w-[1270px] mx-auto mt-[2rem] gap-[20px] px-[1rem]">
            {
                (() => {
                    const shimArr = [];
                    for(let i = 1; i <= limit; i++) {
                        shimArr.push(
                            <div key={i} className="w-full h-[440px] rounded-[10px] shimmer-animate"></div>
                        );
                    }

                    return shimArr;
                })()
            }
        </div>
    );
};

export const MainInfoShimmer = () => {
    return (
        <div className="mt-[2.5rem] w-full max-w-[1150px] mx-auto px-[1rem]">
            <div className="flex w-full gap-[2rem] xs:h-[500px] max-xs:flex-col">
                <div className="w-full max-w-[370px] flex items-center max-xs:h-[300px] max-xs:mx-auto shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] p-[10px] rounded-[8px] shimmer-animate"></div>

                <div className="flex flex-col w-full gap-[1.4rem] h-full">
                    <div className="flex items-center gap-[25px] w-full flex-col">
                        <div className="w-full h-[30px] rounded-[8px] shimmer-animate"></div>
                        <div className="w-full h-[50px] rounded-[8px] shimmer-animate"></div>
                    </div>
                    <div className="w-full h-[220px] shimmer-animate rounded-[8px]"></div>
                    <div className="w-full h-[120px] shimmer-animate rounded-[8px]"></div>
                </div>
            </div>
        </div>
    );
};
