import httpStatus from "http-status";
import passengerService from "../services/passengers.service.js";


export async function postPassengers(req, res) {

    await passengerService.createPassenger(req.body.firstName, req.body.lastName);
    return res.sendStatus(httpStatus.CREATED);
}