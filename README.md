# Cocos2d-HTML5 Spriter scml (scon) Implementation 
> Based on [spriter.js](https://github.com/flyover/spriter.js)

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/4023ff166364425d805232ac1518e4d9)](https://www.codacy.com/app/qertis/cc_spriter?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=qertis/cc_spriter&amp;utm_campaign=Badge_Grade)
[![Dependency Status](https://david-dm.org/qertis/cc_spriter.svg)](https://david-dm.org/qertis/cc_spriter)

<a href="http://www.brashmonkey.com/">
  <img title="spriter logo" src="https://pbs.twimg.com/profile_images/2556942741/yxn4f63yjqc74hyf2ylb.png" width="192">
</a>

Dependencies for development:
-----------------------------
* node >= 4.0
* [Google Closure Compiler](https://developers.google.com/closure/compiler/)
* [compiler.jar](http://dl.google.com/closure-compiler/compiler-latest.zip) 
send compiler.jar to directory ```bower_components/google-closure-library/```

Setup:
------
```sh
npm install
bower install
```

Compile source code with Closure:
---------------------------------
```sh
./bin/compile.sh
```

Project structure:
------------------
```sh
├─ dist/
├──── cc_spriter_min.js
├─ bower_components/
├──── cocos2d-html5/
├──── google-closure-library/
├────── compiler.jar
├──── spriterjs/
├─ demo/
├──── .cocos-project.json
├──── res
├──── index.html
├──── main.js
├──── project.json
└─ cc_spriter.js
```

Usage:
------
Include cc_spriter_min.js in cocos2d project.json
```json
"jsList": [
  "cc_spriter_min.js"
]
```  

Example:
--------
```js
var spriter = new cc.Spriter(pathToScon);
spriter.setEntity(entityName);
spriter.setAnim(animationName);
```

API:
----
```js
spriter.setLoop(false);
spriter.pause();
spriter.resume();
```

Features:
---------
* Canvas 2D and WebGL supports
* No global dependencies
* ~62kB size
