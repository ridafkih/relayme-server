import { getInvalidFields, malformed } from "@helpers/response";
import { ExpressMiddleware } from "@typings/Route";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validate: ExpressMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  const invalidFields = getInvalidFields(errors);

  if (invalidFields.length > 0) return malformed(res, invalidFields);
  else next();
};
