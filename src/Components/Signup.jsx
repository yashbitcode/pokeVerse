import { useRef } from "react";
import authService from "../appwrite/auth";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addAccStatus } from "../Utils/services/userInfoSlice";

const Signup = ({handler}) => {
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getAccStatus = async () => {
        try {
			const acc = await authService.getAccount();
			dispatch(addAccStatus(acc));
		}
		catch(err) {}
    };

    const handleSignup = async () => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        await authService.CreateAccount({email, password, name});
        
        getAccStatus();
        navigate("/pokemons/1");
    };

    return (
        <div className="px-[1rem] mt-[2rem] w-full max-w-[400px] mx-auto">
            <h1 className="text-2xl text-center mb-[1rem]">Sign Up</h1>
            <form className="flex flex-col w-full gap-[10px] mx-auto px-[20px] py-[2rem] shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] rounded-[10px]" onSubmit={(e) => {
                e.preventDefault();

                handleSignup();
            }}>
                <div className="flex flex-col gap-[5px]">
                    <label htmlFor="name" className="text-[1.1rem]">Name</label>
                    <input ref={nameRef} type="text" id="name" placeholder="Eg: Yash" className="outline-0 p-[5px] border-[1px] rounded-[5px]" />
                </div>
                <div className="flex flex-col gap-[5px]">
                    <label htmlFor="email" className="text-[1.1rem]">Email</label>
                    <input ref={emailRef} type="email" id="email" placeholder="Eg: xyz@gmail.com" className="outline-0 p-[5px] border-[1px] rounded-[5px]" />
                </div>
                <div className="flex flex-col gap-[5px]">
                    <label htmlFor="password" className="text-[1.1rem]">Password</label>
                    <input ref={passwordRef} type="password" placeholder="Eg: Abc@321" id="password" className="outline-0 p-[5px] border-[1px] rounded-[5px]" />
                </div>
                <div className="flex flex-col gap-[15px] mt-[10px]">
                    <span className="text-[1rem] underline cursor-pointer" onClick={() => handler(false)}>Already Have An Acc?</span>
                    <button className="w-full bg-red-500 py-[8px] rounded-[5px] text-white outline-0 cursor-pointer">Sign Up</button>
                </div>
            </form>
        </div>
    );
};

export default Signup;