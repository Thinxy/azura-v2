import http from "http";
import os from "os";

import chalk from "chalk";
import figures from "figures";

import { AzuraServer } from "..";
import { createResponse } from "./http/response";
import { parseRequest } from "./http/request";
import { Response } from "../@types";
const Azura = new AzuraServer();

export default function serverConnection(
  port: number | 3000,
  callback?: () => void,
  logging?: boolean
) {
  if (logging) {
    console.log(chalk.cyan.bold("🔧 Routes Registered:"));
    const routes = Azura.router.getRoutes();
    Object.keys(routes).forEach((method) => {
      Object.keys(routes[method]).forEach((path) => {
        console.log(chalk.green(`${figures.tick} ${method.toUpperCase()} ${chalk.bold(path)}`));
      });
    });
  }

  const server = http.createServer(async (req: http.IncomingMessage, res: http.ServerResponse) => {
    const start = Date.now();
    const cacheKey = `${req.method}:${req.url}`;

    if (Azura.cache.has(cacheKey)) {
      const response = createResponse(res);
      if (logging)
        console.log(chalk.yellow(`${figures.info} ${req.method} ${req.url} - Cache Hit`));
      else null;
      return response.send(Azura.cache.get(cacheKey));
    }

    const parsedReq = await parseRequest(req, Azura.options.jsonParser!);
    let index = 0;

    const next = () => {
      if (index < Azura.middleware.length) {
        const middleware = Azura.middleware[index++];
        middleware(parsedReq, res as Response, next);
      } else {
        const routeHandler = Azura.router.match(parsedReq.method, parsedReq.path);
        if (routeHandler) {
          const response = createResponse(res);
          routeHandler(parsedReq, response);

          const end = Date.now();
          const duration = end - start;
          console.log(chalk.green(`${figures.pointer} ${req.method} ${req.url} - ${duration}ms`));
        } else {
          const response = createResponse(res);
          response.send({ error: "404 - Not Found" });
          console.log(chalk.red(`${figures.cross} ${req.method} ${req.url} - 404 Not Found`));
        }
      }
    };

    next();
  });

  server.listen(port, () => {
    console.log(chalk.blue.bold(`🚀 Server is running on http://localhost:${port}`));
    getIP(port);
    callback && callback();
  });
}

function getIP(port: number | 3000) {
  const networkInterfaces = os.networkInterfaces();

  Object.values(networkInterfaces).forEach((interfaces) => {
    interfaces?.forEach((iface) => {
      if (iface.family === "IPv4" && !iface.internal) {
        console.log(chalk.blue.bold(`🌎 Accessible on http://${iface.address}:${port}`));
      }
    });
  });
}
