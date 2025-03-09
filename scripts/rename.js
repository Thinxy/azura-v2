const fs = require("fs");
const path = require("path");

const distDir = path.resolve(__dirname, "../dist");

fs.readdirSync(distDir).forEach((file) => {
  if (file.endsWith(".js")) {
    fs.copyFileSync(path.join(distDir, file), path.join(distDir, file.replace(".js", ".cjs")));
    fs.copyFileSync(path.join(distDir, file), path.join(distDir, file.replace(".js", ".mjs")));
  }
  if (file.endsWith(".d.ts")) {
    fs.copyFileSync(path.join(distDir, file), path.join(distDir, file.replace(".d.ts", ".cts")));
    fs.copyFileSync(path.join(distDir, file), path.join(distDir, file.replace(".d.ts", ".mts")));
  }
});

console.log("✔️ Todos os arquivos foram gerados corretamente!");
