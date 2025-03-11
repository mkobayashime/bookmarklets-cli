biome = bunx biome
tsup = bunx tsup
tsc = bunx tsc
vitest = bunx vitest

node_modules: PHONY
	bun install

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
	$(tsup) --watch src

build: node_modules PHONY
	$(tsup)

PHONY:
