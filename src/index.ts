import { Client } from "pg";

import App from "@modules/app";
import Database from "@modules/database";

import Route from "@typings/Route";

import * as routes from "@routes/index";

const endpointObjects: Route[] = Object.values(routes);

const {
  DATABASE_URL,
  PGUSER = "defaultUser",
  PGPASSWORD = "defaultPassword",
  PGDATABASE = "defaultDatabase",
} = process.env;

const databaseClient = new Client({
  connectionString: DATABASE_URL,
  user: PGUSER,
  password: PGPASSWORD,
  database: PGDATABASE,
});

const database = new Database(databaseClient);
const app = new App(database);

app.registerEndpoints(endpointObjects);
app.initialize();
