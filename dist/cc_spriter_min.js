var COMPILED=!0,goog=goog||{};goog.global=this;goog.isDef=function(a){return void 0!==a};goog.exportPath_=function(a,b,c){a=a.split(".");c=c||goog.global;a[0]in c||!c.execScript||c.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)!a.length&&goog.isDef(b)?c[d]=b:c=c[d]?c[d]:c[d]={}};
goog.define=function(a,b){var c=b;COMPILED||(goog.global.CLOSURE_UNCOMPILED_DEFINES&&Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_UNCOMPILED_DEFINES,a)?c=goog.global.CLOSURE_UNCOMPILED_DEFINES[a]:goog.global.CLOSURE_DEFINES&&Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_DEFINES,a)&&(c=goog.global.CLOSURE_DEFINES[a]));goog.exportPath_(a,c)};goog.DEBUG=!0;goog.LOCALE="en";goog.TRUSTED_SITE=!0;goog.STRICT_MODE_COMPATIBLE=!1;goog.DISALLOW_TEST_ONLY_CODE=COMPILED&&!goog.DEBUG;
goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING=!1;goog.provide=function(a){if(!COMPILED&&goog.isProvided_(a))throw Error('Namespace "'+a+'" already declared.');goog.constructNamespace_(a)};goog.constructNamespace_=function(a,b){if(!COMPILED){delete goog.implicitNamespaces_[a];for(var c=a;(c=c.substring(0,c.lastIndexOf(".")))&&!goog.getObjectByName(c);)goog.implicitNamespaces_[c]=!0}goog.exportPath_(a,b)};goog.VALID_MODULE_RE_=/^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
goog.module=function(a){if(!goog.isString(a)||!a||-1==a.search(goog.VALID_MODULE_RE_))throw Error("Invalid module identifier");if(!goog.isInModuleLoader_())throw Error("Module "+a+" has been loaded incorrectly.");if(goog.moduleLoaderState_.moduleName)throw Error("goog.module may only be called once per module.");goog.moduleLoaderState_.moduleName=a;if(!COMPILED){if(goog.isProvided_(a))throw Error('Namespace "'+a+'" already declared.');delete goog.implicitNamespaces_[a]}};goog.module.get=function(a){return goog.module.getInternal_(a)};
goog.module.getInternal_=function(a){if(!COMPILED)return goog.isProvided_(a)?a in goog.loadedModules_?goog.loadedModules_[a]:goog.getObjectByName(a):null};goog.moduleLoaderState_=null;goog.isInModuleLoader_=function(){return null!=goog.moduleLoaderState_};
goog.module.declareLegacyNamespace=function(){if(!COMPILED&&!goog.isInModuleLoader_())throw Error("goog.module.declareLegacyNamespace must be called from within a goog.module");if(!COMPILED&&!goog.moduleLoaderState_.moduleName)throw Error("goog.module must be called prior to goog.module.declareLegacyNamespace.");goog.moduleLoaderState_.declareLegacyNamespace=!0};
goog.setTestOnly=function(a){if(goog.DISALLOW_TEST_ONLY_CODE)throw a=a||"",Error("Importing test-only code into non-debug environment"+(a?": "+a:"."));};goog.forwardDeclare=function(a){};COMPILED||(goog.isProvided_=function(a){return a in goog.loadedModules_||!goog.implicitNamespaces_[a]&&goog.isDefAndNotNull(goog.getObjectByName(a))},goog.implicitNamespaces_={"goog.module":!0});
goog.getObjectByName=function(a,b){for(var c=a.split("."),d=b||goog.global,e;e=c.shift();)if(goog.isDefAndNotNull(d[e]))d=d[e];else return null;return d};goog.globalize=function(a,b){var c=b||goog.global,d;for(d in a)c[d]=a[d]};goog.addDependency=function(a,b,c,d){if(goog.DEPENDENCIES_ENABLED){var e;a=a.replace(/\\/g,"/");for(var f=goog.dependencies_,h=0;e=b[h];h++)f.nameToPath[e]=a,f.pathIsModule[a]=!!d;for(d=0;b=c[d];d++)a in f.requires||(f.requires[a]={}),f.requires[a][b]=!0}};
goog.ENABLE_DEBUG_LOADER=!0;goog.logToConsole_=function(a){goog.global.console&&goog.global.console.error(a)};goog.require=function(a){if(!COMPILED){goog.ENABLE_DEBUG_LOADER&&goog.IS_OLD_IE_&&goog.maybeProcessDeferredDep_(a);if(goog.isProvided_(a))return goog.isInModuleLoader_()?goog.module.getInternal_(a):null;if(goog.ENABLE_DEBUG_LOADER){var b=goog.getPathFromDeps_(a);if(b)return goog.writeScripts_(b),null}a="goog.require could not find: "+a;goog.logToConsole_(a);throw Error(a);}};
goog.basePath="";goog.nullFunction=function(){};goog.abstractMethod=function(){throw Error("unimplemented abstract method");};goog.addSingletonGetter=function(a){a.getInstance=function(){if(a.instance_)return a.instance_;goog.DEBUG&&(goog.instantiatedSingletons_[goog.instantiatedSingletons_.length]=a);return a.instance_=new a}};goog.instantiatedSingletons_=[];goog.LOAD_MODULE_USING_EVAL=!0;goog.SEAL_MODULE_EXPORTS=goog.DEBUG;goog.loadedModules_={};goog.DEPENDENCIES_ENABLED=!COMPILED&&goog.ENABLE_DEBUG_LOADER;
goog.DEPENDENCIES_ENABLED&&(goog.dependencies_={pathIsModule:{},nameToPath:{},requires:{},visited:{},written:{},deferred:{}},goog.inHtmlDocument_=function(){var a=goog.global.document;return null!=a&&"write"in a},goog.findBasePath_=function(){if(goog.isDef(goog.global.CLOSURE_BASE_PATH))goog.basePath=goog.global.CLOSURE_BASE_PATH;else if(goog.inHtmlDocument_())for(var a=goog.global.document.getElementsByTagName("SCRIPT"),b=a.length-1;0<=b;--b){var c=a[b].src,d=c.lastIndexOf("?"),d=-1==d?c.length:
d;if("base.js"==c.substr(d-7,7)){goog.basePath=c.substr(0,d-7);break}}},goog.importScript_=function(a,b){(goog.global.CLOSURE_IMPORT_SCRIPT||goog.writeScriptTag_)(a,b)&&(goog.dependencies_.written[a]=!0)},goog.IS_OLD_IE_=!(goog.global.atob||!goog.global.document||!goog.global.document.all),goog.importModule_=function(a){goog.importScript_("",'goog.retrieveAndExecModule_("'+a+'");')&&(goog.dependencies_.written[a]=!0)},goog.queuedModules_=[],goog.wrapModule_=function(a,b){return goog.LOAD_MODULE_USING_EVAL&&
goog.isDef(goog.global.JSON)?"goog.loadModule("+goog.global.JSON.stringify(b+"\n//# sourceURL="+a+"\n")+");":'goog.loadModule(function(exports) {"use strict";'+b+"\n;return exports});\n//# sourceURL="+a+"\n"},goog.loadQueuedModules_=function(){var a=goog.queuedModules_.length;if(0<a){var b=goog.queuedModules_;goog.queuedModules_=[];for(var c=0;c<a;c++)goog.maybeProcessDeferredPath_(b[c])}},goog.maybeProcessDeferredDep_=function(a){goog.isDeferredModule_(a)&&goog.allDepsAreAvailable_(a)&&(a=goog.getPathFromDeps_(a),
goog.maybeProcessDeferredPath_(goog.basePath+a))},goog.isDeferredModule_=function(a){return(a=goog.getPathFromDeps_(a))&&goog.dependencies_.pathIsModule[a]?goog.basePath+a in goog.dependencies_.deferred:!1},goog.allDepsAreAvailable_=function(a){if((a=goog.getPathFromDeps_(a))&&a in goog.dependencies_.requires)for(var b in goog.dependencies_.requires[a])if(!goog.isProvided_(b)&&!goog.isDeferredModule_(b))return!1;return!0},goog.maybeProcessDeferredPath_=function(a){if(a in goog.dependencies_.deferred){var b=
goog.dependencies_.deferred[a];delete goog.dependencies_.deferred[a];goog.globalEval(b)}},goog.loadModuleFromUrl=function(a){goog.retrieveAndExecModule_(a)},goog.loadModule=function(a){var b=goog.moduleLoaderState_;try{goog.moduleLoaderState_={moduleName:void 0,declareLegacyNamespace:!1};var c;if(goog.isFunction(a))c=a.call(goog.global,{});else if(goog.isString(a))c=goog.loadModuleFromSource_.call(goog.global,a);else throw Error("Invalid module definition");var d=goog.moduleLoaderState_.moduleName;
if(!goog.isString(d)||!d)throw Error('Invalid module name "'+d+'"');goog.moduleLoaderState_.declareLegacyNamespace?goog.constructNamespace_(d,c):goog.SEAL_MODULE_EXPORTS&&Object.seal&&Object.seal(c);goog.loadedModules_[d]=c}finally{goog.moduleLoaderState_=b}},goog.loadModuleFromSource_=function(a){eval(a);return{}},goog.writeScriptSrcNode_=function(a){goog.global.document.write('<script type="text/javascript" src="'+a+'">\x3c/script>')},goog.appendScriptSrcNode_=function(a){var b=goog.global.document,
c=b.createElement("script");c.type="text/javascript";c.src=a;c.defer=!1;c.async=!1;b.head.appendChild(c)},goog.writeScriptTag_=function(a,b){if(goog.inHtmlDocument_()){var c=goog.global.document;if(!goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING&&"complete"==c.readyState){if(/\bdeps.js$/.test(a))return!1;throw Error('Cannot write "'+a+'" after document load');}var d=goog.IS_OLD_IE_;void 0===b?d?(d=" onreadystatechange='goog.onScriptLoad_(this, "+ ++goog.lastNonModuleScriptIndex_+")' ",c.write('<script type="text/javascript" src="'+
a+'"'+d+">\x3c/script>")):goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING?goog.appendScriptSrcNode_(a):goog.writeScriptSrcNode_(a):c.write('<script type="text/javascript">'+b+"\x3c/script>");return!0}return!1},goog.lastNonModuleScriptIndex_=0,goog.onScriptLoad_=function(a,b){"complete"==a.readyState&&goog.lastNonModuleScriptIndex_==b&&goog.loadQueuedModules_();return!0},goog.writeScripts_=function(a){function b(a){if(!(a in e.written||a in e.visited)){e.visited[a]=!0;if(a in e.requires)for(var f in e.requires[a])if(!goog.isProvided_(f))if(f in
e.nameToPath)b(e.nameToPath[f]);else throw Error("Undefined nameToPath for "+f);a in d||(d[a]=!0,c.push(a))}}var c=[],d={},e=goog.dependencies_;b(a);for(a=0;a<c.length;a++){var f=c[a];goog.dependencies_.written[f]=!0}var h=goog.moduleLoaderState_;goog.moduleLoaderState_=null;for(a=0;a<c.length;a++)if(f=c[a])e.pathIsModule[f]?goog.importModule_(goog.basePath+f):goog.importScript_(goog.basePath+f);else throw goog.moduleLoaderState_=h,Error("Undefined script input");goog.moduleLoaderState_=h},goog.getPathFromDeps_=
function(a){return a in goog.dependencies_.nameToPath?goog.dependencies_.nameToPath[a]:null},goog.findBasePath_(),goog.global.CLOSURE_NO_DEPS||goog.importScript_(goog.basePath+"deps.js"));goog.normalizePath_=function(a){a=a.split("/");for(var b=0;b<a.length;)"."==a[b]?a.splice(b,1):b&&".."==a[b]&&a[b-1]&&".."!=a[b-1]?a.splice(--b,2):b++;return a.join("/")};
goog.loadFileSync_=function(a){if(goog.global.CLOSURE_LOAD_FILE_SYNC)return goog.global.CLOSURE_LOAD_FILE_SYNC(a);var b=new goog.global.XMLHttpRequest;b.open("get",a,!1);b.send();return b.responseText};
goog.retrieveAndExecModule_=function(a){if(!COMPILED){var b=a;a=goog.normalizePath_(a);var c=goog.global.CLOSURE_IMPORT_SCRIPT||goog.writeScriptTag_,d=goog.loadFileSync_(a);if(null!=d)d=goog.wrapModule_(a,d),goog.IS_OLD_IE_?(goog.dependencies_.deferred[b]=d,goog.queuedModules_.push(b)):c(a,d);else throw Error("load of "+a+"failed");}};
goog.typeOf=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b};goog.isNull=function(a){return null===a};goog.isDefAndNotNull=function(a){return null!=a};goog.isArray=function(a){return"array"==goog.typeOf(a)};goog.isArrayLike=function(a){var b=goog.typeOf(a);return"array"==b||"object"==b&&"number"==typeof a.length};goog.isDateLike=function(a){return goog.isObject(a)&&"function"==typeof a.getFullYear};goog.isString=function(a){return"string"==typeof a};
goog.isBoolean=function(a){return"boolean"==typeof a};goog.isNumber=function(a){return"number"==typeof a};goog.isFunction=function(a){return"function"==goog.typeOf(a)};goog.isObject=function(a){var b=typeof a;return"object"==b&&null!=a||"function"==b};goog.getUid=function(a){return a[goog.UID_PROPERTY_]||(a[goog.UID_PROPERTY_]=++goog.uidCounter_)};goog.hasUid=function(a){return!!a[goog.UID_PROPERTY_]};
goog.removeUid=function(a){null!==a&&"removeAttribute"in a&&a.removeAttribute(goog.UID_PROPERTY_);try{delete a[goog.UID_PROPERTY_]}catch(b){}};goog.UID_PROPERTY_="closure_uid_"+(1E9*Math.random()>>>0);goog.uidCounter_=0;goog.getHashCode=goog.getUid;goog.removeHashCode=goog.removeUid;goog.cloneObject=function(a){var b=goog.typeOf(a);if("object"==b||"array"==b){if(a.clone)return a.clone();var b="array"==b?[]:{},c;for(c in a)b[c]=goog.cloneObject(a[c]);return b}return a};
goog.bindNative_=function(a,b,c){return a.call.apply(a.bind,arguments)};goog.bindJs_=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}};
goog.bind=function(a,b,c){Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?goog.bind=goog.bindNative_:goog.bind=goog.bindJs_;return goog.bind.apply(null,arguments)};goog.partial=function(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=c.slice();b.push.apply(b,arguments);return a.apply(this,b)}};goog.mixin=function(a,b){for(var c in b)a[c]=b[c]};goog.now=goog.TRUSTED_SITE&&Date.now||function(){return+new Date};
goog.globalEval=function(a){if(goog.global.execScript)goog.global.execScript(a,"JavaScript");else if(goog.global.eval){if(null==goog.evalWorksForGlobals_)if(goog.global.eval("var _evalTest_ = 1;"),"undefined"!=typeof goog.global._evalTest_){try{delete goog.global._evalTest_}catch(d){}goog.evalWorksForGlobals_=!0}else goog.evalWorksForGlobals_=!1;if(goog.evalWorksForGlobals_)goog.global.eval(a);else{var b=goog.global.document,c=b.createElement("SCRIPT");c.type="text/javascript";c.defer=!1;c.appendChild(b.createTextNode(a));
b.body.appendChild(c);b.body.removeChild(c)}}else throw Error("goog.globalEval not available");};goog.evalWorksForGlobals_=null;goog.getCssName=function(a,b){var c=function(a){return goog.cssNameMapping_[a]||a},d=function(a){a=a.split("-");for(var b=[],d=0;d<a.length;d++)b.push(c(a[d]));return b.join("-")},d=goog.cssNameMapping_?"BY_WHOLE"==goog.cssNameMappingStyle_?c:d:function(a){return a};return b?a+"-"+d(b):d(a)};
goog.setCssNameMapping=function(a,b){goog.cssNameMapping_=a;goog.cssNameMappingStyle_=b};!COMPILED&&goog.global.CLOSURE_CSS_NAME_MAPPING&&(goog.cssNameMapping_=goog.global.CLOSURE_CSS_NAME_MAPPING);goog.getMsg=function(a,b){b&&(a=a.replace(/\{\$([^}]+)}/g,function(a,d){return null!=b&&d in b?b[d]:a}));return a};goog.getMsgWithFallback=function(a,b){return a};goog.exportSymbol=function(a,b,c){goog.exportPath_(a,b,c)};goog.exportProperty=function(a,b,c){a[b]=c};
goog.inherits=function(a,b){function c(){}c.prototype=b.prototype;a.superClass_=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.base=function(a,c,f){for(var h=Array(arguments.length-2),k=2;k<arguments.length;k++)h[k-2]=arguments[k];return b.prototype[c].apply(a,h)}};
goog.base=function(a,b,c){var d=arguments.callee.caller;if(goog.STRICT_MODE_COMPATIBLE||goog.DEBUG&&!d)throw Error("arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");if(d.superClass_){for(var e=Array(arguments.length-1),f=1;f<arguments.length;f++)e[f-1]=arguments[f];return d.superClass_.constructor.apply(a,e)}e=Array(arguments.length-2);for(f=2;f<arguments.length;f++)e[f-2]=arguments[f];for(var f=!1,h=a.constructor;h;h=
h.superClass_&&h.superClass_.constructor)if(h.prototype[b]===d)f=!0;else if(f)return h.prototype[b].apply(a,e);if(a[b]===d)return a.constructor.prototype[b].apply(a,e);throw Error("goog.base called from a method of one name to a method of a different name");};goog.scope=function(a){a.call(goog.global)};COMPILED||(goog.global.COMPILED=COMPILED);
goog.defineClass=function(a,b){var c=b.constructor,d=b.statics;c&&c!=Object.prototype.constructor||(c=function(){throw Error("cannot instantiate an interface (no constructor defined).");});c=goog.defineClass.createSealingConstructor_(c,a);a&&goog.inherits(c,a);delete b.constructor;delete b.statics;goog.defineClass.applyProperties_(c.prototype,b);null!=d&&(d instanceof Function?d(c):goog.defineClass.applyProperties_(c,d));return c};goog.defineClass.SEAL_CLASS_INSTANCES=goog.DEBUG;
goog.defineClass.createSealingConstructor_=function(a,b){if(goog.defineClass.SEAL_CLASS_INSTANCES&&Object.seal instanceof Function){if(b&&b.prototype&&b.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_])return a;var c=function(){var b=a.apply(this,arguments)||this;b[goog.UID_PROPERTY_]=b[goog.UID_PROPERTY_];this.constructor===c&&Object.seal(b);return b};return c}return a};goog.defineClass.OBJECT_PROTOTYPE_FIELDS_="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.defineClass.applyProperties_=function(a,b){for(var c in b)Object.prototype.hasOwnProperty.call(b,c)&&(a[c]=b[c]);for(var d=0;d<goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length;d++)c=goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[d],Object.prototype.hasOwnProperty.call(b,c)&&(a[c]=b[c])};goog.tagUnsealableClass=function(a){!COMPILED&&goog.defineClass.SEAL_CLASS_INSTANCES&&(a.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_]=!0)};goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_="goog_defineClass_legacy_unsealable";var spriter={loadBool:function(a,b,c){a=a[b];switch(typeof a){case "string":return"true"===a?!0:!1;case "boolean":return a;default:return c||!1}},saveBool:function(a,b,c,d){if("boolean"!==typeof d||c!==d)a[b]=c},loadFloat:function(a,b,c){a=a[b];switch(typeof a){case "string":return parseFloat(a);case "number":return a;default:return c||0}},saveFloat:function(a,b,c,d){if("number"!==typeof d||c!==d)a[b]=c},loadInt:function(a,b,c){a=a[b];switch(typeof a){case "string":return parseInt(a,10);case "number":return 0|
a;default:return c||0}},saveInt:function(a,b,c,d){if("number"!==typeof d||c!==d)a[b]=c},loadString:function(a,b,c){a=a[b];switch(typeof a){case "string":return a;default:return c||""}},saveString:function(a,b,c,d){if("string"!==typeof d||c!==d)a[b]=c},makeArray:function(a){return"object"===typeof a&&"number"===typeof a.length?a:"undefined"!==typeof a?[a]:[]},wrap:function(a,b,c){return b<c?a<b?c-(b-a)%(c-b):b+(a-b)%(c-b):b===c?b:a},interpolateLinear:function(a,b,c){return a+(b-a)*c},interpolateQuadratic:function(a,
b,c,d){return spriter.interpolateLinear(spriter.interpolateLinear(a,b,d),spriter.interpolateLinear(b,c,d),d)},interpolateCubic:function(a,b,c,d,e){return spriter.interpolateLinear(spriter.interpolateQuadratic(a,b,c,e),spriter.interpolateQuadratic(b,c,d,e),e)},interpolateQuartic:function(a,b,c,d,e,f){return spriter.interpolateLinear(spriter.interpolateCubic(a,b,c,d,f),spriter.interpolateCubic(b,c,d,e,f),f)},interpolateQuintic:function(a,b,c,d,e,f,h){return spriter.interpolateLinear(spriter.interpolateQuartic(a,
b,c,d,e,h),spriter.interpolateQuartic(b,c,d,e,f,h),h)},interpolateBezier:function(a,b,c,d,e){var f=3*a;c=3*(c-a)-f;a=3*b;b=3*(d-b)-a;d=1-f-c;a:{var h,k,g,l;g=e;for(k=0;8>k;k++){l=((d*g+c)*g+f)*g-e;if(.005>Math.abs(l)){e=g;break a}h=(3*d*g+2*c)*g+f;if(.005>Math.abs(h))break;g-=l/h}h=0;k=1;g=e;if(g<h)e=h;else if(g>k)e=k;else{for(;h<k;){l=((d*g+c)*g+f)*g;if(.005>Math.abs(l-e)){e=g;break a}e>l?h=g:k=g;g=.5*(k-h)+h}e=g}}return(((1-a-b)*e+b)*e+a)*e},tween:function(a,b,c){return a+(b-a)*c},wrapAngleRadians:function(a){return 0>=
a?(a-Math.PI)%(2*Math.PI)+Math.PI:(a+Math.PI)%(2*Math.PI)-Math.PI},tweenAngleRadians:function(a,b,c,d){if(0===d)return a;0<d?0>b-a&&(b+=2*Math.PI):0>d&&0<b-a&&(b-=2*Math.PI);return spriter.wrapAngleRadians(a+spriter.wrapAngleRadians(b-a)*c)},Angle:function(a){this.rad=a||0}};Object.defineProperty(spriter.Angle.prototype,"deg",{get:function(){return 180*this.rad/Math.PI},set:function(a){this.rad=a*Math.PI/180}});Object.defineProperty(spriter.Angle.prototype,"cos",{get:function(){return Math.cos(this.rad)}});
Object.defineProperty(spriter.Angle.prototype,"sin",{get:function(){return Math.sin(this.rad)}});spriter.Angle.prototype.selfIdentity=function(){this.rad=0;return this};spriter.Angle.prototype.copy=function(a){this.rad=a.rad;return this};spriter.Angle.add=function(a,b,c){c=c||new spriter.Angle;c.rad=spine.wrapAngleRadians(a.rad+b.rad);return c};spriter.Angle.prototype.add=function(a,b){return spriter.Angle.add(this,a,b)};
spriter.Angle.prototype.selfAdd=function(a){return spriter.Angle.add(this,a,this)};spriter.Angle.tween=function(a,b,c,d,e){e=e||new spriter.Angle;e.rad=spriter.tweenAngleRadians(a.rad,b.rad,c,d);return e};spriter.Angle.prototype.tween=function(a,b,c,d){return spriter.Angle.tween(this,a,b,c,d)};spriter.Angle.prototype.selfTween=function(a,b,c){return spriter.Angle.tween(this,a,b,c,this)};spriter.Vector=function(a,b){this.x=a||0;this.y=b||0};spriter.Vector.prototype.x=0;spriter.Vector.prototype.y=0;
spriter.Vector.prototype.copy=function(a){this.x=a.x;this.y=a.y;return this};spriter.Vector.add=function(a,b,c){c=c||new spriter.Vector;c.x=a.x+b.x;c.y=a.y+b.y;return c};spriter.Vector.prototype.add=function(a,b){return spriter.Vector.add(this,a,b)};spriter.Vector.prototype.selfAdd=function(a){this.x+=a.x;this.y+=a.y;return this};spriter.Vector.tween=function(a,b,c,d){d=d||new spriter.Vector;d.x=spriter.tween(a.x,b.x,c);d.y=spriter.tween(a.y,b.y,c);return d};
spriter.Vector.prototype.tween=function(a,b,c){return spriter.Vector.tween(this,a,b,c)};spriter.Vector.prototype.selfTween=function(a,b){return spriter.Vector.tween(this,a,b,this)};spriter.Position=function(){spriter.Vector.call(this,0,0)};goog.inherits(spriter.Position,spriter.Vector);spriter.Rotation=function(){spriter.Angle.call(this,0)};goog.inherits(spriter.Rotation,spriter.Angle);spriter.Scale=function(){spriter.Vector.call(this,1,1)};goog.inherits(spriter.Scale,spriter.Vector);
spriter.Scale.prototype.selfIdentity=function(){this.y=this.x=1;return this};spriter.Pivot=function(){spriter.Vector.call(this,0,1)};goog.inherits(spriter.Pivot,spriter.Vector);spriter.Pivot.prototype.selfIdentity=function(){this.x=0;this.y=1;return this};spriter.Space=function(){this.position=new spriter.Position;this.rotation=new spriter.Rotation;this.scale=new spriter.Scale};
spriter.Space.prototype.copy=function(a){this.position.copy(a.position);this.rotation.copy(a.rotation);this.scale.copy(a.scale);return this};spriter.Space.prototype.load=function(a){this.position.x=spriter.loadFloat(a,"x",0);this.position.y=spriter.loadFloat(a,"y",0);this.rotation.deg=spriter.loadFloat(a,"angle",0);this.scale.x=spriter.loadFloat(a,"scale_x",1);this.scale.y=spriter.loadFloat(a,"scale_y",1);return this};
spriter.Space.equal=function(a,b,c){c=c||1E-6;return Math.abs(a.position.x-b.position.x)>c||Math.abs(a.position.y-b.position.y)>c||Math.abs(a.rotation.rad-b.rotation.rad)>c||Math.abs(a.scale.x-b.scale.x)>c||Math.abs(a.scale.y-b.scale.y)>c?!1:!0};spriter.Space.identity=function(a){a=a||new spriter.Space;a.position.x=0;a.position.y=0;a.rotation.rad=0;a.scale.x=1;a.scale.y=1;return a};
spriter.Space.translate=function(a,b,c){b*=a.scale.x;c*=a.scale.y;var d=a.rotation.rad,e=Math.cos(d),d=Math.sin(d);a.position.x+=e*b-d*c;a.position.y+=d*b+e*c;return a};spriter.Space.rotate=function(a,b){a.rotation.rad=spriter.wrapAngleRadians(a.rotation.rad+b);return a};spriter.Space.scale=function(a,b,c){a.scale.x*=b;a.scale.y*=c;return a};
spriter.Space.invert=function(a,b){b=b||new spriter.Space;var c=1/a.scale.x,d=1/a.scale.y,e=-a.rotation.rad,f=-a.position.x,h=-a.position.y;b.scale.x=c;b.scale.y=d;b.rotation.rad=e;var k=Math.cos(e),e=Math.sin(e);b.position.x=(k*f-e*h)*c;b.position.y=(e*f+k*h)*d;return b};
spriter.Space.combine=function(a,b,c){c=c||new spriter.Space;var d=b.position.x*a.scale.x,e=b.position.y*a.scale.y,f=a.rotation.rad,h=Math.cos(f),f=Math.sin(f);c.position.x=h*d-f*e+a.position.x;c.position.y=f*d+h*e+a.position.y;c.rotation.rad=0>a.scale.x*a.scale.y?spriter.wrapAngleRadians(a.rotation.rad-b.rotation.rad):spriter.wrapAngleRadians(b.rotation.rad+a.rotation.rad);c.scale.x=b.scale.x*a.scale.x;c.scale.y=b.scale.y*a.scale.y;return c};
spriter.Space.extract=function(a,b,c){c=c||new spriter.Space;c.scale.x=a.scale.x/b.scale.x;c.scale.y=a.scale.y/b.scale.y;c.rotation.rad=0>b.scale.x*b.scale.y?spriter.wrapAngleRadians(b.rotation.rad+a.rotation.rad):spriter.wrapAngleRadians(a.rotation.rad-b.rotation.rad);var d=a.position.x-b.position.x;a=a.position.y-b.position.y;var e=-b.rotation.rad,f=Math.cos(e),e=Math.sin(e);c.position.x=(f*d-e*a)/b.scale.x;c.position.y=(e*d+f*a)/b.scale.y;return c};
spriter.Space.transform=function(a,b,c){c=c||new spriter.Vector;var d=b.x*a.scale.x;b=b.y*a.scale.y;var e=a.rotation.rad,f=Math.cos(e),e=Math.sin(e);c.x=f*d-e*b+a.position.x;c.y=e*d+f*b+a.position.y;return c};spriter.Space.untransform=function(a,b,c){c=c||new spriter.Vector;var d=b.x-a.position.x;b=b.y-a.position.y;var e=-a.rotation.rad,f=Math.cos(e),e=Math.sin(e);c.x=(f*d-e*b)/a.scale.x;c.y=(e*d+f*b)/a.scale.y;return c};
spriter.Space.tween=function(a,b,c,d,e){e.position.x=spriter.tween(a.position.x,b.position.x,c);e.position.y=spriter.tween(a.position.y,b.position.y,c);e.rotation.rad=spriter.tweenAngleRadians(a.rotation.rad,b.rotation.rad,c,d);e.scale.x=spriter.tween(a.scale.x,b.scale.x,c);e.scale.y=spriter.tween(a.scale.y,b.scale.y,c);return e};spriter.Element=function(){};spriter.Element.prototype.id=-1;spriter.Element.prototype.name="";
spriter.Element.prototype.load=function(a){this.id=spriter.loadInt(a,"id",-1);this.name=spriter.loadString(a,"name","");return this};spriter.File=function(a){spriter.Element.call(this);this.type=a};goog.inherits(spriter.File,spriter.Element);spriter.File.prototype.type="unknown";spriter.File.prototype.load=function(a){spriter.File.superClass_.load.call(this,a);return this};spriter.ImageFile=function(){spriter.File.call(this,"image");this.pivot=new spriter.Pivot};goog.inherits(spriter.ImageFile,spriter.File);
spriter.ImageFile.prototype.width=0;spriter.ImageFile.prototype.height=0;spriter.ImageFile.prototype.load=function(a){spriter.ImageFile.superClass_.load.call(this,a);this.width=spriter.loadInt(a,"width",0);this.height=spriter.loadInt(a,"height",0);this.pivot.x=spriter.loadFloat(a,"pivot_x",0);this.pivot.y=spriter.loadFloat(a,"pivot_y",1);return this};spriter.SoundFile=function(){spriter.File.call(this,"sound")};goog.inherits(spriter.SoundFile,spriter.File);
spriter.SoundFile.prototype.load=function(a){spriter.SoundFile.superClass_.load.call(this,a);return this};spriter.Folder=function(){spriter.Element.call(this);this.file_array=[]};goog.inherits(spriter.Folder,spriter.Element);
spriter.Folder.prototype.load=function(a){var b=this;spriter.Folder.superClass_.load.call(this,a);b.file_array=[];a.file=spriter.makeArray(a.file);a.file.forEach(function(a){switch(a.type){default:b.file_array.push((new spriter.ImageFile).load(a));break;case "sound":b.file_array.push((new spriter.SoundFile).load(a))}});return b};spriter.Object=function(a){this.type=a};spriter.Object.prototype.type="unknown";spriter.Object.prototype.name="";spriter.Object.prototype.load=function(a){return this};
spriter.SpriteObject=function(){spriter.Object.call(this,"sprite");this.local_space=new spriter.Space;this.world_space=new spriter.Space;this.pivot=new spriter.Pivot};goog.inherits(spriter.SpriteObject,spriter.Object);spriter.SpriteObject.prototype.parent_index=-1;spriter.SpriteObject.prototype.folder_index=-1;spriter.SpriteObject.prototype.file_index=-1;spriter.SpriteObject.prototype.default_pivot=!1;spriter.SpriteObject.prototype.z_index=0;spriter.SpriteObject.prototype.alpha=1;
spriter.SpriteObject.prototype.load=function(a){spriter.SpriteObject.superClass_.load.call(this,a);this.parent_index=spriter.loadInt(a,"parent",-1);this.folder_index=spriter.loadInt(a,"folder",-1);this.file_index=spriter.loadInt(a,"file",-1);this.local_space.load(a);this.world_space.copy(this.local_space);"undefined"!==typeof a.pivot_x||"undefined"!==typeof a.pivot_y?(this.pivot.x=spriter.loadFloat(a,"pivot_x",0),this.pivot.y=spriter.loadFloat(a,"pivot_y",1)):this.default_pivot=!0;this.z_index=spriter.loadInt(a,
"z_index",0);this.alpha=spriter.loadFloat(a,"a",1);return this};spriter.SpriteObject.prototype.copy=function(a){this.parent_index=a.parent_index;this.folder_index=a.folder_index;this.file_index=a.file_index;this.local_space.copy(a.local_space);this.world_space.copy(a.world_space);this.default_pivot=a.default_pivot;this.pivot.copy(a.pivot);this.z_index=a.z_index;this.alpha=a.alpha;return this};
spriter.SpriteObject.prototype.tween=function(a,b,c){spriter.Space.tween(this.local_space,a.local_space,b,c,this.local_space);this.alpha=spriter.tween(this.alpha,a.alpha,b)};spriter.Bone=function(){spriter.Object.call(this,"bone");this.local_space=new spriter.Space;this.world_space=new spriter.Space};goog.inherits(spriter.Bone,spriter.Object);spriter.Bone.prototype.parent_index=-1;
spriter.Bone.prototype.load=function(a){spriter.Bone.superClass_.load.call(this,a);this.parent_index=spriter.loadInt(a,"parent",-1);this.local_space.load(a);this.world_space.copy(this.local_space);return this};spriter.Bone.prototype.copy=function(a){this.parent_index=a.parent_index;this.local_space.copy(a.local_space);this.world_space.copy(a.world_space);return this};spriter.Bone.prototype.tween=function(a,b,c){spriter.Space.tween(this.local_space,a.local_space,b,c,this.local_space)};
spriter.BoxObject=function(){spriter.Object.call(this,"box");this.local_space=new spriter.Space;this.world_space=new spriter.Space;this.pivot=new spriter.Pivot};goog.inherits(spriter.BoxObject,spriter.Object);spriter.BoxObject.prototype.parent_index=-1;
spriter.BoxObject.prototype.load=function(a){spriter.BoxObject.superClass_.load.call(this,a);this.parent_index=spriter.loadInt(a,"parent",-1);this.local_space.load(a);this.world_space.copy(this.local_space);this.pivot.x=spriter.loadFloat(a,"pivot_x",0);this.pivot.y=spriter.loadFloat(a,"pivot_y",1);return this};spriter.BoxObject.prototype.copy=function(a){this.parent_index=a.parent_index;this.local_space.copy(a.local_space);this.world_space.copy(a.world_space);this.pivot.copy(a.pivot);return this};
spriter.BoxObject.prototype.tween=function(a,b,c){spriter.Space.tween(this.local_space,a.local_space,b,c,this.local_space)};spriter.PointObject=function(){spriter.Object.call(this,"point");this.local_space=new spriter.Space;this.world_space=new spriter.Space};goog.inherits(spriter.PointObject,spriter.Object);spriter.PointObject.prototype.parent_index=-1;
spriter.PointObject.prototype.load=function(a){spriter.PointObject.superClass_.load.call(this,a);this.parent_index=spriter.loadInt(a,"parent",-1);this.local_space.load(a);this.world_space.copy(this.local_space);return this};spriter.PointObject.prototype.copy=function(a){this.parent_index=a.parent_index;this.local_space.copy(a.local_space);this.world_space.copy(a.world_space);return this};spriter.PointObject.prototype.tween=function(a,b,c){spriter.Space.tween(this.local_space,a.local_space,b,c,this.local_space)};
spriter.SoundObject=function(){spriter.Object.call(this,"sound")};goog.inherits(spriter.SoundObject,spriter.Object);spriter.SoundObject.prototype.folder_index=-1;spriter.SoundObject.prototype.file_index=-1;spriter.SoundObject.prototype.trigger=!1;spriter.SoundObject.prototype.volume=1;spriter.SoundObject.prototype.panning=0;
spriter.SoundObject.prototype.load=function(a){spriter.SoundObject.superClass_.load.call(this,a);this.folder_index=spriter.loadInt(a,"folder",-1);this.file_index=spriter.loadInt(a,"file",-1);this.trigger=spriter.loadBool(a,"trigger",!1);this.volume=spriter.loadFloat(a,"volume",1);this.panning=spriter.loadFloat(a,"panning",0);return this};
spriter.SoundObject.prototype.copy=function(a){this.folder_index=a.folder_index;this.file_index=a.file_index;this.trigger=a.trigger;this.volume=a.volume;this.panning=a.panning;return this};spriter.SoundObject.prototype.tween=function(a,b,c){this.volume=spriter.tween(this.volume,a.volume,b);this.panning=spriter.tween(this.panning,a.panning,b)};spriter.EntityObject=function(){spriter.Object.call(this,"entity");this.local_space=new spriter.Space;this.world_space=new spriter.Space};
goog.inherits(spriter.EntityObject,spriter.Object);spriter.EntityObject.prototype.parent_index=-1;spriter.EntityObject.prototype.entity_index=-1;spriter.EntityObject.prototype.animation_index=-1;spriter.EntityObject.prototype.animation_time=0;
spriter.EntityObject.prototype.load=function(a){spriter.EntityObject.superClass_.load.call(this,a);this.parent_index=spriter.loadInt(a,"parent",-1);this.local_space.load(a);this.world_space.copy(this.local_space);this.entity_index=spriter.loadInt(a,"entity",-1);this.animation_index=spriter.loadInt(a,"animation",-1);this.animation_time=spriter.loadFloat(a,"t",0);return this};
spriter.EntityObject.prototype.copy=function(a){this.parent_index=a.parent_index;this.local_space.copy(a.local_space);this.world_space.copy(a.world_space);this.entity_index=a.entity_index;this.animation_index=a.animation_index;this.animation_time=a.animation_time;return this};spriter.EntityObject.prototype.tween=function(a,b,c){spriter.Space.tween(this.local_space,a.local_space,b,c,this.local_space);this.animation_time=spriter.tween(this.animation_time,a.animation_time,b)};
spriter.VariableObject=function(){spriter.Object.call(this,"variable")};goog.inherits(spriter.VariableObject,spriter.Object);spriter.VariableObject.prototype.load=function(a){spriter.VariableObject.superClass_.load.call(this,a);return this};spriter.VariableObject.prototype.copy=function(a){return this};spriter.VariableObject.prototype.tween=function(a,b,c){};spriter.Ref=function(){spriter.Element.call(this)};goog.inherits(spriter.Ref,spriter.Element);spriter.Ref.prototype.parent_index=-1;
spriter.Ref.prototype.timeline_index=-1;spriter.Ref.prototype.keyframe_index=-1;spriter.Ref.prototype.load=function(a){spriter.Ref.superClass_.load.call(this,a);this.parent_index=spriter.loadInt(a,"parent",-1);this.timeline_index=spriter.loadInt(a,"timeline",-1);this.keyframe_index=spriter.loadInt(a,"key",-1);return this};spriter.BoneRef=function(){spriter.Ref.call(this)};goog.inherits(spriter.BoneRef,spriter.Ref);
spriter.BoneRef.prototype.load=function(a){spriter.BoneRef.superClass_.load.call(this,a);return this};spriter.ObjectRef=function(){spriter.Ref.call(this)};goog.inherits(spriter.ObjectRef,spriter.Ref);spriter.ObjectRef.prototype.z_index=0;spriter.ObjectRef.prototype.load=function(a){spriter.ObjectRef.superClass_.load.call(this,a);this.z_index=spriter.loadInt(a,"z_index",0);return this};spriter.Keyframe=function(){spriter.Element.call(this)};goog.inherits(spriter.Keyframe,spriter.Element);
spriter.Keyframe.prototype.time=0;spriter.Keyframe.prototype.load=function(a){spriter.Keyframe.superClass_.load.call(this,a);this.time=spriter.loadInt(a,"time",0);return this};spriter.Keyframe.find=function(a,b){if(0>=a.length||b<a[0].time)return-1;var c=a.length-1;if(b>=a[c].time)return c;var d=0;if(0===c)return 0;for(var e=c>>1;;){a[e+1].time<=b?d=e+1:c=e;if(d===c)return d;e=d+c>>1}};spriter.Keyframe.compare=function(a,b){return a.time-b.time};spriter.Curve=function(){};
spriter.Curve.prototype.type="linear";spriter.Curve.prototype.c1=0;spriter.Curve.prototype.c2=0;spriter.Curve.prototype.c3=0;spriter.Curve.prototype.c4=0;spriter.Curve.prototype.load=function(a){this.type=spriter.loadString(a,"curve_type","linear");this.c1=spriter.loadFloat(a,"c1",0);this.c2=spriter.loadFloat(a,"c2",0);this.c3=spriter.loadFloat(a,"c3",0);this.c4=spriter.loadFloat(a,"c4",0);return this};
spriter.Curve.prototype.evaluate=function(a){switch(this.type){case "linear":return a;case "quadratic":return spriter.interpolateQuadratic(0,this.c1,1,a);case "cubic":return spriter.interpolateCubic(0,this.c1,this.c2,1,a);case "quartic":return spriter.interpolateQuartic(0,this.c1,this.c2,this.c3,1,a);case "quintic":return spriter.interpolateQuintic(0,this.c1,this.c2,this.c3,this.c4,1,a);case "bezier":return spriter.interpolateBezier(this.c1,this.c2,this.c3,this.c4,a)}return 0};
spriter.MainlineKeyframe=function(){spriter.Keyframe.call(this);this.curve=new spriter.Curve};goog.inherits(spriter.MainlineKeyframe,spriter.Keyframe);
spriter.MainlineKeyframe.prototype.load=function(a){var b=this;spriter.MainlineKeyframe.superClass_.load.call(this,a);b.curve.load(a);b.bone_ref_array=[];a.bone_ref=spriter.makeArray(a.bone_ref);a.bone_ref.forEach(function(a){b.bone_ref_array.push((new spriter.BoneRef).load(a))});b.bone_ref_array=b.bone_ref_array.sort(function(a,b){return a.id-b.id});b.object_ref_array=[];a.object_ref=spriter.makeArray(a.object_ref);a.object_ref.forEach(function(a){b.object_ref_array.push((new spriter.ObjectRef).load(a))});
b.object_ref_array=b.object_ref_array.sort(function(a,b){return a.id-b.id});return b};spriter.Mainline=function(){};spriter.Mainline.prototype.load=function(a){var b=this;b.keyframe_array=[];a.key=spriter.makeArray(a.key);a.key.forEach(function(a){b.keyframe_array.push((new spriter.MainlineKeyframe).load(a))});b.keyframe_array=b.keyframe_array.sort(spriter.Keyframe.compare);return b};spriter.TimelineKeyframe=function(a){spriter.Keyframe.call(this);this.type=a;this.curve=new spriter.Curve};
goog.inherits(spriter.TimelineKeyframe,spriter.Keyframe);spriter.TimelineKeyframe.prototype.type="unknown";spriter.TimelineKeyframe.prototype.spin=1;spriter.TimelineKeyframe.prototype.load=function(a){spriter.TimelineKeyframe.superClass_.load.call(this,a);this.spin=spriter.loadInt(a,"spin",1);this.curve.load(a);return this};spriter.SpriteTimelineKeyframe=function(){spriter.TimelineKeyframe.call(this,"sprite")};goog.inherits(spriter.SpriteTimelineKeyframe,spriter.TimelineKeyframe);
spriter.SpriteTimelineKeyframe.prototype.load=function(a){spriter.SpriteTimelineKeyframe.superClass_.load.call(this,a);this.sprite=(new spriter.SpriteObject).load(a.object||{});return this};spriter.BoneTimelineKeyframe=function(){spriter.TimelineKeyframe.call(this,"bone")};goog.inherits(spriter.BoneTimelineKeyframe,spriter.TimelineKeyframe);
spriter.BoneTimelineKeyframe.prototype.load=function(a){spriter.BoneTimelineKeyframe.superClass_.load.call(this,a);this.bone=(new spriter.Bone).load(a.bone||{});return this};spriter.BoxTimelineKeyframe=function(){spriter.TimelineKeyframe.call(this,"box")};goog.inherits(spriter.BoxTimelineKeyframe,spriter.TimelineKeyframe);spriter.BoxTimelineKeyframe.prototype.load=function(a){spriter.BoxTimelineKeyframe.superClass_.load.call(this,a);this.box=(new spriter.BoxObject).load(a.object||{});return this};
spriter.PointTimelineKeyframe=function(){spriter.TimelineKeyframe.call(this,"point")};goog.inherits(spriter.PointTimelineKeyframe,spriter.TimelineKeyframe);spriter.PointTimelineKeyframe.prototype.load=function(a){spriter.PointTimelineKeyframe.superClass_.load.call(this,a);this.point=(new spriter.PointObject).load(a.object||{});return this};spriter.SoundTimelineKeyframe=function(){spriter.TimelineKeyframe.call(this,"sound")};goog.inherits(spriter.SoundTimelineKeyframe,spriter.TimelineKeyframe);
spriter.SoundTimelineKeyframe.prototype.load=function(a){spriter.SoundTimelineKeyframe.superClass_.load.call(this,a);this.sound=(new spriter.SoundObject).load(a.object||{});return this};spriter.EntityTimelineKeyframe=function(){spriter.TimelineKeyframe.call(this,"entity")};goog.inherits(spriter.EntityTimelineKeyframe,spriter.TimelineKeyframe);
spriter.EntityTimelineKeyframe.prototype.load=function(a){spriter.EntityTimelineKeyframe.superClass_.load.call(this,a);this.entity=(new spriter.EntityObject).load(a.object||{});return this};spriter.VariableTimelineKeyframe=function(){spriter.TimelineKeyframe.call(this,"variable")};goog.inherits(spriter.VariableTimelineKeyframe,spriter.TimelineKeyframe);
spriter.VariableTimelineKeyframe.prototype.load=function(a){spriter.VariableTimelineKeyframe.superClass_.load.call(this,a);this.variable=(new spriter.VariableObject).load(a.object||{});return this};spriter.TagDef=function(){spriter.Element.call(this)};goog.inherits(spriter.TagDef,spriter.Element);spriter.TagDef.prototype.tag_index=-1;spriter.TagDef.prototype.load=function(a){spriter.TagDef.superClass_.load.call(this,a);return this};spriter.Tag=function(){spriter.Element.call(this)};
goog.inherits(spriter.Tag,spriter.Element);spriter.Tag.prototype.tag_def_index=-1;spriter.Tag.prototype.load=function(a){spriter.Tag.superClass_.load.call(this,a);this.tag_def_index=spriter.loadInt(a,"t",-1);return this};spriter.TaglineKeyframe=function(){spriter.Keyframe.call(this)};goog.inherits(spriter.TaglineKeyframe,spriter.Keyframe);
spriter.TaglineKeyframe.prototype.load=function(a){var b=this;spriter.TaglineKeyframe.superClass_.load.call(this,a);b.tag_array=[];a.tag=spriter.makeArray(a.tag);a.tag.forEach(function(a){b.tag_array.push((new spriter.Tag).load(a))});return this};spriter.Tagline=function(){spriter.Element.call(this);this.keyframe_array=[]};goog.inherits(spriter.Tagline,spriter.Element);
spriter.Tagline.prototype.load=function(a){var b=this;spriter.Tagline.superClass_.load.call(this,a);b.keyframe_array=[];a.key=spriter.makeArray(a.key);a.key.forEach(function(a){b.keyframe_array.push((new spriter.TaglineKeyframe).load(a))});return this};spriter.VarlineKeyframe=function(){spriter.Keyframe.call(this)};goog.inherits(spriter.VarlineKeyframe,spriter.Keyframe);
spriter.VarlineKeyframe.prototype.load=function(a){spriter.VarlineKeyframe.superClass_.load.call(this,a);switch(typeof a.val){case "number":this.val=spriter.loadFloat(a,"val",0);break;case "string":this.val=spriter.loadString(a,"val","")}return this};spriter.Varline=function(){spriter.Element.call(this)};goog.inherits(spriter.Varline,spriter.Element);spriter.Varline.prototype.var_def_index=-1;
spriter.Varline.prototype.load=function(a){var b=this;spriter.Varline.superClass_.load.call(this,a);b.var_def_index=spriter.loadInt(a,"def",-1);b.keyframe_array=[];a.key=spriter.makeArray(a.key);a.key.forEach(function(a){b.keyframe_array.push((new spriter.VarlineKeyframe).load(a))});return this};spriter.Meta=function(){spriter.Element.call(this)};goog.inherits(spriter.Meta,spriter.Element);
spriter.Meta.prototype.load=function(a){var b=this;spriter.Meta.superClass_.load.call(this,a);b.tagline=new spriter.Tagline;a.tagline&&b.tagline.load(a.tagline);b.varline_array=[];a.valline=a.valline||null;a.varline=a.varline||a.valline;a.varline&&(a.varline=spriter.makeArray(a.varline),a.varline.forEach(function(a){b.varline_array.push((new spriter.Varline).load(a))}));return b};spriter.Timeline=function(){spriter.Element.call(this)};goog.inherits(spriter.Timeline,spriter.Element);
spriter.Timeline.prototype.type="sprite";spriter.Timeline.prototype.object_index=-1;
spriter.Timeline.prototype.load=function(a){var b=this;spriter.Timeline.superClass_.load.call(this,a);b.type=spriter.loadString(a,"object_type","sprite");b.object_index=spriter.loadInt(a,"obj",-1);b.keyframe_array=[];a.key=spriter.makeArray(a.key);switch(b.type){case "sprite":a.key.forEach(function(a){b.keyframe_array.push((new spriter.SpriteTimelineKeyframe).load(a))});break;case "bone":a.key.forEach(function(a){b.keyframe_array.push((new spriter.BoneTimelineKeyframe).load(a))});break;case "box":a.key.forEach(function(a){b.keyframe_array.push((new spriter.BoxTimelineKeyframe).load(a))});
break;case "point":a.key.forEach(function(a){b.keyframe_array.push((new spriter.PointTimelineKeyframe).load(a))});break;case "sound":a.key.forEach(function(a){b.keyframe_array.push((new spriter.SoundTimelineKeyframe).load(a))});break;case "entity":a.key.forEach(function(a){b.keyframe_array.push((new spriter.EntityTimelineKeyframe).load(a))});break;case "variable":a.key.forEach(function(a){b.keyframe_array.push((new spriter.VariableTimelineKeyframe).load(a))});break;default:console.log("TODO: spriter.Timeline::load",
b.type,a.key)}b.keyframe_array=b.keyframe_array.sort(spriter.Keyframe.compare);a.meta&&(b.meta=(new spriter.Meta).load(a.meta));return b};spriter.SoundlineKeyframe=function(){spriter.Keyframe.call(this)};goog.inherits(spriter.SoundlineKeyframe,spriter.Keyframe);spriter.SoundlineKeyframe.prototype.load=function(a){spriter.SoundlineKeyframe.superClass_.load.call(this,a);this.sound=(new spriter.SoundObject).load(a.object||{});return this};spriter.Soundline=function(){spriter.Element.call(this)};
goog.inherits(spriter.Soundline,spriter.Element);spriter.Soundline.prototype.load=function(a){var b=this;spriter.Soundline.superClass_.load.call(this,a);b.keyframe_array=[];a.key=spriter.makeArray(a.key);a.key.forEach(function(a){b.keyframe_array.push((new spriter.SoundlineKeyframe).load(a))});b.keyframe_array=b.keyframe_array.sort(spriter.Keyframe.compare);return b};spriter.EventlineKeyframe=function(){spriter.Keyframe.call(this)};goog.inherits(spriter.EventlineKeyframe,spriter.Keyframe);
spriter.EventlineKeyframe.prototype.load=function(a){spriter.EventlineKeyframe.superClass_.load.call(this,a);return this};spriter.Eventline=function(){spriter.Element.call(this)};goog.inherits(spriter.Eventline,spriter.Element);
spriter.Eventline.prototype.load=function(a){var b=this;spriter.Eventline.superClass_.load.call(this,a);b.keyframe_array=[];a.key=spriter.makeArray(a.key);a.key.forEach(function(a){b.keyframe_array.push((new spriter.EventlineKeyframe).load(a))});b.keyframe_array=b.keyframe_array.sort(spriter.Keyframe.compare);return b};spriter.MapInstruction=function(){};spriter.MapInstruction.prototype.folder_index=-1;spriter.MapInstruction.prototype.file_index=-1;
spriter.MapInstruction.prototype.target_folder_index=-1;spriter.MapInstruction.prototype.target_file_index=-1;spriter.MapInstruction.prototype.load=function(a){this.folder_index=spriter.loadInt(a,"folder",-1);this.file_index=spriter.loadInt(a,"file",-1);this.target_folder_index=spriter.loadInt(a,"target_folder",-1);this.target_file_index=spriter.loadInt(a,"target_file",-1);return this};spriter.CharacterMap=function(){spriter.Element.call(this);this.map_instruction_array=[]};
goog.inherits(spriter.CharacterMap,spriter.Element);spriter.CharacterMap.prototype.load=function(a){var b=this;spriter.CharacterMap.superClass_.load.call(this,a);b.map_instruction_array=[];a.map=spriter.makeArray(a.map);a.map.forEach(function(a){a=(new spriter.MapInstruction).load(a);b.map_instruction_array.push(a)});return b};spriter.VarDef=function(a){spriter.Element.call(this);this.type=a};goog.inherits(spriter.VarDef,spriter.Element);spriter.VarDef.prototype.type="unknown";
spriter.VarDef.prototype.load=function(a){spriter.VarDef.superClass_.load.call(this,a);return this};spriter.IntVarDef=function(){spriter.VarDef.call(this,"int")};goog.inherits(spriter.IntVarDef,spriter.VarDef);spriter.IntVarDef.prototype.default_value=0;spriter.IntVarDef.prototype.value=0;spriter.IntVarDef.prototype.load=function(a){spriter.IntVarDef.superClass_.load.call(this,a);this.value=this.default_value=spriter.loadInt(a,"default_value",0);return this};
spriter.FloatVarDef=function(){spriter.VarDef.call(this,"float")};goog.inherits(spriter.FloatVarDef,spriter.VarDef);spriter.FloatVarDef.prototype.default_value=0;spriter.FloatVarDef.prototype.value=0;spriter.FloatVarDef.prototype.load=function(a){spriter.FloatVarDef.superClass_.load.call(this,a);this.value=this.default_value=spriter.loadFloat(a,"default_value",0);return this};spriter.StringVarDef=function(){spriter.VarDef.call(this,"string")};goog.inherits(spriter.StringVarDef,spriter.VarDef);
spriter.StringVarDef.prototype.default_value="";spriter.StringVarDef.prototype.value="";spriter.StringVarDef.prototype.load=function(a){spriter.StringVarDef.superClass_.load.call(this,a);this.value=this.default_value=spriter.loadString(a,"default_value","");return this};spriter.VarDefs=function(){spriter.Element.call(this)};goog.inherits(spriter.VarDefs,spriter.Element);
spriter.VarDefs.prototype.load=function(a){var b=this;spriter.VarDefs.superClass_.load.call(this,a);this.var_def_array=[];var c=[];"object"===typeof a.i?c=spriter.makeArray(a.i):"object"===typeof a&&"number"===typeof a.length&&(c=spriter.makeArray(a));c.forEach(function(a){switch(a.type){case "int":b.var_def_array.push((new spriter.IntVarDef).load(a));break;case "float":b.var_def_array.push((new spriter.FloatVarDef).load(a));break;case "string":b.var_def_array.push((new spriter.StringVarDef).load(a));
break;default:console.log("TODO: spriter.VarDefs.load",a.type,a),b.var_def_array.push((new spriter.VarDef(a.type)).load(a))}});return this};spriter.ObjInfo=function(a){spriter.Element.call(this);this.type=a};goog.inherits(spriter.ObjInfo,spriter.Element);spriter.ObjInfo.prototype.type="unknown";spriter.ObjInfo.prototype.load=function(a){spriter.ObjInfo.superClass_.load.call(this,a);this.var_defs=(new spriter.VarDefs).load(a.var_defs||{});return this};spriter.SpriteFrame=function(){};
spriter.SpriteFrame.prototype.folder_index=-1;spriter.SpriteFrame.prototype.file_index=-1;spriter.SpriteFrame.prototype.load=function(a){this.folder_index=spriter.loadInt(a,"folder",-1);this.file_index=spriter.loadInt(a,"file",-1);return this};spriter.SpriteObjInfo=function(){spriter.ObjInfo.call(this,"sprite")};goog.inherits(spriter.SpriteObjInfo,spriter.ObjInfo);
spriter.SpriteObjInfo.prototype.load=function(a){var b=this;spriter.SpriteObjInfo.superClass_.load.call(this,a);b.sprite_frame_array=[];a.frames=spriter.makeArray(a.frames);a.frames.forEach(function(a){b.sprite_frame_array.push((new spriter.SpriteFrame).load(a))});return this};spriter.BoneObjInfo=function(){spriter.ObjInfo.call(this,"bone")};goog.inherits(spriter.BoneObjInfo,spriter.ObjInfo);spriter.BoneObjInfo.prototype.w=0;spriter.BoneObjInfo.prototype.h=0;
spriter.BoneObjInfo.prototype.load=function(a){spriter.BoneObjInfo.superClass_.load.call(this,a);this.w=spriter.loadInt(a,"w",0);this.h=spriter.loadInt(a,"h",0);return this};spriter.BoxObjInfo=function(){spriter.ObjInfo.call(this,"box")};goog.inherits(spriter.BoxObjInfo,spriter.ObjInfo);spriter.BoxObjInfo.prototype.w=0;spriter.BoxObjInfo.prototype.h=0;
spriter.BoxObjInfo.prototype.load=function(a){spriter.BoxObjInfo.superClass_.load.call(this,a);this.w=spriter.loadFloat(a,"w",0);this.h=spriter.loadFloat(a,"h",0);return this};spriter.Animation=function(){spriter.Element.call(this)};goog.inherits(spriter.Animation,spriter.Element);spriter.Animation.prototype.length=0;spriter.Animation.prototype.looping="true";spriter.Animation.prototype.loop_to=0;spriter.Animation.prototype.min_time=0;spriter.Animation.prototype.max_time=0;
spriter.Animation.prototype.load=function(a){var b=this;spriter.Animation.superClass_.load.call(this,a);b.length=spriter.loadInt(a,"length",0);b.looping=spriter.loadString(a,"looping","true");b.loop_to=spriter.loadInt(a,"loop_to",0);b.mainline=(new spriter.Mainline).load(a.mainline||{});b.timeline_array=[];a.timeline=spriter.makeArray(a.timeline);a.timeline.forEach(function(a){b.timeline_array.push((new spriter.Timeline).load(a))});b.soundline_array=[];a.soundline=spriter.makeArray(a.soundline);a.soundline.forEach(function(a){b.soundline_array.push((new spriter.Soundline).load(a))});
b.eventline_array=[];a.eventline=spriter.makeArray(a.eventline);a.eventline.forEach(function(a){b.eventline_array.push((new spriter.Eventline).load(a))});a.meta&&(b.meta=(new spriter.Meta).load(a.meta));b.min_time=0;b.max_time=b.length;return b};spriter.Entity=function(){spriter.Element.call(this)};goog.inherits(spriter.Entity,spriter.Element);
spriter.Entity.prototype.load=function(a){var b=this;spriter.Entity.superClass_.load.call(this,a);b.character_map_map={};b.character_map_keys=[];a.character_map=spriter.makeArray(a.character_map);a.character_map.forEach(function(a){a=(new spriter.CharacterMap).load(a);b.character_map_map[a.name]=a;b.character_map_keys.push(a.name)});this.var_defs=(new spriter.VarDefs).load(a.var_defs||{});b.obj_info_map={};b.obj_info_keys=[];a.obj_info=spriter.makeArray(a.obj_info);a.obj_info.forEach(function(a){switch(a.type){case "sprite":a=
(new spriter.SpriteObjInfo).load(a);break;case "bone":a=(new spriter.BoneObjInfo).load(a);break;case "box":a=(new spriter.BoxObjInfo).load(a);break;default:console.log("TODO: spriter.Entity.load",a.type,a),a=(new spriter.ObjInfo(a.type)).load(a)}b.obj_info_map[a.name]=a;b.obj_info_keys.push(a.name)});b.animation_map={};b.animation_keys=[];a.animation=spriter.makeArray(a.animation);a.animation.forEach(function(a){a=(new spriter.Animation).load(a);b.animation_map[a.name]=a;b.animation_keys.push(a.name)});
return b};spriter.Data=function(){this.folder_array=[];this.entity_map={};this.entity_keys=[]};
spriter.Data.prototype.load=function(a){var b=this;a=a||{};spriter.loadString(a,"scon_version","");spriter.loadString(a,"generator","");spriter.loadString(a,"generator_version","");b.folder_array=[];a.folder=spriter.makeArray(a.folder);a.folder.forEach(function(a){b.folder_array.push((new spriter.Folder).load(a))});b.tag_def_array=[];a.tag_list=spriter.makeArray(a.tag_list);a.tag_list.forEach(function(a){b.tag_def_array.push((new spriter.TagDef).load(a))});b.entity_map={};b.entity_keys=[];a.entity=
spriter.makeArray(a.entity);a.entity.forEach(function(a){a=(new spriter.Entity).load(a);b.entity_map[a.name]=a;b.entity_keys.push(a.name)});b.entity_keys.forEach(function(a){var d=b.entity_map[a];d.animation_keys.forEach(function(a){d.animation_map[a].timeline_array.forEach(function(a){a.keyframe_array.forEach(function(a){if(a instanceof spriter.SpriteTimelineKeyframe&&(a=a.sprite,a.default_pivot)){var c=b.folder_array[a.folder_index];(c=c&&c.file_array[a.file_index])&&a.pivot.copy(c.pivot)}})})})});
return b};spriter.Data.prototype.getEntities=function(){return this.entity_map};spriter.Data.prototype.getEntityKeys=function(){return this.entity_keys};spriter.Data.prototype.getAnims=function(a){return(a=this.entity_map&&this.entity_map[a])?a.animation_map:{}};spriter.Data.prototype.getAnimKeys=function(a){return(a=this.entity_map&&this.entity_map[a])?a.animation_keys:[]};
spriter.Pose=function(a){this.data=a||null;this.character_map_key_array=[];this.bone_array=[];this.object_array=[];this.sound_array=[];this.event_array=[];this.tag_array=[];this.var_map={}};spriter.Pose.prototype.entity_key="";spriter.Pose.prototype.anim_key="";spriter.Pose.prototype.time=0;spriter.Pose.prototype.elapsed_time=0;spriter.Pose.prototype.dirty=!0;spriter.Pose.prototype.getEntities=function(){return this.data?this.data.getEntities():null};
spriter.Pose.prototype.getEntityKeys=function(){return this.data?this.data.getEntityKeys():null};spriter.Pose.prototype.curEntity=function(){var a=this.data.entity_map;return a&&a[this.entity_key]};spriter.Pose.prototype.getEntity=function(){return this.entity_key};spriter.Pose.prototype.setEntity=function(a){this.entity_key!==a&&(this.entity_key=a,this.anim_key="",this.time=0,this.dirty=!0,this.bone_array=[],this.object_array=[])};
spriter.Pose.prototype.getAnims=function(){return this.data?this.data.getAnims(this.entity_key):null};spriter.Pose.prototype.getAnimKeys=function(){return this.data?this.data.getAnimKeys(this.entity_key):null};spriter.Pose.prototype.curAnim=function(){var a=this.getAnims();return a&&a[this.anim_key]};spriter.Pose.prototype.curAnimLength=function(){var a=this.data;return(a=(a=a&&a.entity_map[this.entity_key])&&a.animation_map[this.anim_key])&&a.length||0};spriter.Pose.prototype.getAnim=function(){return this.anim_key};
spriter.Pose.prototype.setAnim=function(a){if(this.anim_key!==a){this.anim_key=a;if(a=this.curAnim())this.time=spriter.wrap(this.time,a.min_time,a.max_time);this.elapsed_time=0;this.dirty=!0}};spriter.Pose.prototype.getTime=function(){return this.time};spriter.Pose.prototype.setTime=function(a){var b=this.curAnim();b&&(a=spriter.wrap(a,b.min_time,b.max_time));this.time!==a&&(this.time=a,this.elapsed_time=0,this.dirty=!0)};spriter.Pose.prototype.update=function(a){this.elapsed_time+=a;this.dirty=!0};
spriter.Pose.prototype.strike=function(){var a=this;if(a.dirty){a.dirty=!1;var b=a.curEntity();a.var_map=a.var_map||{};b.var_defs.var_def_array.forEach(function(b){b.name in a.var_map||(a.var_map[b.name]=b.default_value)});var c=a.curAnim(),d=a.time,e=a.elapsed_time;a.time+=a.elapsed_time;a.elapsed_time=0;c&&(a.time=spriter.wrap(a.time,c.min_time,c.max_time));var f=a.time;if(c){var h=c.mainline.keyframe_array,k=spriter.Keyframe.find(h,f),g=h[k],l=g.time,h=h[(k+1)%h.length].time;h<l&&(h=c.length);
var q=f;l!==h&&(k=g.curve.evaluate((f-l)/(h-l)),q=spriter.tween(l,h,k));var r=c.timeline_array,l=g.bone_ref_array,n=a.bone_array;l.forEach(function(a,b){var d=r[a.timeline_index],e=d.keyframe_array,f=a.keyframe_index,h=e[f],e=e[(f+1)%e.length],p=h.time,g=e.time;g<p&&(g=c.length);f=0;p!==g&&(f=(q-p)/(g-p),f=h.curve.evaluate(f));p=n[b]=n[b]||new spriter.Bone;p.copy(h.bone).tween(e.bone,f,h.spin);p.name=d.name;p.parent_index=a.parent_index});n.length=l.length;n.forEach(function(a){var b=n[a.parent_index];
b?spriter.Space.combine(b.world_space,a.local_space,a.world_space):a.world_space.copy(a.local_space)});var g=g.object_ref_array,m=a.object_array;g.forEach(function(a,b){var d=r[a.timeline_index],e=d.keyframe_array,f=a.keyframe_index,h=e[f],e=e[(f+1)%e.length],g=h.time,k=e.time;k<g&&(k=c.length);f=0;g!==k&&(f=(q-g)/(k-g),f=h.curve.evaluate(f));switch(d.type){case "sprite":g=m[b]=m[b]||new spriter.SpriteObject;g.copy(h.sprite).tween(e.sprite,f,h.spin);g.name=d.name;g.parent_index=a.parent_index;break;
case "bone":g=m[b]=m[b]||new spriter.Bone;g.copy(h.bone).tween(e.bone,f,h.spin);g.name=d.name;g.parent_index=a.parent_index;break;case "box":g=m[b]=m[b]||new spriter.BoxObject;g.copy(h.box).tween(e.box,f,h.spin);g.name=d.name;g.parent_index=a.parent_index;break;case "point":g=m[b]=m[b]||new spriter.PointObject;g.copy(h.point).tween(e.point,f,h.spin);g.name=d.name;g.parent_index=a.parent_index;break;case "sound":g=m[b]=m[b]||new spriter.SoundObject;g.copy(h.sound).tween(e.sound,f,h.spin);g.name=d.name;
break;case "entity":g=m[b]=m[b]||new spriter.EntityObject;g.copy(h.entity).tween(e.entity,f,h.spin);g.name=d.name;g.parent_index=a.parent_index;break;case "variable":g=m[b]=m[b]||new spriter.VariableObject;g.name=d.name;g.copy(h.variable).tween(e.variable,f,h.spin);break;default:throw Error(d.type);}});m.length=g.length;a.character_map_key_array.forEach(function(a){(a=b.character_map_map[a])&&a.map_instruction_array.forEach(function(a){m.forEach(function(b){switch(b.type){case "sprite":b.folder_index===
a.folder_index&&b.file_index===a.file_index&&(b.folder_index=a.target_folder_index,b.file_index=a.target_file_index);break;case "bone":case "box":case "sound":case "event":case "entity":case "variable":break;default:throw Error(b.type);}})})});m.forEach(function(c){switch(c.type){case "sprite":var d=n[c.parent_index];d?spriter.Space.combine(d.world_space,c.local_space,c.world_space):c.world_space.copy(c.local_space);var e=(d=a.data.folder_array[c.folder_index])&&d.file_array[c.file_index];e&&(d=(.5-
c.pivot.x)*e.width,e=(.5-c.pivot.y)*e.height,spriter.Space.translate(c.world_space,d,e));break;case "bone":(d=n[c.parent_index])?spriter.Space.combine(d.world_space,c.local_space,c.world_space):c.world_space.copy(c.local_space);break;case "box":(d=n[c.parent_index])?spriter.Space.combine(d.world_space,c.local_space,c.world_space):c.world_space.copy(c.local_space);if(e=b.obj_info_map[c.name])d=(.5-c.pivot.x)*e.w,e=(.5-c.pivot.y)*e.h,spriter.Space.translate(c.world_space,d,e);break;case "point":(d=
n[c.parent_index])?spriter.Space.combine(d.world_space,c.local_space,c.world_space):c.world_space.copy(c.local_space);break;case "sound":break;case "entity":(d=n[c.parent_index])?spriter.Space.combine(d.world_space,c.local_space,c.world_space):c.world_space.copy(c.local_space);break;case "variable":break;default:throw Error(c.type);}});m.forEach(function(b){switch(b.type){case "entity":var c=b.pose=b.pose||new spriter.Pose(a.data),d=c.data.entity_keys[b.entity_index];d!==c.getEntity()&&c.setEntity(d);
d=c.curEntity().animation_keys[b.animation_index];d!==c.getAnim()?(c.setAnim(d),d=c.curAnimLength(),b=b.animation_time*d,c.setTime(b)):(d=c.curAnimLength(),b=b.animation_time*d,b-=c.getTime(),c.update(b));c.strike()}});a.sound_array=[];c.soundline_array.forEach(function(b){b=b.keyframe_array;var c=spriter.Keyframe.find(b,f);-1!==c&&(b=b[c],0>e&&f<=b.time&&b.time<=d||0<e&&d<=b.time&&b.time<=f)&&(c=a.data.folder_array[b.sound.folder_index],a.sound_array.push({name:(c&&c.file_array[b.sound.file_index]).name,
volume:b.sound.volume,panning:b.sound.panning}))});a.event_array=[];c.eventline_array.forEach(function(b){var c=b.keyframe_array,g=spriter.Keyframe.find(c,f);-1!==g&&(c=c[g],(0>e&&f<=c.time&&c.time<=d||0<e&&d<=c.time&&c.time<=f)&&a.event_array.push(b.name))});c.meta&&(c.meta.tagline&&(g=c.meta.tagline.keyframe_array,l=spriter.Keyframe.find(g,f),-1!==l&&(g=g[l],0>e&&f<=g.time&&g.time<=d||0<e&&d<=g.time&&g.time<=f))&&(a.tag_array=[],g.tag_array.forEach(function(b){a.tag_array.push(a.data.tag_def_array[b.tag_def_index].name)}),
a.tag_array=a.tag_array.sort()),a.var_map=a.var_map||{},c.meta.varline_array.forEach(function(d){var e=d.keyframe_array,g=spriter.Keyframe.find(e,f);if(-1!==g){var h=e[g],e=e[(g+1)%e.length],k=h.time,l=e.time;l<k&&(l=c.length);g=0;k!==l&&(g=(f-k)/(l-k));d=b.var_defs.var_def_array[d.var_def_index];k=0;switch(d.type){case "int":k=0|spriter.tween(+h.val,+e.val,g);break;case "float":k=spriter.tween(+h.val,+e.val,g);break;case "string":k=h.val}a.var_map[d.name]=k}}))}}};
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

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
	  ctor: function ctor(sconLink) {
	    var _this = this;

	    this._super();

	    this.sconLink = sconLink;
	    this.preload(function (data) {
	      if (data.error) {
	        throw data.error;
	      }
	      _this._ready = true;
	      _this.setEntity(_this._entity);
	      _this.setAnim(_this._animation);
	      _this.scheduleUpdate();
	    });
	  },

	  /**
	   * Set entity
	   * @param entity
	   */
	  setEntity: function setEntity(entity) {
	    this._entity = entity;

	    if (this._ready) {
	      this.pose.setEntity(entity);
	    }
	  },

	  /**
	   * Set animation
	   * @param animation
	   */
	  setAnim: function setAnim(animation) {
	    this._animation = animation;

	    if (this._ready) {
	      this.pose.setAnim(animation);
	    }
	  },

	  /**
	   * Prealod scon resource
	   * @param {function} callback
	   */
	  preload: function preload(callback) {
	    var _this2 = this;

	    var sconLink = this.sconLink;

	    if (this._ready) {
	      return callback({
	        error: 'уже установлено'
	      });
	    }

	    cc.loader.loadJson(sconLink, function (error, scon) {
	      if (error) {
	        return callback({ error: error });
	      }

	      var sconPath = scon.sconPath = sconLink.replace(/\w+.scon$/, '');
	      var loaderIndex = 0;

	      var data = _this2.data = new spriter.Data().load(scon); // create and load Spriter data from SCON file
	      var pose = _this2.pose = new spriter.Pose(data); // create Spriter pose and attach data

	      /* Getting file count */
	      scon.folder.forEach(function (folder) {
	        return folder.file.forEach(function () {
	          return ++loaderIndex;
	        });
	      });

	      data.folder_array.forEach(function (folder) {
	        folder.file_array.forEach(function (file) {

	          switch (file.type) {
	            case 'image':
	              var image_key = file.name;
	              var fileUrl = sconPath + file.name;

	              cc.loader.loadImg(fileUrl, function (error, img) {
	                if (error) {
	                  return callback({ error: error });
	                }

	                var texture = new cc.Texture2D();
	                texture.initWithElement(img);

	                var spriteFrame = new cc.SpriteFrame();
	                spriteFrame.setTexture(texture);

	                var rect = cc.rect(0, 0, file.width, file.height);
	                spriteFrame.setRect(rect);

	                cc.spriteFrameCache.addSpriteFrame(spriteFrame, image_key);

	                if (--loaderIndex === 0) {
	                  return callback({ error: false });
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
	  update: function update(dt) {
	    var _this3 = this;

	    dt = 1000 / 60; // time step in milliseconds
	    this.removeAllChildrenWithCleanup(true);
	    this.pose.update(dt); // accumulate time
	    this.pose.strike(); // process time slice
	    this.pose.object_array.forEach(function (object) {
	      switch (object.type) {
	        case 'sprite':
	          var folder = _this3.pose.data.folder_array[object.folder_index];
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

	            _this3.addChild(sprite);
	          }
	          break;
	        case 'entity':
	          cc.log('TODO ');
	          break;
	      }
	    });
	  }
	});

/***/ }
/******/ ]);