import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import promiseRouter from "express-promise-router";
import apiRouter from "./api";
import knexConfig from "../knexfile";
import Knex from "knex";
import { Model } from "objection";

const knex = Knex(knexConfig.development);
Model.knex(knex);

const router = promiseRouter();
const app = express()
  .use(bodyParser.json())
  .use(morgan("dev"))
  .use(router);

apiRouter(router);

app.use((err, req, res, next) => {
  if (err) {
    res
      .status(err.statusCode || err.status || 500)
      .send(err.data || err.message || {});
  } else {
    next();
  }
});

const server = app.listen(6666, () => {
  console.log("Ready at port %s", server.address().port);
});
