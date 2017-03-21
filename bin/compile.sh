#!/usr/bin/env bash
# Compile source codes to minified dist/cc_spriter_min.js file
################################################################
echo "Compile started"

# Clear old directories
rm -rf bower_components/spriterjs/demo/
rm -rf temp/
rm -rf dist/

# Build minification
npm run webpack

# Compile spriter
cd node_modules/
google-closure-library/closure/bin/build/closurebuilder.py --root=google-closure-library/ --root=../bower_components/spriterjs/ --namespace="spriter" --output_mode=compiled --compiler_jar=google-closure-library/compiler.jar --output_file=../temp/closure_compiled.js
cd ../

# Union spriter.js and cc.spriter to temp_cc_spriter_min.js
cd temp/
cat closure_compiled.js cc_spriter_dist.js > temp_cc_spriter_min.js
rm closure_compiled.js
rm cc_spriter_dist.js

# Closure wrap
sed -i "1i!function(){" temp_cc_spriter_min.js;
echo "}();" >> temp_cc_spriter_min.js;
# Move minified file
cd ../
mkdir -p dist/
mv temp/temp_cc_spriter_min.js dist/cc_spriter_min.js
rm -rf temp/
