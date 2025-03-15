import { useParams } from "react-router";
import { storage } from "../../appwrite/storage";
import { fetchPokemonSpecies } from "../helpers";
import { useEffect, useState } from "react";

const usePokeRecognition = () => {
    const [recognizedData, setRecognizedData] = useState(null);

    const {recogId} = useParams();

    const fetchResults = async () => {
        const res = await storage.getIdSpecificRecogDocument(recogId);
        const pokeList = JSON.parse(res.RecognizedPokemons);

        const dataArr = pokeList.map((el) => {
            let searchVal = "";

            el.split(" ").forEach((el) => {
                if(el && !searchVal) searchVal += el.toLowerCase();
                else if(el) searchVal += `-${el.toLowerCase()}`;
            }); 

            searchVal = searchVal.replace(/\./g, "");

            return fetchPokemonSpecies(searchVal);
        });

        const finalData = {};

        if(dataArr.length) {
            try {
                const result = await Promise.all(dataArr);

                finalData.recogPokemons = result;
            }
            catch(err) {
                finalData.recogPokemons = ["error"];
            }
        }
        else {
            finalData.recogPokemons = ["error"];
        }

        finalData.imageId = res.ImageId;
        finalData.summary = res.ImageSummary;
        finalData.name = res.Name;
        setRecognizedData(finalData);
    };

    useEffect(() => {
        fetchResults();
    }, []);

    return [recognizedData];
};

export default usePokeRecognition;