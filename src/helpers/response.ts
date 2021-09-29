import { Response } from "express";
import { Result, ValidationError } from "express-validator";

import ServerResponse from "@typings/ServerResponse";

interface Field {
  fieldName: string;
  message: string;
}

/**
 * Gets the invalid fields from an express request.
 * @param errors The express-validate ValidationErrors.
 * @returns An array of invalid fields, inclusive of their messages.
 */
export const getInvalidFields = (errors: Result<ValidationError>): Field[] => {
  return errors.array().map((error) => {
    return { fieldName: error.param, message: error.msg } as Field;
  });
};

/**
 * Responds to a request with status and data.
 * @param res The request to respond to.
 * @param status The status code of the request.
 * @param data Any data to provide in the body under the "data" key.
 */
const respond = (res: Response, status: number, data?: any) => {
  res.status(status).send({ status, data } as ServerResponse);
};

/**
 * Responds with a 200 status with the provided data.
 * @param res The request to respond to.
 * @param data Any data to provide in the body under the "data" key.
 */
export const success = (res: Response, data: any) => {
  respond(res, 200, data);
};

/**
 * Responds with a 400 status with the provided missing fields.
 * @param res The request to respond to.
 * @param missingFields Missing field data.
 */
export const malformed = (res: Response, missingFields: Field[]) => {
  respond(res, 400, missingFields || {});
};

/**
 * Responds with a 401 status with the provided error.
 * @param res The request to respond to.
 * @param error The error to provide to the user.
 */
export const unauthorized = (res: Response, error: any) => {
  respond(res, 401, error);
};

/**
 * Responds with a 404 status.
 * @param res The request to respond to.
 */
export const notFound = (res: Response) => {
  respond(res, 404);
};

/**
 * Responds with a 409 status with the provided error.
 * @param res The request to respond to.
 * @param error The error to provide to the user.
 */
export const conflict = (res: Response, error: any) => {
  respond(res, 409, error);
};

/**
 * Responds with a 500 status with the provided error.
 * @param res The request to respond to.
 * @param error The error to provide to the user.
 */
export const internalServerError = (res: Response, error: any) => {
  respond(res, 500, error);
};
