"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e,t=require("react"),n=(e=t)&&"object"==typeof e&&"default"in e?e.default:e,r=require("@keg-hub/jsutils"),o=require("./useTheme-dfd3b7b4.js");function emptyFunction(){}function emptyFunctionWithReset(){}emptyFunctionWithReset.resetWarningCache=emptyFunction;var i=function(e,t){return e(t={exports:{}},t.exports),t.exports}((function(e){e.exports=function(){function shim(e,t,n,r,o,i){if("SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"!==i){var s=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw s.name="Invariant Violation",s}}function getShim(){return shim}shim.isRequired=shim;var e={array:shim,bool:shim,func:shim,number:shim,object:shim,string:shim,symbol:shim,any:shim,arrayOf:getShim,element:shim,elementType:shim,instanceOf:getShim,node:shim,objectOf:getShim,oneOf:getShim,oneOfType:getShim,shape:getShim,exact:getShim,checkPropTypes:emptyFunctionWithReset,resetWarningCache:emptyFunction};return e.PropTypes=e,e}()})),ReThemeProvider=function(e){var i=e.children,s=e.theme,u=e.merge,h=e.platforms,a=Boolean(u||!u&&!1!==u)||!1,m=t.useState(o.Dimensions.get("window")),c=o._slicedToArray(m,2),p=c[0],l=c[1],onChange=function(e){var t=e.window,n=t.width,i=t.height,s=t.scale,u=t.fontScale,h=o.getSize(n);if(h){var a=h[0],m=o.getCurrentTheme();a!==r.get(m,["RTMeta","key"])&&l({width:n,height:i,scale:s,fontScale:u})}};t.useEffect((function(){return o.Dimensions.addEventListener("change",onChange),function(){o.Dimensions.removeEventListener("change",onChange)}}),[]);var f=t.useMemo((function(){return o.buildTheme(s,p.width,p.height,a&&o.getDefaultTheme(),h)}),[s,p.width,p.height,a,h]);return n.createElement(o.ReThemeContext.Provider,{value:f},i)};ReThemeProvider.propTypes={theme:i.object.isRequired,merge:i.bool,platforms:i.array,children:i.node};var nativeThemeHook=function(e,n,i){var s=r.get(i,"ref",t.useRef()),u=t.useState(e),h=o._slicedToArray(u,2),a=h[0],m=h[1];return t.useLayoutEffect((function(){var t,n;(t=e)!==(n=a)&&!r.shallowEqual(t,n)&&m(a)}),[e,n]),[s,e,m]};exports.ReThemeContext=o.ReThemeContext,exports.addThemeEvent=o.addThemeEvent,exports.fireThemeEvent=o.fireThemeEvent,exports.getDefaultTheme=o.getDefaultTheme,exports.getMergeSizes=o.getMergeSizes,exports.getSize=o.getSize,exports.getSizeMap=o.getSizeMap,exports.removeThemeEvent=o.removeThemeEvent,exports.setDefaultTheme=o.setDefaultTheme,exports.setRNPlatform=o.setRNPlatform,exports.setSizes=o.setSizes,exports.useTheme=o.useTheme,exports.ReThemeProvider=ReThemeProvider,exports.setRNDimensions=function(e){return e},exports.useDimensions=function(){var e=t.useState(o.Dimensions.get("window")),n=o._slicedToArray(e,2),r=n[0],i=n[1],onChange=function(e){var t=e.window,n=t.width,r=t.height,o=t.scale,s=t.fontScale;i({width:n,height:r,scale:o,fontScale:s})};return t.useEffect((function(){return o.Dimensions.addEventListener("change",onChange),function(){return onChange.shouldUnmount=!0,o.Dimensions.removeEventListener("change",onChange)}}),[]),r},exports.useStylesCallback=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:r.noPropArr,i=arguments.length>2?arguments[2]:void 0,s=t.useCallback(e,n),u=o.useTheme(),h=!(!i||!r.isObj(i)||r.isEmptyColl(i))&&i;return t.useMemo((function(){return r.checkCall.apply(void 0,[s,u,h].concat(o._toConsumableArray(n)))||r.noPropObj}),[u,s,h])},exports.useThemeActive=nativeThemeHook,exports.useThemeFocus=nativeThemeHook,exports.useThemeHover=nativeThemeHook,exports.withTheme=function(e){return function(t){return n.createElement(o.ReThemeContext.Consumer,null,(function(r){return n.createElement(e,o._extends({theme:r},t))}))}};
//# sourceMappingURL=index.js.map
