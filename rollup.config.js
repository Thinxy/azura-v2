import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/index.ts", // O arquivo de entrada do seu projeto
  output: [
    {
      file: "dist/index.cjs", // Saída para o CommonJS
      format: "cjs",
      sourcemap: true,
      exports: "named",
    },
    {
      file: "dist/index.mjs", // Saída para o ESM
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json", // Garantir que o TypeScript seja integrado
    }),
  ],
};
