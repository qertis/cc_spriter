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

'use strict';
cc.Spriter = cc.Sprite.extend({
    /* Loading indicator */
    _ready: false,

    /* Resources path */
    sconLink: '',
    sconPath: '',

    _entity: null,
    _animation: null,

    data: null,
    pose: null,

    /**
     * Spriter constructor
     * @param {String} sconLink scon file to use for this animation
     */
    ctor: function (sconLink) {
        this._super();

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
    setEntity: function (entity) {
        this._entity = entity;

        if (this._ready) {
            this.pose.setEntity(entity);
        }
    },

    /**
     * Set animation
     * @param animation
     */
    setAnim: function (animation) {
        this._animation = animation;

        if (this._ready) {
            this.pose.setAnim(animation);
        }
    },

    /**
     * Prealod scon resource
     * @param {function} callback
     */
    preload: function (callback) {
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
                            cc.log("TODO: load", file.type, file.name);
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
    update: function (dt) {
        dt = 1000 / 60; // time step in milliseconds
        this.removeAllChildrenWithCleanup(true);

        let pose = this.pose;
        pose.update(dt); // accumulate time
        pose.strike(); // process time slice
        pose.object_array.forEach(object => {
            switch (object.type) {
                case 'sprite':
                    let folder = this.pose.data.folder_array[object.folder_index];
                    if (!folder) {
                        return;
                    }
                    let file = folder.file_array[object.file_index];
                    if (!file) {
                        return;
                    }
                    let image_key = file.name;

                    let spriteFrame = cc.spriteFrameCache.getSpriteFrame(image_key);
                    if (spriteFrame) {
                        let sprite = new cc.Sprite();
                        sprite.setSpriteFrame(spriteFrame);
                        sprite.setOpacity(object.alpha * 255);
                        sprite.setPositionX(object.world_space.position.x);
                        sprite.setPositionY(object.world_space.position.y);
                        sprite.setScaleX(object.world_space.scale.x);
                        sprite.setScaleY(object.world_space.scale.y);
                        sprite.setRotation(-object.world_space.rotation.deg);

                        this.addChild(sprite);
                    }
                    break;
                case 'entity':
                    cc.log('TODO ');
                    break;
            }
        });







        /*DEBUG*/

        pose.bone_array.forEach(function (bone)
        {
            //ctx.save();
            //ctxApplySpace(ctx, bone.world_space);
            //ctxDrawPoint(ctx);
            var entity = pose.data.entity_map[pose.entity_key];
            var bone_info = entity.obj_info_map[bone.name];
            if (bone_info) {
                debugger;
                //ctx.beginPath();
                //ctx.moveTo(0, 0);
                //ctx.lineTo(bone_info.h/2, -bone_info.h/2);
                //ctx.lineTo(bone_info.w, 0);
                //ctx.lineTo(bone_info.h/2, bone_info.h/2);
                //ctx.closePath();
                //ctx.strokeStyle = 'cyan';
                //ctx.stroke();

                //var line = new cc.DrawNode();
                //line.drawSegment(cc.p(50,50), cc.p(200,200),2);
                //this.addChild(line);

            }
            //ctx.restore();
        });

        pose.object_array.forEach((object) => {
            switch (object.type)
            {
                case 'sprite':
                    var folder = pose.data.folder_array[object.folder_index];
                    if (!folder) { return; }
                    var file = folder.file_array[object.file_index];
                    if (!file) { return; }
                    //var site = atlas_data && atlas_data.sites[file.name];
                    //var page = site && atlas_data.pages[site.page];
                    var image_key = file.name;
                    //var image = images[image_key];
                    //ctx.save();
                    //ctxApplySpace(ctx, object.world_space);
                    //ctx.scale(file.width/2, file.height/2);
                    let lineWidth = 1 / Math.min(file.width/2, file.height/2);
                    //ctxApplyAtlasSitePosition(ctx, site);
                    //ctxDrawMesh(ctx, triangles, positions);

                    var line = new cc.DrawNode();
                    line.drawSegment(
                        cc.p(object.world_space.position),
                        cc.p(object.local_space.position),
                        lineWidth);
                    this.addChild(line);

                    //ctx.restore();
                    break;
                case 'bone':
                    //ctx.save();
                    //ctxApplySpace(ctx, object.world_space);
                    var entity = pose.data.entity_map[pose.entity_key];
                    var bone_info = entity.obj_info_map[object.name];
                    if (bone_info)
                    {
                        //ctx.beginPath();
                        //ctx.moveTo(0, 0);
                        //ctx.lineTo(bone_info.h/2, -bone_info.h/2);
                        //ctx.lineTo(bone_info.w, 0);
                        //ctx.lineTo(bone_info.h/2, bone_info.h/2);
                        //ctx.closePath();
                        //ctx.strokeStyle = 'cyan';
                        //ctx.stroke();

                        debugger;
                        //var line = new cc.DrawNode();
                        //line.drawSegment(cc.p(50,50), cc.p(200,200),2);
                        //this.addChild(line);


                    }
                    //ctx.restore();
                    break;
                case 'box':
                    debugger;
                    //var entity = pose.data.entity_map[pose.entity_key];
                    //var box_info = entity.obj_info_map[object.name];
                    //if (box_info)
                    //{
                    //    ctx.save();
                    //    ctxApplySpace(ctx, object.world_space);
                    //    ctx.beginPath();
                    //    ctx.rect(-box_info.w/2, -box_info.h/2, box_info.w, box_info.h);
                    //    ctx.strokeStyle = 'magenta';
                    //    ctx.stroke();
                    //    ctx.restore();
                    //}
                    break;
                case 'point':
                    debugger;
                    //ctx.save();
                    //ctxApplySpace(ctx, object.world_space);
                    //ctxDrawPoint(ctx);
                    //ctx.restore();
                    break;
                case 'sound':
                    debugger;
                    break;
                case 'entity':
                    debugger;
                    //ctx.save();
                    //ctxApplySpace(ctx, object.world_space);
                    //ctxDrawPoint(ctx);
                    //render.drawDebugPose(object.pose, atlas_data); // recursive
                    //ctx.restore();
                    break;
                case 'variable':
                    break;
            }
        });

    }
});