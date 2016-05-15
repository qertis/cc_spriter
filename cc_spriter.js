/**
 * Spriter plugin for Cocos2D-JS
 * @version 1.1.4
 * @author Denis Baskovsky (denis@baskovsky.ru)
 *
 * Based on Spriter.js by:
 * - Isaac Burns <isaacburns@gmail.com>
 */
!function (window, cc, spriter) {
  'use strict';

  let pose = {};
  let _sconPath = ''; // Resource scon path

  cc.Spriter = cc.Sprite.extend({

    _ready: false, // Loading indicator
    _entity: null,
    _animation: null,
    _loop: true,

    timeStep: 0.0,// delta time in milliseconds
    sprites: [],

    /**
     * @constructor
     * @param {String} sconLink scon file to use for this animation
     */
    ctor(sconLink) {

      this._super();
      this.timeStep = cc.director.getAnimationInterval() * 1000;
      this._sconLink = sconLink;

      _sconPath = this._getSconPath(sconLink);

      this._preload(data => {
        if (data.error) {
          throw data.error;
        }

        this._ready = true;
        this._initSpriteFrames();
        this.removeAllChildren();
        this.setEntity(this._entity);
        this.setAnim(this._animation);
        this.scheduleUpdateWithPriority(0);
      });

    },

    /**
     * Every tick timer
     * @public
     */
    update() {

      pose.update(this.timeStep);
      pose.strike(); // process time slice

      this._hideAllSprites();
      this._updateSpriteFrames(this._getObjectArraySprites());

      if (!this._loop) {
        this.compareFinishAnimation();
      }

    },

    /**
     *
     */
    compareFinishAnimation() {
      const newTime = pose.getTime();

      if (newTime > this._currentAnimationTime) {
        this._currentAnimationTime = newTime;
      } else {
        this.stopAnimation();
      }

    },

    /**
     *
     */
    stopAnimation() {
      pose.setTime(0);
      this._animationFinish = true;
      this.pause();
    },

    /**
     *
     * @param value {Boolean}
     */
    setLoop(value) {
      this._animationFinish = false;

      if (value) {
        this._loop = true;
      } else {
        this._loop = false;
        this._currentAnimationTime = 0.0;
      }

      this.resume();
    },

    /**
     * Set entity
     * @param {String} entity
     * @public
     */
    setEntity(entity) {

      this._entity = entity;

      if (this._ready) {
        pose.setEntity(entity);
      }

    },

    /**
     * Set animation
     * @param {String} animation
     * @public
     */
    setAnim(animation) {

      this._animation = animation;

      if (this._ready) {
        pose.setAnim(animation);
      }

    },

    /**
     * Prealod scon resource
     * @param {function} callback
     * @return {function}
     * @private
     */
    _preload(callback) {

      if (this._ready) {
        return callback({
          error: 'is ready'
        });
      }

      cc.loader.loadJson(this._sconLink, (error, scon) => {
        if (error) {
          return callback({error});
        }

        let loaderIndex = 0;

        // create and load Spriter data from SCON file
        const data = new spriter.Data().load(scon);
        // create Spriter pose and attach data
        pose = new spriter.Pose(data);

        // Getting file count
        scon.folder.forEach(folder => folder.file.forEach(() => ++loaderIndex));

        data.folder_array.forEach(folder => {
          folder.file_array.forEach(file => {

            switch (file.type) {
              case 'image': {
                const image_key = file.name;
                const fileUrl = _sconPath + file.name;

                cc.loader.loadImg(fileUrl, (error, img) => {
                  if (error) {
                    return callback({error});
                  }

                  const rect = cc.rect(0, 0, file.width, file.height);
                  const sprite = new cc.Sprite(img, rect);

                  if (!cc.spriteFrameCache.getSpriteFrame(image_key)) {
                    cc.spriteFrameCache.addSpriteFrame(sprite.getSpriteFrame(), image_key);
                  }

                  if (--loaderIndex === 0) {
                    return callback({error: false});
                  }
                });

                break;
              }

              default: {
                // TODO: Add
                // pose.bone_array
                // pose.event_array
                // pose.tag_array
                cc.warn('not load', file.type, file.name);
                break;
              }
            }
          });
        });
      });

    },

    /**
     * Get clear scon path
     * @param link {String}
     * @returns {string}
     * @private
     */
    _getSconPath(link) {
      return link.replace(/\w+.scon$/, '');
    },

    /**
     * Dynamic getting Array Sprite objects
     * @returns {Array}
     * @private
     */
    _getObjectArraySprites() {

      return pose.object_array.map(object => {

        if (object.type === 'sprite') {
          const folder = pose.data.folder_array[object.folder_index];
          const file = folder.file_array[object.file_index];
          const imageKey = file.name;
          const spriteFrame = cc.spriteFrameCache.getSpriteFrame(imageKey);

          return {
            file,
            imageKey,
            folder,
            object,
            spriteFrame
          };
        }

      });

    },

    /**
     * Initialize Sprite Frames
     * @private
     */
    _initSpriteFrames() {

      this._getObjectArraySprites()
        .forEach((e, i) => {
          e.myIndex = i;
          const worldSpace = e.object.world_space;
          const sprite = new cc.Sprite(e.spriteFrame);

          this._updateSprite(sprite, worldSpace, e);
          this.sprites.push(sprite);
          this.addChild(sprite);
        });

    },

    /**
     * Update sprite
     * @param sprite {cc.Sprite}
     * @param worldSpace {Object}
     * @param e {Object}
     * @private
     */
    _updateSprite(sprite, worldSpace, e) {

      sprite.setName(e.imageKey);
      sprite.opacity = e.object.alpha * 255;
      sprite.x = worldSpace.position.x;
      sprite.y = worldSpace.position.y;
      sprite.scaleX = worldSpace.scale.x;
      sprite.scaleY = worldSpace.scale.y;
      sprite.rotation = -worldSpace.rotation.deg;

      sprite.myFile = e.file;
      sprite.myFolder = e.folder;
      sprite.myIndex = e.myIndex;

    },

    /**
     * Find Sprite by object
     * @param e {Object}
     * @returns {cc.Sprite | undefined}
     * @private
     */
    _findSpriteByObject(e) {

      let sprite;

      for (let i = 0, len = this.sprites.length; i < len; i++) {
        sprite = this.sprites[i];

        if (Object.is(e.file, sprite.myFile) &&
          Object.is(e.folder, sprite.myFolder) &&
          Object.is(e.myIndex, sprite.myIndex)) {
          return sprite;
        }
      }

    },

    /**
     * Hide opacity for all sprites
     * @private
     */
    _hideAllSprites() {

      for (let i = 0, len = this.sprites.length; i < len; i++) {
        this.sprites[i].opacity = 0;
      }

    },

    /**
     * Update positions, opacity, rotate and other
     * @param objectArraySprites {Array}
     * @private
     */
    _updateSpriteFrames(objectArraySprites) {

      let e;
      let worldSpace;
      let sprite;

      for (let index = 0, len = objectArraySprites.length; index < len; index++) {
        e = objectArraySprites[index];
        e.myIndex = index;
        worldSpace = e.object.world_space;
        sprite = this._findSpriteByObject(e);

        // If sprite not found - creating a new sprite
        if (!sprite) {
          sprite = new cc.Sprite(e.spriteFrame);
          this.sprites.push(sprite);
          this.addChild(sprite);
        }

        this._updateSprite(sprite, worldSpace, e);
        sprite.zIndex = index;
      }

    }

  });

}(window, window.cc, spriter);