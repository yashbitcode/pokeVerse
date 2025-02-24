const Header = () => {
    return (
        <div className="flex mt-[1rem] bg-red-500 py-[10px] px-[1.6rem] gap-[1.5rem] items-center justify-between rounded-[20px]">
            <div className="w-[50px]">
                <img src="https://user-images.githubusercontent.com/9741252/81717987-83b84000-947b-11ea-9ac9-5ad1d59adf7a.png" alt="pokeVerse" />
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