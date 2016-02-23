/**
 * Spriter plugin for Cocos2D-JS
 * @version 1.1.1
 * @author Denis Baskovsky (denis@baskovsky.ru)
 *
 * Based on Spriter.js by:
 * - Isaac Burns <isaacburns@gmail.com>
 */
!function (window, cc, spriter) {
  'use strict';

  const sprites = [];
  let pose = {};
  let timeStep = 0.0;// delta time in milliseconds
  let _sconLink = ''; // Resource scon link
  let _sconPath = ''; // Resource scon path

  cc.Spriter = cc.Sprite.extend({
    _ready: false, // Loading indicator
    _entity: null,
    _animation: null,

    /**
     * @constructor
     * @param {String} sconLink scon file to use for this animation
     */
    ctor (sconLink) {
      this._super();

      timeStep = cc.director.getAnimationInterval() * 1000;
      _sconLink = sconLink;
      _sconPath = sconLink.replace(/\w+.scon$/, '');

      this.preload(data => {
        if (data.error) {
          throw data.error;
        }
        this._ready = true;
        this.removeAllChildren();
        this.setEntity(this._entity);
        this.setAnim(this._animation);
        this.scheduleUpdateWithPriority(0);
      });
    },

    /**
     * Set entity
     * @param {String} entity
     */
    setEntity (entity) {
      this._entity = entity;

      if (this._ready) {
        pose.setEntity(entity);
      }
    },

    /**
     * Set animation
     * @param {String} animation
     */
    setAnim (animation) {
      this._animation = animation;

      if (this._ready) {
        pose.setAnim(animation);
      }
    },

    /**
     * Prealod scon resource
     * @param {function} callback
     */
    preload (callback) {
      if (this._ready) {
        return callback({
          error: 'is ready'
        });
      }

      cc.loader.loadJson(_sconLink, (error, scon) => {
        if (error) {
          return callback({error});
        }

        let loaderIndex = 0;

        const data = new spriter.Data().load(scon); // create and load Spriter data from SCON file
        pose = new spriter.Pose(data); // create Spriter pose and attach data

        /* Getting file count */
        scon.folder.forEach(folder => folder.file.forEach(() => ++loaderIndex));

        data.folder_array.forEach(folder => {
          folder.file_array.forEach(file => {

            switch (file.type) {
              case 'image':
              {
                let image_key = file.name;
                let fileUrl = _sconPath + file.name;

                cc.loader.loadImg(fileUrl, (error, img) => {
                  if (error) {
                    return callback({error});
                  }

                  let rect = cc.rect(0, 0, file.width, file.height);
                  let sprite = new cc.Sprite(img, rect);

                  if (!cc.spriteFrameCache.getSpriteFrame(image_key)) {
                    cc.spriteFrameCache.addSpriteFrame(sprite.getSpriteFrame(), image_key);
                  }

                  if (--loaderIndex === 0) {
                    return callback({error: false});
                  }
                });

                break;
              }

              default:
              {
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
     *
     * @returns {Array}
     * @private
     */
    _getObjectArraySprites() {

      return pose.object_array.map(object => {
        if (object.type === 'sprite') {
          const folder = pose.data.folder_array[object.folder_index];
          if (!folder) {
            return;
          }
          const file = folder.file_array[object.file_index];
          if (!file) {
            return;
          }

          const imageKey = file.name;
          const spriteFrame = cc.spriteFrameCache.getSpriteFrame(imageKey);
          if (!spriteFrame) {
            return;
          }

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
     *
     * @private
     */
    _initSpriteFrames() {

      this._getObjectArraySprites().forEach((e, i) => {
        let worldSpace = e.object.world_space;

        let sprite = new cc.Sprite(e.spriteFrame);

        this._updateSprite(sprite, worldSpace, e, i);
        sprites.push(sprite);
        this.addChild(sprite);

      });

    },

    /**
     * Обновить спрайт
     * @param sprite
     * @param worldSpace
     * @param e
     * @param i
     * @private
     */
    _updateSprite(sprite, worldSpace, e, i) {
      sprite.setName(e.imageKey);
      sprite.opacity = e.object.alpha * 255;
      sprite.x = worldSpace.position.x;
      sprite.y = worldSpace.position.y;
      sprite.scaleX = worldSpace.scale.x;
      sprite.scaleY = worldSpace.scale.y;
      sprite.rotation = -worldSpace.rotation.deg;

      sprite.myFile = e.file;
      sprite.myFolder = e.folder;
      sprite.myIndex = i;
    },

    // TODO: too many forEach! Их сейчас 4! (forEach, forEach, forEach и find)
    // Возможно в цикл с opacity = 0 нужно внедрить логику this._getObjectArraySprites()
    // У xxx иногда может быть больше length и поэтому логику нужно ставить туда
    _updateSpriteFrames() {

      const objectArraySprites = this._getObjectArraySprites();

      sprites.forEach((sprite) => {
        sprite.opacity = 0;
      });

      objectArraySprites.forEach((e, index) => {
        let worldSpace = e.object.world_space;

        // Find like object
        let sprite = sprites.find(a => {
          return (
            Object.is(e.file, a.myFile) &&
            Object.is(e.folder, a.myFolder) &&
            Object.is(a.myIndex, index)
          );
        });

        /**
         * Если спрайт найден - просто обновляем
         * Иначе создаем новый спрайт и добавляем его
         */
        if (sprite) {
          this._updateSprite(sprite, worldSpace, e, index);
        } else {
          sprite = new cc.Sprite(e.spriteFrame);
          this._updateSprite(sprite, worldSpace, e, index);

          sprites.push(sprite);
          this.addChild(sprite);
        }

        sprite.zIndex = index;
      });

    },

    /**
     * Update every tick
     */
    update () {
      pose.update(timeStep); // accumulate time
      pose.strike(); // process time slice

      if (sprites.length) {
        this._updateSpriteFrames();
      } else {
        this._initSpriteFrames();
      }

    }
  });

}(window, window.cc, spriter);