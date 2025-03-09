const esbuild = require("esbuild");
const { execSync } = require("child_process");
const glob = require("glob");
const path = require("path");

// Buscar todos os arquivos TypeScript dentro de src/
const entryFiles = glob.sync("src/**/*.ts");

// Gerar builds para cada arquivo encontrado
async function build() {
  try {
    console.log("🛠️  Gerando arquivos .js...");
    await Promise.all(
      entryFiles.map((file) => {
        const relativePath = path.relative("src", file); // Pega o caminho relativo
        const baseName = relativePath.replace(/\.ts$/, ""); // Remove extensão .ts

        return Promise.all([
          esbuild.build({
            entryPoints: [file],
            outfile: `dist/${baseName}.mjs`,
            format: "esm",
            platform: "node",
          }),
          esbuild.build({
            entryPoints: [file],
            outfile: `dist/${baseName}.cjs`,
            format: "cjs",
            platform: "node",
          }),
          esbuild.build({
            entryPoints: [file],
            outfile: `dist/${baseName}.mts`,
            format: "esm",
            platform: "node",
          }),
          esbuild.build({
            entryPoints: [file],
            outfile: `dist/${baseName}.cts`,
            format: "cjs",
            platform: "node",
          }),
        ]);
      })
    );

    console.log("📜 Gerando arquivos de declaração (.d.ts)...");
    execSync("tsc", { stdio: "inherit" });

    console.log("✅ Build finalizada com sucesso!");
  } catch (error) {
    console.error("❌ Erro na build:", error);
    process.exit(1);
  }
}

build();
