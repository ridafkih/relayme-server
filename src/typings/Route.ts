import { Request, Response, NextFunction } from "express";
import { ValidationChain } from "express-validator";

type ExpressMethod =
  | "get"
  | "head"
  | "post"
  | "put"
  | "delete"
  | "options"
  | "patch";

export type ExpressMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export default interface Route {
  name: string;
  method: ExpressMethod;
  path: string;
  validation?: ValidationChain[];
  middleware?: ExpressMiddleware[];
  callback(req: Request, res: Response): void;
}
