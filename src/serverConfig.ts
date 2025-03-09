import { ServerOptions } from "./@types";

class ServerConfig implements ServerOptions {
  config?: {
    port?: number;
    ipHost?: boolean;
    callback?: () => void;
  };
  logging?: boolean;
  jsonParser?: boolean;
  cacheSize?: number;
  cors?: boolean;
  swagger?: boolean;
  database?: {
    uri: string;
    name?: string;
  };

  constructor(options: ServerOptions) {
    this.config = options.config;
    this.logging = options.logging;
    this.jsonParser = options.jsonParser;
    this.cacheSize = options.cacheSize;
    this.cors = options.cors;
    this.swagger = options.swagger;
    this.database = options.database;
  }

  validate(): boolean {
    if (!this.database?.uri) {
      console.error("Database URI is required!");
      return false;
    }
    return true;
  }
}

export default ServerConfig;
