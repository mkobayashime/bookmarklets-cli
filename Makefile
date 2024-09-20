biome = pnpm exec biome
rollup = pnpm exec rollup --config rollup.config.ts --configPlugin @rollup/plugin-typescript
tsc = pnpm exec tsc
vitest = pnpm exec vitest

node_modules: package.json pnpm-*.yaml
	pnpm install
	@touch node_modules

lint: node_modules PHONY
	$(biome) check .

lint.fix: node_modules PHONY
	$(biome) check --fix .

typecheck: node_modules PHONY
	$(tsc) --noEmit

typecheck.watch: node_modules PHONY
	$(tsc) --noEmit --watch

test: node_modules PHONY
	$(vitest) run

test.watch: node_modules PHONY
	$(vitest) watch

dev: node_modules PHONY
	$(rollup) --watch

build: node_modules PHONY
	$(rollup)

PHONY:
