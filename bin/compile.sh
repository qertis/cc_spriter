#!/usr/bin/env bash
# Compile source codes to minified dist/cc_spriter_min.js file

rm -rf bower_components/temp

# Create dist and temp directories
mkdir -p dist

# Build minification
webpack -p

cd bower_components/

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

cd temp/

# Concat files
cat closure_compiled.js \
    cc_spriter_component.js \
    > ../temp/temp_cc_spriter_min.js

# Closure wrap
sed -i "1i!function(){" temp_cc_spriter_min.js;
echo "}();" >> temp_cc_spriter_min.js;

# Move minified file
mv temp_cc_spriter_min.js ../../dist/cc_spriter_min.js;

# Remove old files
sleep 1
cd ../../
rm -rf bower_components/temp

echo 'end'

exit;