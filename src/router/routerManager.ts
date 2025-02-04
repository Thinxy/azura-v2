import { RouteMeta, RouterHandler } from "../@types";
import { swaggerDocs } from "../plugins/swagger";

export class RouterManager {
  private routes: {
    [method: string]: { [path: string]: { handler: RouterHandler; meta?: RouteMeta } };
  } = {};

  constructor() {}

  addRoute(method: string, path: string, handler: RouterHandler, meta?: RouteMeta) {
    if (!this.routes[method]) {
      this.routes[method] = {};
    }
    this.routes[method][path] = { handler, meta };
  }

  getRoutes() {
    return this.routes;
  }

  match(method: string, path: string) {
    const routes = this.routes[method];
    if (routes) {
      return routes[path];
    }
    return null;
  }

  getSwagger() {
    return swaggerDocs(this);
  }
}
