const PokemonCard = ({data}) => {
    const description = data.flavor_text_entries.filter((el) => el.language.name === "en")[0].flavor_text.replace(/[^a-zA-Z ]/g, " ");
    const name = data.name;

    console.log(description);

    return (
        <div className="shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] gap-[7px] p-[1rem] flex flex-col items-center rounded-[10px]">
            <div className="w-full max-w-[250px]">
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`} alt="pokemon" />
            </div>
            <div className="flex flex-col gap-[5px]">
                <h1 className="text-[1.3rem]">{name[0].toUpperCase() + name.substr(1)}</h1>
                <p className="leading-[30px]">{description}</p>
            </div>
        </div>
    );
};

export default PokemonCard;