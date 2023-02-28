import express, { json } from "express";
import * as dotenv from "dotenv";
import { MainController } from "./main/main.controller.js";

dotenv.config();

export class App {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8000;

    this.controllers = [
      // string | string[] | null
      new MainController(),
    ];
  }

  useMiddleware() {
    const middlewares = [];

    this.app.use(json());
    middlewares.map((middleware) =>
      this.app.use(middleware.execute.bind(middleware))
    );
  }

  useRoutes() {
    this.controllers.map((controller) => {
      this.app.use(controller.router);
    });
  }

  async init() {
    const success = () => {
      console.log(`Server started on ${this.port} port`);
    };
    this.useMiddleware();
    this.useRoutes();
    this.server = this.app.listen(this.port, success);
  }
}

const app = new App();
app.init();
