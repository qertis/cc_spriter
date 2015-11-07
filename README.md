# cc_spriter
Cocos2d-HTML5 Spriter scml (scon) Implementation 

# Use:

var spriter = new cc.Spriter(pathToScon, entityName);
spriter.play('NewAnimation', <loopValue>);

spriter.unscheduleUpdate(); //pause
spriter.scheduleUpdate();   //resume