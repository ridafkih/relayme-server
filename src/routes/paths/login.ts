import { Request, Response } from "express";

import App from "@modules/app";
import Route from "@typings/Route";
import { getUuidByLoginCredentials } from "@helpers/database";
import { body } from "express-validator";
import { validate } from "@middleware/validation";
import { rejectAuth } from "@middleware/authentication";
import { success, unauthorized } from "@helpers/response";
import { AuthErrors } from "@typings/Errors";
import { setSession } from "@helpers/authentication";

export const postLogin: Route = {
  name: "post:login",
  method: "post",
  path: `/login`,
  validation: [
    body("email")
      .isEmail()
      .withMessage("The email address provided is not valid.")
      .isLength({ max: 350 })
      .withMessage("The email address must be under 350 characters."),
    body("password").isString().withMessage("You must provide a password."),
  ],
  middleware: [validate, rejectAuth],
  callback: async function (this: App, req: Request, res: Response) {
    const credentials = req.body;
    const uuid = await getUuidByLoginCredentials(credentials);
    if (!uuid) return unauthorized(res, AuthErrors.INCORRECT_PASSWORD);
    success(res, { uuid });
    setSession(req, uuid);
  },
};
