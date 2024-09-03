import typescript from "@rollup/plugin-typescript";
import type { RollupOptions } from "rollup";

const config: RollupOptions = {
  input: "src/index.ts",
  output: {
    dir: "dist",
    entryFileNames: "[name].mjs",
  },
  plugins: [typescript()],
  external: [
    "arg",
    "chalk",
    "chokidar",
    "clipboardy",
    "esbuild",
    "fs/promises",
    "glob",
    "path",
    "terser",
  ],
};

export default config;
