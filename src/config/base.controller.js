import { Router } from "express";

export class BaseController {
  constructor(basePath = "") {
    this.basePath = basePath;
    this.appRouter = Router();
  }

  get router() {
    return this.appRouter;
  }

  joinPath(basePath, path) {
    return `/${[basePath, path]
      .map((item) => item.replace(/^\/|\/$/g, ""))
      .join("/")
      .replace(/^\/|\/$/g, "")}`;
  }

  addRoutePath(basePath, route, pipeline) {
    const routePath = this.joinPath(basePath, route.path);
    this.router[route.method](routePath, pipeline);
  }

  bindRoutes(routes) {
    routes.map((route) => {
      const handler = route.func.bind(this);
      const middleware = route.middlewares?.map((middleware) =>
        middleware.execute.bind(this)
      );
      const pipeline = middleware ? [...middleware, handler] : handler;
      if (typeof this.basePath === "string") {
        this.addRoutePath(this.basePath, route, pipeline);
      } else {
        this.basePath.map((base) => {
          this.addRoutePath(base, route, pipeline);
        });
      }
    });
  }
}
