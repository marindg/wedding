import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { sendResponse } from "utils";
import { httpStatusCodes } from "constant";

export function validate(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { context: req.user! }); // Pass the entire req object
    if (error) {
      sendResponse(res, httpStatusCodes.BAD_REQUEST, "error", error.details[0].message);
    } else {
      next();
    }
  };
}
