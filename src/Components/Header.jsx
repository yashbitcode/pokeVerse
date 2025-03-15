import { Link } from "react-router";
import logo from "../assets/logo.png";
import menu from "../assets/menu.svg";
import cross from "../assets/cross.svg";
import { useState } from "react";
import authService from "../appwrite/auth";
import { useDispatch, useSelector } from "react-redux";
import { addAccStatus } from "../Utils/services/userInfoSlice";

const Header = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const accStatus = useSelector((store) => store.userInfo.accStatus);
    const dispatch = useDispatch();

    const toggleMenu = () => setOpenMenu(!openMenu);

    const handleSideBar = () => setOpenMenu(false); 

    const logout = () => {
        handleSideBar();
        dispatch(addAccStatus(null));
        authService.logout();
    };

    return (
        <div>
            <div className="flex bg-red-500 py-[5px] px-[1.2rem] mx-[1rem] mt-[1rem] gap-[1.5rem] items-center justify-between rounded-[10px]">
                <div className="w-[70px]">
                    <img src={logo} alt="pokeVerse" />
                </div>

                {
                    accStatus ? (
                        <div className="w-[25px] text-white cursor-pointer" onClick={toggleMenu}>
                            <img src={menu} alt="menu" />
                        </div>
                    ) : null
                }

            </div>

            {
                accStatus ? (
                    <div className={`fixed top-0 h-screen w-screen ${openMenu ? "z-[10]" : "z-[-1]"}`}>
                        {
                            openMenu && (
                                <div className="absolute z-[-1] w-screen h-[100vh] bg-black opacity-30"></div>
                            )
                        }
                        <div className={`transition-all duration-100 h-[100vh] w-full ${!openMenu ? "right-[-100%]" : "right-0"} max-w-[300px] absolute bg-white`}>
                            <div className="w-[40px] right-[-230px] top-[35px] relative" onClick={toggleMenu}>
                                <img src={cross} alt="cross" />
                            </div>

                            <ul className="flex flex-col w-full justify-end gap-[20px] mt-[2rem] px-[20px]">
                                <li className="text-[1.2rem] font-[400] underline"> 
                                    {
                                        `User: ${accStatus.name[0].toUpperCase() + accStatus.name.substr(1)}`
                                    }
                                </li>
                                <li className="text-[1.2rem] font-[400]" onClick={handleSideBar}> 
                                    <Link to={"/pokemons/1"}>
                                        Pokemons
                                    </Link>
                                </li>
                                <li className="text-[1.2rem] font-[400]" onClick={handleSideBar}>
                                    <Link to={"/pokeGPT"}>
                                        PokeGPT
                                    </Link>
                                </li>
                                <li className="text-[1.2rem] font-[400]" onClick={handleSideBar}>
                                    <Link to={"/pokeAIQuiz"}>
                                        PokeAIQuiz
                                    </Link>
                                </li>
                                <li className="text-[1.2rem] font-[400]" onClick={handleSideBar}>
                                    <Link to={"/pokeRecognizer"}>
                                        PokeRecognizer
                                    </Link>
                                </li>
                                <li className="text-[1.2rem] font-[400]" onClick={logout}>
                                    <Link to={"/"}>
                                        Logout
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : null
            }
        </div>
    );
};

export default Header;