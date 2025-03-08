import { AzuraServer } from "../src";

const app = new AzuraServer();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/test", (req, res, swagger) => {
  swagger({ summary: "Teste", description: "Teste", tags: ["test"] });

  res.send("Teste Swagger");
});

AzuraServer.start();
