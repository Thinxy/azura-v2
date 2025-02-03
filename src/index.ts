import http from "http";

import { Middleware, Plugin, ServerOptions } from "./@types";
import { RouterManager } from "./router/routerManager";
import { setupRoutes } from "./@types/routes/methods.type";
import { LRUCache } from "./utils/cacheManager";
import serverConnection from "./core/server";

export class AzuraServer {
  public router: RouterManager;
  public options: ServerOptions;
  public middleware: Middleware[] = [];
  public plugins: Plugin[] = [];
  public cache: LRUCache;

  constructor(options: ServerOptions = {}) {
    this.router = new RouterManager();
    this.options = { jsonParser: options.jsonParser ?? true, ...options };
    this.cache = new LRUCache(options.cacheSize ?? 1000);

    setupRoutes(this, this.router);
  }

  use(middleware: Middleware) {
    this.middleware.push(middleware);
  }

  register(plugin: Plugin) {
    plugin(this);
    this.plugins.push(plugin);
  }

  start(port: number | 3000, callback?: () => void) {
    serverConnection(port, callback, this.options.logging);
  }
}
