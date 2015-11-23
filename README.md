# cc_spriter
Cocos2d-HTML5 Spriter scml (scon) Implementation 

<a href="http://www.brashmonkey.com/">
  <img title="spriter logo" src="https://pbs.twimg.com/profile_images/2556942741/yxn4f63yjqc74hyf2ylb.png" width="192">
</a>

### Dependencies for development
----------
```sh
node >= 4.0
Closure Compiler with compiler.jar
send compiler.jar to bower_components/google-closure-library/ 
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
├──── spriter.js/
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

Include scripts
```js
var spriter = new cc.Spriter(pathToScon);
spriter.setEntity(entityName);
spriter.setAnim(animationName);
spriter.unscheduleUpdate(); //pause
spriter.scheduleUpdate();   //resume
```

### DEMO:
----------
http://goo.gl/z98WXo
