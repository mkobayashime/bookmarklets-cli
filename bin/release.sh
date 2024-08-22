#!/usr/bin/env bash

set -euo pipefail

version=${1:-}
[[ ! "$version" ]] && exit 1

git checkout -B "v$version"

sed -i -E "s@\"version\":\s+\"[^.]+\.[^.]+\.[^.]\"@\"version\": \"$version\"@" package.json

git add .
git commit -m "v$version"

echo 'Create PR and merge it.'
