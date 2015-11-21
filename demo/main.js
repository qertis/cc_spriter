cc.game.onStart = function () {
    cc.view.setDesignResolutionSize(480, 320, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);
    //load resources
    cc.LoaderScene.preload([], function () {
        var testScene = new TestScene();
        cc.director.runScene(testScene);
    }, this);

    var TestScene = cc.Scene.extend({
        onEnter: function () {
            this._super();
            this.addChild(new SpriterLayer());
        }
    });

    var SpriterLayer = cc.Layer.extend({
        ctor: function () {
            this._super();

            var spriter = new cc.Spriter('res/char_animation/animation_list.scon');
            spriter.setEntity('anim_list');
            spriter.setAnim('good_job');
            spriter.attr({
                scale : 0.5,
                x : cc.winSize.width / 2,
                y : cc.winSize.height / 4
            });

            this.addChild(spriter);
        }
    });

};
cc.game.run();


