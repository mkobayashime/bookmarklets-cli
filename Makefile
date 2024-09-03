biome = yarn run biome
rollup = yarn run rollup --config rollup.config.ts --configPlugin @rollup/plugin-typescript

node_modules: package.json yarn.lock
ifeq ($(MAKE_YARN_FROZEN_LOCKFILE), 1)
	yarn install --frozen-lockfile
else
	yarn install
endif
	@touch node_modules

lint: node_modules PHONY
	$(biome) check .

lint.fix: node_modules PHONY
	$(biome) check --fix .

typecheck: node_modules PHONY
	yarn tsc --noEmit

typecheck.watch: node_modules PHONY
	yarn tsc --noEmit --watch

test: node_modules PHONY
	yarn run vitest run

test.watch: node_modules PHONY
	yarn run vitest watch

dev: node_modules PHONY
	$(rollup) --watch

build: node_modules PHONY
	$(rollup)

PHONY:
