import path from "node:path"
import { fileURLToPath } from "url"
import { describe, it, expect } from "vitest"

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
  {
    sourceFilename: "copyDocumentTitle.ts",
    dist: 'javascript:(()=>{var o=async(e,t=!0)=>{if(e)if(console.log(e),t)await window.navigator.clipboard.writeText(e);else{let t=document.createElement("textarea");t.textContent=e,document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}},c=document.querySelector("title"),n=c?.innerText.trim().split("\\n").join("");(async()=>{n&&await o(n,!1)})().catch((e=>console.error(e)));})()',
  },
  {
    sourceFilename: "amazonShare.ts",
    dist: 'javascript:(()=>{var a=async(e,t=!0)=>{if(e)if(console.log(e),t)await window.navigator.clipboard.writeText(e);else{let t=document.createElement("textarea");t.textContent=e,document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}};(async()=>{if(!window.location.href.startsWith("https://www.amazon.co.jp"))return;let e=document.querySelector(\'link[rel="canonical"]\');if(!e)return void window.alert("Failed to get normalized URL");let t=new URL(e.href);t.search="",t.hash="";let o=new RegExp("^https://www.amazon.co.jp/[^/]+/dp/([^/]+)").exec(t.toString());if(!o||"string"!=typeof o[1])return void window.alert("Failed to retrieve ID of the item from canonical URL");let n=`https://www.amazon.co.jp/dp/${o[1]}/`,i=document.getElementById("productTitle");if(!i||""===i.innerText)return void window.alert("Failed to get name of the item");let r=`${i.innerText}\\n${n}`;await a(r,!1)})().catch((e=>{console.error(e)}));})()',
  },
]

describe(compile, () => {
  for (const { sourceFilename, dist } of sources) {
    it(`compiles ${sourceFilename} correctly`, async () => {
      const { prod } = await compile(
        path.resolve(__dirname, "src", sourceFilename)
      )

      expect(decodeURIComponent(prod)).toBe(dist)
    })
  }
})
