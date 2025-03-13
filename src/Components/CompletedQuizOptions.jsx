import PreviewOption from "./PreviewOption";

const CompletedQuizOptions = ({options, rightAns, userAns}) => {
    return (
        <div className="mt-[1.5rem] flex flex-col gap-[10px]">
            {
                options.map((el, idx) => <PreviewOption key={idx} op={el} rightAns={rightAns} userAns={userAns} /> )
            }
        </div>
    )
};

export default CompletedQuizOptions;