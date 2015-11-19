/**
 * Spriter plugin for Cocos2d HTML5
 * @version 1.0.0
 * @author Denis Baskovsky (denis@baskovsky.ru)
 *
 * Based on Spriter.js by:
 * - Sean Bohan pixelpicosean@gmail.com
 * - Jason Andersen jgandersen@gmail.com
 * - Isaac Burns isaacburns@gmail.com
 */
!(function (cc) {
  'use strict';

  cc.Spriter = cc.Sprite.extend({
    container: null,
    sconLink: '',
    _ready: false,

    /**
     * Spriter constructor
     * @param {String} sconLink scon file to use for this animation
     * @param entityName
     */
    ctor: function (sconLink, entityName) {
      this._super();

      var self = this;

      this.sconLink = sconLink;
      this.preload(function (scon) {
        self._init(scon, entityName);
      });

    },

    /**
     * Prealod scon resource
     * @param {function} callback
     */
    preload: function (callback) {
      var self = this;
      var sconLink = this.sconLink;

      if (this._ready) {
        return callback();
      }

      cc.loader.loadJson(sconLink, function (error, scon) {
        if (error) {
          throw error;
        }
        var _rootPath = scon._rootPath = sconLink.replace(/\w+.scon$/, '');
        var loaderIndex = 0;

        scon.folder.forEach(function (folder) {
          folder.file.forEach(function () {
            ++loaderIndex;
          });
        });
        scon.folder.forEach(function (folder) {
          folder.file.forEach(function (file) {
            var fileUrl = _rootPath + file.name;
            cc.loader.load([fileUrl], function (error) {
              if (error) {
                throw error;
              }

              if (!cc.spriteFrameCache.getSpriteFrame(file.name)) {
                var spriteFrame = new cc.Sprite(fileUrl);
                spriteFrame.setContentSize(cc.size(file.width, file.height));
                cc.spriteFrameCache.addSpriteFrame(spriteFrame, file.name);
              }

              if (--loaderIndex === 0) {

                /*NEW*/
                window.spriter_data = new Data().load(scon);

                debugger;
                //var spriter_pos = new Pose(new Data().load(scon));
                //window.xxx = spriter_pos;
                /*NEW END*/


                self._ready = true;
                callback(scon);
              }
            });
          });
        });

      });

    },

    _init: function (scon, entityName) {
      this.container = new cc.Node();
      this.addChild(this.container);

      /** @type {Data} */
      //this.data = new Data(scon);
      /** @type {Entity} */
      //this.entity = this.data.getEntity(entityName);
      /** @type {Array.<{tagID, tagName}>} Available tags */
      //this.tags = [];
      /** @type {Object.<String, Object>} tagged variables */
      //this.vars = {};
      /** @type {Array.<Bone>} */
      //this.bones = [];
      /** @type {Array.<Object>} */
      //this.objects = [];
      /** @type {string} */
      //this.currAnimName = '';
      /** @type {number} */
      //this.time = 0;
      /** @type {number} */
      this.elapsedTime = 0;
      /** @type {Boolean} Whether current animation is ended */
      //this.isEnd = true;
      /** @type {Boolean} Whether stop instead of loop at the end of current animation */
      //this.stopAtEnd = false;
      /** @type {boolean} */
      //this.dirty = true;
      /** * Stores all the sprite instances for this entity */
      //this.sprites = {};
    },

    /**
     * Play an animation by its name
     * if sprites is not init then preloader recursively
     * @param  {String} anim        Name of the animation
     * @param  {Boolean} stopAtEnd  Whether stop when animation is finished
     */
    play: function (anim, stopAtEnd) {
      if (!this._ready) {
        var self = this;
        setTimeout(function () {
          self.play(anim, stopAtEnd);
        }, 1);
      } else {
        //if(this.currAnimName !== '' && this.currAnimName === anim) {
        //    return;
        //}

        //this.stopAtEnd = !!stopAtEnd;
        //this.isEnd = false;
        //this.currAnimName = anim;

        console.log('play');

        //xxx.setAnim(anim);

        //if (this.currAnimName === '') {
        //    throw 'currAnimName is null';
        //}

        /*UNCOMMENT*/
        //var currAnim = this.currAnim();
        //if (this.hasAnim(currAnim)) {
        //    this.time = currAnim.minTime;
        //}

        this.elapsedTime = 0;
        //this.setDirty(true);

        this.scheduleUpdate();


        //TEST
        //xxx.setEntity('anim_list');
        //TEST END

      }

      window.self = this;
    },

    /**
     * redraw every tick
     * @param {Number} time
     */
    update: function (time) {
      var self = window.self = this;
      time = (time * 1000) | 0;

      //var dt = time - (prev_time || time);  {
      //    prev_time = time;
      //} // ms

//dt *= 1000;
      //anim_time += dt * anim_rate;
      //anim_time *= cc.math.EPSILON//TEST


      // Update body parts
      //if (!this.dirty) {
      //    return;
      //}
      //this.setDirty(false);




      var dt = time - (prev_time || time); prev_time = time; // ms

      return;

      xxx.update(time);


      anim_time += time * anim_rate;

      var entity_keys = xxx.getEntityKeys();
      xxx.setEntity(entity_keys[entity_index]);
      var anim_keys = xxx.getAnimKeys();
      xxx.setAnim(anim_keys[anim_index]);
      anim_length = xxx.curAnimLength() || 1000;

      //debug.innerHTML = "entity: " + entity_keys[entity_index] + ", anim: " + anim_keys[anim_index] + "<br>" + file.path + file.scon_url;

      ///*TODO: Очистка сцены
      /*self.container.children.forEach(function (e) {
       e.setOpacity(0);
       });
       */


      //xxx.setTime(anim_time = 0);
      if (anim_time >= (anim_length * anim_repeat)) {
        //xxx.setAnim(anim_keys[anim_index]);

        //debugger;
        xxx.setTime(anim_time = 0);
        //anim_length = spriter_pose.curAnimLength() || 1000;
        //anim_length = xxx.curAnimLength() || 1000;
      }

      xxx.strike();

      if (true) {

        xxx.object_array.forEach(function (object, i) {
          var folder = xxx.data.folder_array[object.folder_index];
          if (!folder) {
            return;
          }
          var file = folder.file_array[object.file_index];
          if (!file) {
            return;
          }
          var image_key = file.name;

          var image = /*images[image_key]   */cc.spriteFrameCache.getSpriteFrame(image_key);

          if (image) {
            window.images = window.images || {};

            //ctxApplySpace(ctx, object.world_space);
            //ctx.scale(file.width/2, file.height/2);

            if (!images[i]) {
              var img = new cc.Sprite();

              img.setTexture(image.getTexture());
              img.setName(image_key);

              //img.x = object.world_space.position.x;
              //img.y = object.world_space.position.y;
              //img.rotation = cc.radiansToDegrees(-object.world_space.rotation.rad);


              images[i] = img;

              self.container.addChild(img);
              //img.setParent(self);
            } else {
              //if(images[i].XXX) {
              //    return;
              //}


              img = images[i];

              img.setPosition(cc.p(object.world_space.position.x, object.world_space.position.y));
              //img.setRotation(cc.radiansToDegrees(-object.world_space.rotation.rad));

              //var x = Number(String(object.world_space.rotation.rad).substring(0, 10));


              //img.setRotation(x * 180 / Math.PI);
              //debugger;
              //console.log(x)
              img.setScale(object.world_space.scale.x, object.world_space.scale.y);
              img.setOpacity(object.alpha * 255);

              //console.log(img.rotation)
              //= 0;

              images[i].XXX = true;

              //img.setAnchorPoint(cc.p(1 - object.pivot.x, 1 - object.pivot.y));


              //img.setLocalZOrder(object.z_index);
            }

          }
        });
      }

      //xxx.setTime(xxx.time + elapsed);

      if (false) {
        //render_ctx2d.drawDebugPose(spriter_pose, atlas_data);
      }

      /*
       *
       */

      return;


      //var time = this.time;
      //this.elapsedTime = 0; // reset for next update


      //TEST DEBUG
      //sprAnim.children.forEach(function (e) {
      //    var d = sprAnim.getChildByTag('debug');
      //    if (d) {
      //        d.removeFromParent();
      //    }
      //});
      //TEST END

      /* TEST DEBUG
       if(bone) {
       var boneNode = new cc.DrawNode();
       boneNode.drawCircle(cc.p(model.position.x, model.position.y),
       15, 0, 15, true, 2, cc.color.YELLOW);
       boneNode.setTag('debug');
       this.addChild(boneNode);
       } else {
       var line = new cc.DrawNode();
       line.drawRect(
       cc.p(0.5, 0.5),
       cc.p(model.position.x, model.position.y),
       cc.color.RED,
       1
       );
       line.setTag('debug');
       this.addChild(line);
       }
       /* TEST END */

    },

    /**
     * Current animation validation
     * @returns {boolean}
     */
    hasAnim: function () {
      if (!this.entity.anims.hasOwnProperty(this.currAnimName)) {
        throw 'current animation not found';
      }

      return !!this.currAnimName;
    },

    /**
     * Get current animation object
     * @return {Animation}
     */
    currAnim: function () {
      window.self = this;
      return this.entity.anims[this.currAnimName];
    },

    /**
     * Set time of current animation
     * @param {Number} time Time(ms)
     */
    setTime: function (time) {
      var currAnim = this.currAnim();
      if (currAnim) {
        if (time >= currAnim.maxTime) {
          if (this.stopAtEnd) {
            time = currAnim.maxTime;
            if (!this.isEnd) {
              this.isEnd = true;
              cc.log('spriter end trigger');
            }
          } else {
            time = wrap(time, currAnim.minTime, currAnim.maxTime);
          }
        }
      }

      if (this.time !== time) {
        this.time = time;
        this.elapsedTime = 0;
        this.setDirty(true);
      }
    }

  });

  /**
   * @constructor
   * @param {number=} rad
   */
  var Angle = cc.Class.extend({
    ctor: function (rad) {
      this.rad = rad || 0;
    },

    /**
     * @return {Angle}
     */
    selfIdentity: function () {
      this.rad = 0.0;
      return this;
    },

    /**
     * @return {Angle}
     * @param {Angle} other
     */
    copy: function (other) {
      this.rad = other.rad;
      return this;
    },

    /**
     * @return {Angle}
     * @param {Angle} other
     * @param {Angle=} out
     */
    add: function (other, out) {
      return Angle.add(this, other, out);
    },

    /**
     * @return {Angle}
     * @param {Angle} other
     */
    selfAdd: function (other) {
      return Angle.add(this, other, this);
    },

    /**
     * @return {Angle}
     * @param {Angle} other
     * @param {number} pct
     * @param {number} spin
     * @param {Angle=} out
     */
    tween: function (other, pct, spin, out) {
      return Angle.tween(this, other, pct, spin, out);
    },

    /**
     * @return {Angle}
     * @param {Angle} other
     * @param {number} pct
     * @param {number} spin
     */
    selfTween: function (other, pct, spin) {
      return Angle.tween(this, other, pct, spin, this);
    }

  });

  cc.defineGetterSetter(
    Angle.prototype,
    'deg',
    function getterFunc() {
      return this.rad * 180 / Math.PI;
      //return cc.degreesToRadians(this.rad);
    },
    function setterFunc(value) {
      this.rad = value * Math.PI / 180;
      //this.rad = cc.degreesToRadians(value);
    }
  );

  cc.defineGetterSetter(
    Angle.prototype,
    'cos',
    function getterFunc() {
      return Math.cos(this.rad);
    }
  );

  cc.defineGetterSetter(
    Angle.prototype,
    'sin',
    function getterFunc() {
      return Math.sin(this.rad);
    }
  );

  /**
   * @return {Angle}
   * @param {Angle} a
   * @param {Angle} b
   * @param {Angle=} out
   */
  Angle.add = function (a, b, out) {
    out = out || new Angle();
    out.rad = wrapAngleRadians(a.rad + b.rad);
    return out;
  };

  /**
   * @return {Angle}
   * @param {Angle} a
   * @param {Angle} b
   * @param {number} pct
   * @param {number} spin
   * @param {Angle=} out
   */
  Angle.tween = function (a, b, pct, spin, out) {
    out = out || new Angle();
    out.rad = tweenAngleRadians(a.rad, b.rad, pct, spin);
    return out;
  };

  var Vector = cc.Class.extend({
    x: 0,
    y: 0,
    /**
     * @constructor
     * @param {number=} x
     * @param {number=} y
     */
    ctor: function (x, y) {
      this.x = x || 0;
      this.y = y || 0;
    },
    /**
     * @return {Vector}
     * @param {Vector} other
     */
    copy: function (other) {
      this.x = other.x;
      this.y = other.y;
      return this;
    },
    /**
     * @return {Vector}
     * @param {Vector} other
     * @param {Vector=} out
     */
    add: function (other, out) {
      return Vector.add(this, other, out);
    },

    selfAdd: function (other) {
      //return Vector.add(this, other, this);
      this.x += other.x;
      this.y += other.y;

      return this;
    },
    /**
     * @return {Vector}
     * @param {Vector} other
     * @param {number} pct
     * @param {Vector=} out
     */
    tween: function (other, pct, out) {
      return Vector.tween(this, other, pct, out);
    },

    /**
     * @return {Vector}
     * @param {Vector} other
     * @param {number} pct
     */
    selfTween: function (other, pct) {
      return Vector.tween(this, other, pct, this);
    }
  });

  /**
   * @return {Vector}
   * @param {Vector} a
   * @param {Vector} b
   * @param {Vector=} out
   */
  Vector.add = function (a, b, out) {
    out = out || new Vector();
    out.x = a.x + b.x;
    out.y = a.y + b.y;

    return out;
  };

  /**
   * @return {Vector}
   * @param {Vector} a
   * @param {Vector} b
   * @param {number} pct
   * @param {Vector=} out
   */
  Vector.tween = function (a, b, pct, out) {
    out = out || new Vector();
    out.x = tween(a.x, b.x, pct);
    out.y = tween(a.y, b.y, pct);
    return out;
  };

  var Position = Vector.extend({
    ctor: function () {
      this._super();
    }
  });

  var Rotation = Angle.extend({
    ctor: function () {
      this._super();
    }
  });

  var Scale = Vector.extend({
    ctor: function () {
      this._super();

      this.x = 1.0;
      this.y = 1.0;
    },
    /**
     * @return {Scale}
     */
    selfIdentity: function () {
      this.x = 1.0;
      this.y = 1.0;

      return this;
    }
  });

  var Pivot = Vector.extend({
    ctor: function () {
      this._super();

      this.x = 0.0;
      this.y = 1.0;
    },
    selfIdentity: function () {
      this.x = 0;
      this.y = 1;
      return this;
    }
  });

  var Space = cc.Class.extend({
    /** @type {Position} */
    position: null,
    /** @type {Rotation} */
    rotation: null,
    /** @type {Scale} */
    scale: null,
    ctor: function () {
      var space = this;
      space.position = new Position();
      space.rotation = new Rotation();
      space.scale = new Scale();
    },
    /**
     * @return {Space}
     * @param {Space} other
     */
    copy: function (other) {
      var space = this;
      space.position.copy(other.position);
      space.rotation.copy(other.rotation);
      space.scale.copy(other.scale);
      return space;
    },
    /**
     * @return {Space}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      var space = this;
      space.position.x = loadFloat(json, 'x', 0.0);
      space.position.y = loadFloat(json, 'y', 0.0);
      space.rotation.deg = loadFloat(json, 'angle', 0.0);
      space.scale.x = loadFloat(json, 'scale_x', 1.0);
      space.scale.y = loadFloat(json, 'scale_y', 1.0);

      return space;
    },

    /**
     * @return {boolean}
     * @param {Space} a
     * @param {Space} b
     * @param {number=} epsilon
     */
    equal: function (a, b, epsilon) {
      epsilon = epsilon || 1e-6;
      if (Math.abs(a.position.x - b.position.x) > epsilon) {
        return false;
      }
      if (Math.abs(a.position.y - b.position.y) > epsilon) {
        return false;
      }
      if (Math.abs(a.rotation.rad - b.rotation.rad) > epsilon) {
        return false;
      }
      if (Math.abs(a.scale.x - b.scale.x) > epsilon) {
        return false;
      }
      if (Math.abs(a.scale.y - b.scale.y) > epsilon) {
        return false;
      }
      return true;
    }
  });
  /**
   * @return {Space}
   * @param {Space=} out
   */
  Space.identity = function (out) {
    out = out || new Space();
    out.position.x = 0.0;
    out.position.y = 0.0;
    out.rotation.rad = 0.0;
    out.scale.x = 1.0;
    out.scale.y = 1.0;
    return out;
  };

  /**
   * @return {Space}
   * @param {Space} space
   * @param {number} x
   * @param {number} y
   */
  Space.translate = function (space, x, y) {
    x *= space.scale.x;
    y *= space.scale.y;
    var rad = space.rotation.rad;
    var c = Math.cos(rad);
    var s = Math.sin(rad);
    var tx = c * x - s * y;
    var ty = s * x + c * y;
    space.position.x += tx;
    space.position.y += ty;

    return space;
  };
  /**
   * @return {Space}
   * @param {Space} space
   * @param {number} rad
   */
  Space.rotate = function (space, rad) {
    space.rotation.rad = wrapAngleRadians(space.rotation.rad + rad);
    return space;
  };

  /**
   * @return {Space}
   * @param {Space} space
   * @param {number} x
   * @param {number} y
   */
  Space.scale = function (space, x, y) {
    space.scale.x *= x;
    space.scale.y *= y;
    return space;
  };

  /**
   * @return {Space}
   * @param {Space} space
   * @param {Space=} out
   */
  Space.invert = function (space, out) {
    // invert
    // out.sca = space.sca.inv();
    // out.rot = space.rot.inv();
    // out.pos = space.pos.neg().rotate(space.rot.inv()).mul(space.sca.inv());

    out = out || new Space();
    var inv_scale_x = 1.0 / space.scale.x;
    var inv_scale_y = 1.0 / space.scale.y;
    var inv_rotation = -space.rotation.rad;
    var inv_x = -space.position.x;
    var inv_y = -space.position.y;
    out.scale.x = inv_scale_x;
    out.scale.y = inv_scale_y;
    out.rotation.rad = inv_rotation;
    var x = inv_x;
    var y = inv_y;
    var rad = inv_rotation;
    var c = Math.cos(rad);
    var s = Math.sin(rad);
    var tx = c * x - s * y;
    var ty = s * x + c * y;
    out.position.x = tx * inv_scale_x;
    out.position.y = ty * inv_scale_y;
    return out;
  };

  /**
   * @return {Space}
   * @param {Space} a
   * @param {Space} b
   * @param {Space=} out
   */
  Space.combine = function (a, b, out) {
    // combine
    // out.pos = b.pos.mul(a.sca).rotate(a.rot).add(a.pos);
    // out.rot = b.rot.mul(a.rot);
    // out.sca = b.sca.mul(a.sca);

    out = out || new Space();
    var x = b.position.x * a.scale.x;
    var y = b.position.y * a.scale.y;
    var rad = a.rotation.rad;
    var c = Math.cos(rad);
    var s = Math.sin(rad);
    var tx = c * x - s * y;
    var ty = s * x + c * y;
    out.position.x = tx + a.position.x;
    out.position.y = ty + a.position.y;
    if ((a.scale.x * a.scale.y) < 0.0) {
      out.rotation.rad = wrapAngleRadians(a.rotation.rad - b.rotation.rad);
    }
    else {
      out.rotation.rad = wrapAngleRadians(b.rotation.rad + a.rotation.rad);
    }
    out.scale.x = b.scale.x * a.scale.x;
    out.scale.y = b.scale.y * a.scale.y;
    return out;
  };

  /**
   * @return {Space}
   * @param {Space} ab
   * @param {Space} a
   * @param {Space=} out
   */
  Space.extract = function (ab, a, out) {
    // extract
    // out.sca = ab.sca.mul(a.sca.inv());
    // out.rot = ab.rot.mul(a.rot.inv());
    // out.pos = ab.pos.add(a.pos.neg()).rotate(a.rot.inv()).mul(a.sca.inv());

    out = out || new Space();
    out.scale.x = ab.scale.x / a.scale.x;
    out.scale.y = ab.scale.y / a.scale.y;
    if ((a.scale.x * a.scale.y) < 0) {
      out.rotation.rad = wrapAngleRadians(a.rotation.rad + ab.rotation.rad);
    }
    else {
      out.rotation.rad = wrapAngleRadians(ab.rotation.rad - a.rotation.rad);
    }
    var x = ab.position.x - a.position.x;
    var y = ab.position.y - a.position.y;
    var rad = -a.rotation.rad;
    var c = Math.cos(rad);
    var s = Math.sin(rad);
    var tx = c * x - s * y;
    var ty = s * x + c * y;
    out.position.x = tx / a.scale.x;
    out.position.y = ty / a.scale.y;
    return out;
  };

  /**
   * @return {Vector}
   * @param {Space} space
   * @param {Vector} v
   * @param {Vector=} out
   */
  Space.transform = function (space, v, out) {
    out = out || new Vector();
    var x = v.x * space.scale.x;
    var y = v.y * space.scale.y;
    var rad = space.rotation.rad;
    var c = Math.cos(rad);
    var s = Math.sin(rad);
    var tx = c * x - s * y;
    var ty = s * x + c * y;
    out.x = tx + space.position.x;
    out.y = ty + space.position.y;
    return out;
  };

  /**
   * @return {Vector}
   * @param {Space} space
   * @param {Vector} v
   * @param {Vector=} out
   */
  Space.untransform = function (space, v, out) {
    out = out || new Vector();
    var x = v.x - space.position.x;
    var y = v.y - space.position.y;
    var rad = -space.rotation.rad;
    var c = Math.cos(rad);
    var s = Math.sin(rad);
    var tx = c * x - s * y;
    var ty = s * x + c * y;
    out.x = tx / space.scale.x;
    out.y = ty / space.scale.y;

    return out;
  };

  /**
   * @return {Space}
   * @param {Space} a
   * @param {Space} b
   * @param {number} t
   * @param {number} spin
   * @param {Space=} out
   */
  Space.tween = function (a, b, t, spin, out) {
    out.position.x = tween(a.position.x, b.position.x, t);
    out.position.y = tween(a.position.y, b.position.y, t);
    out.rotation.rad = tweenAngleRadians(a.rotation.rad, b.rotation.rad, t, spin);
    out.scale.x = tween(a.scale.x, b.scale.x, t);
    out.scale.y = tween(a.scale.y, b.scale.y, t);

    return out;
  };

  var Element = cc.Class.extend({
    id: -1,
    name: '',
    load: function (json) {
      this.id = loadInt(json, 'id', -1);
      this.name = loadString(json, 'name', "");
      return this;
    }
  });

  var File = Element.extend({
    /*REMOVE*/
    /** @type {number} */
    //id: -1,
    /** @type {string} */
    //name: '',
    /** @type {number} */
    //width: 0,
    /** @type {number} */
    //height: 0,
    /** @type {Pivot} */
    //pivot: null,
    /*REMOVE END*/

    type: "unknown",


    ctor: function (type) {
      /*REMOVE*/
      //var file = this;
      //file.pivot = new Pivot();
      /*REMOVE END*/


      this.type = type;
    },
    /**
     * @return {File}
     * @param {Object.<string,?>} json
     */
    load: function (json) {

      Element.prototype.load.call(this, json);

      /*REMOVE*/
      //var file = this;
      //file.id = loadInt(json, 'id', -1);
      //file.name = loadString(json, 'name', "");
      //file.width = loadInt(json, 'width', 0);
      //file.height = loadInt(json, 'height', 0);
      //file.pivot.x = loadFloat(json, 'pivot_x', 0);
      //file.pivot.y = loadFloat(json, 'pivot_y', 1);
      //return file;
      /*REMOVE END*/

      return this;

    }
  });

  var ImageFile = File.extend({
    /** @type {number} */
    width: 0,
    /** @type {number} */
    height: 0,
    /** @type {Pivot} */
    pivot: null,

    /**
     * @constructor
     * @extends {File}
     */
    ctor: function () {
      var file = this;
      //goog.base(this, 'image');

      file.pivot = new Pivot();

      return this;
    },

    /**
     * @return {ImageFile}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      var file = this;

      File.prototype.load.call(this, json);

      //goog.base(this, 'load', json);
      file.width = loadInt(json, 'width', 0);
      file.height = loadInt(json, 'height', 0);
      file.pivot.x = loadFloat(json, 'pivot_x', 0.0);
      file.pivot.y = loadFloat(json, 'pivot_y', 1.0);
      return file;
    }
  });


  /**
   * @constructor
   * @extends {File}
   */
  var SoundFile = File.extend({
    ctor: function () {
      //goog.base(this, 'sound');
    },

    /**
     * @return {File}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      File.prototype.load.call(this, json);

      //goog.base(this, 'load', json);
      return this;
    }
  });


  var Folder = Element.extend({
    /*REMOVE*/
    /** @type {number} */
    //id: -1,
    /*REMOVE END*/

    /** @type {Array.<File>} */
    file_array: [],

    ctor: function () {
      var folder = this;
      folder.file_array = [];
    },

    /**
     * @return {Folder}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      var folder = this;

      Element.prototype.load.call(this, json);

      folder.file_array = [];
      json.file = makeArray(json.file);
      json.file.forEach(function (file_json) {
        switch (file_json.type) {
          case 'image':
          default:
            folder.file_array.push(new ImageFile().load(file_json));
            break;
          case 'sound':
            folder.file_array.push(new SoundFile().load(file_json));
            break;
        }
      });
      return folder;


      /*REMOVE*/
      //folder.id = loadInt(json, 'id', -1);
      //folder.file_array.length = 0;
      //json.file = makeArray(json.file);
      //json.file.forEach(function (file) {
      //  folder.file_array.push(new File().load(file));
      //});
      //return folder;
      /*REMOVE END*/
    }
  });

  var Object = cc.Class.extend({


    /** @type {string} */
    type: "unknown",
    /** @type {string} */
    name: "",


    ctor: function (type) {
      /*REMOVE
       this.local_space = new Space();
       this.world_space = new Space();
       this.pivot = new Pivot();
       /*REMOVE END*/

      this.type = type;
    },
    /**
     * @return {Object}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      /*REMOVE
       this.id = loadInt(json, 'id', -1);
       this.parent_index = loadInt(json, 'parent', -1);
       this.folder_index = loadInt(json, 'folder', -1);
       this.file_index = loadInt(json, 'file', -1);
       this.local_space.load(json);
       this.world_space.copy(this.local_space);
       if ((typeof(json['pivot_x']) !== 'undefined') ||
       (typeof(json['pivot_y']) !== 'undefined')) {
       this.pivot.x = loadFloat(json, 'pivot_x', 0);
       this.pivot.y = loadFloat(json, 'pivot_y', 1);
       }
       else {
       this.default_pivot = true;
       }
       this.z_index = loadInt(json, 'z_index', 0);
       this.alpha = loadFloat(json, 'a', 1);
       /*REMOVE END*/


      return this;
    },
    /**
     * @return {Object}
     * @param {Object=} other
     */
    //clone: function (other) {
    //  return (other || new Object()).copy(this);
    //},

    /**
     * @return {Object}
     * @param {Object} other
     */
    //copy: function (other) {
    //  this.id = other.id;
    //  this.parent_index = other.parent_index;
    //  this.folder_index = other.folder_index;
    //  this.file_index = other.file_index;
    //  this.local_space.copy(other.local_space);
    //  this.world_space.copy(other.world_space);
    //  this.default_pivot = other.default_pivot;
    //  this.pivot.copy(other.pivot);
    //  this.z_index = other.z_index;
    //  this.alpha = other.alpha;
    //
    //  return this;
    //},

    /**
     * @return {void}
     * @param {Object} other
     * @param {number} tween
     * @param {number} spin
     */
    //tween: function (other, t, spin) {
    //  Space.tween(this.local_space, other.local_space, t, spin, this.local_space);
    //  Vector.tween(this.pivot, other.pivot, t, this.pivot);
    //  this.alpha = tween(this.alpha, other.alpha, t);
    //}

  });


  var SpriteObject = Object.extend({

    /** @type {number} */
    //id: -1,
    /** @type {number} */
    parent_index: -1,
    /** @type {number} */
    folder_index: -1,
    /** @type {number} */
    file_index: -1,
    /** @type {Space} */
    local_space: null,
    /** @type {Space} */
    world_space: null,
    /** @type {boolean} */
    default_pivot: false,
    /** @type {Pivot} */
    pivot: null,
    /** @type {number} */
    z_index: 0.0,
    /** @type {number} */
    alpha: 1.0,

    ctor: function () {
      //goog.base(this, 'sprite');
      this.local_space = new Space();
      this.world_space = new Space();
      this.pivot = new Pivot();
    },

    /**
     * @return {SpriteObject}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      //goog.base(this, 'load', json);
      Object.prototype.load.call(this, json);

      this.parent_index = loadInt(json, 'parent', -1);
      this.folder_index = loadInt(json, 'folder', -1);
      this.file_index = loadInt(json, 'file', -1);
      this.local_space.load(json);
      this.world_space.copy(this.local_space);
      if ((typeof(json['pivot_x']) !== 'undefined') ||
        (typeof(json['pivot_y']) !== 'undefined')) {
        this.pivot.x = loadFloat(json, 'pivot_x', 0.0);
        this.pivot.y = loadFloat(json, 'pivot_y', 1.0);
      }
      else {
        this.default_pivot = true;
      }
      this.z_index = loadInt(json, 'z_index', 0);
      this.alpha = loadFloat(json, 'a', 1.0);
      return this;
    },

    /**
     * @return {SpriteObject}
     * @param {SpriteObject} other
     */
    copy: function (other) {
      this.parent_index = other.parent_index;
      this.folder_index = other.folder_index;
      this.file_index = other.file_index;
      this.local_space.copy(other.local_space);
      this.world_space.copy(other.world_space);
      this.default_pivot = other.default_pivot;
      this.pivot.copy(other.pivot);
      this.z_index = other.z_index;
      this.alpha = other.alpha;
      return this;
    },

    /**
     * @return {void}
     * @param {SpriteObject} other
     * @param {number} t
     * @param {number} spin
     */
    tween: function (other, t, spin) {
      Space.tween(this.local_space, other.local_space, t, spin, this.local_space);
      //Vector.tween(this.pivot, other.pivot, tween, this.pivot);
      this.alpha = tween(this.alpha, other.alpha, t);
    }

  });

  /**
   * Bone
   */
  var Bone = Object.extend({

    /** @type {number} */
    parent_index: -1,
    /** @type {Space} */
    local_space: null,
    /** @type {Space} */
    world_space: null,

    ctor: function () {
      var bone = this;
      bone.local_space = new Space();
      bone.world_space = new Space();
    },

    /**
     * @return {Bone}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      //goog.base(this, 'load', json);
      Object.prototype.load.call(this.json);

      //this.id = loadInt(json, 'id', -1);
      this.parent_index = loadInt(json, 'parent', -1);
      this.local_space.load(json);
      this.world_space.copy(this.local_space);

      return this;
    },

    /**
     * @return {Bone}
     * @param {Bone} other
     */
    copy: function (other) {
      this.parent_index = other.parent_index;
      this.local_space.copy(other.local_space);
      this.world_space.copy(other.world_space);

      return this;
    },
    /**
     * @return {void}
     * @param {Bone} other
     * @param {number} t
     * @param {number} spin
     */
    tween: function (other, t, spin) {
      Space.tween(this.local_space, other.local_space, t, spin, this.local_space);
    }
  });

  /**
   * @return {Transform}
   * @param {Bone} bone
   * @param {Array.<Bone>} bones
   * @param {Transform=} out
   */
  /*  Bone.flatten = function (bone, bones, out) {
   out = out || new Space();
   var parent_bone = bones[bone.parent_index];
   if (parent_bone) {
   Bone.flatten(parent_bone, bones, out);
   } else {
   Space.identity(out);
   }
   Space.combine(out, bone.local_space, out);

   return out;
   };*/

  var BoxObject = Object.extend({
    /** @type {number} */
    parent_index: -1,
    /** @type {Space} */
    local_space: null,
    /** @type {Space} */
    world_space: null,
    /** @type {Pivot} */
    pivot: null,

    /**
     * @constructor
     * @extends {Object}
     */
    ctor: function () {
      //goog.base(this, 'box');
      this.local_space = new Space();
      this.world_space = new Space();
      this.pivot = new Pivot();
    },

    /**
     * @return {BoxObject}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      Object.prototype.load.call(this, json);

      //goog.base(this, 'load', json);
      this.parent_index = loadInt(json, 'parent', -1);
      this.local_space.load(json);
      this.world_space.copy(this.local_space);
      this.pivot.x = loadFloat(json, 'pivot_x', 0.0);
      this.pivot.y = loadFloat(json, 'pivot_y', 1.0);

      return this;
    },

    /**
     * @return {BoxObject}
     * @param {BoxObject} other
     */
    copy: function (other) {
      this.parent_index = other.parent_index;
      this.local_space.copy(other.local_space);
      this.world_space.copy(other.world_space);
      this.pivot.copy(other.pivot);
      return this;
    },

    /**
     * @return {void}
     * @param {BoxObject} other
     * @param {number} t
     * @param {number} spin
     */
    tween: function (other, t, spin) {
      Space.tween(this.local_space, other.local_space, t, spin, this.local_space);
      //Vector.tween(this.pivot, other.pivot, tween, this.pivot);
    }

  });


  var PointObject = Object.extend({
    /** @type {number} */
    parent_index: -1,
    /** @type {Space} */
    local_space: null,
    /** @type {Space} */
    world_space: null,
    /**
     * @constructor
     * @extends {Object}
     */
    ctor: function () {
      //goog.base(this, 'point');
      this.local_space = new Space();
      this.world_space = new Space();
    },

    /**
     * @return {PointObject}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      //goog.base(this, 'load', json);
      Object.prototype.load.call(this, json);

      this.parent_index = loadInt(json, 'parent', -1);
      this.local_space.load(json);
      this.world_space.copy(this.local_space);
      return this;
    },

    /**
     * @return {PointObject}
     * @param {PointObject} other
     */
    copy: function (other) {
      this.parent_index = other.parent_index;
      this.local_space.copy(other.local_space);
      this.world_space.copy(other.world_space);
      return this;
    },

    /**
     * @return {void}
     * @param {PointObject} other
     * @param {number} t
     * @param {number} spin
     */
    tween: function (other, t, spin) {
      Space.tween(this.local_space, other.local_space, t, spin, this.local_space);
    }

  });

  var SoundObject = Object.extend({

    /** @type {number} */
    folder_index: -1,
    /** @type {number} */
    file_index: -1,
    /** @type {boolean} */
    trigger: false,
    /** @type {number} */
    volume: 1.0,
    /** @type {number} */
    panning: 0.0,

    ctor: function () {
      //goog.base(this, 'sound');
    },

    /**
     * @return {SoundObject}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      //goog.base(this, 'load', json);
      Object.prototype.load.call(this, json);

      this.folder_index = loadInt(json, 'folder', -1);
      this.file_index = loadInt(json, 'file', -1);
      this.trigger = loadBool(json, 'trigger', false);
      this.volume = loadFloat(json, 'volume', 1.0);
      this.panning = loadFloat(json, 'panning', 0.0);
      return this;
    },

    /**
     * @return {SoundObject}
     * @param {SoundObject} other
     */
    copy: function (other) {
      this.folder_index = other.folder_index;
      this.file_index = other.file_index;
      this.trigger = other.trigger;
      this.volume = other.volume;
      this.panning = other.panning;
      return this;
    },

    /**
     * @return {void}
     * @param {SoundObject} other
     * @param {number} t
     * @param {number} spin
     */
    tween: function (other, t, spin) {
      this.volume = tween(this.volume, other.volume, t);
      this.panning = tween(this.panning, other.panning, t);
    }

  });

  var EntityObject = Object.extend({


    /** @type {number} */
    parent_index: -1,
    /** @type {Space} */
    local_space: null,
    /** @type {Space} */
    world_space: null,
    /** @type {number} */
    entity_index: -1,
    /** @type {number} */
    animation_index: -1,
    /** @type {number} */
    animation_time: 0.0,
    /** @type {Pose} */
    pose: null,

    ctor: function () {
      this.local_space = new Space();
      this.world_space = new Space();
    },

    /**
     * @return {EntityObject}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      //goog.base(this, 'load', json);

      Object.prototype.load.call(this, json);

      this.parent_index = loadInt(json, 'parent', -1);
      this.local_space.load(json);
      this.world_space.copy(this.local_space);
      this.entity_index = loadInt(json, 'entity', -1);
      this.animation_index = loadInt(json, 'animation', -1);
      this.animation_time = loadFloat(json, 't', 0.0);
      return this;
    },

    /**
     * @return {EntityObject}
     * @param {EntityObject} other
     */
    copy: function (other) {
      this.parent_index = other.parent_index;
      this.local_space.copy(other.local_space);
      this.world_space.copy(other.world_space);
      this.entity_index = other.entity_index;
      this.animation_index = other.animation_index;
      this.animation_time = other.animation_time;
      return this;
    },

    /**
     * @return {void}
     * @param {EntityObject} other
     * @param {number} t
     * @param {number} spin
     */
    tween: function (other, t, spin) {
      Space.tween(this.local_space, other.local_space, t, spin, this.local_space);
      this.animation_time = tween(this.animation_time, other.animation_time, t);
    }

  });


  /**
   * @constructor
   * @extends {Object}
   */
  var VariableObject = Object.extend({
    ctor: function () {
      //goog.base(this, 'variable');
    },

    /**
     * @return {VariableObject}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      Object.prototype.load.call(this, json);
      //goog.base(this, 'load', json);
      return this;
    },

    /**
     * @return {VariableObject}
     * @param {VariableObject} other
     */
    copy: function (other) {
      return this;
    },

    /**
     * @return {void}
     * @param {VariableObject} other
     * @param {number} t
     * @param {number} spin
     */
    tween: function (other, t, spin) {
    }

  });


  /**
   * @constructor
   * @extends {Element}
   */
  var Ref = Element.extend({
    /** @type {number} */
    parent_index: -1,
    /** @type {number} */
    timeline_index: -1,
    /** @type {number} */
    keyframe_index: -1,

    ctor: function () {
      //goog.base(this);
    },
    /**
     * @return {Ref}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      //goog.base(this, 'load', json);
      Element.prototype.load.call(this, json);

      this.parent_index = loadInt(json, 'parent', -1);
      this.timeline_index = loadInt(json, 'timeline', -1);
      this.keyframe_index = loadInt(json, 'key', -1);
      return this;
    }
  });


  var BoneRef = Ref.extend({
    ctor: function () {
      //goog.base(this);
    },
    /**
     * @return {BoneRef}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      Ref.prototype.load.call(this, json);
      return this;
    }

  });

  var ObjectRef = Ref.extend({
    /** @type {number} */
    z_index: 0,

    ctor: function () {
    },

    /**
     * @return {ObjectRef}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      //goog.base(this, 'load', json);
      Ref.prototype.load.call(this, json);
      this.z_index = loadInt(json, 'z_index', 0);

      return this;
    }
  });

  var Keyframe = Element.extend({
    /** @type {number} */
    time: 0,

    ctor: function () {
      //goog.base(this);
    },
    /**
     * @return {Keyframe}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      //goog.base(this, 'load', json);
      Element.prototype.load.call(this, json);
      this.time = loadInt(json, 'time', 0);

      return this;
    }
  });

  /**
   * @return {number}
   * @param {Array.<Keyframe>} array
   * @param {number} time
   */
  Keyframe.find = function (array, time) {
    if (array.length <= 0) {
      return -1;
    }
    if (time < array[0].time) {
      return -1;
    }
    var last = array.length - 1;
    if (time >= array[last].time) {
      return last;
    }
    var lo = 0;
    var hi = last;
    if (hi === 0) {
      return 0;
    }
    var current = hi >> 1;
    while (true) {
      if (array[current + 1].time <= time) {
        lo = current + 1;
      } else {
        hi = current;
      }
      if (lo === hi) {
        return lo;
      }
      current = (lo + hi) >> 1;
    }
  };

  /**
   * @return {number}
   * @param {Keyframe} a
   * @param {Keyframe} b
   */
  Keyframe.compare = function (a, b) {
    return a.time - b.time;
  };
  
  
  var Curve = cc.Class.extend({
    type: "linear",
    c1: 0.0,
    c2: 0.0,
    c3: 0.0,
    c4: 0.0,
    ctor: function () {

    },

    /**
     * @return {Curve}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      this.type = loadString(json, 'curve_type', "linear");
      this.c1 = loadFloat(json, 'c1', 0.0);
      this.c2 = loadFloat(json, 'c2', 0.0);
      this.c3 = loadFloat(json, 'c3', 0.0);
      this.c4 = loadFloat(json, 'c4', 0.0);

      return this;
    },

    evaluate: function (t) {
      switch (this.type) {
        case "instant":
          return 0.0;
        case "linear":
          return t;
        case "quadratic":
          return interpolateQuadratic(0.0, this.c1, 1.0, t);
        case "cubic":
          return interpolateCubic(0.0, this.c1, this.c2, 1.0, t);
        case "quartic":
          return interpolateQuartic(0.0, this.c1, this.c2, this.c3, 1.0, t);
        case "quintic":
          return interpolateQuintic(0.0, this.c1, this.c2, this.c3, this.c4, 1.0, t);
        case "bezier":
          return interpolateBezier(this.c1, this.c2, this.c3, this.c4, t);
      }
      return 0.0;
    }


  });
  
  
  /**
   * @constructor
   * @extends {Keyframe}
   */
  var MainlineKeyframe = Keyframe.extend({

    /** @type {Curve} */
    curve: null,
    /** @type {Array.<BoneRef>} */
    bone_ref_array: null,
    /** @type {Array.<ObjectRef>} */
    object_ref_array: null,

    ctor: function () {
      //goog.base(this);
      debugger;

      this.curve = new Curve();
    },

    /**
     * @return {MainlineKeyframe}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      var mainline_keyframe = this;

      Keyframe.prototype.load.call(this, json);
      //Keyframe.prototype.load.call(this.constructor.prototype, json);
      //

      /*TEST*/
      //this.curve = new Curve()
      /*TEST END*/

      mainline_keyframe.curve.load(json);

      mainline_keyframe.bone_ref_array = [];
      json.bone_ref = makeArray(json.bone_ref);
      json.bone_ref.forEach(function (bone_ref_json) {
        mainline_keyframe.bone_ref_array.push(new BoneRef().load(bone_ref_json));
      });
      mainline_keyframe.bone_ref_array = mainline_keyframe.bone_ref_array.sort(function (a, b) {
        return a.id - b.id;
      });

      mainline_keyframe.object_ref_array = [];
      json.object_ref = makeArray(json.object_ref);
      json.object_ref.forEach(function (object_ref_json) {
        mainline_keyframe.object_ref_array.push(new ObjectRef().load(object_ref_json));
      });
      mainline_keyframe.object_ref_array = mainline_keyframe.object_ref_array.sort(function (a, b) {
        return a.id - b.id;
      });

      return mainline_keyframe;
    }

  });

  var Mainline = cc.Class.extend({
    /** @type {Array.<MainlineKeyframe>} */
    keyframe_array: null,

    ctor: function () {
    },

    /**
     * @return {Mainline}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      var mainline = this;

      mainline.keyframe_array = [];
      json.key = makeArray(json.key);
      json.key.forEach(function (key_json) {
        mainline.keyframe_array.push(new MainlineKeyframe().load(key_json));
      });
      mainline.keyframe_array = mainline.keyframe_array.sort(Keyframe.compare);

      return mainline;
    }
  });


  var TimelineKeyframe = Keyframe.extend({

    /** @type {string} */
    type: "unknown",
    /** @type {number} */
    spin: 1, // 1: counter-clockwise, -1: clockwise
    /** @type {Curve} */
    curve: null,

    /**
     * @constructor
     * @extends {Keyframe}
     * @param {string} type
     */
    ctor: function (type) {
      //this._super();
      //goog.base(this);
      debugger;
      this.type = type;
      this.curve = new Curve();
    },

    /**
     * @return {TimelineKeyframe}
     * @param {Object.<string,?>} json
     */
    load: function (json) {

      Keyframe.prototype.load.call(this, json);
      //goog.base(this, 'load', json)
      //var type = loadString(json, 'type', "sprite");
      //if (this.type !== type) throw new Error();
      this.spin = loadInt(json, 'spin', 1);
      this.curve.load(json);
      return this;
    }

  });


  /**
   * @constructor
   * @extends {TimelineKeyframe}
   */
  var SpriteTimelineKeyframe = TimelineKeyframe.extend({
    /** @type {SpriteObject} */
    sprite: null,

    ctor: function () {
      //debugger;
      //goog.base(this, 'sprite');
    },

    /**
     * @return {TimelineKeyframe}
     * @param {Object.<string,?>} json
     */
    load: function (json) {

      //goog.base(this, 'load', json);

      debugger;
      TimelineKeyframe.prototype.load.call(this, json);
      //this.constructor.prototype.load.call(this, json)



      this.sprite = new SpriteObject().load(json.object || {});
      return this;
    }

  });


  /**
   * @constructor
   * @extends {TimelineKeyframe}
   */
  var BoneTimelineKeyframe = TimelineKeyframe.extend({
    /** @type {Bone} */
    bone: null,
    /**
     * @constructor
     * @extends {TimelineKeyframe}
     */
    ctor: function () {

    },

    /**
     * @return {TimelineKeyframe}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      TimelineKeyframe.prototype.load.call(this, json);
      this.bone = new Bone().load(json.bone || {});

      return this;
    }
  });


  /**
   * @constructor
   * @extends {TimelineKeyframe}
   */
  var BoxTimelineKeyframe = TimelineKeyframe.extend({
    /** @type {BoxObject} */
    box: null,
    /**
     * @return {TimelineKeyframe}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      //goog.base(this, 'load', json);
      TimelineKeyframe.prototype.load.call(this, json);
      this.box = new BoxObject().load(json.object || {});
      return this;
    }

  });


  /**
   * @constructor
   * @extends {TimelineKeyframe}
   */
  var PointTimelineKeyframe = TimelineKeyframe.extend({
    /** @type {PointObject} */
    point: null,

    /**
     * @return {TimelineKeyframe}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      //goog.base(this, 'load', json);
      TimelineKeyframe.prototype.load.call(this, json);
      this.point = new PointObject().load(json.object || {});
      return this;
    }

  });


  /**
   * @constructor
   * @extends {TimelineKeyframe}
   */
  var SoundTimelineKeyframe = TimelineKeyframe.extend({

    /** @type {SoundObject} */
    sound: null,

    /**
     * @return {TimelineKeyframe}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      //goog.base(this, 'load', json);

      TimelineKeyframe.prototype.load.call(this, json);


      this.sound = new SoundObject().load(json.object || {});
      return this;
    }

  })

  /**
   * @constructor
   * @extends {TimelineKeyframe}
   */
  var EntityTimelineKeyframe = TimelineKeyframe.extend({

    /** @type {EntityObject} */
    entity: null,

    /**
     * @return {TimelineKeyframe}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      //goog.base(this, 'load', json);
        TimelineKeyframe.prototype.load.call(this, json);

      this.entity = new EntityObject().load(json.object || {});
      return this;
    }

  })


  /**
   * @constructor
   * @extends {TimelineKeyframe}
   */
  var VariableTimelineKeyframe = TimelineKeyframe.extend({

    /** @type {VariableObject} */
    variable: null,

    /**
     * @return {TimelineKeyframe}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      //goog.base(this, 'load', json);
      TimelineKeyframe.prototype.load.call(this, json);


      this.variable = new VariableObject().load(json.object || {});
      return this;
    }

  })

  /**
   * @constructor
   * @extends {Element}
   */
  var TagDef = Element.extend({
    /** @type {number} */
    tag_index: -1,

    /**
     * @return {TagDef}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      //goog.base(this, 'load', json);
      Element.prototype.load.call(this, json);


      return this;
    }

  })

  /**
   * @constructor
   * @extends {Element}
   */
  var Tag = Element.extend({
    /** @type {number} */
    tag_def_index: -1,
    /**
     * @return {Tag}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      var tag = this;
      //goog.base(this, 'load', json);
      Element.prototype.load.call(this, json);

      tag.tag_def_index = loadInt(json, 't', -1);
      return this;
    }

  })


  /**
   * @constructor
   * @extends {Keyframe}
   */
  var TaglineKeyframe = Keyframe.extend({

    /** @type {Array.<Tag>} */
    tag_array: null,

    /**
     * @return {TaglineKeyframe}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      var tagline_keyframe = this;
      //goog.base(this, 'load', json);
      Keyframe.prototype.load.call(this, json);


      tagline_keyframe.tag_array = [];
      json.tag = makeArray(json.tag);
      json.tag.forEach(function (tag_json) {
        tagline_keyframe.tag_array.push(new Tag().load(tag_json));
      });

      return this;
    }

  });


  /**
   * @constructor
   * @extends {Element}
   */
  var Tagline = Element.extend({
    ctor: function () {
      //goog.base(this);
      this.keyframe_array = [];
    },

    /** @type {Array.<TaglineKeyframe>} */
    keyframe_array: null,

    /**
     * @return {Tagline}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      var tagline = this;
      //goog.base(this, 'load', json);
      Element.prototype.load.call(this, json);

      tagline.keyframe_array = [];
      json.key = makeArray(json.key);
      json.key.forEach(function (key_json) {
        tagline.keyframe_array.push(new TaglineKeyframe().load(key_json));
      });

      return this;
    }

  });

  /**
   * @constructor
   * @extends {Keyframe}
   */
  var VarlineKeyframe = Keyframe.extend({
    ctor: function () {

    },
    /** @type {number|string} */
    val: null,

    /**
     * @return {VarlineKeyframe}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      var varline_keyframe = this;
      //goog.base(this, 'load', json);
      Keyframe.prototype.load.call(this, json);

      switch (typeof(json.val)) {
        case 'number':
          varline_keyframe.val = loadFloat(json, 'val', 0.0);
          break;
        case 'string':
          varline_keyframe.val = loadString(json, 'val', "");
          break;
      }
      return this;
    }


  });

  /**
   * @constructor
   * @extends {Element}
   */
  var Varline = Element.extend({

    /** @type {number} */
    var_def_index: -1,
    /** @type {Array.<VarlineKeyframe>} */
    keyframe_array: null,

    /**
     * @return {Varline}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      var varline = this;

      //goog.base(this, 'load', json);
      Element.prototype.load.call(this, json);

      varline.var_def_index = loadInt(json, 'def', -1);

      varline.keyframe_array = [];
      json.key = makeArray(json.key);
      json.key.forEach(function (key_json) {
        varline.keyframe_array.push(new VarlineKeyframe().load(key_json));
      });

      return this;
    }
  });


  /**
   * @constructor
   * @extends {Element}
   */
  var Meta = Element.extend({
    /** @type {Tagline} */
    tagline: null,
    /** @type {Array.<Varline>} */
    varline_array: null,

    /**
     * @return {Meta}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      var meta = this;

      //goog.base(this, 'load', json);
      Element.prototype.load.call(this, json);

      meta.tagline = new Tagline();
      if (json.tagline) {
        meta.tagline.load(json.tagline);
      }

      meta.varline_array = [];
      json.valline = json.valline || null; // HACK
      json.varline = json.varline || json.valline; // HACK
      if (json.varline) {
        json.varline = makeArray(json.varline);
        json.varline.forEach(function (varline_json) {
          meta.varline_array.push(new Varline().load(varline_json));
        });
      }

      return meta;
    }

  })


  var Timeline = Element.extend({


    /** @type {string} */
    type: "sprite",
    /** @type {number} */
    object_index: -1,
    /** @type {Array.<TimelineKeyframe>} */
    keyframe_array: null,
    /** @type {Meta} */
    meta: null,

    ctor: function () {
debugger;
    },

    /**
     * @return {Timeline}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      var timeline = this;

      //goog.base(this, 'load', json);
      Element.prototype.load.call(this, json);
//debugger;

      timeline.type = loadString(json, 'object_type', "sprite");
      timeline.object_index = loadInt(json, 'obj', -1);

      timeline.keyframe_array = [];
      json.key = makeArray(json.key);
      switch (timeline.type) {
        case 'sprite':
          json.key.forEach(function (key_json) {
debugger;
            timeline.keyframe_array.push(new SpriteTimelineKeyframe().load(key_json));
         debugger;
          });
          break;
        case 'bone':
          json.key.forEach(function (key_json) {
            timeline.keyframe_array.push(new BoneTimelineKeyframe().load(key_json));
          });
          break;
        case 'box':
          json.key.forEach(function (key_json) {
            timeline.keyframe_array.push(new BoxTimelineKeyframe().load(key_json));
          });
          break;
        case 'point':
          json.key.forEach(function (key_json) {
            timeline.keyframe_array.push(new PointTimelineKeyframe().load(key_json));
          });
          break;
        case 'sound':
          json.key.forEach(function (key_json) {
            timeline.keyframe_array.push(new SoundTimelineKeyframe().load(key_json));
          });
          break;
        case 'entity':
          json.key.forEach(function (key_json) {
            timeline.keyframe_array.push(new EntityTimelineKeyframe().load(key_json));
          });
          break;
        case 'variable':
          json.key.forEach(function (key_json) {
            timeline.keyframe_array.push(new VariableTimelineKeyframe().load(key_json));
          });
          break;
        default:
          console.log("TODO: Timeline::load", timeline.type, json.key);
          break;
      }
      timeline.keyframe_array = timeline.keyframe_array.sort(Keyframe.compare);

      if (json.meta) {
        timeline.meta = new Meta().load(json.meta);
      }

      return timeline;

    }
  });


  /**
   * @constructor
   * @extends {Keyframe}
   */
  var SoundlineKeyframe = Keyframe.extend({
    /** @type {SoundObject} */
    sound: null,

    /**
     * @return {SoundlineKeyframe}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      //goog.base(this, 'load', json);
      Keyframe.prototype.load.call(this, json);
      this.sound = new SoundObject().load(json.object || {});
      return this;
    }

  })


  /**
   * @constructor
   * @extends {Element}
   */
  var Soundline = Element.extend({

    /** @type {Array.<SoundlineKeyframe>} */
    keyframe_array: null,

    /**
     * @return {Soundline}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      var soundline = this;

      //goog.base(this, 'load', json);
      Element.prototype.load.call(this, json);

      soundline.keyframe_array = [];
      json.key = makeArray(json.key);
      json.key.forEach(function (key_json) {
        soundline.keyframe_array.push(new SoundlineKeyframe().load(key_json));
      });
      soundline.keyframe_array = soundline.keyframe_array.sort(Keyframe.compare);

      return soundline;
    }

  })


  /**
   * @constructor
   * @extends {Keyframe}
   */
  var EventlineKeyframe = Keyframe.extend({

///	/** @type {EventObject} */
///	EventlineKeyframe.prototype.event;


    /**
     * @return {EventlineKeyframe}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      //goog.base(this, 'load', json);
      Keyframe.prototype.load.call(this, json);

      ///	this.event = new EventObject().load(json.object || {});
      return this;
    }


  });


  /**
   * @constructor
   * @extends {Element}
   */
  var Eventline = Element.extend({

    /** @type {Array.<EventlineKeyframe>} */
    keyframe_array: null,

    /**
     * @return {Eventline}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      var eventline = this;

      //goog.base(this, 'load', json);
      Element.prototype.load.call(this, json);

      eventline.keyframe_array = [];
      json.key = makeArray(json.key);
      json.key.forEach(function (key_json) {
        eventline.keyframe_array.push(new EventlineKeyframe().load(key_json));
      });
      eventline.keyframe_array = eventline.keyframe_array.sort(Keyframe.compare);

      return eventline;
    }
  });


  /**
   * @constructor
   */
  var MapInstruction = cc.Class.extend({

    /** @type {number} */
    folder_index: -1,
    /** @type {number} */
    file_index: -1,
    /** @type {number} */
    target_folder_index: -1,
    /** @type {number} */
    target_file_index: -1,

    /**
     * @return {MapInstruction}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      var map_instruction = this;

      map_instruction.folder_index = loadInt(json, 'folder', -1);
      map_instruction.file_index = loadInt(json, 'file', -1);
      map_instruction.target_folder_index = loadInt(json, 'target_folder', -1);
      map_instruction.target_file_index = loadInt(json, 'target_file', -1);

      return map_instruction;
    }
  })


  /**
   * @constructor
   * @extends {Element}
   */
  var CharacterMap = Element.extend({

    /** @type {Array.<MapInstruction>} */
    map_instruction_array: null,

    ctor: function () {
      var character_map = this;

      goog.base(this);

      character_map.map_instruction_array = [];
    },

    /**
     * @return {CharacterMap}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      var character_map = this;

      //goog.base(this, 'load', json);
      Element.prototype.load.call(this, json);

      character_map.map_instruction_array = [];
      json.map = makeArray(json.map);
      json.map.forEach(function (map_json) {
        var map_instruction = new MapInstruction().load(map_json);
        character_map.map_instruction_array.push(map_instruction);
      });

      return character_map;
    }

  });


  /**
   * @constructor
   * @extends {Element}
   * @param {string} type
   */
  var VarDef = Element.extend({

    ctor: function (type) {
      //goog.base(this);
      this.type = type;
    },

    /** @type {string} */
    type: "unknown",

    /**
     * @return {VarDef}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      var var_def = this;
      //goog.base(this, 'load', json);
      Element.prototype.load.call(this, json);
      return this;
    }

  });


  /**
   * @constructor
   * @extends {VarDef}
   */
  var IntVarDef = VarDef.extend({

    /** @type {number} */
    default_value: 0,
    /** @type {number} */
    value: 0,

    /**
     * @return {IntVarDef}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      var var_def = this;
      //goog.base(this, 'load', json);
      VarDef.prototype.load.call(this, json);
      var_def.value = var_def.default_value = loadInt(json, 'default_value', 0);
      return this;
    }

  });

  /**
   * @constructor
   * @extends {VarDef}
   */
  var FloatVarDef = VarDef.extend({

    /** @type {number} */
    default_value: 0.0,
    /** @type {number} */
    value: 0.0,

    /**
     * @return {FloatVarDef}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      var var_def = this;
      //goog.base(this, 'load', json);
      VarDef.prototype.load.call(this, json);
      var_def.value = var_def.default_value = loadFloat(json, 'default_value', 0.0);
      return this;
    }

  })

  /**
   * @constructor
   * @extends {VarDef}
   */
  var StringVarDef = VarDef.extend({
    /** @type {string} */
    default_value: "",
    /** @type {string} */
    value: "",

    /**
     * @return {StringVarDef}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      var var_def = this;
      //goog.base(this, 'load', json);
      VarDef.prototype.load.call(this, json);
      var_def.value = var_def.default_value = loadString(json, 'default_value', "");
      return this;
    }

  })


  /**
   * @constructor
   * @extends {Element}
   */
  var VarDefs = Element.extend({
    /** @type {Array.<VarDef>} */
    var_def_array: null,

    /**
     * @return {VarDefs}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      var var_defs = this;

      //goog.base(this, 'load', json);
      Element.prototype.load.call(this, json);

      this.var_def_array = [];
      var json_var_def_array = [];
      if (typeof(json.i) === 'object') {
        // in SCML files, json.i is an object or array of objects
        json_var_def_array = makeArray(json.i);
      }
      else if ((typeof(json) === 'object') && (typeof(json.length) === 'number')) {
        // in SCON files, json is an array
        json_var_def_array = makeArray(json);
      }
      json_var_def_array.forEach(function (var_defs_json) {
        switch (var_defs_json.type) {
          case 'int':
            var_defs.var_def_array.push(new IntVarDef().load(var_defs_json));
            break;
          case 'float':
            var_defs.var_def_array.push(new FloatVarDef().load(var_defs_json));
            break;
          case 'string':
            var_defs.var_def_array.push(new StringVarDef().load(var_defs_json));
            break;
          default:
            console.log("TODO: VarDefs.load", var_defs_json.type, var_defs_json);
            var_defs.var_def_array.push(new VarDef(var_defs_json.type).load(var_defs_json));
            break;
        }
      });

      return this;
    }

  })

  /**
   * @constructor
   * @extends {Element}
   * @param {string} type
   */
  var ObjInfo = Element.extend({
    ctor: function (type) {
      this.type = type;
    },

    /** @type {string} */
    type: "unknown",
    /** @type {VarDefs} */
    var_defs: null,

    /**
     * @return {ObjInfo}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      var obj_info = this;

      //goog.base(this, 'load', json);
      Element.prototype.load.call(this, json);

      //var type = loadString(json, 'type', "unknown");
      //if (this.type !== type) throw new Error();

      this.var_defs = new VarDefs().load(json.var_defs || {});

      return this;
    }

  })


  /**
   * @constructor
   */
  var SpriteFrame = cc.Class.extend({

    /** @type {number} */
    folder_index: -1,
    /** @type {number} */
    file_index: -1,

    /**
     * @return {SpriteFrame}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      this.folder_index = loadInt(json, 'folder', -1);
      this.file_index = loadInt(json, 'file', -1);
      return this;
    },

    ctor: function () {

    }
  });

  /**
   * @constructor
   * @extends {ObjInfo}
   */
  var SpriteObjInfo = ObjInfo.extend({

    /** @type {Array.<SpriteFrame>} */
    sprite_frame_array: null,

    /**
     * @return {SpriteObjInfo}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      var obj_info = this;

      //goog.base(this, 'load', json);
      ObjInfo.prototype.load.call(this, json);

      obj_info.sprite_frame_array = [];
      json.frames = makeArray(json.frames);
      json.frames.forEach(function (frames_json) {
        obj_info.sprite_frame_array.push(new SpriteFrame().load(frames_json));
      });

      return this;
    }


  })


  /**
   * @constructor
   * @extends {ObjInfo}
   */
  var BoneObjInfo = ObjInfo.extend({

    /** @type {number} */
    w: 0,
    /** @type {number} */
    h: 0,

    /**
     * @return {BoneObjInfo}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      //goog.base(this, 'load', json);
      ObjInfo.prototype.load.call(this, json);
      this.w = loadInt(json, 'w', 0);
      this.h = loadInt(json, 'h', 0);
      return this;
    }

  })

  /**
   * @constructor
   * @extends {ObjInfo}
   */
  var BoxObjInfo = ObjInfo.extend({

    /** @type {number} */
    w: 0.0,
    /** @type {number} */
    h: 0.0,
    /**
     * @return {BoxObjInfo}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      //goog.base(this, 'load', json);
      ObjInfo.prototype.load.call(this, json);
      this.w = loadFloat(json, 'w', 0.0);
      this.h = loadFloat(json, 'h', 0.0);
      return this;
    }

  })


  var Animation = Element.extend({


    /** @type {number} */
    length: 0,
    /** @type {string} */
    looping: "true", // "true", "false" or "ping_pong"
    /** @type {number} */
    loop_to: 0,
    /** @type {Mainline} */
    mainline: null,
    /** @type {Array.<Timeline>} */
    timeline_array: null,
    /** @type {Array.<Soundline>} */
    soundline_array: null,
    /** @type {Array.<Eventline>} */
    eventline_array: null,
    /** @type {Meta} */
    meta: null,
    /** @type {number} */
    min_time: 0,
    /** @type {number} */
    max_time: 0,

    ctor: function () {
    },

    /**
     * @return {Animation}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      var anim = this;

      //goog.base(this, 'load', json);
      Element.prototype.load.call(this, json);


      anim.length = loadInt(json, 'length', 0);
      anim.looping = loadString(json, 'looping', "true");
      anim.loop_to = loadInt(json, 'loop_to', 0);

      anim.mainline = new Mainline().load(json.mainline || {});

      anim.timeline_array = [];
      json.timeline = makeArray(json.timeline);
      json.timeline.forEach(function (timeline_json) {
        anim.timeline_array.push(new Timeline().load(timeline_json));
      });

      anim.soundline_array = [];
      json.soundline = makeArray(json.soundline);
      json.soundline.forEach(function (soundline_json) {
        anim.soundline_array.push(new Soundline().load(soundline_json));
      });

      anim.eventline_array = [];
      json.eventline = makeArray(json.eventline);
      json.eventline.forEach(function (eventline_json) {
        anim.eventline_array.push(new Eventline().load(eventline_json));
      });

      if (json.meta) {
        anim.meta = new Meta().load(json.meta);
      }

      anim.min_time = 0;
      anim.max_time = anim.length;

      return anim;
    }

  });

  var Entity = Element.extend({

    /** @type {Object.<string,CharacterMap>} */
    character_map_map: null,
    /** @type {Array.<string>} */
    character_map_keys: null,
    /** @type {VarDefs} */
    var_defs: null,
    /** @type {Object.<string,ObjInfo>} */
    obj_info_map: null,
    /** @type {Array.<string>} */
    obj_info_keys: null,
    /** @type {Object.<string,Animation>} */
    animation_map: null,
    /** @type {Array.<string>} */
    animation_keys: null,

    ctor: function () {

    },

    /**
     * @return {Entity}
     * @param {Object.<string,?>} json
     */
    load: function (json) {
      var entity = this;

      //goog.base(this, 'load', json);
      Element.prototype.load.call(this, json);


      entity.character_map_map = {};
      entity.character_map_keys = [];
      json.character_map = makeArray(json.character_map);
      json.character_map.forEach(function (character_map_json) {
        var character_map = new CharacterMap().load(character_map_json);
        entity.character_map_map[character_map.name] = character_map;
        entity.character_map_keys.push(character_map.name);
      });

      this.var_defs = new VarDefs().load(json.var_defs || {});

      entity.obj_info_map = {};
      entity.obj_info_keys = [];
      json.obj_info = makeArray(json.obj_info);
      json.obj_info.forEach(function (obj_info_json) {
        switch (obj_info_json.type) {
          case 'sprite':
            var obj_info = new SpriteObjInfo().load(obj_info_json);
            break;
          case 'bone':
            var obj_info = new BoneObjInfo().load(obj_info_json);
            break;
          case 'box':
            var obj_info = new BoxObjInfo().load(obj_info_json);
            break;
          case 'point':
          case 'sound':
          case 'entity':
          case 'variable':
          default:
            console.log("TODO: Entity.load", obj_info_json.type, obj_info_json);
            var obj_info = new ObjInfo(obj_info_json.type).load(obj_info_json);
            break;
        }
        entity.obj_info_map[obj_info.name] = obj_info;
        entity.obj_info_keys.push(obj_info.name);
      });

      entity.animation_map = {};
      entity.animation_keys = [];
      json.animation = makeArray(json.animation);
      json.animation.forEach(function (animation_json) {
        var animation = new Animation().load(animation_json);
        entity.animation_map[animation.name] = animation;
        entity.animation_keys.push(animation.name);
      });

      return entity;
    }
  });

  var Data = cc.Class.extend({

    /** @type {Array.<Folder>} */
    folder_array: null,

    /** @type {Array.<TagDef>} */
    tag_def_array: null,

    /** @type {Object.<string,Entity>} */
    entity_map: null,
    /** @type {Array.<string>} */
    entity_keys: null,

    /**
     * Data is the in memory structure that stores data of a scon file
     * @constructor
     */
    ctor: function () {
      var data = this;
      data.folder_array = [];
      data.entity_map = {};
      data.entity_keys = [];
    },

    /**
     * @return {Data}
     * @param {?} json
     */
    load: function (json) {
      var data = this;

      json = json || {};

      var scon_version = loadString(json, 'scon_version', "");
      var generator = loadString(json, 'generator', "");
      var generator_version = loadString(json, 'generator_version', "");

      data.folder_array = [];
      json.folder = makeArray(json.folder);
      json.folder.forEach(function (folder_json) {
        data.folder_array.push(new Folder().load(folder_json));
      });

      data.tag_def_array = [];
      json.tag_list = makeArray(json.tag_list);
      json.tag_list.forEach(function (tag_list_json) {
        data.tag_def_array.push(new TagDef().load(tag_list_json));
      });

      data.entity_map = {};
      data.entity_keys = [];
      json.entity = makeArray(json.entity);
      json.entity.forEach(function (entity_json) {
        var entity = new Entity().load(entity_json);
        data.entity_map[entity.name] = entity;
        data.entity_keys.push(entity.name);
      });

      // patch Object::pivot

      data.entity_keys.forEach(function (entity_key) {
        var entity = data.entity_map[entity_key];

        entity.animation_keys.forEach(function (animation_key) {
          var animation = entity.animation_map[animation_key];

          animation.timeline_array.forEach(function (timeline) {
            timeline.keyframe_array.forEach(function (timeline_keyframe) {
              if (timeline_keyframe instanceof SpriteTimelineKeyframe) {
                var sprite = timeline_keyframe.sprite;
                if (sprite.default_pivot) {
                  var folder = data.folder_array[sprite.folder_index];
                  var file = folder && folder.file_array[sprite.file_index];
                  if (file) {
                    sprite.pivot.copy(file.pivot);
                  }
                }
              }
            });
          });
        });
      });

      return data;
    },

    /**
     * @return {Object.<string, Entity>}
     */
    getEntities: function () {
      return this.entity_map;
    },

    /**
     * @return {Array.<string>}
     */
    getEntityKeys: function () {
      return this.entity_keys;
    },

    /**
     * @return {Object.<string, Animation>}
     * @param {string} entity_key
     */
    getAnims: function (entity_key) {
      var entity = this.entity_map && this.entity_map[entity_key];
      if (entity) {
        return entity.animation_map;
      }
      return {};
    },
    /**
     * @return {Array.<string>}
     * @param {string} entity_key
     */
    getAnimKeys: function (entity_key) {
      var entity = this.entity_map && this.entity_map[entity_key];
      if (entity) {
        return entity.animation_keys;
      }
      return [];
    }

  });

  var Pose = cc.Class.extend({

    /** @type {Data} */
    data: null,
    /** @type {string} */
    entity_key: '',

    /** @type {Array.<string>} */
    character_map_key_array: null,

    /** @type {string} */
    anim_key: '',
    /** @type {number} */
    time: 0,
    /** @type {number} */
    elapsed_time: 0,
    /** @type {boolean} */
    dirty: true,
    /** @type {Array.<Bone>} */
    bone_array: null,
    /** @type {Array.<Object>} */
    object_array: null,


    /** @type {Array.<Object>} */
    sound_array: null,

  /** @type {Array.<string>} */
  event_array: null,

  /** @type {Array.<string>} */
  tag_array: null,

  /** @type {Object.<string,number|string>} */
  var_map: null,


    /**
     * @constructor
     * @param {Data=} data
     */
    ctor: function (data) {
      this.data = data || null;

      this.character_map_key_array = [];
      this.bone_array = [];
      this.object_array = [];
      this.sound_array = [];
      this.event_array = [];
      this.tag_array = [];
      this.var_map = {};
    },

    /**
     * @return {Object.<string, Entity>}
     */
    getEntities: function () {
      if (this.data) {
        return this.data.getEntities();
      }
      return null;
    },

    /**
     * @return {Array.<string>}
     */
    getEntityKeys: function () {
      if (this.data) {
        return this.data.getEntityKeys();
      }
      return null;
    },

    /**
     * @return {Entity}
     */
    curEntity: function () {
      var entity_map = this.data.entity_map;
      return entity_map && entity_map[this.entity_key];
    },

    /**
     * @return {string}
     */
    getEntity: function () {
      return this.entity_key;
    },

    /**
     * @return {void}
     * @param {string} entity_key
     */
    setEntity: function (entity_key) {
      if (this.entity_key !== entity_key) {
        this.entity_key = entity_key;
        this.anim_key = "";
        this.time = 0;
        this.dirty = true;
        this.bone_array = [];
        this.object_array = [];
      }
    },

    /**
     * @return {Object.<string, Animation>}
     */
    getAnims: function () {
      if (this.data) {
        return this.data.getAnims(this.entity_key);
      }
      return null;
    },

    /**
     * @return {Object.<string>}
     */
    getAnimKeys: function () {
      if (this.data) {
        return this.data.getAnimKeys(this.entity_key);
      }
      return null;
    },

    /**
     * @return {Animation}
     */
    curAnim: function () {
      var anims = this.getAnims();

      return anims && anims[this.anim_key];
    },

    /**
     * @return {number}
     */
    curAnimLength: function () {
      var pose = this;
      var data = pose.data;
      var entity = data && data.entity_map[pose.entity_key];
      var anim = entity && entity.animation_map[pose.anim_key];

      return (anim && anim.length) || 0;
    },

    /**
     * @return {string}
     */
    getAnim: function () {
      return this.anim_key;
    },

    /**
     * @return {void}
     * @param {string} anim_key
     */
    setAnim: function (anim_key) {
      if (this.anim_key !== anim_key) {
        this.anim_key = anim_key;
        var anim = this.curAnim();
        if (anim) {
          this.time = wrap(this.time, anim.min_time, anim.max_time);
        }
        this.elapsed_time = 0;
        this.dirty = true;
      }
    },

    /**
     * @return {number}
     */
    getTime: function () {
      return this.time;
    },

    /**
     * @return {void}
     * @param {number} time
     */
    setTime: function (time) {
      var anim = this.curAnim();
      if (anim) {
        time = wrap(time, anim.min_time, anim.max_time);
      }

      if (this.time !== time) {
        this.time = time;
        this.elapsed_time = 0;
        this.dirty = true;
      }
    },

    /**
     * @return {void}
     * @param {number} elapsed_time
     */
    update: function (elapsed_time) {
      var pose = this;
      pose.elapsed_time += elapsed_time;
      pose.dirty = true;
    },

    /**
     * @return {void}
     */
    strike: function () {

      var pose = this;
      if (!pose.dirty) {
        return;
      }
      pose.dirty = false;

      var entity = pose.curEntity();

      pose.var_map = pose.var_map || {};
      entity.var_defs.var_def_array.forEach(function (var_def) {
        if (!(var_def.name in pose.var_map)) {
          pose.var_map[var_def.name] = var_def.default_value;
        }
      });

      var anim = pose.curAnim();

      var prev_time = pose.time;
      var elapsed_time = pose.elapsed_time;

      pose.time = pose.time + pose.elapsed_time; // accumulate elapsed time
      pose.elapsed_time = 0; // reset elapsed time for next strike

      var wrapped_min = false;
      var wrapped_max = false;
      if (anim) {
        wrapped_min = (elapsed_time < 0) && (pose.time <= anim.min_time);
        wrapped_max = (elapsed_time > 0) && (pose.time >= anim.max_time);
        pose.time = wrap(pose.time, anim.min_time, anim.max_time);
      }

      var time = pose.time;

      if (anim) {
        var mainline_keyframe_array = anim.mainline.keyframe_array;
        var mainline_keyframe_index1 = Keyframe.find(mainline_keyframe_array, time);
        var mainline_keyframe_index2 = (mainline_keyframe_index1 + 1) % mainline_keyframe_array.length;
        var mainline_keyframe1 = mainline_keyframe_array[mainline_keyframe_index1];
        var mainline_keyframe2 = mainline_keyframe_array[mainline_keyframe_index2];
        var mainline_time1 = mainline_keyframe1.time;
        var mainline_time2 = mainline_keyframe2.time;
        if (mainline_time2 < mainline_time1) {
          mainline_time2 = anim.length;
        }
        var mainline_time = time;
        if (mainline_time1 !== mainline_time2) {
          var mainline_tween = (time - mainline_time1) / (mainline_time2 - mainline_time1);
          mainline_tween = mainline_keyframe1.curve.evaluate(mainline_tween);
          mainline_time = tween(mainline_time1, mainline_time2, mainline_tween);
        }

        var timeline_array = anim.timeline_array;

        var data_bone_array = mainline_keyframe1.bone_ref_array;
        var pose_bone_array = pose.bone_array;

        data_bone_array.forEach(function (data_bone, bone_index) {
          var timeline_index = data_bone.timeline_index;
          var timeline = timeline_array[timeline_index];
          var timeline_keyframe_array = timeline.keyframe_array;
          var keyframe_index1 = data_bone.keyframe_index;
          var keyframe_index2 = (keyframe_index1 + 1) % timeline_keyframe_array.length;
          var timeline_keyframe1 = timeline_keyframe_array[keyframe_index1];
          var timeline_keyframe2 = timeline_keyframe_array[keyframe_index2];
          var time1 = timeline_keyframe1.time;
          var time2 = timeline_keyframe2.time;
          if (time2 < time1) {
            time2 = anim.length;
          }
          var tween = 0.0;
          if (time1 !== time2) {
            tween = (mainline_time - time1) / (time2 - time1);
            tween = timeline_keyframe1.curve.evaluate(tween);
          }

          var pose_bone = pose_bone_array[bone_index] = (pose_bone_array[bone_index] || new Bone());
          pose_bone.copy(timeline_keyframe1.bone).tween(timeline_keyframe2.bone, tween, timeline_keyframe1.spin);
          pose_bone.name = timeline.name; // set name from timeline
          pose_bone.parent_index = data_bone.parent_index; // set parent from bone_ref
        });

        // clamp output bone array
        pose_bone_array.length = data_bone_array.length;

        // compute bone world space
        pose_bone_array.forEach(function (bone) {
          var parent_bone = pose_bone_array[bone.parent_index];
          if (parent_bone) {
            Space.combine(parent_bone.world_space, bone.local_space, bone.world_space);
          }
          else {
            bone.world_space.copy(bone.local_space);
          }
        });

        var data_object_array = mainline_keyframe1.object_ref_array;
        var pose_object_array = pose.object_array;

        data_object_array.forEach(function (data_object, object_index) {
          var timeline_index = data_object.timeline_index;
          var timeline = timeline_array[timeline_index];
          var timeline_keyframe_array = timeline.keyframe_array;
          var keyframe_index1 = data_object.keyframe_index;
          var keyframe_index2 = (keyframe_index1 + 1) % timeline_keyframe_array.length;
          var timeline_keyframe1 = timeline_keyframe_array[keyframe_index1];
          var timeline_keyframe2 = timeline_keyframe_array[keyframe_index2];
          var time1 = timeline_keyframe1.time;
          var time2 = timeline_keyframe2.time;
          if (time2 < time1) {
            time2 = anim.length;
          }
          var tween = 0.0;
          if (time1 !== time2) {
            tween = (mainline_time - time1) / (time2 - time1);
            tween = timeline_keyframe1.curve.evaluate(tween);
          }

          switch (timeline.type) {
            case 'sprite':
              var pose_sprite = pose_object_array[object_index] = (pose_object_array[object_index] || new SpriteObject());
              pose_sprite.copy(timeline_keyframe1.sprite).tween(timeline_keyframe2.sprite, tween, timeline_keyframe1.spin);
              pose_sprite.name = timeline.name; // set name from timeline
              pose_sprite.parent_index = data_object.parent_index; // set parent from object_ref
              break;
            case 'bone':
              var pose_bone = pose_object_array[object_index] = (pose_object_array[object_index] || new Bone());
              pose_bone.copy(timeline_keyframe1.bone).tween(timeline_keyframe2.bone, tween, timeline_keyframe1.spin);
              pose_bone.name = timeline.name; // set name from timeline
              pose_bone.parent_index = data_object.parent_index; // set parent from object_ref
              break;
            case 'box':
              var pose_box = pose_object_array[object_index] = (pose_object_array[object_index] || new BoxObject());
              pose_box.copy(timeline_keyframe1.box).tween(timeline_keyframe2.box, tween, timeline_keyframe1.spin);
              pose_box.name = timeline.name; // set name from timeline
              pose_box.parent_index = data_object.parent_index; // set parent from object_ref
              break;
            case 'point':
              var pose_point = pose_object_array[object_index] = (pose_object_array[object_index] || new PointObject());
              pose_point.copy(timeline_keyframe1.point).tween(timeline_keyframe2.point, tween, timeline_keyframe1.spin);
              pose_point.name = timeline.name;
              pose_point.parent_index = data_object.parent_index; // set parent from object_ref
              break;
            case 'sound':
              var pose_sound = pose_object_array[object_index] = (pose_object_array[object_index] || new SoundObject());
              pose_sound.copy(timeline_keyframe1.sound).tween(timeline_keyframe2.sound, tween, timeline_keyframe1.spin);
              pose_sound.name = timeline.name;
              break;
            case 'entity':
              var pose_entity = pose_object_array[object_index] = (pose_object_array[object_index] || new EntityObject());
              pose_entity.copy(timeline_keyframe1.entity).tween(timeline_keyframe2.entity, tween, timeline_keyframe1.spin);
              pose_entity.name = timeline.name;
              pose_entity.parent_index = data_object.parent_index; // set parent from object_ref
              break;
            case 'variable':
              var pose_variable = pose_object_array[object_index] = (pose_object_array[object_index] || new VariableObject());
              pose_variable.name = timeline.name;
              pose_variable.copy(timeline_keyframe1.variable).tween(timeline_keyframe2.variable, tween, timeline_keyframe1.spin);
              break;
            default:
              throw new Error(timeline.type);
          }
        });

        // clamp output object array
        pose_object_array.length = data_object_array.length;

        // apply character map
        pose.character_map_key_array.forEach(function (character_map_key) {
          var character_map = entity.character_map_map[character_map_key];
          if (character_map) {
            character_map.map_instruction_array.forEach(function (map_instruction) {
              pose_object_array.forEach(function (object) {
                switch (object.type) {
                  case 'sprite':
                    if ((object.folder_index === map_instruction.folder_index) &&
                      (object.file_index === map_instruction.file_index)) {
                      object.folder_index = map_instruction.target_folder_index;
                      object.file_index = map_instruction.target_file_index;
                    }
                    break;
                  case 'bone':
                  case 'box':
                  case 'sound':
                  case 'event':
                  case 'entity':
                  case 'variable':
                    break;
                  default:
                    throw new Error(object.type);
                }
              });
            });
          }
        });

        // compute object world space
        pose_object_array.forEach(function (object) {
          switch (object.type) {
            case 'sprite':
              var bone = pose_bone_array[object.parent_index];
              if (bone) {
                Space.combine(bone.world_space, object.local_space, object.world_space);
              }
              else {
                object.world_space.copy(object.local_space);
              }
              var folder = pose.data.folder_array[object.folder_index];
              var file = folder && folder.file_array[object.file_index];
              if (file) {
                var offset_x = (0.5 - object.pivot.x) * file.width;
                var offset_y = (0.5 - object.pivot.y) * file.height;
                Space.translate(object.world_space, offset_x, offset_y);
              }
              break;
            case 'bone':
              var bone = pose_bone_array[object.parent_index];
              if (bone) {
                Space.combine(bone.world_space, object.local_space, object.world_space);
              }
              else {
                object.world_space.copy(object.local_space);
              }
              break;
            case 'box':
              var bone = pose_bone_array[object.parent_index];
              if (bone) {
                Space.combine(bone.world_space, object.local_space, object.world_space);
              }
              else {
                object.world_space.copy(object.local_space);
              }
              var box_info = entity.obj_info_map[object.name];
              if (box_info) {
                var offset_x = (0.5 - object.pivot.x) * box_info.w;
                var offset_y = (0.5 - object.pivot.y) * box_info.h;
                Space.translate(object.world_space, offset_x, offset_y);
              }
              break;
            case 'point':
              var bone = pose_bone_array[object.parent_index];
              if (bone) {
                Space.combine(bone.world_space, object.local_space, object.world_space);
              }
              else {
                object.world_space.copy(object.local_space);
              }
              break;
            case 'sound':
              break;
            case 'entity':
              var bone = pose_bone_array[object.parent_index];
              if (bone) {
                Space.combine(bone.world_space, object.local_space, object.world_space);
              }
              else {
                object.world_space.copy(object.local_space);
              }
              break;
            case 'variable':
              break;
            default:
              throw new Error(object.type);
          }
        });

        // process sub-entities
        pose_object_array.forEach(function (object) {
          switch (object.type) {
            case 'entity':
              var sub_pose = object.pose = object.pose || new Pose(pose.data);
              var sub_entity_key = sub_pose.data.entity_keys[object.entity_index];
              if (sub_entity_key !== sub_pose.getEntity()) {
                sub_pose.setEntity(sub_entity_key);
              }
              var sub_entity = sub_pose.curEntity();
              var sub_anim_key = sub_entity.animation_keys[object.animation_index];
              if (sub_anim_key !== sub_pose.getAnim()) {
                sub_pose.setAnim(sub_anim_key);
                var anim_length = sub_pose.curAnimLength();
                var sub_time = object.animation_time * anim_length;
                sub_pose.setTime(sub_time);
              }
              else {
                var anim_length = sub_pose.curAnimLength();
                var sub_time = object.animation_time * anim_length;
                var sub_dt = sub_time - sub_pose.getTime();
                sub_pose.update(sub_dt);
              }
              sub_pose.strike();
              break;
          }
        });

        // process soundlines
        pose.sound_array = [];
        anim.soundline_array.forEach(function (soundline) {
          var keyframe_array = soundline.keyframe_array;
          var keyframe_index = Keyframe.find(keyframe_array, time);
          if (keyframe_index !== -1) {
            var keyframe = keyframe_array[keyframe_index];
            if (((elapsed_time < 0) && ((time <= keyframe.time) && (keyframe.time <= prev_time))) ||
              ((elapsed_time > 0) && ((prev_time <= keyframe.time) && (keyframe.time <= time)))) {
              var folder = pose.data.folder_array[keyframe.sound.folder_index];
              var file = folder && folder.file_array[keyframe.sound.file_index];
              //console.log(prev_time, keyframe.time, time, "sound", file.name);
              pose.sound_array.push({name: file.name, volume: keyframe.sound.volume, panning: keyframe.sound.panning});
            }
          }
        });

        // process eventlines
        pose.event_array = [];
        anim.eventline_array.forEach(function (eventline) {
          var keyframe_array = eventline.keyframe_array;
          var keyframe_index = Keyframe.find(keyframe_array, time);
          if (keyframe_index !== -1) {
            var keyframe = keyframe_array[keyframe_index];
            if (((elapsed_time < 0) && ((time <= keyframe.time) && (keyframe.time <= prev_time))) ||
              ((elapsed_time > 0) && ((prev_time <= keyframe.time) && (keyframe.time <= time)))) {
              //console.log(prev_time, keyframe.time, time, "event", eventline.name);
              pose.event_array.push(eventline.name);
            }
          }
        });

        if (anim.meta) {
          // process tagline
          if (anim.meta.tagline) {
            var keyframe_array = anim.meta.tagline.keyframe_array;
            var keyframe_index = Keyframe.find(keyframe_array, time);
            if (keyframe_index !== -1) {
              var keyframe = keyframe_array[keyframe_index];
              if (((elapsed_time < 0) && ((time <= keyframe.time) && (keyframe.time <= prev_time))) ||
                ((elapsed_time > 0) && ((prev_time <= keyframe.time) && (keyframe.time <= time)))) {
                pose.tag_array = [];
                keyframe.tag_array.forEach(function (tag) {
                  var tag_def = pose.data.tag_def_array[tag.tag_def_index];
                  pose.tag_array.push(tag_def.name);
                });
                pose.tag_array = pose.tag_array.sort();
                //console.log(prev_time, keyframe.time, time, "tag", pose.tag_array);
              }
            }
          }

          // process varlines
          pose.var_map = pose.var_map || {};
          anim.meta.varline_array.forEach(function (varline) {
            var keyframe_array = varline.keyframe_array;
            var keyframe_index1 = Keyframe.find(keyframe_array, time);
            if (keyframe_index1 !== -1) {
              var keyframe_index2 = (keyframe_index1 + 1) % keyframe_array.length;
              var keyframe1 = keyframe_array[keyframe_index1];
              var keyframe2 = keyframe_array[keyframe_index2];
              var time1 = keyframe1.time;
              var time2 = keyframe2.time;
              if (time2 < time1) {
                time2 = anim.length;
              }
              var tween = 0.0;
              if (time1 !== time2) {
                tween = (time - time1) / (time2 - time1);
                // TODO: tween = keyframe1.curve.evaluate(tween);
              }
              var var_def = entity.var_defs.var_def_array[varline.var_def_index];
              var val = 0;
              switch (var_def.type) {
                case 'int':
                  val = 0 | tween(+keyframe1.val, +keyframe2.val, tween);
                  break;
                case 'float':
                  val = tween(+keyframe1.val, +keyframe2.val, tween);
                  break;
                case 'string':
                  val = keyframe1.val;
              }
              //console.log(prev_time, keyframe.time, time, "var", var_def.name, val, var_def.default_value);
              pose.var_map[var_def.name] = val;
            }
          });
        }

      }
    }
  });


  /**
   * @return {boolean}
   * @param {Object.<string,?>|Array.<?>} json
   * @param {string|number} key
   * @param {boolean=} def
   */
  function loadBool(json, key, def) {
    var value = json[key];
    switch (typeof(value)) {
      case 'string':
        return (value === 'true') ? true : false;
      case 'boolean':
        return value;
      default:
        return def || false;
    }
  }

  /**
   * @return {void}
   * @param {Object.<string,?>|Array.<?>} json
   * @param {string|number} key
   * @param {boolean} value
   * @param {boolean=} def
   */
  function saveBool(json, key, value, def) {
    if ((typeof(def) !== 'boolean') || (value !== def)) {
      json[key] = value;
    }
  }

  /**
   * @return {number}
   * @param {Object.<string,?>|Array.<?>} json
   * @param {string|number} key
   * @param {number=} def
   */
  function loadFloat(json, key, def) {
    var value = json[key];
    switch (typeof value) {
      case 'string':
        return parseFloat(value);
      case 'number':
        return value;
      default:
        return def || 0;
    }
  }

  /**
   * @return {void}
   * @param {Object.<string,?>|Array.<?>} json
   * @param {string|number} key
   * @param {number} value
   * @param {number=} def
   */
  function saveFloat(json, key, value, def) {
    if ((typeof(def) !== 'number') || (value !== def)) {
      json[key] = value;
    }
  }

  /**
   * @return {number}
   * @param {Object.<string,?>|Array.<?>} json
   * @param {string|number} key
   * @param {number=} def
   */
  function loadInt(json, key, def) {
    var value = json[key];
    switch (typeof value) {
      case 'string':
        return parseInt(value, 10);
      case 'number':
        return 0 | value;
      default:
        return def || 0;
    }
  }

  /**
   * @return {void}
   * @param {Object.<string,?>|Array.<?>} json
   * @param {string|number} key
   * @param {number} value
   * @param {number=} def
   */
  function saveInt(json, key, value, def) {
    if ((typeof(def) !== 'number') || (value !== def)) {
      json[key] = value;
    }
  }


  /**
   * @return {string}
   * @param {Object.<string,?>|Array.<?>} json
   * @param {string|number} key
   * @param {string=} def
   */
  function loadString(json, key, def) {
    var value = json[key];

    switch (typeof value) {
      case 'string':
        return value;
      default:
        return def || '';
    }
  }


  /**
   * @return {void}
   * @param {Object.<string,?>|Array.<?>} json
   * @param {string|number} key
   * @param {string} value
   * @param {string=} def
   */
  function saveString(json, key, value, def) {
    if ((typeof(def) !== 'string') || (value !== def)) {
      json[key] = value;
    }
  }


  /**
   * @return {Array}
   * @param {*} value
   */
  function makeArray(value) {
    if (Array.isArray(value)) {
      return value;
    }
    if (typeof value !== 'undefined') {
      return [value];
    }

    return [];
  }

  /**
   * @return {number}
   * @param {number} num
   * @param {number} min
   * @param {number} max
   */
  function wrap(num, min, max) {
    if (min < max) {
      if (num < min) {
        return max - ((min - num) % (max - min));
      }
      else {
        return min + ((num - min) % (max - min));
      }
    }
    else if (min === max) {
      return min;
    }
    else {
      return num;
    }
  }

  /**
   * @return {number}
   * @param {number} a
   * @param {number} b
   * @param {number} t
   */
  function interpolateLinear(a, b, t) {
    return a + ((b - a) * t);
  }

  /**
   * @return {number}
   * @param {number} a
   * @param {number} b
   * @param {number} c
   * @param {number} t
   */
  function interpolateQuadratic(a, b, c, t) {
    return interpolateLinear(interpolateLinear(a, b, t), interpolateLinear(b, c, t), t);
  }

  /**
   * @return {number}
   * @param {number} a
   * @param {number} b
   * @param {number} c
   * @param {number} d
   * @param {number} t
   */
  function interpolateCubic(a, b, c, d, t) {
    return interpolateLinear(interpolateQuadratic(a, b, c, t), interpolateQuadratic(b, c, d, t), t);
  }

  /**
   * @return {number}
   * @param {number} a
   * @param {number} b
   * @param {number} c
   * @param {number} d
   * @param {number} e
   * @param {number} t
   */
  function interpolateQuartic(a, b, c, d, e, t) {
    return interpolateLinear(interpolateCubic(a, b, c, d, t), interpolateCubic(b, c, d, e, t), t);
  }

  /**
   * @return {number}
   * @param {number} a
   * @param {number} b
   * @param {number} c
   * @param {number} d
   * @param {number} e
   * @param {number} f
   * @param {number} t
   */
  function interpolateQuintic(a, b, c, d, e, f, t) {
    return interpolateLinear(interpolateQuartic(a, b, c, d, e, t), interpolateQuartic(b, c, d, e, f, t), t);
  }

  /**
   * @return {number}
   * @param {number} x1
   * @param {number} y1
   * @param {number} x2
   * @param {number} y2
   * @param {number} t
   */
  function interpolateBezier(x1, y1, x2, y2, t) {
    function SampleCurve(a, b, c, t) {
      return ((a * t + b) * t + c) * t;
    }

    function SampleCurveDerivativeX(ax, bx, cx, t) {
      return (3.0 * ax * t + 2.0 * bx) * t + cx;
    }

    function SolveEpsilon(duration) {
      return 1.0 / (200.0 * duration);
    }

    function Solve(ax, bx, cx, ay, by, cy, x, epsilon) {
      return SampleCurve(ay, by, cy, SolveCurveX(ax, bx, cx, x, epsilon));
    }

    function SolveCurveX(ax, bx, cx, x, epsilon) {
      var t0;
      var t1;
      var t2;
      var x2;
      var d2;
      var i;

      // First try a few iterations of Newton's method -- normally very fast.
      for (t2 = x, i = 0; i < 8; i++) {
        x2 = SampleCurve(ax, bx, cx, t2) - x;
        if (Math.abs(x2) < epsilon) return t2;

        d2 = SampleCurveDerivativeX(ax, bx, cx, t2);
        if (Math.abs(d2) < epsilon) break;

        t2 = t2 - x2 / d2;
      }

      // Fall back to the bisection method for reliability.
      t0 = 0.0;
      t1 = 1.0;
      t2 = x;

      if (t2 < t0) return t0;
      if (t2 > t1) return t1;

      while (t0 < t1) {
        x2 = SampleCurve(ax, bx, cx, t2);
        if (Math.abs(x2 - x) < epsilon) return t2;
        if (x > x2) t0 = t2;
        else t1 = t2;
        t2 = (t1 - t0) * 0.5 + t0;
      }

      return t2; // Failure.
    }

    var duration = 1;
    var cx = 3.0 * x1;
    var bx = 3.0 * (x2 - x1) - cx;
    var ax = 1.0 - cx - bx;
    var cy = 3.0 * y1;
    var by = 3.0 * (y2 - y1) - cy;
    var ay = 1.0 - cy - by;

    return Solve(ax, bx, cx, ay, by, cy, t, SolveEpsilon(duration));
  }


  /**
   * @return {number}
   * @param {number} a
   * @param {number} b
   * @param {number} t
   */
  function tween(a, b, t) {
    return a + ((b - a) * t);
  }

  /**
   * @return {number}
   * @param {number} angle
   */
  function wrapAngleRadians(angle) {
    if (angle <= 0.0) {
      return ((angle - Math.PI) % (2.0 * Math.PI)) + Math.PI;
    }
    else {
      return ((angle + Math.PI) % (2.0 * Math.PI)) - Math.PI;
    }
  }

  /**
   * @return {number}
   * @param {number} a
   * @param {number} b
   * @param {number} t
   * @param {number} spin
   */
  function tweenAngleRadians(a, b, t, spin) {
    if (spin === 0) {
      return a;
    } else if (spin > 0) {
      if ((b - a) < 0.0) {
        b += 2.0 * Math.PI;
      }
    } else if (spin < 0) {
      if ((b - a) > 0) {
        b -= 2.0 * Math.PI;
      }
    }

    return wrapAngleRadians(a + (wrapAngleRadians(b - a) * t));
  }

}(window.cc));