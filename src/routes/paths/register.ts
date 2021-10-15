import { Request, Response } from "express";

import App from "@modules/app";
import Route from "@typings/Route";
import { registerNewUser } from "@helpers/database";
import { body } from "express-validator";
import { validate } from "@middleware/validation";
import { rejectAuth } from "@middleware/authentication";
import { conflict, internalServerError, success } from "@helpers/response";
import { AuthErrors } from "@typings/Errors";

export const postRegister: Route = {
  name: "post:register",
  method: "post",
  path: `/register`,
  validation: [
    body("email")
      .isEmail()
      .withMessage("The email address provided is not valid.")
      .isLength({ max: 350 })
      .withMessage("The email address must be under 350 characters."),
    body("full_name")
      .trim()
      .isString()
      .withMessage("The provided name is not valid.")
      .isLength({ min: 2, max: 255 })
      .withMessage("Name must be between 2 and 255 characters"),
    body("avatar")
      .optional()
      .isURL()
      .isString()
      .withMessage("The provided avatar is not valid.")
      .isLength({ max: 255 })
      .withMessage("The image URL must be below 255 characters."),
    body("password")
      .isString()
      .withMessage("The provided password is not valid.")
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
      })
      .withMessage(
        "Your password must be at least 8 characters, with at least one lowercase, uppercase, and number."
      ),
  ],
  middleware: [validate, rejectAuth],
  callback: async function (this: App, req: Request, res: Response) {
    registerNewUser(req.body)
      .then((uuid) => success(res, { uuid }))
      .catch(({ message: error }: Error) => {
        if (error === AuthErrors.ALREADY_REGISTERED) conflict(res, error);
        else internalServerError(res, error);
      });
  },
};
