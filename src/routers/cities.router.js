import { Router } from "express";
import { postCity } from "../controllers/cities.controllers.js";
import { citySchema } from "../schemas/cities.schema.js";
import { validateSchema } from "../middlewares/validateSchema.js";

const citiesRouter = Router();

citiesRouter.post('/cities', validateSchema(citySchema), postCity); 

export default citiesRouter;