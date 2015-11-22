# cc_spriter
Cocos2d-HTML5 Spriter scml (scon) Implementation 

<a href="http://www.brashmonkey.com/">
  <img title="spriter logo" src="https://pbs.twimg.com/profile_images/2556942741/yxn4f63yjqc74hyf2ylb.png" width="192">
</a>

### Setup
----------
```sh
npm install
bower i
```

### Structure
----------

```sh
├─ bin/
├─ bower_components/
├─── cocos2d-html5/
├─── google-closure-library/
├─── spriter.js/
├─ demo/
├─ dist/
├─── .cocos-project.json
├─── res
├─── index.html
├─── main.js
├─── project.json
└─ cc_spriter.js
```

### Usage:
----------

Include scripts
```html
<script src="../bower_components/google-closure-library/closure/goog/base.js"></script>
<script src="../bower_components/spriter.js/spriter.js"></script>
```

```js
var spriter = new cc.Spriter(pathToScon);
spriter.setEntity(entityName);
spriter.setAnim(animationName);
spriter.unscheduleUpdate(); // pause
spriter.scheduleUpdate();   // resume
```

### Deploy:
----------
webpack

### DEMO:
----------
http://goo.gl/z98WXo
