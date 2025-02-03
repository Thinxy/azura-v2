import { AzuraServer } from "..";

const app = new AzuraServer({ logging: true, jsonParser: true });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.start();
