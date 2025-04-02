#!/bin/bash

# Check if version number is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <version>"
  exit 1
fi

VERSION=$1

# List of package.json files to update
FILES=(
  "packages/mesh-midnight-core/package.json"
  "packages/mesh-midnight-react/package.json"
  "packages/mesh-midnight-wallet/package.json"
)

# Iterate over each specified package.json file and update the version field
for FILE in "${FILES[@]}"; do
  if [ -f "$FILE" ]; then
    sed -i '' -e "s/\"version\": \".*\"/\"version\": \"$VERSION\"/" "$FILE"

    # Update @meshsdk dependencies to the latest version
    sed -i '' -e "s/\"@meshsdk\/midnight-core\": \".*\"/\"@meshsdk\/midnight-core\": \"$VERSION\"/" "$FILE"
    sed -i '' -e "s/\"@meshsdk\/midnight-react\": \".*\"/\"@meshsdk\/midnight-react\": \"$VERSION\"/" "$FILE"
    sed -i '' -e "s/\"@meshsdk\/midnight-wallet\": \".*\"/\"@meshsdk\/midnight-wallet\": \"$VERSION\"/" "$FILE"
 
    echo "Updated version in $FILE"
  else
    echo "File not found: $FILE"
  fi
done

echo "Version updated to $VERSION in all specified package.json files."