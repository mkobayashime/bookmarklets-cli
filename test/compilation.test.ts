import test from "ava"
import path from "node:path"
import { fileURLToPath } from "url"

import { compile } from "../src/compile.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const sources: Array<{ sourceFilename: string; dist: string }> = [
  {
    sourceFilename: "youtubeTimestampInQuery.ts",
    dist: "javascript:(()=>{var%20o%3Ddocument.querySelector(%22video%22)%3Bif(o)%7Blet%20e%3DMath.floor(o.currentTime)%2Ct%3Dwindow.location.href%2Cr%3Dnew%20URL(t)%3Br.searchParams.set(%22t%22%2CString(e)%2B%22s%22)%2Cwindow.history.pushState(%7B%7D%2C%22%22%2Cr)%7D})()",
  },
  {
    sourceFilename: "googleSearchInEn.ts",
    dist: "javascript:(()=>{if(window.location.href.startsWith(%22https%3A%2F%2Fwww.google.com%2Fsearch%22))%7Blet%20o%3Dnew%20URL(window.location.href)%3Bo.searchParams.set(%22lr%22%2C%22lang_en%22)%2Cwindow.location.href%3Do.toString()%7D})()",
  },
]

for (const { sourceFilename, dist } of sources) {
  test(`It compiles ${sourceFilename} correctly`, async (t) => {
    const { prod } = await compile(
      path.resolve(__dirname, "src", sourceFilename)
    )

    t.is(prod, dist)
  })
}
