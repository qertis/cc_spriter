# Spriter Cocos2d 3.x 
> Based on [spriter.js](https://github.com/flyover/spriter.js) SCON Implementation. [Discuss forum](https://brashmonkey.com/forum/index.php?/topic/4474-using-spriter-animations-in-cocos2d-js/)

[![Build Status](https://travis-ci.org/gotois/cc_spriter.svg?branch=master)](https://travis-ci.org/gotois/cc_spriter)
[![Dependency Status](https://david-dm.org/gotois/cc_spriter.svg)](https://david-dm.org/gotois/cc_spriter)
[![devDependencies Status](https://david-dm.org/gotois/cc_spriter/dev-status.svg)](https://david-dm.org/gotois/cc_spriter?type=dev)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/4023ff166364425d805232ac1518e4d9)](https://www.codacy.com/app/qertis/cc_spriter?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=qertis/cc_spriter&amp;utm_campaign=Badge_Grade)

<a href="http://www.brashmonkey.com/">
  <img title="spriter logo" src="https://pbs.twimg.com/profile_images/2556942741/yxn4f63yjqc74hyf2ylb.png" width="192">
</a>

Install from Bower
---
```sh
bower install cc_spriter
```

Usage
---
Include cc_spriter_min.js in project.json
```json
"jsList": [
  "cc_spriter_min.js"
]
```  

Example
---
```js
const spriter = new cc.Spriter(pathToScon);
spriter.setEntity(entityName);
spriter.setAnim(animationName);
```

API
---
```js
spriter.setLoop(Boolean);
spriter.pause();
spriter.resume();
```

Development
===

Need dependencies:
---
* node >= 6.0
* Bash Shell
* JAVA
* [Google Closure Compiler](https://developers.google.com/closure/compiler/)
* [compiler.jar](http://dl.google.com/closure-compiler/compiler-latest.zip) 
* * send compiler.jar to directory ```bower_components/google-closure-library/```
* * rename closure_compiler file to compiler.jar

Setup:
---
```sh
npm i
```

Compile source code with Google Closure
---
```sh
npm run compile
```

Project structure:
---
```
├─ dist/
├──── cc_spriter_min.js
├─ bower_components/
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

Features
---
* Canvas 2D and WebGL supports
* No global dependencies
* ~62kB size

License
---
cc_spriter is MIT licensed.
