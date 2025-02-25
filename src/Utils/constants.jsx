export const getFormattedDesc = (desc) => {
    return desc.filter((el) => el.language.name === "en")[0].flavor_text.split("\n").join(" ").split("\f").join(" ");
};

export const getFormattedName = (name) => {
    return name[0].toUpperCase() + name.substr(1);
};

export const statConstants = [
    {
        name: "HP",
        color: "bg-[#81C784]" 
    },
    {
        name: "ATK",
        color: "bg-[#E57373]" 
    },
    {
        name: "DEF",
        color: "bg-[#64B5F6]" 
    },
    {
        name: "SP.ATK",
        color: "bg-[#FFB74D]" 
    },
    {
        name: "SP.DEF",
        color: "bg-[#BA68C8]" 
    },
    {
        name: "SPEED",
        color: "bg-[#FFF176]" 
    }
];

export const fetchPokemonSpecies = async (pokeId) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeId}`);
    return response.json();
};

export const fetchPokemonInfo = async (pokeId) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`);
    return response.json();
};

export const getAllEvolutions = (evolutionArr, obj) => {
    evolutionArr.push(obj.species.name);

    if(!obj.evolves_to.length) return;
    getAllEvolutions(evolutionArr, obj.evolves_to[0]);
};