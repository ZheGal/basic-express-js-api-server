import { BaseController } from "../config/base.controller.js";
import { TestMiddleware } from "../config/test.middleware.js";
import { MainService } from "./main.service.js";

export class MainController extends BaseController {
  constructor() {
    super('/');
    this.mainService = new MainService();
    this.bindRoutes([
      {
        path: "/",
        func: this.main,
        method: "get",
      },
      {
        path: "/json",
        func: this.mainJson,
        method: "get",
        middlewares: [new TestMiddleware()],
      },
    ]);
  }

  main(req, res) {
    return res.send(this.mainService.main());
  }

  mainJson(req, res) {
    return res.send(this.mainService.mainJson());
  }
}
