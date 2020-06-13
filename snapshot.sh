#!/usr/bin/env bash

set -e

rm -rf build
./node_modules/.bin/tsc
rm -rf snapshots

for dir in $(ls ./examples)
do
  cd ./examples/$dir
  yarn install
  node ../../build/src/command.js build --env development
  node ../../build/src/command.js build --env production
  cd -
done
