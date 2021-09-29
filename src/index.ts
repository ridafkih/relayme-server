import App from "@modules/app";

import Route from "@typings/Route";

import * as routes from "@routes/index";

const endpointObjects: Route[] = Object.values(routes);

const app = new App();

app.registerEndpoints(endpointObjects);
app.initialize();
