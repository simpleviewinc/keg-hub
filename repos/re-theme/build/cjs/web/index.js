"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e,t=require("@keg-hub/jsutils"),n=require("./useTheme-5b3bfada.js"),o=require("react"),r=(e=o)&&"object"==typeof e&&"default"in e?e.default:e;function emptyFunction(){}function emptyFunctionWithReset(){}emptyFunctionWithReset.resetWarningCache=emptyFunction;var i=function(e,t){return e(t={exports:{}},t.exports),t.exports}((function(e){e.exports=function(){function shim(e,t,n,o,r,i){if("SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"!==i){var s=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw s.name="Invariant Violation",s}}function getShim(){return shim}shim.isRequired=shim;var e={array:shim,bool:shim,func:shim,number:shim,object:shim,string:shim,symbol:shim,any:shim,arrayOf:getShim,element:shim,elementType:shim,instanceOf:getShim,node:shim,objectOf:getShim,oneOf:getShim,oneOfType:getShim,shape:getShim,exact:getShim,checkPropTypes:emptyFunctionWithReset,resetWarningCache:emptyFunction};return e.PropTypes=e,e}()})),ReThemeProvider=function(e){var i=e.children,s=e.theme,u=e.merge,c=e.platforms,a=Boolean(u||!u&&!1!==u)||!1,m=o.useState(n.Dimensions.get("window")),f=n._slicedToArray(m,2),h=f[0],p=f[1],onChange=function(e){var o=e.window,r=o.width,i=o.height,s=o.scale,u=o.fontScale,c=n.getSize(r);if(c){var a=c[0],m=n.getCurrentTheme();a!==t.get(m,["RTMeta","key"])&&p({width:r,height:i,scale:s,fontScale:u})}};o.useEffect((function(){return n.Dimensions.addEventListener("change",onChange),function(){n.Dimensions.removeEventListener("change",onChange)}}),[]);var v=o.useMemo((function(){return n.buildTheme(s,h.width,h.height,a&&n.getDefaultTheme(),c)}),[s,h.width,h.height,a,c]);return r.createElement(n.ReThemeContext.Provider,{value:v},i)};ReThemeProvider.propTypes={theme:i.object.isRequired,merge:i.bool,platforms:i.array,children:i.node};var s,u,c=!1;t.hasDomAccess()&&(s=0,u=function(){s=Date.now(),c&&(c=!1)},document.addEventListener("touchstart",u,!0),document.addEventListener("touchmove",u,!0),document.addEventListener("mousemove",(function(){!c&&Date.now()-s>1e3&&(c=!0)}),!0));var useEventCallBacks=function(e){var r,i=e.pointerState,s=e.onEvent,u=e.offEvent,a=e.onName,m=e.offName,f=o.useState(!1),h=n._slicedToArray(f,2),p=h[0],v=h[1],l=o.useCallback((function(e){t.checkCall(u,e),v(!1)}),[p,v,u]),d=o.useCallback((function(e){("hover"!==i||c)&&(t.checkCall(s,e),v(!0),"active"===i&&document.addEventListener(m,l,{once:!0}))}),[i,p,v,s]);return r={},n._defineProperty(r,i,p),n._defineProperty(r,a,d),n._defineProperty(r,m,l),r},useElementEvents=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:t.noOpObj,n=arguments.length>1?arguments[1]:void 0,r="hover"===n?useEventCallBacks({pointerState:n,onName:"onPointerIn",offName:"onPointerOut",onEvent:e.onPointerIn,offEvent:e.onPointerOut}):t.noOpObj,i=r.hover,s=void 0!==i&&i,u=r.onPointerIn,c=r.onPointerOut,a="focus"===n?useEventCallBacks({pointerState:n,onName:"onFocus",offName:"onBlur",onEvent:e.onFocus,offEvent:e.onBlur}):t.noOpObj,m=a.focus,f=void 0!==m&&m,h=a.onFocus,p=a.onBlur,v="active"===n?useEventCallBacks({pointerState:n,onName:"onPointerDown",offName:"mouseup",onEvent:e.onPointerDown,offEvent:e.onMouseUp}):t.noOpObj,l=v.active,d=void 0!==l&&l,g=v.onPointerDown;return o.useMemo((function(){return{active:d,focus:f,hover:s,events:"hover"===n?{pointerover:u,pointerout:c}:"focus"===n?{focus:h,blur:p}:{pointerdown:g}}}),[d,f,s,p,h,g,u,c,e.ref,n])},loopElementEvents=function(e,t,o){Object.entries(t).map((function(t){var r=n._slicedToArray(t,2),i=r[0],s=r[1];return e[o](i,s)}))},createCBRef=function(e,n){var r=o.useRef(null),i=o.useCallback((function(n){r.current=n,t.isFunc(e)?e(n):e&&(e.current=n)}),[r.current,e,e.current]);return o.useEffect((function(){return r.current&&loopElementEvents(r.current,n,"addEventListener"),function(){r.current&&loopElementEvents(r.current,n,"removeEventListener")}}),[r.current,n]),i},usePointerState=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:t.noOpObj,n=arguments.length>1?arguments[1]:void 0,o=useElementEvents(e,n),r=o.events,i=o.hover,s=o.active,u=o.focus;return{hover:i,focus:u,active:s,events:r,ref:createCBRef(e.ref,r)}},useCompareState=function(e,n,r,i){return o.useMemo((function(){return i?r?n:t.deepMerge(e,n):e}),[e,n,r,i])},useThemeState=function(e){return function(t,r){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},s=o.useRef(null),u=usePointerState(n._objectSpread2(n._objectSpread2({},i),{},{ref:i.ref||s}),e),c=u.ref,a=u[e],m=useCompareState(t,r,Boolean(i.noMerge),a);return[c,m]}},a=useThemeState("hover"),m=useThemeState("active"),f=useThemeState("focus");exports.ReThemeContext=n.ReThemeContext,exports.addThemeEvent=n.addThemeEvent,exports.fireThemeEvent=n.fireThemeEvent,exports.getDefaultTheme=n.getDefaultTheme,exports.getMergeSizes=n.getMergeSizes,exports.getSize=n.getSize,exports.getSizeMap=n.getSizeMap,exports.removeThemeEvent=n.removeThemeEvent,exports.setDefaultTheme=n.setDefaultTheme,exports.setRNPlatform=n.setRNPlatform,exports.setSizes=n.setSizes,exports.useTheme=n.useTheme,exports.ReThemeProvider=ReThemeProvider,exports.setRNDimensions=function(e){},exports.useDimensions=function(){var e=o.useState(n.Dimensions.get("window")),t=n._slicedToArray(e,2),r=t[0],i=t[1],onChange=function(e){var t=e.window,n=t.width,o=t.height,r=t.scale,s=t.fontScale;i({width:n,height:o,scale:r,fontScale:s})};return o.useEffect((function(){return n.Dimensions.addEventListener("change",onChange),function(){return onChange.shouldUnmount=!0,n.Dimensions.removeEventListener("change",onChange)}}),[]),r},exports.usePointerState=usePointerState,exports.useStyle=function(){for(var e=arguments.length,r=new Array(e),i=0;i<e;i++)r[i]=arguments[i];var s=n.useTheme();return o.useMemo((function(){return s.get.apply(s,r)||t.noPropObj}),[s].concat(r))},exports.useStylesCallback=function(e,r,i){var s=o.useCallback(e,r||[]),u=!(!i||!t.isObj(i)||t.isEmptyColl(i))&&i,c=n.useTheme();return o.useMemo((function(){return t.checkCall.apply(void 0,[s,c,u].concat(n._toConsumableArray(r)))||{}}),[c,s,u])},exports.useThemeActive=m,exports.useThemeFocus=f,exports.useThemeHover=a,exports.withTheme=function(e){return function(t){return r.createElement(n.ReThemeContext.Consumer,null,(function(o){return r.createElement(e,n._extends({theme:o},t))}))}};
//# sourceMappingURL=index.js.map
