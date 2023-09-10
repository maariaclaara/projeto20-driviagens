import httpStatus from "http-status";
import cityService from "../services/cities.service.js";


export async function postCity(req, res) {

    await cityService.createCity(req.body.name);
    return res.status(httpStatus.CREATED).send('Sucessfully');
};




