#!/usr/bin/env bash
#depricated

mkdir -p temp

cat bower_components/google-closure-library/closure/goog/base.js \
    bower_components/spriter.js/spriter.js \
    > temp/spriter_dep.js