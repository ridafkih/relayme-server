import { Request, Response } from "express";

import App from "@modules/app";
import Endpoint from "@typings/Route";
import { success } from "@helpers/response";

export const getVersion: Endpoint = {
  name: "get:version",
  method: "get",
  path: `/version`,
  callback: function (this: App, req: Request, res: Response) {
    success(res, process.env.npm_package_version);
  },
};
