#!/usr/bin/env bash
# Compile source codes to minified dist/cc_spriter_min.js file

rm -rf bower_components/temp

# Create dist directory
mkdir -p dist

# Compile source
webpack --production

cd bower_components

mkdir -p temp

# Copy spriter.js file to temp directory
cp spriterjs/spriter.js temp/spriter.js

# Build compiled file (spriter and goog)
google-closure-library/closure/bin/build/closurebuilder.py \
  --root=google-closure-library/ \
  --root=temp/ \
  --namespace="spriter" \
  --output_mode=compiled \
  --compiler_jar=google-closure-library/compiler.jar > temp/closure_compiled.js

cd temp

# Concat files
cat closure_compiled.js \
    cc_spriter_component.js \
    > ../../dist/cc_spriter_min.js

# Remove old files
cd ../..
sleep 5
rm -rf bower_components/temp/