oxfmt = bunx oxfmt
oxlint = bunx oxlint
tsup = bunx tsup
tsc = bunx tsc
vitest = bunx vitest

node_modules: PHONY
ifeq ($(CI), true)
	bun install --frozen-lockfile
else
	bun install
endif

lint: node_modules PHONY
	$(oxfmt) --check
	$(oxlint) --type-aware

lint.fix: node_modules PHONY
	$(oxfmt)
	$(oxlint) --fix --type-aware

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
