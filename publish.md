# How to publish

```bash
git checkout -B vX.X.X
# update version in package.json
# commit `vX.X.X`
# merge PR

# in main
git tag vX.X.X
git push origin vX.X.X
# automatic publication on CI

# create new release on GitHub
# https://github.com/mkobayashime/bookmarklets-cli/releases/new
# choose the tag, then `Generate release notes`
```
