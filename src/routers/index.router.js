import { Router } from "express";
import citiesRouter from "./cities.router.js";
import passengersRouter from "./passengers.router.js";
/*import travelsRouter from "./travels.router.js";
import flightsRouter from "./flights.router.js";*/

const router = Router();

router.use(citiesRouter);
router.use(passengersRouter);
/*router.use(flightsRouter);
router.use(travelsRouter);*/

export default router;