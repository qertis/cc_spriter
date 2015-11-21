
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

    cc.Spriter = cc.Sprite.extend({
        ctor: function () {
            this._super();
            this.scheduleUpdate();
        },
        update: function (dt) {
            dt = 1000 / 60; // time step in milliseconds
            animationLayer.removeAllChildrenWithCleanup(true);
            pose.update(dt); // accumulate time
            pose.strike(); // process time slice

            var spriter_pose = pose;

            pose.object_array.forEach(function (object) {
                switch (object.type) {
                    case 'sprite':
                        var folder = spriter_pose.data.folder_array[object.folder_index];
                        if (!folder) {
                            return;
                        }
                        var file = folder.file_array[object.file_index];
                        if (!file) {
                            return;
                        }
                        var image_key = file.name;

                        var spriteFrame = cc.spriteFrameCache.getSpriteFrame(image_key);
                        if (spriteFrame) {
                            var sprite = new cc.Sprite();
                            sprite.setSpriteFrame(spriteFrame);

                            sprite.setOpacity(object.alpha * 255);
                            sprite.setPositionX(object.world_space.position.x);
                            sprite.setPositionY(object.world_space.position.y);
                            sprite.setScaleX(object.world_space.scale.x);
                            sprite.setScaleY(object.world_space.scale.y);
                            sprite.setRotation(-object.world_space.rotation.deg);

                            animationLayer.addChild(sprite);
                            //image.visit();

                        }
                        break;
                    case 'entity':
                        cc.log('TODO ');
                        break;
                }
            });

        }
    });

    var AnimationLayer = cc.Layer.extend({
        sprite: null,

        ctor: function () {
            this._super();

            var self = this;
            cc.loader.loadJson('res/char_animation/animation_list.scon', function (error, scon) {
                var test = new cc.Spriter();

                var data = new spriter.Data().load(scon); // create and load Spriter data from SCON file
                var pose = window.pose = new spriter.Pose(data); // create Spriter pose and attach data
                pose.setEntity("anim_list"); // set entity by name
                //pose.play('hi', false);
                //pose.setAnim('sigh');
                pose.setAnim('good_job');

                data.folder_array.forEach(function (folder) {
                    folder.file_array.forEach(function (file) {
                        switch (file.type) {
                            case 'image':
                                var image_key = file.name;
                                var imgUrl = 'res/char_animation/' + file.name;
                                cc.loader.loadImg(imgUrl, function (error, img) {
                                    var texture = new cc.Texture2D();
                                    texture.initWithElement(img);

                                    var spriteFrame = new cc.SpriteFrame();
                                    spriteFrame.setTexture(texture)

                                    var rect = cc.rect(0, 0, file.width, file.height);
                                    spriteFrame.setRect(rect);
                                    cc.spriteFrameCache.addSpriteFrame(spriteFrame, image_key);
                                });
                                break;
                            case 'sound':
                                break;
                            default:
                                console.log("TODO: load", file.type, file.name);
                                break;
                        }
                    });
                });

                self.addChild(test);
            });

            window.animationLayer = new cc.Sprite();
            animationLayer.scale = 0.5;

            animationLayer.x = 150;
            animationLayer.y = 100;
            this.addChild(animationLayer);


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


