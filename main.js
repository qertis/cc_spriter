cc.game.onStart = function () {
    cc.view.setDesignResolutionSize(480, 320, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(false);
    //load resources
    cc.LoaderScene.preload([], function () {
        var playScene = new PlayScene();
        cc.director.runScene(playScene);

        cc.loader.load([
            'res/test_anim/shadow/shadow.png',
            'res/test_anim/face/eye.png',
            'res/test_anim/face/face1.png',
            'res/test_anim/body/body1.png',
            'res/test_anim/arms/palm1.png',
            'res/test_anim/arms/palm2.png',
            'res/test_anim/arms/part.png',
            'res/test_anim/legs/leg1.png',
            'res/test_anim/legs/leg2.png'
        ], function (error, img) {
            if (error) {
                cc.error(error);
            }

            var spriter = new cc.Spriter('res/test_anim/test.scon', 'test','entity_000', 'NewAnimation');
            spriter.setScale(0.5);
            spriter.setPosition(cc.p(100, 100));
            //spriter.runAnimation('NewAnimation');
            $$scene.addChild(spriter);

        });

    }, this);

    var PlayScene = cc.Scene.extend({
        onEnter: function () {
            this._super();
            $$scene = this;
            this.addChild(new AnimationLayer());
        }
    });

    var AnimationLayer = cc.Layer.extend({
        sprite: null,

        ctor: function () {
            this._super();
            this.init();
        },

        init: function () {
            this._super();

        }
    });

};
cc.game.run();
