import { Request, Response } from "express";

import App from "@modules/app";
import Endpoint from "@typings/Route";
import { getFileFromPath } from "@helpers/filesystem";
import { success } from "@helpers/response";
import { triggerGarageDoor } from "@services/relay";

const fileName = getFileFromPath(__filename, __dirname);

export const toggleGarage: Endpoint = {
  name: "post:toggle-garage",
  method: "post",
  path: `/${fileName}`,
  callback: async function (this: App, req: Request, res: Response) {
    const successful = await triggerGarageDoor();
    success(res, { successful });
  },
};
