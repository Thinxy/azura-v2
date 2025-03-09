import fs from "fs";
import path from "path";
import { MissingConfigError } from "../errors/messages/missingConfig.error";
import { ServerOptions } from "../@types";

const configPath = path.resolve(process.cwd(), "azura.config");

export async function loadConfig(): Promise<ServerOptions> {
  if (!fs.existsSync(configPath)) {
    throw new MissingConfigError();
  }

  const extname = path.extname(configPath);

  try {
    if (extname === ".ts" || extname === ".js") {
      const configModule = await import(configPath);
      const config: ServerOptions = configModule.default;

      if (typeof config === "function") {
        return config;
      }

      return config;
    }

    if (extname === ".json") {
      const config: ServerOptions = require(configPath);

      return config;
    }

    throw new Error(`Unsupported config file format: ${extname}`);
  } catch (error) {
    throw new Error(`Error loading config file: ${error}`);
  }
}
