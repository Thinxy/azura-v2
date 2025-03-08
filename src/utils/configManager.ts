import fs from "fs";
import path from "path";

import { MissingConfigError } from "../errors/messages/missingConfig.error";

const configPath = path.resolve(process.cwd(), ".config.ts");

export async function loadConfig() {
  if (!fs.existsSync(configPath)) {
    throw new MissingConfigError();
  }

  try {
    const configModule = await import(configPath);
    const config = configModule.default;

    if (typeof config === "function") {
      return config();
    }

    return config;
  } catch (error) {
    throw new Error(`Error loading config file: ${error}`);
  }
}
