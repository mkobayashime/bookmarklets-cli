# `@mkobayashime/bookmarklets-cli`

CLI for [bookmarklets](https://en.wikipedia.org/wiki/Bookmarklet) development

## Installation

```bash
# you can use this cli without installing locally
npx bookmarklets-cli [...]

# if needed
npm install --save bookmarklets-cli
# or
yarn add bookmarklets-cli
```

## Usage

### Build

```bash
# transpile `script.ts` into `dist` dir
npx bookmarklets-cli script.ts

# glob support
npx bookmarklets-cli 'src/*.ts'

# specify dist dir
npx bookmarklets-cli --dist-dir 'out'
```

### Dev mode

In dev mode, every time the input script is saved, the CLI transpiles the input script and copies it to the clipboard.

Note that the leading `j` is removed (e.g., `avascript:(()=>{})` instead of `javascript:(()=>{})`). Many browsers automatically remove the `javascript:` part from URLs pasted into the address bar to enhance security, so the leading `j` is removed to avoid this issue.
When testing the copied output from dev mode in a browser, first type `j` in the address bar, then paste the copied output, and press Enter to execute it.

```bash
# watch `script.ts`
npx bookmarklets-cli --watch script.ts

# glob support
npx bookmarklets-cli --watch 'src/*.ts'
```

## Publishing

```bash
git checkout -B <newversion>
npm version [ major | minor | patch ]
# merge PR

# in main
npm publish
```
