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

.PHONY: lint
lint: node_modules
	$(eslint) .

.PHONY: lint.fix
lint.fix: node_modules
	$(eslint) --fix .

.PHONY: format
format: node_modules
	$(prettier) --write .

.PHONY: format.check
format.check: node_modules
	$(prettier) --check .

.PHONY: typecheck
typecheck: node_modules
	yarn tsc --noEmit

.PHONY: typecheck.watch
typecheck.watch: node_modules
	yarn tsc --noEmit --watch

.PHONY: dev
dev: node_modules
	$(rollup) --watch

.PHONY: build
build: node_modules
	$(rollup)
