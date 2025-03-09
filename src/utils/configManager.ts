import fs from "fs";
import path from "path";
import { MissingConfigError } from "../errors/messages/missingConfig.error";
import { ServerOptions } from "../@types";

const configPath = path.resolve(process.cwd(), "azura.config.json");

export async function loadConfig(): Promise<ServerOptions> {
  if (!fs.existsSync(configPath)) {
    throw new MissingConfigError();
  }

  try {
    const config: ServerOptions = require(configPath);

    return config;
  } catch (error) {
    throw new Error(`Erro ao carregar o arquivo de configuração: ${error}`);
  }
}
