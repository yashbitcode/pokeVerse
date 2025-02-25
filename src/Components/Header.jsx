import logo from "../assets/logo.png";

const Header = () => {
    return (
        <div className="flex bg-red-500 py-[5px] px-[1.6rem] gap-[1.5rem] items-center justify-between rounded-[20px]">
            <div className="w-[85px]">
                <img src={logo} alt="pokeVerse" />
            </div>

            <div className="w-full max-w-[500px]">
                <ul className="flex w-full justify-between text-white">
                    <li className="text-[1.4rem] font-[400]">Pokemons</li>
                    <li className="text-[1.4rem] font-[400]">Simulator</li>
                    <li className="text-[1.4rem] font-[400]">Quiz</li>
                    <li className="text-[1.4rem] font-[400]">PokeGPT</li>
                </ul>
            </div>
        </div>
    );
};

export default Header;