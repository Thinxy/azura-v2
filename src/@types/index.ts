import { ServerResponse } from "http";
import { AzuraServer } from "..";

export type Plugin = (server: AzuraServer) => void;
export type RouterHandler = (req: Request, res: Response) => void;
export type Middleware = (req: Request, res: Response, next: () => void) => void;

export interface ServerOptions {
  logging?: boolean;
  jsonParser?: boolean;
  cacheSize?: number;
  database?: {
    uri: string;
    name?: string;
  };
}

export interface Request {
  method: string;
  url: string;
  path: string;
  params: { [key: string]: string };
  query: { [key: string]: string };
  body: any;
}

export interface Response extends ServerResponse {
  send: (data: any) => void;
}
