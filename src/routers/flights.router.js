import { Router } from "express";
import { flightSchema } from "../schemas/flights.schema.js";
import { postFlight, getFlights } from "../controllers/flights.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.js";

const flightsRouter = Router();

flightsRouter.post('/flights',validateSchema(flightSchema), postFlight); 
flightsRouter.get('/flights', getFlights); 

export default flightsRouter;