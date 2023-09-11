import httpStatus from "http-status";
import travelService from "../services/travel.service.js";

export async function postTravel(req, res) {

    const { passengerId, flightId } = req.body;

    await travelService.createTravel(passengerId, flightId);
    return res.sendStatus(httpStatus.CREATED);
};


export async function getTravels(req, res) {

    const { name, page } = req.query;

   const travels = await travelService.findTravels(name, page);
    return res.status(httpStatus.OK).send(travels);
};