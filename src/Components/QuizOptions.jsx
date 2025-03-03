import Option from "./Option";

const QuizOptions = ({options, answer}) => {
    return (
        <div className="mt-[1.5rem] flex flex-col gap-[10px]">
            {
                options.map((el, idx) => <Option key={idx} op={el} isRight={el === answer} />)
            }
        </div>
    );
};

export default QuizOptions;