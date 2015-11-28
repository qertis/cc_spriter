# cc_spriter
Cocos2d-HTML5 Spriter scml (scon) Implementation 

Used [spriter.js](https://github.com/flyover/spriter.js)

<a href="http://www.brashmonkey.com/">
  <img title="spriter logo" src="https://pbs.twimg.com/profile_images/2556942741/yxn4f63yjqc74hyf2ylb.png" width="192">
</a>

### Dependencies for development
----------
node >= 4.0

[Google Closure Compiler](https://developers.google.com/closure/compiler/)

[compiler.jar](http://dl.google.com/closure-compiler/compiler-latest.zip) send compiler.jar to bower_components/google-closure-library/ 


#### Compile source code:
```sh
./bin/compile.sh
```

### Setup
----------
```sh
npm install
bower i
```

### Structure
----------

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

### Usage:
----------

Include cc_spriter_min.js in cocos2d project.json
```json
"jsList": [
  "cc_spriter_min.js"
]
```  

Call cc.Spriter
```js
var spriter = new cc.Spriter(pathToScon);
spriter.setEntity(entityName);
spriter.setAnim(animationName);
spriter.unscheduleUpdate(); //pause
spriter.scheduleUpdate();   //resume
```

See example in demo directory

### Features:
* WebGL
* Not global (goog and spriter stored in closure)
* ~63kB size

### DEMO:
----------
http://goo.gl/z98WXo
