import { storage } from "../appwrite/storage";

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

export const getFormattedDesc = (desc) => {
    return desc.filter((el) => el.language.name === "en")[0].flavor_text.split("\n").join(" ").split("\f").join(" ");
};

export const getFormattedName = (name) => {
    let formattedName = "";

    const nameArr = name.split("-");

    nameArr.forEach((el, idx) => {
        const temp = el[0].toUpperCase() + el.substr(1);
        formattedName += ((idx + 1) === nameArr.length) ? temp : temp + " ";
    });

    return formattedName;
};

export const getTruncatedStr = (str) => {
    if(str.length < 30) return str;
    return str.substr(0, 30) + "...";
};

export const getAllQuizPreview = async () => {
    try {
        const result = await storage.getAllDocuments();
        return result.documents;
    }
    catch(err) {
        return [];
    }
};

export const getAllRecognizePreview = async () => {
    try {
        const result = await storage.getAllRecognizeDocuments();
        return result.documents;
    }
    catch(err) {
        return [];
    }
};

export const getTitleStr = (str) => {
    const strArr = str.split(" ");
    return strArr.map((el, idx) => {
        if(idx !== strArr.length) return el[0].toUpperCase() + el.substr(1) + " ";
        return el[0].toUpperCase() + el.substr(1);
    });
};