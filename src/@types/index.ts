import { ServerResponse } from "http";
import { AzuraServer } from "..";

export type Plugin = (server: AzuraServer) => void;
export type RouterHandler = (req: Request, res: Response) => void;
export type Middleware = (req: Request, res: Response, next: () => void) => void;
export type RouteMeta = {
  summary?: string; // Resumo curto da rota
  description?: string; // Descrição detalhada da rota
  tags?: string[]; // Tags para agrupar as rotas
  responses?: Record<number, { description: string; content?: Record<string, any> }>; // Respostas da API, com código de status e conteúdo
  parameters?: Array<{
    name: string; // Nome do parâmetro
    in: "query" | "header" | "path" | "cookie"; // Onde o parâmetro será enviado
    required?: boolean; // Se o parâmetro é obrigatório
    schema?: { type: string; format?: string }; // Esquema para o parâmetro (tipo de dado)
  }>; // Parâmetros da rota (query, path, header, etc.)
  requestBody?: {
    required?: boolean; // Se o corpo da requisição é obrigatório
    content: Record<string, { schema: { type: string; properties: any } }>;
  }; // Corpo da requisição (para métodos como POST, PUT)
  deprecated?: boolean; // Marca a rota como obsoleta
  security?: Array<Record<string, any>>; // Definições de segurança (autenticação)
  externalDocs?: {
    description: string;
    url: string;
  }; // Documentação externa relacionada à rota
  operationId?: string; // ID único da operação
};

export interface ServerOptions {
  logging?: boolean;
  jsonParser?: boolean;
  cacheSize?: number;
  cors?: boolean;
  swagger?: boolean;
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
