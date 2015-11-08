# cc_spriter
Cocos2d-HTML5 Spriter scml (scon) Implementation 

<a href="http://www.brashmonkey.com/">
<img title="spriter logo" src="https://pbs.twimg.com/profile_images/2556942741/yxn4f63yjqc74hyf2ylb.png" width="192"></a>

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
