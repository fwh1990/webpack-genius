set -e

rm -rf ./build ./lib
npx tsc
mv ./build/src/ ./lib
npx public-refactor --src ./src --dist ./lib
