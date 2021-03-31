"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./useTheme-93be23e0.js"),t=require("react"),n=require("@keg-hub/jsutils");function _interopDefaultLegacy(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var r=_interopDefaultLegacy(t);function emptyFunction(){}function emptyFunctionWithReset(){}emptyFunctionWithReset.resetWarningCache=emptyFunction;var o,i=(function(e){e.exports=function(){function shim(e,t,n,r,o,i){if("SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"!==i){var s=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw s.name="Invariant Violation",s}}function getShim(){return shim}shim.isRequired=shim;var e={array:shim,bool:shim,func:shim,number:shim,object:shim,string:shim,symbol:shim,any:shim,arrayOf:getShim,element:shim,elementType:shim,instanceOf:getShim,node:shim,objectOf:getShim,oneOf:getShim,oneOfType:getShim,shape:getShim,exact:getShim,checkPropTypes:emptyFunctionWithReset,resetWarningCache:emptyFunction};return e.PropTypes=e,e}()}(o={exports:{}},o.exports),o.exports),ReThemeProvider=function(o){var i=o.children,s=o.theme,u=o.merge,a=o.platforms,h=Boolean(u||!u&&!1!==u)||!1,m=t.useState(e.Dimensions.get("window")),c=e._slicedToArray(m,2),p=c[0],f=c[1],onChange=function(t){var r=t.window,o=r.width,i=r.height,s=r.scale,u=r.fontScale,a=e.getSize(o);if(a){var h=a[0],m=e.getCurrentTheme();h!==n.get(m,["RTMeta","key"])&&f({width:o,height:i,scale:s,fontScale:u})}};t.useEffect((function(){return e.Dimensions.addEventListener("change",onChange),function(){e.Dimensions.removeEventListener("change",onChange)}}),[]);var l=t.useMemo((function(){return e.buildTheme(s,p.width,p.height,h&&e.getDefaultTheme(),a)}),[s,p.width,p.height,h,a]);return r.default.createElement(e.ReThemeContext.Provider,{value:l},i)};ReThemeProvider.propTypes={theme:i.object.isRequired,merge:i.bool,platforms:i.array,children:i.node};var nativeThemeHook=function(r,o,i){var s=n.get(i,"ref",t.useRef()),u=t.useState(r),a=e._slicedToArray(u,2),h=a[0],m=a[1];return t.useLayoutEffect((function(){var e,t;(e=r)!==(t=h)&&!n.shallowEqual(e,t)&&m(h)}),[r,o]),[s,r,m]};exports.ReThemeContext=e.ReThemeContext,exports.addThemeEvent=e.addThemeEvent,exports.fireThemeEvent=e.fireThemeEvent,exports.getDefaultTheme=e.getDefaultTheme,exports.getMergeSizes=e.getMergeSizes,exports.getSize=e.getSize,exports.getSizeMap=e.getSizeMap,exports.removeThemeEvent=e.removeThemeEvent,exports.setDefaultTheme=e.setDefaultTheme,exports.setSizes=e.setSizes,exports.useTheme=e.useTheme,exports.ReThemeProvider=ReThemeProvider,exports.setRNDimensions=function(e){return e},exports.setRNPlatform=function(e){},exports.useDimensions=function(){var n=t.useState(e.Dimensions.get("window")),r=e._slicedToArray(n,2),o=r[0],i=r[1],onChange=function(e){var t=e.window,n=t.width,r=t.height,o=t.scale,s=t.fontScale;i({width:n,height:r,scale:o,fontScale:s})};return t.useEffect((function(){return e.Dimensions.addEventListener("change",onChange),function(){return onChange.shouldUnmount=!0,e.Dimensions.removeEventListener("change",onChange)}}),[]),o},exports.usePointerState=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:n.noOpObj;return{hover:!1,focus:!1,active:!1,events:n.noOpObj,ref:e.ref}},exports.useStyle=function(){for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];var s=e.useTheme();return t.useMemo((function(){return s.get.apply(s,o)||n.noPropObj}),[s].concat(o))},exports.useStylesCallback=function(r){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:n.noPropArr,i=arguments.length>2?arguments[2]:void 0,s=t.useCallback(r,o),u=e.useTheme(),a=!(!i||!n.isObj(i)||n.isEmptyColl(i))&&i;return t.useMemo((function(){return n.checkCall.apply(void 0,[s,u,a].concat(e._toConsumableArray(o)))||n.noPropObj}),[u,s,a])},exports.useThemeActive=nativeThemeHook,exports.useThemeFocus=nativeThemeHook,exports.useThemeHover=nativeThemeHook,exports.withTheme=function(t){return function(n){return r.default.createElement(e.ReThemeContext.Consumer,null,(function(o){return r.default.createElement(t,e._extends({theme:o},n))}))}};
//# sourceMappingURL=index.js.map
