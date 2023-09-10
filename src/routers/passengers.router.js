import { Router } from "express";
import { passengerSchema } from "../schemas/passengers.schema.js";
import { postPassengers } from "../controllers/passengers.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.js";

const passengersRouter = Router();

passengersRouter.post('/passengers', validateSchema(passengerSchema), postPassengers); 

export default passengersRouter;