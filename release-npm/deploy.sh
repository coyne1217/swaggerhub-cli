# Deploy `swaggerhub-cli` to npm.

#comment

# Parameter Expansion: http://stackoverflow.com/questions/6393551/what-is-the-meaning-of-0-in-a-bash-script
cd "${0%/*}"

# Get UI version
UI_VERSION=$(node -p "require('../package.json').version")

# Replace our version placeholder with UI's version
sed -i "s|\$\$VERSION|$UI_VERSION|g" package.json

# Copy UI's dist files to our directory
cp ../dist/* .

if [ "$PUBLISH_DIST" = "true" ]; then
  npm publish .
else
  npm pack .
fi

find . -not -name .npmignore -not -name .npmrc -not -name deploy.sh -not -name index.js -not -name package.json -not -name README.md -not -name *.tgz -delete
