import { Response } from "express";
import { Result, ValidationError } from "express-validator";

import ServerResponse from "@typings/ServerResponse";

interface Field {
  fieldName: string;
  message: string;
}

export const getInvalidFields = (errors: Result<ValidationError>): Field[] => {
  return errors.array().map((error) => {
    return { fieldName: error.param, message: error.msg } as Field;
  });
};

const respond = (res: Response, status: number, data?: any) => {
  res.status(status).send({ status, data } as ServerResponse);
};

export const success = (res: Response, data: any) => {
  respond(res, 200, data);
};

export const malformed = (res: Response, missingFields: Field[]) => {
  respond(res, 400, missingFields);
};

export const unauthorized = (res: Response, error: any) => {
  respond(res, 401, error);
};

export const notFound = (res: Response) => {
  respond(res, 404);
};

export const conflict = (res: Response, error: any) => {
  respond(res, 409, error);
};

export const internalServerError = (res: Response, error: any) => {
  respond(res, 500, error);
};
