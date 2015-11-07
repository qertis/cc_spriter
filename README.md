# cc_spriter
Cocos2d-HTML5 Spriter scml (scon) Implementation 

### Structure
----------

```sh
├- cocos2d-html5/
├- node_modules/
├- demo/
├─- .cocos-project.json
├─- res
├─- index.html
├─- main.js
├─- project.json
└- spriter.js
```

### Usage:
----------

```js
var spriter = new cc.Spriter(pathToScon, entityName);

spriter.play('NewAnimation', <loopValue>);

spriter.unscheduleUpdate(); //pause

spriter.scheduleUpdate();   //resume
```

### DEMO:
http://goo.gl/z98WXo