import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { compile } from "../src/compile.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sources: Array<{ sourceFilename: string; dist: string }> = [
	{
		sourceFilename: "youtubeTimestampInQuery.ts",
		dist: "javascript:(()=>{var%20o%3Ddocument.querySelector(%22video%22)%3Bif(o)%7Blet%20e%3DMath.floor(o.currentTime)%2Ct%3Dwindow.location.href%2Cr%3Dnew%20URL(t)%3Br.searchParams.set(%22t%22%2C%60%24%7BString(e)%7Ds%60)%2Cwindow.history.pushState(%7B%7D%2C%22%22%2Cr)%7D})()",
	},
	{
		sourceFilename: "googleSearchInEn.ts",
		dist: "javascript:(()=>{if(window.location.href.startsWith(%22https%3A%2F%2Fwww.google.com%2Fsearch%22))%7Blet%20o%3Dnew%20URL(window.location.href)%3Bo.searchParams.set(%22lr%22%2C%22lang_en%22)%2Cwindow.location.href%3Do.toString()%7D})()",
	},
	{
		sourceFilename: "copyDocumentTitle.ts",
		dist: "javascript:(()=>{var%20o%3Dasync(e%2Ct%3D!0)%3D%3E%7Bif(e)if(console.log(e)%2Ct)await%20window.navigator.clipboard.writeText(e)%3Belse%7Blet%20t%3Ddocument.createElement(%22textarea%22)%3Bt.textContent%3De%2Cdocument.body.appendChild(t)%2Ct.select()%2Cdocument.execCommand(%22copy%22)%2Ct.remove()%7D%7D%2Cc%3Ddocument.querySelector(%22title%22)%2Cn%3Dc%3F.innerText.trim().split(%22%5Cn%22).join(%22%22)%3B(async()%3D%3E%7Bn%26%26await%20o(n%2C!1)%7D)().catch((e%3D%3Econsole.error(e)))%3B})()",
	},
	{
		sourceFilename: "amazonShare.ts",
		dist: "javascript:(()=>{var%20a%3Dasync(e%2Ct%3D!0)%3D%3E%7Bif(e)if(console.log(e)%2Ct)await%20window.navigator.clipboard.writeText(e)%3Belse%7Blet%20t%3Ddocument.createElement(%22textarea%22)%3Bt.textContent%3De%2Cdocument.body.appendChild(t)%2Ct.select()%2Cdocument.execCommand(%22copy%22)%2Ct.remove()%7D%7D%3B(async()%3D%3E%7Bif(!window.location.href.startsWith(%22https%3A%2F%2Fwww.amazon.co.jp%22))return%3Blet%20e%3Ddocument.querySelector('link%5Brel%3D%22canonical%22%5D')%3Bif(!e)return%20void%20window.alert(%22Failed%20to%20get%20normalized%20URL%22)%3Blet%20t%3Dnew%20URL(e.href)%3Bt.search%3D%22%22%2Ct.hash%3D%22%22%3Blet%20o%3D%2F%5Ehttps%3A%5C%2F%5C%2Fwww.amazon.co.jp%5C%2F%5B%5E%5C%2F%5D%2B%5C%2Fdp%5C%2F(%5B%5E%5C%2F%5D%2B)%2F.exec(t.toString())%3Bif(!o%7C%7C%22string%22!%3Dtypeof%20o%5B1%5D)return%20void%20window.alert(%22Failed%20to%20retrieve%20ID%20of%20the%20item%20from%20canonical%20URL%22)%3Blet%20n%3D%60https%3A%2F%2Fwww.amazon.co.jp%2Fdp%2F%24%7Bo%5B1%5D%7D%2F%60%2Ci%3Ddocument.getElementById(%22productTitle%22)%3Bif(!i%7C%7C%22%22%3D%3D%3Di.innerText)return%20void%20window.alert(%22Failed%20to%20get%20name%20of%20the%20item%22)%3Blet%20r%3D%60%24%7Bi.innerText%7D%5Cn%24%7Bn%7D%60%3Bawait%20a(r%2C!1)%7D)().catch((e%3D%3E%7Bconsole.error(e)%7D))%3B})()",
	},
];

describe(compile, async () => {
	for (const { sourceFilename, dist } of sources) {
		const { prod } = await compile(
			path.resolve(__dirname, "src", sourceFilename),
		);

		it(`compiles ${sourceFilename} (raw output)`, () => {
			expect(prod).toBe(dist);
		});

		it(`compiles ${sourceFilename} (decoded)`, () => {
			expect(decodeURIComponent(prod)).toBe(decodeURIComponent(dist));
		});
	}
});
