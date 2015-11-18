var anim_time = 0;
var anim_length = 0;
var anim_rate = 1;
var anim_repeat = 1;
var prev_time = 0;
var files = [];

var file_index = 0;
var entity_index = 0;
var anim_index = 3;
var loading = false;
var file = files[file_index];


var add_file = function (path, scon_url, atlas_url) {
    var file = {};
    file.path = path;
    file.scon_url = scon_url;
    file.atlas_url = atlas_url || "";
    files.push(file);
};


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

            add_file("char_animation/", "animation_list.scon");
            file = files[file_index];



            var spriter = window.spriter =  new cc.Spriter('res/char_animation/animation_list.scon', 'anim_list');
            spriter.setScale(0.5);
            spriter.setPosition(cc.p(cc.winSize.width / 2 - 100, 100));
            //spriter.play('hi', false);
            //spriter.play('sigh', false);
            spriter.play('good_job', false);
            this.addChild(spriter);

            var self = this;

            setTimeout(function () {
                //var spriter2 = new cc.Spriter('res/char_animation/animation_list.scon', 'anim_list');
                //spriter2.setScale(0.5);
                //spriter2.setPosition(cc.p(cc.winSize.width / 2 + 100, 100));
                //spriter2.play('hi', false);
                //spriter2.play('sigh', false);
                //spriter2.play('good_job', false);
                //self.addChild(spriter2);

            }, 100);

        }

    });

};
cc.game.run();


