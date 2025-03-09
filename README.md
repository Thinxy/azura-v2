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

## 📜 Licença

Azura é um projeto **open-source** licenciado sob **MIT** e afiliado ao **AtosJS**.
