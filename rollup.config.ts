import typescript from "@rollup/plugin-typescript"
import { RollupOptions } from "rollup"

const config: RollupOptions = {
  input: "src/index.ts",
  output: {
    dir: "dist",
    entryFileNames: "[name].mjs",
    banner: "#!/usr/bin/env node\n",
  },
  plugins: [typescript()],
  external: [
    "chalk",
    "chokidar",
    "clipboardy",
    "esbuild",
    "fs/promises",
    "glob",
    "path",
    "terser",
  ],
}

// eslint-disable-next-line import/no-default-export
export default config
