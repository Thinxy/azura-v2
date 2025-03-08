import { ServerOptions } from "./src/@types";

const config: ServerOptions = {
  config: {
    port: 3000,
  },
  logging: true,
  swagger: true,
};

export default config;