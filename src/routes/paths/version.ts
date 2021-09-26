import { Request, Response } from "express";

import App from "@modules/app";
import Endpoint from "@typings/Route";
import { getFileFromPath } from "@helpers/filesystem";
import { success } from "@helpers/response";

const fileName = getFileFromPath(__filename, __dirname);

export const getVersion: Endpoint = {
  name: "get:version",
  method: "get",
  path: `/${fileName}`,
  callback: function (this: App, req: Request, res: Response) {
    success(res, process.env.npm_package_version);
  },
};
