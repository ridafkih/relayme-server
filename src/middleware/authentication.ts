import { unauthorized } from "@helpers/response";
import { ExpressMiddleware } from "@typings/Route";
import { Request, Response, NextFunction } from "express";

export const rejectNoAuth: ExpressMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { session } = req;
  if (!session.user)
    unauthorized(res, "You must be authorized to access this resource.");
  else next();
};

export const rejectAuth: ExpressMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { session } = req;
  if (session.user)
    unauthorized(res, "You do not have permission to access this resource.");
  else next();
};
