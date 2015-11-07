cc.game.onStart = function () {
    cc.view.setDesignResolutionSize(480, 320, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);
    //load resources
    cc.LoaderScene.preload([], function () {
        var playScene = new PlayScene();
        cc.director.runScene(playScene);
    }, this);

    var PlayScene = cc.Scene.extend({
        onEnter: function () {
            this._super();
            this.addChild(new AnimationLayer());
        }
    });

    var AnimationLayer = cc.Layer.extend({
        sprite: null,

        ctor: function () {
            this._super();

            var spriter = new cc.Spriter('res/test_anim/test.scon', 'entity_000', 'NewAnimation');
            spriter.setScale(0.5);
            spriter.setPosition(cc.p(cc.winSize.width / 2, 100));
            spriter.play('NewAnimation', false);
            this.addChild(spriter);

            //spriter.unscheduleUpdate();//pause
            //spriter.scheduleUpdate();//resume

        }

    });

};
cc.game.run();
