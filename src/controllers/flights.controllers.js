import httpStatus from "http-status";
import flightService from "../services/flights.service.js";


export async function postFlight(req, res) {

    const { origin, destination, date } = req.body;

    await flightService.createFlight(origin, destination, date);
    return res.sendStatus(httpStatus.CREATED);
};


export async function getFlights(req, res) {

    const { origin, destination } = req.query;
    const smallDate = req.query['smaller-date'];
    const bigDate = req.query['bigger-date'];

    const flights = await flightService.findFlights(bigDate, smallDate, origin, destination);
    return res.status(httpStatus.OK).send(flights);
};
