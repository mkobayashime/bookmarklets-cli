eslint = yarn eslint --ignore-path .gitignore
prettier = yarn prettier --ignore-path .gitignore
rollup = yarn run rollup --config rollup.config.ts --configPlugin @rollup/plugin-typescript

node_modules: package.json yarn.lock
ifeq ($(MAKE_YARN_FROZEN_LOCKFILE), 1)
	yarn install --frozen-lockfile
else
	yarn install
endif
	@touch node_modules

lint: node_modules PHONY
	$(eslint) .

lint.fix: node_modules PHONY
	$(eslint) --fix .

format: node_modules PHONY
	$(prettier) --write .

format.check: node_modules PHONY
	$(prettier) --check .

typecheck: node_modules PHONY
	yarn tsc --noEmit

typecheck.watch: node_modules PHONY
	yarn tsc --noEmit --watch

test: node_modules PHONY
	yarn run ava

test.watch: node_modules PHONY
	yarn run ava --watch

dev: node_modules PHONY
	$(rollup) --watch

build: node_modules PHONY
	$(rollup)

PHONY:
