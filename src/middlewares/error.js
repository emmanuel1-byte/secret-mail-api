import logger from "../utils/logger.js";
import respond from "../utils/respond.js";
import Joi from "joi";

export function globalErrorhandler(err, req, res, next) {
  logger.error(`${err.message}\n${err.stack}`);

  if (err instanceof Joi.ValidationError) {
    return respond(res, 400, err.details[0].message);
  }

  return respond(
    res,
    500,
    process.env.NODE_ENV === "production"
      ? "Internal Server Error"
      : err.message,
  );
}

export function routeNotFoundHandler(req, res) {
  respond(res, 404, "The endpoint you requested does not exist on this server");
}
