# cc_spriter
Cocos2d-HTML5 Spriter scml (scon) Implementation 

# Demo structure

| cocos2d-html5
| demo
  | .cocos-project.json
  | res
  | index.html
  | main.js
  | project.json
| node_modules
| spriter.js


# Usage:

var spriter = new cc.Spriter(pathToScon, entityName);

spriter.play('NewAnimation', <loopValue>);

spriter.unscheduleUpdate(); //pause

spriter.scheduleUpdate();   //resume