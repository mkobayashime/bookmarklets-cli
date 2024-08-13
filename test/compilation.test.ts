import test from "ava"
import path from "node:path"
import { fileURLToPath } from "url"

import { compile } from "../src/compile.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const sources: Array<{ sourceFilename: string; dist: string }> = [
  {
    sourceFilename: "youtubeTimestampInQuery.ts",
    dist: 'javascript:(()=>{var o=document.querySelector("video");if(o){let e=Math.floor(o.currentTime),t=window.location.href,r=new URL(t);r.searchParams.set("t",String(e)+"s"),window.history.pushState({},"",r)}})()',
  },
  {
    sourceFilename: "googleSearchInEn.ts",
    dist: 'javascript:(()=>{if(window.location.href.startsWith("https://www.google.com/search")){let o=new URL(window.location.href);o.searchParams.set("lr","lang_en"),window.location.href=o.toString()}})()',
  },
]

for (const { sourceFilename, dist } of sources) {
  test(`It compiles ${sourceFilename} correctly`, async (t) => {
    const { prod } = await compile(
      path.resolve(__dirname, "src", sourceFilename)
    )

    t.is(decodeURIComponent(prod), dist)
  })
}
