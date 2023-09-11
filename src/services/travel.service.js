import { createTravelDB, findTravelsDB, validTravelDB } from "../repositories/travel.repository.js";


export async function createTravel(passengerId, flightId) {

    const validTravel = await validTravelDB(passengerId, flightId);

    if (!validTravel) 
    throw { type: "NotFoundError", message: `Not Found Error!` };

    const travel = await createTravelDB(passengerId, flightId);
    return travel;
};


export async function findTravels(name, post) {

    const posts = 10;

    if (post) {
        if (post <= 0 ||  isNaN(Number(post))){
            throw { type: "BadRequest", message: `Bad Request!` }
        };
    };

    const currentPage = post ? Number(post) : 1;
    const offset = (currentPage - 1) * posts;
    const travels = await findTravelsDB(name, offset, posts);

    return travels;
};

const travelService = {createTravel, findTravels};
export default travelService;

