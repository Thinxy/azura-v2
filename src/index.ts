import { Middleware, Plugin, RouterHandler, ServerOptions } from "./@types";
import { RouterManager } from "./router/routerManager";
import { LRUCache } from "./utils/cacheManager";
import serverConnection from "./core/server";
import { swaggerRender } from "./plugins/swagger";
import setupCors from "./plugins/cors";
import { loadConfig } from "./utils/configManager";

export class AzuraServer {
  private static instance: AzuraServer | null = null;

  public router: RouterManager;
  public options: ServerOptions;
  public middleware: Middleware[] = [];
  public plugins: Plugin[] = [];
  public cache: LRUCache;

  constructor(options?: ServerOptions) {
    this.router = new RouterManager();
    this.options = { jsonParser: options?.jsonParser ?? true, ...options };
    this.cache = new LRUCache(options?.cacheSize ?? 1000);

    this.initializePlugins();
    this.setupDefaultRoutes();
  }

  private initializePlugins() {
    if (this.options.cors) this.use(setupCors(this)!);
    if (this.options.swagger) swaggerRender(this.router);
  }

  private setupDefaultRoutes() {
    this.router.addRoute("get", "/favicon.ico", (req, res) => {
      res.writeHead(204);
      res.end();
    });
  }

  use(middleware: Middleware) {
    this.middleware.push(middleware);
  }

  register(plugin: Plugin) {
    plugin(this);
    this.plugins.push(plugin);
  }

  get(path: string, handler: RouterHandler) {
    this.router.addRoute("GET", path, handler);
  }

  post(path: string, handler: RouterHandler) {
    this.router.addRoute("POST", path, handler);
  }

  put(path: string, handler: RouterHandler) {
    this.router.addRoute("PUT", path, handler);
  }

  delete(path: string, handler: RouterHandler) {
    this.router.addRoute("DELETE", path, handler);
  }

  static async start(callback?: () => void) {
    if (!this.instance) {
      try {
        const config = await loadConfig();
        this.instance = new AzuraServer(config);
      } catch (error) {
        console.error("❌ Erro ao carregar a configuração:", error);
        process.exit(1);
      }
    }

    const port = this.instance.options.config?.port ?? 3000;
    serverConnection(this.instance, port, callback);
  }
}
