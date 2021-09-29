import * as express from "express";

import globalMiddlewares from "@middleware/global";
import { logError, logNotification } from "@helpers/logger";
import Endpoint from "@typings/Route";

declare module "express-session" {
  interface Session {
    user: string;
  }
}

export default class App {
  constructor(private readonly app = express()) {
    this.app.use(...globalMiddlewares);
  }

  /**
   * Registers the provided endpoint based on
   * the endpoint object.
   * @param endpoint - The endpoint object.
   */
  public registerEndpoint({
    name,
    method,
    path,
    validation = [],
    middleware = [],
    callback,
  }: Endpoint): void {
    try {
      const appCallback = callback.bind(this);
      this.app[method](path, ...validation, ...middleware, appCallback);
      logNotification(`${name} endpoint registered at ${path}`);
    } catch (error) {
      logError(`error registering endpoint ${name} at ${path}`, error);
    }
  }

  /**
   * Registers an array of endpoint objects.
   * @param endpoints - An array of endpoint objects.
   */
  public registerEndpoints(endpoints: Endpoint[]): void {
    endpoints.forEach((endpoint) => {
      this.registerEndpoint(endpoint);
    });
  }

  /**
   * Initializes the express server. Defaults to the
   * process environment "PORT", and fallsback to 8080.
   * @param forcedPort
   * 	- Forces the passed port to be the server port.
   */
  public async initialize(forcedPort?: number): Promise<App> {
    const port = forcedPort || process.env.PORT || 8080;
    return new Promise((resolve, reject) => {
      this.app.listen(port, () => {
        logNotification(`listening on 0.0.0.0:${port}`);
        resolve(this);
      });
    });
  }
}
