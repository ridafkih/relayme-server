import * as express from "express";
import { Request, Response, NextFunction } from "express";

import * as session from "express-session";
import { malformed } from "@helpers/response";

export default [
  express.json(),
  (error: any, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof SyntaxError) return malformed(res, []);
    else next();
  },
  session({
    name: "sid",
    secret: process.env.SESSION_SECRET || "defaultSecret",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      sameSite: true,
      httpOnly: true,
    },
  }),
];
