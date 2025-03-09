# Azura 🚀

O **Azura** é um framework de alto desempenho para criação de APIs em **TypeScript**, oferecendo uma alternativa ultrarrápida ao Express e Fastify. Com suporte nativo a **WebSockets, autenticação JWT, banco de dados e CLI inteligente**, ele simplifica o desenvolvimento e otimiza a performance.

## ⚡ Recursos Principais

- 🔥 **Desempenho superior** utilizando `http nativo` diretamente.
- 🔄 **Auto-descoberta de rotas** para facilitar a criação de APIs.
- 📦 **Suporte nativo a WebSockets e RPC**.
- 🔐 **Sistema de autenticação embutido** para login simplificado.
- 📊 **Monitoramento de requisições** e CLI inteligente.

## 🚀 Instalação

Instale o Azura via **npm** ou **bun**:

```sh
npm install @atosjs/azura
# ou
bun install @atosjs/azura
```

## 🏗️ Como Usar

Crie um servidor Azura em poucos segundos:

```ts
import { AzuraServer } from "@atosjs/azura";

const app = new AzuraServer();
/* params configured in the config file "azura.config.ts" or "azura.config.js" */

// # Example seting routes normally:
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.start(); // or configure the port in the config file "azura.config.ts" or "azura.config.js"
```

# 🔗 Swagger

Azura inclui suporte nativo a **Swagger**:

```ts
import { AzuraServer } from "@atosjs/azura";

const app = new AzuraServer();

// # Example seting routes with swagger:
app.get("/test", (req, res, swagger) => {
  swagger({ summary: "Test", description: "Test", tags: ["test"] });

  res.send("Test Swagger"); // view your swagger at http://localhost:3000/docs route or you swagger json file at http://localhost:3000/swagger.json
});

app.start();
```

# ⚙ Arquivo de configuração

O arquivo de configuração é um arquivo JSON que contém as configurações do servidor. O arquivo de configuração padrão é o `azura.config.json` e está localizado no diretório atual. Você pode criar um arquivo de configuração personalizado ou usar o arquivo padrão.

Exemplo de arquivo de configuração:

```json
{
  "config": {
    "port": 3000,
    "ipHost": true,
    "callback": function() {
      console.log("Server started");
    }
  },
  "logging": true,
  "jsonParser": true,
  "cacheSize": 1000,
  "cors": true,
  "swagger": true,
  "database": {
    "uri": "mongodb://localhost:27017/azura",
    "name": "azura"
  }
}
```

As configurações disponíveis no arquivo de configuração são:

- `config`: Configurações do servidor, como porta, IP, callback, etc.
- `logging`: Habilita ou desabilita o registro de eventos no console.
- `jsonParser`: Habilita ou desabilita o parser de JSON.
- `cacheSize`: Tamanho do cache do servidor.
- `cors`: Habilita ou desabilita o CORS.
- `swagger`: Habilita ou desabilita a documentação do Swagger.
- `database`: Configurações do banco de dados.

## 📜 Licença

Azura é um projeto **open-source** licenciado sob **MIT** e afiliado ao **AtosJS**.
