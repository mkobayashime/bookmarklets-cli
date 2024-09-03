import * as esbuild from "esbuild";
import { minify } from "terser";

export const compile = async (filename: string) => {
  const esbuildOutput = await esbuild.build({
    entryPoints: [filename],
    bundle: true,
    minify: true,
    format: "esm",
    write: false,
  });

  if (!esbuildOutput.outputFiles[0]) {
    throw new Error("esbuild outputFiles is empty");
  }
  const code = esbuildOutput.outputFiles[0].text;

  const prod = `javascript:(()=>{${encodeURIComponent((await minify(code)).code ?? "")}})()`;
  const dev = prod.slice(1);

  return {
    prod,
    dev,
  };
};
