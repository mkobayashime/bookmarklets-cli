#!/usr/bin/env node

import arg from "arg"
import chalk from "chalk"
import chokidar from "chokidar"
import clipboard from "clipboardy"
import { writeFile, mkdir } from "fs/promises"
import { globSync } from "glob"
import path from "path"

import { compile } from "./compile"

type BuildProps = {
  inputsGlob: string
  distDir: string
}

const dev = ({ inputsGlob, distDir }: BuildProps) => {
  try {
    const watcher = chokidar.watch(inputsGlob).on("change", (filename) => {
      ;(async () => {
        try {
          const { dev, prod } = await compile(filename)

          console.log(chalk.green(`\nCompiled ${path.basename(filename)}`))

          console.log(prod)
          clipboard.writeSync(dev)

          await writeFile(
            path.resolve(
              distDir,
              path.basename(filename).replace(/.ts$/, ".js")
            ),
            prod
          )
        } catch (err) {
          console.error(err)
          console.log("")
        }
      })().catch((err) => {
        console.error(err)
      })
    })

    watcher.on("ready", () =>
      console.log(chalk.green("\nDev mode started: watching for file changes"))
    )
  } catch (err) {
    console.error(err)
  }
}

const build = async ({ inputsGlob, distDir }: BuildProps) => {
  try {
    const files = globSync(inputsGlob)
    for (const filepath of files) {
      try {
        const { prod } = await compile(filepath)
        await writeFile(
          path.resolve(distDir, path.basename(filepath).replace(/.ts$/, ".js")),
          prod
        )
      } catch (err) {
        console.error(err)
        console.log("")
      }
    }
  } catch (err) {
    console.error(err)
  }
}

//
;(async () => {
  const args = arg({
    "--watch": Boolean,
    "-W": Boolean,
    "--dist-dir": String,
    "-D": String,
    "--help": Boolean,
    "-H": Boolean,
  })

  if (args["--help"] ?? args["-H"]) {
    console.log(
      `
bookmarklets-cli
https://www.npmjs.com/package/bookmarklets-cli

USAGE

  npx bookmarklets-cli [-W|--watch] [-D|--dist-dir] <files_glob>
  npx bookmarklets-cli [-H|--help]

EXAMPLE

  npx bookmarklets-cli 'src/*.ts'
  npx bookmarklets-cli --dist-dir 'out'
  npx bookmarklets-cli --watch 'src/*.ts'
`.trim()
    )

    process.exit(0)
  }

  const watch = args["--watch"] ?? args["-W"]

  const dist = args["--dist-dir"] ?? args["-D"] ?? "dist"
  await mkdir(dist, { recursive: true })

  if (args["_"].length === 0) {
    console.error(chalk.red("Fatal: Input files not passed"))
    process.exit(1)
  }
  if (args["_"].length > 1) {
    console.warn(
      chalk.yellow(
        "Caution:\nbookmarklets-cli currently doesn't support multiple input arguments.\nPass one glob expression instead."
      )
    )
  }

  const buildProps = {
    inputsGlob: args["_"][0],
    distDir: dist,
  }

  if (watch) {
    dev(buildProps)
  } else {
    await build(buildProps)
  }
})().catch((err) => {
  console.error(err)
})
