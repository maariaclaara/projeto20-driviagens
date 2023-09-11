import { createFlightDB, findFlightsDB, validFlightDB } from "../repositories/flights.repository.js";
import { getCityDB } from "../repositories/cities.repository.js";
import { dateBigger, biggerFormat, formatDate, validDate } from "./date.service.js";


async function createFlight(origin, destination, date){

    if (origin === destination) 
    throw { type: "ConflictError", message: `Conflict!`};

    if (!dateBigger(date, new Date())) 
    throw { type: "Unprocessable", message: `Unprocessable!`};

    const valid = await validFlightDB(origin, destination);
    if (!valid) 
    throw { type: "NotFoundError", message: `Not Found!`};
    
    const flight  = await createFlightDB(origin, destination, formatDate(date));
    return flight;
};


async function findFlights(bigDate, smallDate, origin, destination) {

    if (bigDate && !smallDate || smallDate && !bigDate) 
    throw { type: "Unprocessable", message: `Unprocessable!`};
    
    if (smallDate && !validDate(smallDate)) 
    throw { type: "Unprocessable", message: `Unprocessable!`};
    
    if (bigDate && !validDate(bigDate)) 
    throw { type: "Unprocessable", message: `Unprocessable!`};
    
    if (smallDate && bigDate && biggerFormat(smallDate, bigDate)) 
    throw { type: "BadRequest", message: `Bad Request!`};

    let originCity = null;
    let destinationCity = null;

    if (origin) originCity = await getCityDB(origin);
    
    if (destination) destinationCity = await getCityDB(destination);

    const flightsDate = await findFlightsDB(originCity, destinationCity, 

        smallDate
        ? formatDate(smallDate) 
        : null,

        bigDate 
        ? formatDate(bigDate) 
        : null);

    if (origin && destination && flightsDate.length === 0) 
        throw { type: "NotFoundError", message: `Not Found Error!` };

    return flightsDate;
};

const flightService = {createFlight, findFlights};
export default flightService;