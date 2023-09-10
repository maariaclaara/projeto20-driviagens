import httpStatus from "http-status";


export default function errorValidation(error, req, res, next) {

    switch (error.type) {
        case "ConflictError":
            return res.status(httpStatus.CONFLICT).send(error.message);

        case "NotFoundError":
            return res.status(httpStatus.NOT_FOUND).send(error.message);

        case "Unprocessable":
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message);

        case "BadRequest":
            return res.status(httpStatus.BAD_REQUEST).send(error.message);

        default:
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    };
};