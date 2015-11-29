/**
 * Spriter plugin for Cocos2d-JS
 * @version 1.0.2
 * @author Denis Baskovsky (denis@baskovsky.ru)
 *
 * Based on Spriter.js by:
 * - Isaac Burns <isaacburns@gmail.com>
 */
!function (window, cc, spriter) {
  'use strict';
  cc.Spriter = cc.Sprite.extend({
    /* Loading indicator */
    _ready: false,

    /* Resources paths */
    sconLink: '',
    sconPath: '',

    _entity: null,
    _animation: null,

    data: null,
    pose: null,

    spriteMap: new WeakMap(),
    /* time step in milliseconds */
    timeStep: 0.0,

    /**
     * Spriter constructor
     * @param {String} sconLink scon file to use for this animation
     */
    ctor (sconLink) {
      this._super();

      this.timeStep = cc.director.getAnimationInterval() * 1000;

      this.sconLink = sconLink;
      this.preload(data => {
        if (data.error) {
          throw data.error;
        }
        this._ready = true;
        this.setEntity(this._entity);
        this.setAnim(this._animation);
        this.scheduleUpdate();
      });
    },

    /**
     * Set entity
     * @param entity
     */
    setEntity (entity) {
      this._entity = entity;

      if (this._ready) {
        this.pose.setEntity(entity);
      }
    },

    /**
     * Set animation
     * @param animation
     */
    setAnim (animation) {
      this._animation = animation;

      if (this._ready) {
        this.pose.setAnim(animation);
      }
    },

    /**
     * Prealod scon resource
     * @param {function} callback
     */
    preload (callback) {
      let sconLink = this.sconLink;

      if (this._ready) {
        return callback({
          error: 'уже установлено'
        });
      }

      cc.loader.loadJson(sconLink, (error, scon) => {
        if (error) {
          return callback({error});
        }

        let sconPath = scon.sconPath = sconLink.replace(/\w+.scon$/, '');
        let loaderIndex = 0;

        let data = this.data = new spriter.Data().load(scon); // create and load Spriter data from SCON file
        let pose = this.pose = new spriter.Pose(data); // create Spriter pose and attach data

        /* Getting file count */
        scon.folder.forEach(folder => folder.file.forEach(() => ++loaderIndex));

        data.folder_array.forEach(folder => {
          folder.file_array.forEach(file => {

            switch (file.type) {
              case 'image':
                let image_key = file.name;
                let fileUrl = sconPath + file.name;

                cc.loader.loadImg(fileUrl, (error, img) => {
                  if (error) {
                    return callback({error});
                  }

                  let texture = new cc.Texture2D();
                  texture.initWithElement(img);

                  let spriteFrame = new cc.SpriteFrame();
                  spriteFrame.setTexture(texture);

                  let rect = cc.rect(0, 0, file.width, file.height);
                  spriteFrame.setRect(rect);

                  cc.spriteFrameCache.addSpriteFrame(spriteFrame, image_key);

                  if (--loaderIndex === 0) {
                    return callback({error: false});
                  }
                });
                break;

              case 'sound':
                break;

              default:
                cc.log('TODO: load', file.type, file.name);
                break;
            }
          });
        });
      });

    },

    /**
     * Update every tick
     * @param dt
     */
    update (dt) {
      let pose = this.pose;
      pose.update(this.timeStep); // accumulate time
      pose.strike(); // process time slice

      this.children.forEach(child => {
        child.opacity = 0;
      });

      pose.object_array.forEach(object => {
        switch (object.type) {
          case 'sprite':
            let folder = pose.data.folder_array[object.folder_index];
            if (!folder) {
              return;
            }
            let file = folder.file_array[object.file_index];
            if (!file) {
              return;
            }

            let image_key = file.name;
            let spriteFrame = cc.spriteFrameCache.getSpriteFrame(image_key);
            if (!spriteFrame) {
              return;
            }

            let sprite;
            let worldSpace = object.world_space;
            let spriteCache = this.spriteMap.get(object);

            if (!spriteCache) {
              sprite = new cc.Sprite();
              sprite.setSpriteFrame(spriteFrame);
              this.spriteMap.set(object, sprite);
              this.addChild(sprite);
            } else {
              sprite = spriteCache;
              sprite.texture = spriteFrame.getTexture();
            }

            sprite.opacity = object.alpha * 255;
            sprite.x = worldSpace.position.x;
            sprite.y = worldSpace.position.y;
            sprite.scaleX = worldSpace.scale.x;
            sprite.scaleY = worldSpace.scale.y;
            sprite.rotation = -worldSpace.rotation.deg;

            break;
          case 'entity':
            cc.log('TODO ');
            break;
        }
      });

    }
  });
}(window, window.cc, spriter);