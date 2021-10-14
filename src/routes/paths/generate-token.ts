import { Request, Response } from "express";

import App from "@modules/app";
import Endpoint from "@typings/Route";
import { registerNewDevice } from "@helpers/database";
import { success } from "@helpers/response";
import { rejectNoAuth } from "@middleware/authentication";

export const generateToken: Endpoint = {
  name: "post:generate-token",
  method: "post",
  middleware: [rejectNoAuth],
  path: `/device/generate-token`,
  callback: async function (this: App, req: Request, res: Response) {
    const data = await registerNewDevice();
    success(res, data);
  },
};
