#!/usr/bin/env bash

echo 'PostInstall started...'
bower install
echo 'Getting compiler'
mkdir -p temp/
cd temp/
wget http://dl.google.com/closure-compiler/compiler-latest.zip
# Unzip and copy compiler.jar to directory `google-closure-library/`
unzip ./compiler-latest.zip -d ./output/
find ./output -name '*.jar' -execdir mv {} compiler.jar \;
cp ./output/compiler.jar ../node_modules/google-closure-library/;
