import { RouterHandler } from "../@types";

export class RouterManager {
  private routes: { [method: string]: { [path: string]: RouterHandler } } = {};

  constructor() {}

  addRoute(method: string, path: string, handler: RouterHandler) {
    if (!this.routes[method]) {
      this.routes[method] = {};
    }
    this.routes[method][path] = handler;
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
}
