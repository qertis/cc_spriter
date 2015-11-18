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
                                //debugger;
                                var spriter_pos = new Pose(new Data().load(scon));
                                window.xxx = spriter_pos;
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
                xxx.setEntity('anim_list');
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


            xxx.strike();


            //xxx.setTime(anim_time = 0);
            if (anim_time >= (anim_length * anim_repeat)) {
                //xxx.setAnim(anim_keys[anim_index]);

                //debugger;
                xxx.setTime(anim_time = 0);
                //anim_length = spriter_pose.curAnimLength() || 1000;
                //anim_length = xxx.curAnimLength() || 1000;
            }


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
                            img.setRotation(cc.radiansToDegrees(-object.world_space.rotation.rad));
                            img.setScale(object.world_space.scale.x, object.world_space.scale.y);
                            img.setOpacity(object.alpha * 255);


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
            this.rad = 0;
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
        out = out || new spriter.Angle();
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
            //goog.inherits(spriter.Position, spriter.Vector);

        }
    });

    var Rotation = Angle.extend({
        ctor: function () {
            this._super();

            //goog.base(this, 0);
        }
    });

    var Scale = Vector.extend({
        ctor: function () {
            this._super();
            //goog.base(this, 1, 1);
        },
        /**
         * @return {spriter.Scale}
         */
        selfIdentity: function () {
            this.x = 1;
            this.y = 1;

            return this;
        }
    });

    var Pivot = Vector.extend({
        ctor: function () {
            this._super();

            //goog.base(this, 0, 1);
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
            space.position.x = loadFloat(json, 'x', 0);
            space.position.y = loadFloat(json, 'y', 0);
            space.rotation.deg = loadFloat(json, 'angle', 0);
            space.scale.x = loadFloat(json, 'scale_x', 1);
            space.scale.y = loadFloat(json, 'scale_y', 1);
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
        out.position.x = 0;
        out.position.y = 0;
        out.rotation.rad = 0;
        out.scale.x = 1;
        out.scale.y = 1;
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
     * @return {spriter.Space}
     * @param {spriter.Space} space
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
        var inv_scale_x = 1 / space.scale.x;
        var inv_scale_y = 1 / space.scale.y;
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
        if ((a.scale.x * a.scale.y) < 0) {
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
     * @param {number} tween
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


    /**
     * @return {spriter.Space}
     * @param {spriter.Space} ab
     * @param {spriter.Space} a
     * @param {spriter.Space=} out
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

    var File = cc.Class.extend({
        /** @type {number} */
        id: -1,
        /** @type {string} */
        name: '',
        /** @type {number} */
        width: 0,
        /** @type {number} */
        height: 0,
        /** @type {Pivot} */
        pivot: null,

        ctor: function () {
            var file = this;
            file.pivot = new Pivot();
        },
        /**
         * @return {File}
         * @param {Object.<string,?>} json
         */
        load: function (json) {
            var file = this;
            file.id = loadInt(json, 'id', -1);
            file.name = loadString(json, 'name', "");
            file.width = loadInt(json, 'width', 0);
            file.height = loadInt(json, 'height', 0);
            file.pivot.x = loadFloat(json, 'pivot_x', 0);
            file.pivot.y = loadFloat(json, 'pivot_y', 1);
            return file;
        }
    });

    var Folder = cc.Class.extend({
        /** @type {number} */
        id: -1,
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
            folder.id = loadInt(json, 'id', -1);
            folder.file_array.length = 0;
            json.file = makeArray(json.file);
            json.file.forEach(function (file) {
                folder.file_array.push(new File().load(file));
            });

            return folder;
        }
    });

    var Object = cc.Class.extend({

        /** @type {number} */
        id: -1,
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
        z_index: 0,
        /** @type {number} */
        alpha: 1,

        ctor: function () {
            this.local_space = new Space();
            this.world_space = new Space();
            this.pivot = new Pivot();
        },
        /**
         * @return {Object}
         * @param {Object.<string,?>} json
         */
        load: function (json) {
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

            return this;
        },
        /**
         * @return {Object}
         * @param {Object=} other
         */
        clone: function (other) {
            return (other || new Object()).copy(this);
        },

        /**
         * @return {Object}
         * @param {Object} other
         */
        copy: function (other) {
            this.id = other.id;
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
         * @param {Object} other
         * @param {number} tween
         * @param {number} spin
         */
        tween: function (other, t, spin) {
            Space.tween(this.local_space, other.local_space, t, spin, this.local_space);
            Vector.tween(this.pivot, other.pivot, t, this.pivot);
            this.alpha = tween(this.alpha, other.alpha, t);
        }

    });

    var Transform = cc.Class.extend({
        ctor: function () {
            this.position = new Vector();
            this.rotation = new Angle();
            this.scale = new Vector(1, 1);
        },
        /**
         * @return {Transform}
         * @param {Transform} other
         */
        copy: function (other) {
            this.position.copy(other.position);
            this.rotation.copy(other.rotation);
            this.scale.copy(other.scale);
            return this;
        },

        /**
         * @return {Transform}
         * @param {Object.<string,?>} json
         */
        load: function (json) {
            this.position.x = loadFloat(json, 'x', 0);
            this.position.y = loadFloat(json, 'y', 0);
            this.rotation.deg = loadFloat(json, 'angle', 0);
            this.scale.x = loadFloat(json, 'scale_x', 1);
            this.scale.y = loadFloat(json, 'scale_y', 1);

            return this;
        }
    });

    /**
     * @return {boolean}
     * @param {Transform} a
     * @param {Transform} b
     * @param {number=} epsilon
     */
    Transform.equal = function (a, b, epsilon) {
        epsilon = epsilon || cc.math.EPSILON;
        if (Math.abs(a.position.x - b.position.x) > epsilon) {
            return false;
        } else if (Math.abs(a.position.y - b.position.y) > epsilon) {
            return false;
        } else if (Math.abs(a.rotation.rad - b.rotation.rad) > epsilon) {
            return false;
        } else if (Math.abs(a.scale.x - b.scale.x) > epsilon) {
            return false;
        } else if (Math.abs(a.scale.y - b.scale.y) > epsilon) {
            return false;
        }

        return true;
    };

    /**
     * @return {Transform}
     * @param {Transform=} out
     */
    Transform.identity = function (out) {
        out = out || new Transform();
        out.position.x = 0;
        out.position.y = 0;
        out.rotation.rad = 0;
        out.scale.x = 1;
        out.scale.y = 1;

        return out;
    };

    /**
     * @return {Transform}
     * @param {Transform} space
     * @param {number} x
     * @param {number} y
     */
    Transform.translate = function (space, x, y) {
        cc.log('depricated')
        return;

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
     * @return {Transform}
     * @param {Transform} space
     * @param {number} rad
     */
    Transform.rotate = function (space, rad) {
        space.rotation.rad = wrapAngleRadians(space.rotation.rad + rad);

        return space;
    };

    /**
     * @return {Transform}
     * @param {Transform} space
     * @param {number} x
     * @param {number} y
     */
    Transform.scale = function (space, x, y) {
        space.scale.x *= x;
        space.scale.y *= y;

        return space;
    };

    /**
     * @return {Transform}
     * @param {Transform} space
     * @param {Transform=} out
     */
    Transform.invert = function (space, out) {
        // invert
        // out.sca = space.sca.inv();
        // out.rot = space.rot.inv();
        // out.pos = space.pos.neg().rotate(space.rot.inv()).mul(space.sca.inv());

        out = out || new Transform();
        var inv_scale_x = 1 / space.scale.x;
        var inv_scale_y = 1 / space.scale.y;
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
     * @return {Transform}
     * @param {Transform} a
     * @param {Transform} b
     * @param {Transform=} out
     */
    Transform.combine = function (a, b, out) {
        // combine
        // out.pos = b.pos.mul(a.sca).rotate(a.rot).add(a.pos);
        // out.rot = b.rot.mul(a.rot);
        // out.sca = b.sca.mul(a.sca);

        out = out || new Transform();
        var x = b.position.x * a.scale.x;
        var y = b.position.y * a.scale.y;
        var rad = a.rotation.rad;
        var c = Math.cos(rad);
        var s = Math.sin(rad);
        var tx = c * x - s * y;
        var ty = s * x + c * y;
        out.position.x = tx + a.position.x;
        out.position.y = ty + a.position.y;
        if ((a.scale.x * a.scale.y) < 0) {
            out.rotation.rad = wrapAngleRadians(a.rotation.rad - b.rotation.rad);
        } else {
            out.rotation.rad = wrapAngleRadians(b.rotation.rad + a.rotation.rad);
        }
        out.scale.x = b.scale.x * a.scale.x;
        out.scale.y = b.scale.y * a.scale.y;

        return out;
    };

    /**
     * @return {Transform}
     * @param {Transform} ab
     * @param {Transform} a
     * @param {Transform=} out
     */
    Transform.extract = function (ab, a, out) {
        // extract
        // out.sca = ab.sca.mul(a.sca.inv());
        // out.rot = ab.rot.mul(a.rot.inv());
        // out.pos = ab.pos.add(a.pos.neg()).rotate(a.rot.inv()).mul(a.sca.inv());

        out = out || new Transform();
        out.scale.x = ab.scale.x / a.scale.x;
        out.scale.y = ab.scale.y / a.scale.y;
        if ((a.scale.x * a.scale.y) < 0) {
            out.rotation.rad = wrapAngleRadians(a.rotation.rad + ab.rotation.rad);
        } else {
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
     * @param {Transform} space
     * @param {Vector} v
     * @param {Vector=} out
     */
    Transform.transform = function (space, v, out) {
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
     * @param {Transform} space
     * @param {Vector} v
     * @param {Vector=} out
     */
    Transform.untransform = function (space, v, out) {
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
     * @return {Transform}
     * @param {Transform} a
     * @param {Transform} b
     * @param {number} twn
     * @param {number} spin
     * @param {Transform=} out
     */
    Transform.tween = function (a, b, twn, spin, out) {
        out.position.x = tween(a.position.x, b.position.x, twn);
        out.position.y = tween(a.position.y, b.position.y, twn);
        out.rotation.rad = tweenAngleRadians(a.rotation.rad, b.rotation.rad, twn, spin);
        out.scale.x = tween(a.scale.x, b.scale.x, twn);
        out.scale.y = tween(a.scale.y, b.scale.y, twn);

        return out;
    };

    /**
     * Bone
     */
    var Bone = cc.Class.extend({

        /** @type {number} */
        id: -1,
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
            this.id = loadInt(json, 'id', -1);
            this.parent_index = loadInt(json, 'parent', -1);
            this.local_space.load(json);
            this.world_space.copy(this.local_space);

            return this;
        },

        /**
         * @return {Bone}
         * @param {Bone=} other
         */
        clone: function (other) {
            return (other || new Bone()).copy(this);
        },

        /**
         * @return {Bone}
         * @param {Bone} other
         */
        copy: function (other) {
            this.id = other.id;
            this.parent_index = other.parent_index;
            this.local_space.copy(other.local_space);
            this.world_space.copy(other.world_space);

            return this;
        },
        /**
         * @return {void}
         * @param {Bone} other
         * @param {number} tween
         * @param {number} spin
         */
        tween: function (other, tween, spin) {
            Transform.tween(this.local_space, other.local_space, tween, spin, this.local_space);
        }
    });

    /**
     * @return {Transform}
     * @param {Bone} bone
     * @param {Array.<Bone>} bones
     * @param {Transform=} out
     */
    Bone.flatten = function (bone, bones, out) {
        out = out || new Space();
        var parent_bone = bones[bone.parent_index];
        if (parent_bone) {
            Bone.flatten(parent_bone, bones, out);
        } else {
            Space.identity(out);
        }
        Space.combine(out, bone.local_space, out);

        return out;
    };

    var BoneRef = cc.Class.extend({
        /** @type {number} */
        parent_index: -1,
        /** @type {number} */
        timeline_index: -1,
        /** @type {number} */
        keyframe_index: -1,

        ctor: function () {

        },
        /**
         * @return {BoneRef}
         * @param {Object.<string,?>} json
         */
        load: function (json) {
            this.id = loadInt(json, 'id', -1);
            this.parent_index = loadInt(json, 'parent', -1);
            this.timeline_index = loadInt(json, 'timeline', -1);
            this.keyframe_index = loadInt(json, 'key', -1);

            return this;
        },

        /**
         * @return {BoneRef}
         * @param {BoneRef=} other
         */
        clone: function (other) {
            return (other || new BoneRef()).copy(this);
        },

        /**
         * @return {BoneRef}
         * @param {BoneRef} other
         */
        copy: function (other) {
            this.id = other.id;
            this.parent_index = other.parent_index;
            this.timeline_index = other.timeline_index;
            this.keyframe_index = other.keyframe_index;

            return this;
        }

    });

    var ObjectRef = cc.Class.extend({
        /** @type {number} */
        id: -1,
        /** @type {number} */
        parent_index: -1,
        /** @type {number} */
        timeline_index: -1,
        /** @type {number} */
        keyframe_index: -1,
        /** @type {number} */
        z_index: 0,

        ctor: function () {
        },

        /**
         * @return {ObjectRef}
         * @param {Object.<string,?>} json
         */
        load: function (json) {
            this.id = loadInt(json, 'id', -1);
            this.parent_index = loadInt(json, 'parent', -1);
            this.timeline_index = loadInt(json, 'timeline', -1);
            this.keyframe_index = loadInt(json, 'key', -1);
            this.z_index = loadInt(json, 'z_index', 0);

            return this;
        },

        /**
         * @return {ObjectRef}
         * @param {ObjectRef=} other
         */
        clone: function (other) {
            return (other || new ObjectRef()).copy(this);
        },

        /**
         * @return {ObjectRef}
         * @param {ObjectRef} other
         */
        copy: function (other) {
            this.id = other.id;
            this.parent_index = other.parent_index;
            this.timeline_index = other.timeline_index;
            this.keyframe_index = other.keyframe_index;
            this.z_index = other.z_index;

            return this;
        }
    });

    var Keyframe = cc.Class.extend({
        /** @type {number} */
        id: -1,
        /** @type {number} */
        time: 0,

        ctor: function () {
        },
        /**
         * @return {Keyframe}
         * @param {Object.<string,?>} json
         */
        load: function (json) {
            this.id = loadInt(json, 'id', -1);
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

    /**
     * @constructor
     * @extends {Keyframe}
     */
    var MainlineKeyframe = Keyframe.extend({

        /** @type {Array.<Bone|BoneRef>} */
        bone_array: null,
        /** @type {Array.<Object|ObjectRef>} */
        object_array: null,


        ctor: function () {

            //goog.base(this);

        },

        /**
         * @return {MainlineKeyframe}
         * @param {Object.<string,?>} json
         */
        load: function (json) {
            var mainline_keyframe = this;

            Keyframe.prototype.load.call(this, json);

            // combine bones and bone_refs into one array and sort by id
            mainline_keyframe.bone_array = [];

            json.bone = makeArray(json.bone);
            json.bone.forEach(function (bone_json) {
                mainline_keyframe.bone_array.push(new Bone().load(bone_json));
            });

            json.bone_ref = makeArray(json.bone_ref);
            json.bone_ref.forEach(function (bone_ref_json) {
                mainline_keyframe.bone_array.push(new BoneRef().load(bone_ref_json));
            });

            mainline_keyframe.bone_array = mainline_keyframe.bone_array.sort(function (a, b) {
                return a.id - b.id;
            });

            //combine objects and object_refs into one array and sort by id
            mainline_keyframe.object_array = [];

            json.object = makeArray(json.object);
            json.object.forEach(function (object_json) {
                mainline_keyframe.object_array.push(new Object().load(object_json));
            });

            json.object_ref = makeArray(json.object_ref);
            json.object_ref.forEach(function (object_ref_json) {
                mainline_keyframe.object_array.push(new ObjectRef().load(object_ref_json));
            });

            mainline_keyframe.object_array = mainline_keyframe.object_array.sort(function (a, b) {
                return a.id - b.id;
            });

            return mainline_keyframe;

        }

    });

    var Mainline = cc.Class.extend({
        /** @type {Array.<MainlineKeyframe>} */
        keyframe_array: null,

        ctor: function () {
            /** @type {Array.<MainlineKeyframe>} */
            this.keyframes = [];
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
        type: '',
        /** @type {number} */
        spin: 1, // 1: counter-clockwise, -1: clockwise
        /** @type {number} */
        curve: 1, // 0: instant, 1: linear, 2: quadratic, 3: cubic
        /** @type {number} */
        c1: 0,
        /** @type {number} */
        c2: 0,

        /**
         * @constructor
         * @extends {Keyframe}
         * @param {string} type
         */
        ctor: function (type) {
            //goog.base(this);
            this.type = type;
        },

        /**
         * @return {TimelineKeyframe}
         * @param {Object.<string,?>} json
         */
        load: function (json) {
            this.id = loadInt(json, 'id', -1);
            this.time = loadInt(json, 'time', 0);
            this.spin = loadInt(json, 'spin', 1);
            this.curve = loadInt(json, 'curve_type', 1);
            this.c1 = loadInt(json, 'c1', 0);
            this.c2 = loadInt(json, 'c2', 0);

            return this;
        },

        evaluateCurve: function (time, time1, time2) {
            if (time1 === time2) {
                return 0;
            }

            var tween = (time - time1) / (time2 - time1);

            switch (this.curve) {
                case 0:
                    return 0;
                // instant
                case 1:
                    return tween;
                // linear
                case 2:
                    return interpolateQuadratic(0.0, this.c1, 1.0, tween);
                case 3:
                    return interpolateCubic(0.0, this.c1, this.c2, 1.0, tween);

                default:
                    return 0;
            }


            /*SIMPLE*/
            //var timeline_keyframe = this;
            //if (time1 === time2) { return 0; }
            //if (timeline_keyframe.curve === 0) { return 0; } // instant
            //var tween = (time - time1) / (time2 - time1);
            //if (timeline_keyframe.curve === 1) { return tween; } // linear
            //if (timeline_keyframe.curve === 2) { return interpolateQuadratic(0.0, timeline_keyframe.c1, 1.0, tween); }
            //if (timeline_keyframe.curve === 3) { return interpolateCubic(0.0, timeline_keyframe.c1, timeline_keyframe.c2, 1.0, tween); }
            //return 0;

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
            /** @type {Bone} */
            this.bone = null;
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
    var ObjectTimelineKeyframe = TimelineKeyframe.extend({
        /** @type {Object} */
        object: null,
        /**
         * @constructor
         * @extends {TimelineKeyframe}
         */
        ctor: function () {
            /** @type {Object} */
            this.object = null;
        },

        /**
         * @return {TimelineKeyframe}
         * @param {Object.<string,?>} json
         */
        load: function (json) {
            TimelineKeyframe.prototype.load.call(this, json);
            this.object = new Object().load(json.object || {});
            return this;
        }
    });

    var Timeline = cc.Class.extend({

        /** @type {number} */
        id: -1,
        /** @type {string} */
        name: '',
        /** @type {string} */
        type: '',
        /** @type {number} */
        index: -1,
        /** @type {Array.<TimelineKeyframe>} */
        keyframe_array: null,

        ctor: function () {
            /** @type {number} */
            this.id = -1;
            /** @type {string} */
            this.name = '';
            /** @type {string} */
            this.type = '';
            /** @type {number} */
            this.index = -1;

            /** @type {Array.<TimelineKeyframe>} */
            this.keyframes = null;
        },

        /**
         * @return {Timeline}
         * @param {Object.<string,?>} json
         */
        load: function (/*data, */json) {
            var timeline = this;
            timeline.id = loadInt(json, 'id', -1);
            timeline.name = loadString(json, 'name', "");
            timeline.type = loadString(json, 'object_type', "sprite");
            timeline.index = loadInt(json, 'obj', -1);
            timeline.keyframe_array = [];
            json.key = makeArray(json.key);
            switch (timeline.type) {
                case 'sprite':
                    json.key.forEach(function (key_json) {
                        timeline.keyframe_array.push(new ObjectTimelineKeyframe().load(key_json));
                    });
                    break;
                case 'bone':
                    json.key.forEach(function (key_json) {
                        timeline.keyframe_array.push(new BoneTimelineKeyframe().load(key_json));
                    });
                    break;
                case 'box':
                case 'point':
                case 'sound':
                case 'entity':
                case 'variable':
                default:
                    console.log("TODO: Timeline::load", timeline.type);
                    break;
            }
            timeline.keyframe_array = timeline.keyframe_array.sort(Keyframe.compare);
            return timeline;

        }
    });

    function EventlineKeyframe(json) {
        this.id = loadInt(json, 'id', -1);
        this.time = loadInt(json, 'time', 0);
    }

    function Eventline(json) {
        this.id = loadInt(json, 'id', -1);
        this.name = loadString(json, 'name', '');
        this.keys = [];

        for (var i = 0, len = json.key.length; i < len; i++) {
            this.keys.push(new EventlineKeyframe(json.key[i]));
        }
        this.keys = this.keys.sort(Keyframe.compare);
    }

    var Animation = cc.Class.extend({

        /** @type {number} */
        id: -1,
        /** @type {string} */
        name: '',
        /** @type {number} */
        length: 0,
        /** @type {string} */
        looping: 'true', // "true", "false" or "ping_pong"
        /** @type {number} */
        loop_to: 0,
        /** @type {Mainline} */
        mainline: null,
        /** @type {Array.<Timeline>} */
        timeline_array: null,
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
            anim.id = loadInt(json, 'id', -1);
            anim.name = loadString(json, 'name', "");
            anim.length = loadInt(json, 'length', 0);
            anim.looping = loadString(json, 'looping', "true");
            anim.loop_to = loadInt(json, 'loop_to', 0);
            json.mainline = json.mainline || {};
            anim.mainline = new Mainline().load(json.mainline);
            anim.timeline_array = [];
            json.timeline = makeArray(json.timeline);
            json.timeline.forEach(function (timeline_json) {
                anim.timeline_array.push(new Timeline().load(timeline_json));
            });
            anim.min_time = 0;
            anim.max_time = anim.length;
            return anim;
        }

    });

    var Entity = cc.Class.extend({

        /** @type {number} */
        id: -1,
        /** @type {string} */
        name: '',
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

            entity.id = loadInt(json, 'id', -1);
            entity.name = loadString(json, 'name', '');

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
            json.folder.forEach(function (folder) {
                data.folder_array.push(new Folder().load(folder));
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

                    animation.mainline.keyframe_array.forEach(function (mainline_keyframe) {
                        mainline_keyframe.object_array.forEach(function (object) {
                            if (object instanceof Object) {
                                if (object.default_pivot) {
                                    var folder = data.folder_array[object.folder_index];
                                    var file = folder.file_array[object.file_index];
                                    object.pivot.copy(file.pivot);
                                }
                            }
                        });
                    });

                    animation.timeline_array.forEach(function (timeline) {
                        timeline.keyframe_array.forEach(function (timeline_keyframe) {
                            if (timeline_keyframe instanceof ObjectTimelineKeyframe) {
                                var object = timeline_keyframe.object;
                                if (object.default_pivot) {
                                    var folder = data.folder_array[object.folder_index];
                                    var file = folder.file_array[object.file_index];
                                    object.pivot.copy(file.pivot);
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
        },

        getFilePivot: function (folderIdx, fileIdx) {
            return this.textures[folderIdx][fileIdx].pivot;
        },

        getFileTexture: function (folderIdx, fileIdx) {
            return this.textures[folderIdx][fileIdx].getTexture();
        },

        /**
         * Get entity object
         * @param  {String} entityName Name of the entity
         * @return {Entity}
         */
        getEntity: function (entityName) {
            cc.log('depricated')
            //return;


            if (!this.entity_map.hasOwnProperty(entityName)) {
                throw 'entity not found';
            }

            return this.entity_map[entityName];
        },
        /**
         * @return {Array.<string>}
         */
        getEntityKeys: function () {
            //cc.log('depricated')
            return this.entity_keys;

            //return this.entityNames;
        }
    });

    var Pose = cc.Class.extend({

        /** @type {Data} */
        data: null,
        /** @type {string} */
        entity_key: '',
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

        /**
         * @constructor
         * @param {Data=} data
         */
        ctor: function (data) {
            this.data = data || null;

            this.bone_array = [];
            this.object_array = [];
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
            this.setTime(this.getTime() + elapsed_time);
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

            var anim = pose.curAnim();

            var time = pose.time;
            var elapsed_time = pose.elapsed_time;

            pose.elapsed_time = 0; // reset elapsed time for next update

            if (anim) {
                var mainline_keyframe_array = anim.mainline.keyframe_array;
                var mainline_keyframe_index = Keyframe.find(mainline_keyframe_array, time);
                var mainline_keyframe = mainline_keyframe_array[mainline_keyframe_index];

                var timeline_array = anim.timeline_array;

                var data_bone_array = mainline_keyframe.bone_array;
                var pose_bone_array = pose.bone_array;

                data_bone_array.forEach(function (data_bone, bone_index) {
                    var pose_bone = pose_bone_array[bone_index] = (pose_bone_array[bone_index] || new Bone());

                    if (data_bone instanceof BoneRef) {
                        // bone is a BoneRef, dereference
                        var timeline_index = data_bone.timeline_index;
                        var keyframe_index = data_bone.keyframe_index;
                        var timeline = timeline_array[timeline_index];
                        var timeline_keyframe_array = timeline.keyframe_array;
                        var timeline_keyframe = timeline_keyframe_array[keyframe_index];

                        var time1 = timeline_keyframe.time;
                        var bone1 = timeline_keyframe.bone;
                        pose_bone.copy(bone1);
                        pose_bone.parent_index = data_bone.parent_index; // set parent from bone_ref

                        // see if there's something to tween with
                        var keyframe_index2 = (keyframe_index + 1) % timeline_keyframe_array.length;
                        if (keyframe_index !== keyframe_index2) {
                            var timeline_keyframe2 = timeline_keyframe_array[keyframe_index2];
                            var time2 = timeline_keyframe2.time;
                            if (time2 < time1) {
                                time2 = anim.length;
                            }
                            var bone2 = timeline_keyframe2.bone;

                            var tween = timeline_keyframe.evaluateCurve(time, time1, time2);
                            pose_bone.tween(bone2, tween, timeline_keyframe.spin);
                        }
                    }
                    else if (data_bone instanceof Bone) {
                        // bone is a Bone, copy
                        pose_bone.copy(data_bone);
                    }
                    else {
                        throw new Error();
                    }
                });

                // clamp output bone array
                pose_bone_array.length = data_bone_array.length;

                pose_bone_array.forEach(function (bone) {
                    var parent_bone = pose_bone_array[bone.parent_index];
                    if (parent_bone) {
                        Space.combine(parent_bone.world_space, bone.local_space, bone.world_space);
                    }
                    else {
                        bone.world_space.copy(bone.local_space);
                    }
                });

                var data_object_array = mainline_keyframe.object_array;
                var pose_object_array = pose.object_array;

                data_object_array.forEach(function (data_object, object_index) {
                    var pose_object = pose_object_array[object_index] = (pose_object_array[object_index] || new Object());

                    if (data_object instanceof ObjectRef) {
                        // object is a ObjectRef, dereference
                        var timeline_index = data_object.timeline_index;
                        var keyframe_index = data_object.keyframe_index;
                        var timeline = timeline_array[timeline_index];
                        var timeline_keyframe_array = timeline.keyframe_array;
                        var timeline_keyframe = timeline_keyframe_array[keyframe_index];

                        var time1 = timeline_keyframe.time;
                        var object1 = timeline_keyframe.object;

                        pose_object.copy(object1);
                        pose_object.parent_index = data_object.parent_index; // set parent from object_ref

                        // see if there's something to tween with
                        var keyframe_index2 = (keyframe_index + 1) % timeline_keyframe_array.length;
                        if (keyframe_index !== keyframe_index2) {
                            var timeline_keyframe2 = timeline_keyframe_array[keyframe_index2];
                            var time2 = timeline_keyframe2.time;
                            if (time2 < time1) {
                                time2 = anim.length;
                            }
                            var object2 = timeline_keyframe2.object;

                            var tween = timeline_keyframe.evaluateCurve(time, time1, time2);
                            pose_object.tween(object2, tween, timeline_keyframe.spin);
                        }
                    }
                    else if (data_object instanceof Object) {
                        // object is a Object, copy
                        pose_object.copy(data_object);
                    }
                    else {
                        throw new Error();
                    }
                });

                // clamp output object array
                pose_object_array.length = data_object_array.length;

                pose_object_array.forEach(function (object) {
                    var bone = pose_bone_array[object.parent_index];
                    if (bone) {
                        Space.combine(bone.world_space, object.local_space, object.world_space);
                    }
                    else {
                        object.world_space.copy(object.local_space);
                    }
                    var folder = pose.data.folder_array[object.folder_index];
                    var file = folder.file_array[object.file_index];
                    var offset_x = (0.5 - object.pivot.x) * file.width;
                    var offset_y = (0.5 - object.pivot.y) * file.height;
                    Space.translate(object.world_space, offset_x, offset_y);
                });
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
        if (angle <= 0) {
            return ((angle - Math.PI) % (2 * Math.PI)) + Math.PI;
        } else {
            return ((angle + Math.PI) % (2 * Math.PI)) - Math.PI;
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
            if ((b - a) < 0) {
                b += 2 * Math.PI;
            }
        } else if (spin < 0) {
            if ((b - a) > 0) {
                b -= 2 * Math.PI;
            }
        }

        return wrapAngleRadians(a + (wrapAngleRadians(b - a) * t));
    }

}(window.cc));