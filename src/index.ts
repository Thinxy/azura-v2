import { Middleware, Plugin, RouteMeta, RouterHandler, ServerOptions } from "./@types";
import { RouterManager } from "./router/routerManager";
import { LRUCache } from "./utils/cacheManager";
import serverConnection from "./core/server";
import setupCors from "./plugins/cors";
import { swaggerRender } from "./plugins/swagger";

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

    if (this.options.cors) {
      this.use(setupCors()!);
    }

    if (this.options.swagger) {
      swaggerRender(this.router);
    }
  }

  use(middleware: Middleware) {
    this.middleware.push(middleware);
  }

  register(plugin: Plugin) {
    plugin(this);
    this.plugins.push(plugin);
  }

  get(path: string, handler: RouterHandler, meta?: RouteMeta) {
    this.router.addRoute("GET", path, handler, meta);
  }

  post(path: string, handler: RouterHandler, meta?: RouteMeta) {
    this.router.addRoute("POST", path, handler, meta);
  }

  put(path: string, handler: RouterHandler, meta?: RouteMeta) {
    this.router.addRoute("PUT", path, handler, meta);
  }

  delete(path: string, handler: RouterHandler, meta?: RouteMeta) {
    this.router.addRoute("DELETE", path, handler, meta);
  }

  start(port?: number | 3000, callback?: () => void) {
    serverConnection(this, port ?? 3000, callback);
  }
}
