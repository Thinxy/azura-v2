import { AzuraServer } from "..";

const app = new AzuraServer({ logging: true, jsonParser: true, swagger: true });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get(
  "/test",
  (req, res) => {
    res.send("Teste Swagger");
  },
  {
    summary: "Teste",
    description: "Teste",
    tags: ["test"],
    responses: {
      200: { description: "Resposta retornada com sucesso" },
      500: { description: "Erro interno do servidor" },
    },
  }
);

app.start();
