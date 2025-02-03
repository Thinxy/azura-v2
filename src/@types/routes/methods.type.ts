import { RouterHandler } from "..";
import { RouterManager } from "../../router/routerManager";

export function setupRoutes(app: any, router: RouterManager) {
  const methods = ["get", "post", "put", "delete"] as const;

  methods.forEach((method) => {
    app[method] = (path: string, handler: RouterHandler) => {
      router.addRoute(method.toUpperCase(), path, handler);
    };
  });
}
