import { Link } from "react-router";
import logo from "../assets/logo.png";

const Header = () => {
    return (
        <div className="flex bg-red-500 py-[5px] px-[1.6rem] gap-[1.5rem] items-center justify-between rounded-[10px]">
            <div className="w-[85px]">
                <img src={logo} alt="pokeVerse" />
            </div>

            <div className="w-full max-w-[500px]">
                <ul className="flex w-full justify-end gap-[20px] text-white">
                    <li className="text-[1.4rem] font-[400]">
                        <Link to={"/"}>
                            Pokemons
                        </Link>
                    </li>
                    <li className="text-[1.4rem] font-[400]">
                        <Link to={"/pokeGPT"}>
                            PokeGPT
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header;