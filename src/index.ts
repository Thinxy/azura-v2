import { Middleware, Plugin, RouterHandler, ServerOptions } from "./@types";
import serverConnection from "./core/server";
import { swaggerRender } from "./plugins/swagger";
import setupCors from "./plugins/cors";
import { RouterManager } from "./router/routerManager";
import { LRUCache } from "./utils/cacheManager";
import { loadConfig } from "./utils/configManager";
import { missingInstanceError } from "./errors/messages/missingInstance.error";

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

    // Verifica se a instância já foi criada
    if (!AzuraServer.instance) {
      AzuraServer.instance = this;
    }

    this.cache = new LRUCache(this.options.cacheSize ?? 1000);
  }

  private async loadConfig() {
    try {
      const config = await loadConfig();
      if (config) {
        this.options = { ...this.options, ...config };
      }
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }

  private async initializePlugins() {
    // Carrega a configuração antes de inicializar plugins
    await this.loadConfig();

    if (this.options.cors) this.use(setupCors(this)!);
    if (this.options.swagger) swaggerRender(this.router);
  }

  private setupDefaultRoutes() {
    this.router.addRoute("GET", "/favicon.ico", (req, res) => {
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

  async start(callback?: () => void) {
    const instance = AzuraServer.instance;

    if (!instance) {
      throw new missingInstanceError();
    }

    await instance.initializePlugins();

    const port = instance.options.config?.port ?? 3000;
    serverConnection(instance, port, callback);
  }
}
