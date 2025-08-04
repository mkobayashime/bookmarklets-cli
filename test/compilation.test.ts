import path from "node:path";
import { describe, expect, it } from "vitest";

import { compile } from "../src/compile.js";

const sources = [
	"youtubeTimestampInQuery.ts",
	"googleSearchInEn.ts",
	"copyDocumentTitle.ts",
	"amazonShare.ts",
];

describe(compile, () => {
	for (const filename of sources) {
		it(`compiles ${filename}`, async () => {
			const { prod } = await compile(
				path.resolve(import.meta.dirname, "src", filename),
			);

			await expect(prod).toMatchFileSnapshot(
				path.resolve(
					import.meta.dirname,
					"snapshots",
					filename.replace(/\.ts$/, "-original.ts"),
				),
			);

			await expect(decodeURIComponent(prod)).toMatchFileSnapshot(
				path.resolve(
					import.meta.dirname,
					"snapshots",
					filename.replace(/\.ts$/, "-decoded.ts"),
				),
			);
		});
	}
});
