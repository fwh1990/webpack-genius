set -e

rm -rf ./build

./node_modules/.bin/tsc

for file in $(ls -l ./build/ | grep -v src | awk '{print $NF}')
do
  rm -rf ./build/$file
done

mv ./build/src/* ./build && rmdir ./build/src
cp README.md package.json LICENSE ./build

npx public-refactor --src ./src --dist ./build

old_registry=$(npm config get registry)
npm config set registry https://registry.npmjs.org
set +e
whoami=$(npm whoami 2>/dev/null)
set -e

if [ -z "$whoami" ]
then
   echo "login plz..."
   npm login
fi
echo "I am: $(npm whoami)"

sleep 1
echo "Begin publish..."
npm publish ./build/ --access=public "$@"

npm config set registry ${old_registry}
