import { ReactTyped } from "react-typed";
import Login from "../Components/Login";
import Signup from "../Components/Signup";
import ball from "../assets/pokeball1.png";
import { useState } from "react";

const Home = () => {
    const [getStarted, setGetStarted] = useState(false);
    const [signup, setSignup] = useState(true);

    return (
        !getStarted ? (
            <div className="text-center mt-[1.5rem] px-[1rem]">
                <h1 className="text-[1.2rem] leading-[38px] w-full max-w-[900px] mx-auto">
                    {
                        <ReactTyped strings={["Pokeverse is a React-based AI-powered Pokémon app with search, AI recommendations, quizzes, and image recognition using the Pokémon API. 🚀"]} typeSpeed={20} backSpeed={20} cursorChar="|" showCursor={true} />
                    }
                </h1>
                <div className="w-full max-w-[150px] mx-auto mb-[1rem]">
                    <img className="w-full" src={ball} alt="ball" />
                </div>
                <button className="text-2xl bg-red-500 cursor-pointer text-white px-[20px] rounded-[10px] py-[10px]" onClick={() => setGetStarted(true)}>Get Started</button>
            </div>
        ) : (
            signup ? <Signup handler={setSignup} /> : <Login handler={setSignup} />
        )
    );
};

export default Home;