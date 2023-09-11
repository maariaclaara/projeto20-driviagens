import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { passengerSchema } from "../schemas/passengers.schema.js";
import { postPassengers } from "../controllers/passengers.controllers.js";
import { getTravels } from "../controllers/travel.controllers.js";


const passengersRouter = Router();

passengersRouter.post('/passengers', validateSchema(passengerSchema), postPassengers);
passengersRouter.get('/passengers/travels', getTravels); 

export default passengersRouter;