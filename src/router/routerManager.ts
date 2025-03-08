import { RouterHandler, RouteMeta } from "../@types";

export class RouterManager {
  private routes: Record<string, Record<string, { handler: RouterHandler; meta?: RouteMeta }>> = {};

  addRoute(method: string, path: string, handler: RouterHandler) {
    const normalizedMethod = method.toUpperCase();
    if (!this.routes[normalizedMethod]) {
      this.routes[normalizedMethod] = {};
    }
    this.routes[normalizedMethod][path] = { handler };
  }

  handleRequest(method: string, path: string, req: any, res: any) {
    const normalizedMethod = method.toUpperCase();
    console.log(`🔍 Buscando rota: ${normalizedMethod} ${path}`);

    const route = this.routes[normalizedMethod]?.[path];
    if (route) {
      console.log(`✅ Encontrada: ${normalizedMethod} ${path}`);
      const swagger = (meta: RouteMeta) => {
        req.routeMeta = meta;
      };
      route.handler(req, res, swagger);
    } else {
      console.log(`❌ 404 - Rota não encontrada: ${normalizedMethod} ${path}`);
      res.writeHead(404);
      res.end("Not Found");
    }
  }

  getRoutes() {
    return this.routes;
  }
}
