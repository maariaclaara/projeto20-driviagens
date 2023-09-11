import { Router } from "express";
import { getTravels, postTravel } from "../controllers/travel.controllers.js";
import { travelSchema } from "../schemas/travels.schema.js";
import { validateSchema } from "../middlewares/validateSchema.js";

const travelsRouter = Router();

travelsRouter.post('/travels',validateSchema(travelSchema), postTravel); 
travelsRouter.get('/travels', getTravels); 

export default travelsRouter;