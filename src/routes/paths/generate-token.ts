import { Request, Response } from "express";

import App from "@modules/app";
import Endpoint from "@typings/Route";
import { getFileFromPath } from "@helpers/filesystem";
import { success } from "@helpers/response";
import { generateDeviceIdentifier } from "@services/identity";

const fileName = getFileFromPath(__filename, __dirname);

export const generateToken: Endpoint = {
  name: "post:generate-token",
  method: "post",
  path: `/${fileName}`,
  callback: async function (this: App, req: Request, res: Response) {
    
  },
};
