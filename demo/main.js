cc.game.onStart = function () {
  cc.view.setDesignResolutionSize(480, 320, cc.ResolutionPolicy.SHOW_ALL);
  cc.view.resizeWithBrowserSize(true);

  cc.LoaderScene.preload([], function () {
    var animationScene = new AnimationScene();
    cc.director.runScene(animationScene);
  }, this);

  var AnimationScene = cc.Scene.extend({
    ctor: function () {
      this._super();

      var spriter = new cc.Spriter('res/char_animation/animation_list.scon');
      spriter.setLoop(true);
      spriter.setEntity('anim_list');
      spriter.setAnim('good_job');
      spriter.attr({
        scale: 0.5,
        x: cc.winSize.width / 2,
        y: cc.winSize.height / 4
      });
      this.addChild(spriter);
    }
  });
};
cc.game.run();


