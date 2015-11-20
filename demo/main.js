// sound player (Web Audio Context)
var player_web = {};
player_web.ctx = AudioContext && new AudioContext();
player_web.mute = true;
player_web.sounds = {};

var spriter_data = null;
var spriter_pose = null;
var spriter_pose_next = null;
var atlas_data = null;

var anim_time = 0;
var anim_length = 0;
var anim_length_next = 0;
var anim_rate = 1;
var anim_repeat = 2;

var anim_blend = 0.0;

var loadFile = function (file, callback)
{
  //render_ctx2d.dropPose(spriter_pose, atlas_data);
  //render_webgl.dropPose(spriter_pose, atlas_data);
  //render_webgl.dropPose(spriter_pose_next, atlas_data);

  spriter_pose = null;
  spriter_pose_next = null;
  atlas_data = null;

  var file_path = file.path;
  var file_spriter_url = file_path + file.spriter_url;
  var file_atlas_url = (file.atlas_url)?(file_path + file.atlas_url):("");

  loadText(file_spriter_url, function (err, text)
  {
    if (err)
    {
      callback();
      return;
    }

    var match = file.spriter_url.match(/\.scml$/i);
    if (match)
    {
      var parser = new DOMParser();
      // replace &quot; with \"
      var xml_text = text.replace(/&quot;/g, "\"");
      var xml = parser.parseFromString(xml_text, 'text/xml');
      var json_text = xml2json(xml, '\t');
      // attributes marked with @, replace "@(.*)": with "\1":
      json_text = json_text.replace(/"@(.*)":/g, "\"$1\":");
      var json = JSON.parse(json_text);
      var spriter_json = json.spriter_data;
      spriter_data = new spriter.Data().load(spriter_json);
    }
    else
    {
      spriter_data = new spriter.Data().load(JSON.parse(text));
    }

    spriter_pose = new spriter.Pose(spriter_data);
    spriter_pose_next = new spriter.Pose(spriter_data);

    loadText(file_atlas_url, function (err, atlas_text)
    {
      var images = {};

      var counter = 0;
      var counter_inc = function () { counter++; }
      var counter_dec = function ()
      {
        if (--counter === 0)
        {
          render_ctx2d.loadPose(spriter_pose, atlas_data, images);
          render_webgl.loadPose(spriter_pose, atlas_data, images);
          render_webgl.loadPose(spriter_pose_next, atlas_data, images);
          callback();
        }
      }

      counter_inc();

      if (!err && atlas_text)
      {
        atlas_data = new atlas.Data().importTpsText(atlas_text);

        // load atlas page images
        var dir_path = file_atlas_url.slice(0, file_atlas_url.lastIndexOf('/'));
        atlas_data.pages.forEach(function (page)
        {
          var image_key = page.name;
          var image_url = dir_path + "/" + image_key;
          counter_inc();
          var image = images[image_key] = loadImage(image_url, (function (page) { return function (err, image)
          {
            if (err)
            {
              console.log("error loading:", image && image.src || page.name);
            }
            page.w = page.w || image.width;
            page.h = page.h || image.height;
            counter_dec();
          }})(page));
        });
      }
      else
      {
        spriter_data.folder_array.forEach(function (folder)
        {
          folder.file_array.forEach(function (file)
          {
            switch (file.type)
            {
              case 'image':
                var image_key = file.name;
                counter_inc();
                var image = images[image_key] = loadImage(file_path + file.name, (function (file) { return function (err, image)
                {
                  if (err)
                  {
                    console.log("error loading:", image && image.src || file.name);
                  }
                  counter_dec();
                }})(file));
                break;
              case 'sound':
                break;
              default:
                console.log("TODO: load", file.type, file.name);
                break;
            }
          });
        });
      }

      // with an atlas, still need to load the sound files
      spriter_data.folder_array.forEach(function (folder)
      {
        folder.file_array.forEach(function (file)
        {
          switch (file.type)
          {
            case 'sound':
              if (player_web.ctx)
              {
                counter_inc();
                loadSound(file_path + file.name, (function (file) { return function (err, buffer)
                {
                  if (err)
                  {
                    console.log("error loading sound", file.name);
                  }
                  player_web.ctx.decodeAudioData(buffer, function (buffer)
                    {
                      player_web.sounds[file.name] = buffer;
                    },
                    function (err)
                    {
                      console.log("error decoding sound", file.name);
                    });
                  counter_dec();
                }})(file));
              }
              else
              {
                console.log("TODO: load", file.type, file.name);
              }
              break;
          }
        });
      });

      counter_dec();
    });
  });
}

var files = [];

var add_file = function (path, spriter_url, atlas_url)
{
  var file = {};
  file.path = path;
  file.spriter_url = spriter_url;
  file.atlas_url = atlas_url || "";
  files.push(file);
}

var file_index = 0;
var entity_index = 0;
var anim_index = 0;

var loading = false;

var file = files[file_index];
loading = true;


var prev_time = 0;



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


      var spriter = window.spriter = new cc.Spriter('res/char_animation/animation_list.scon', 'anim_list');
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


