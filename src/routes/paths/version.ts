import { Request, Response } from "express";

import App from "@modules/app";
import Route from "@typings/Route";
import { success } from "@helpers/response";

export const getVersion: Route = {
  name: "get:version",
  method: "get",
  path: `/version`,
  callback: function (this: App, req: Request, res: Response) {
    success(res, process.env.npm_package_version);
  },
};
