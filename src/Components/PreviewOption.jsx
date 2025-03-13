const PreviewOption = ({op, rightAns, userAns}) => {
    return ( 
        <div className={`border-[1px] p-[7px] cursor-pointer ${(op === rightAns) ? "bg-green-500" : ((op === userAns) ? "bg-red-500" : "")}`}>{op}</div>
    );
};

export default PreviewOption;