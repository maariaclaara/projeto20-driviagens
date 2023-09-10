import { postPassengerDB } from "../repositories/passengers.repository.js";

async function createPassenger(firstName, lastName){

   const passenger = await postPassengerDB(firstName,lastName);
   return passenger;
};

const passengerService = {createPassenger};

export default passengerService;