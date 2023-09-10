import { cityDB, postCityDB } from "../repositories/cities.repository.js";


async function createCity(name){

    const alreadCity = await cityDB(name);

    if (alreadCity) 
        throw { type: "ConflictError", message: `There is alread the city.` };
    
    const city = await postCityDB(name);
    return city;
};

const cityService = {createCity};

export default cityService;