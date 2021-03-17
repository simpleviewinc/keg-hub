import e,{useContext as r}from"react";import{deepFreeze as t,hasDomAccess as n,checkCall as o,debounce as i,isArr as a,isFunc as u,isNum as f,isObj as d,logData as c,mapObj as l,softFalsy as s,toNum as p,reduceObj as y,unset as h,deepMerge as m,isEmpty as b,get as v,isStr as g}from"@keg-hub/jsutils";var _=t({BUILD_EVENT:"build",CHANGE_EVENT:"change",RESIZE_EVENT:"resize",ADD_EVENT:"addEventListener",REMOVE_EVENT:"removeEventListener",KEG_STYLES_TAG_ID:"keg-components-stylesheet",PLATFORM:{NATIVE:"$native",IOS:"$ios",android:"$android",WEB:"$web",ALL:"$all"}}),P=n()?window:{devicePixelRatio:void 0,innerHeight:void 0,innerWidth:void 0,width:void 0,height:void 0,screen:{height:void 0,width:void 0}},setScreen=function(e){return{fontScale:1,height:e.screen.height,scale:e.devicePixelRatio||1,width:e.screen.width}},setWin=function(e){return{fontScale:1,height:e.innerHeight,scale:e.devicePixelRatio||1,width:e.innerWidth}},w={window:setWin(P),screen:setScreen(P)},E={},update=function(){w.window=setWin(P),w.screen=setScreen(P),a(E[_.CHANGE_EVENT])&&E[_.CHANGE_EVENT].forEach((function(e){return!e.shouldUnmount&&e(w)}))};n()&&o((function(){return e=window,r=_.RESIZE_EVENT,t=i(update,100),void(e&&o(e.addEventListener,r,t,n||!1));var e,r,t,n}));var x={get:function(e){return w[e]},set:function(e){var r=e.screen,t=e.window;r&&(w.screen=r),t&&(w.window=t)},update:update,addEventListener:function(e,r){e&&u(r)&&(E[e]=E[e]||[],E[e].push(r))},removeEventListener:function(e,r){e&&u(r)&&a(E[e])&&(E[e]=E[e].filter((function(e){return e!==r})))}};function _defineProperty(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function _extends(){return(_extends=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}).apply(this,arguments)}function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function _objectSpread2(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){_defineProperty(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function _objectWithoutProperties(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}function _slicedToArray(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var t=[],n=!0,o=!1,i=void 0;try{for(var a,u=e[Symbol.iterator]();!(n=(a=u.next()).done)&&(t.push(a.value),!r||t.length!==r);n=!0);}catch(e){o=!0,i=e}finally{try{n||null==u.return||u.return()}finally{if(o)throw i}}return t}(e,r)||_unsupportedIterableToArray(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _toConsumableArray(e){return function(e){if(Array.isArray(e))return _arrayLikeToArray(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||_unsupportedIterableToArray(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _unsupportedIterableToArray(e,r){if(e){if("string"==typeof e)return _arrayLikeToArray(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?_arrayLikeToArray(e,r):void 0}}function _arrayLikeToArray(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}var O={},addThemeEvent=function(e,r){if(e&&u(r))return O[e]=O[e]||[],O[e].push(r),O[e].length-1},removeThemeEvent=function(e,r){e&&O[e]&&(r||0===r)&&(f(r)?O[e].splice(r,1):u(r)&&a(O[e])&&(O[e]=O[e].filter((function(e){return e!==r}))))},fireThemeEvent=function(e){for(var r=arguments.length,t=new Array(r>1?r-1:0),n=1;n<r;n++)t[n-1]=arguments[n];a(O[e])&&O[e].forEach((function(e){return e.apply(void 0,t)}))},S={entries:[["$xsmall",1],["$small",320],["$medium",768],["$large",1024],["$xlarge",1366]],hash:{},indexes:{}},buildSizeMapParts=function(){S.indexes=S.entries.reduce((function(e,r,t){return e[r[0]]=t,e[t]=r[0],S.hash[r[0]]=r[1],e}),{})},setSizes=function(e){return d(e)?(l(e,(function(r,t){var n=S.indexes[r];if(!s(n))return c("Invalid ".concat(r," for theme size! Allowed keys are xsmall | small | medium | large | xlarge"),"warn");var o=p(e[r]);if(!o||!S.entries[n])return c("Invalid size entry. Size must be a number and the size entry must exist!","Size: ".concat(o),"Entry: ".concat(S.entries[n]),"warn");S.entries[n]=[r,o]})),buildSizeMapParts(),S):c("setDimensions method requires an argument of type 'Object'.\nReceived: ",e,"error")},getSize=function(e){var r=f(e)&&e||p(e),t=S.entries.reduce((function(e,t){var n=_slicedToArray(t,2),o=n[0],i=n[1];return r>=i&&(e?i>S.hash[e]&&(e=o):e=o),e}),"$xsmall");return[t,S.hash[t]]},getMergeSizes=function(e){return S.entries.slice(0,S.indexes[e]+1).map((function(e){var r=_slicedToArray(e,2),t=r[0];return r[1],t}))};buildSizeMapParts();var T,j,getSizeMap=function(){return S},A=(_defineProperty(T={m:"margin",mT:"marginTop",mB:"marginBottom",mR:"marginRight",mL:"marginLeft",mH:"marginHorizontal",mV:"marginVertical",p:"padding",pT:"paddingTop",pB:"paddingBottom",pR:"paddingRight",pL:"paddingLeft",pH:"paddingHorizontal",pV:"paddingVertical",bC:"borderColor",bCT:"borderTopColor",bCB:"borderBottomColor",bCR:"borderRightColor",bCL:"borderLeftColor",bW:"borderWidth",bS:"borderStyle"},"bC","borderColor"),_defineProperty(T,"bRad","borderRadius"),_defineProperty(T,"c","color"),_defineProperty(T,"bg","background"),_defineProperty(T,"bgC","backgroundColor"),_defineProperty(T,"d","display"),_defineProperty(T,"ovf","overflow"),_defineProperty(T,"ovfX","overflowX"),_defineProperty(T,"ovfY","overflowY"),_defineProperty(T,"pos","position"),_defineProperty(T,"z","zIndex"),_defineProperty(T,"tp","top"),_defineProperty(T,"bt","bottom"),_defineProperty(T,"btm","bottom"),_defineProperty(T,"lt","left"),_defineProperty(T,"rt","right"),_defineProperty(T,"bxS","boxShadow"),_defineProperty(T,"op","opacity"),_defineProperty(T,"ptrE","pointerEvents"),_defineProperty(T,"otl","outline"),_defineProperty(T,"fl","flex"),_defineProperty(T,"flD","flexDirection"),_defineProperty(T,"flWr","flexWrap"),_defineProperty(T,"flB","flexBasis"),_defineProperty(T,"flS","flexShrink"),_defineProperty(T,"jtC","justifyContent"),_defineProperty(T,"alC","alignContent"),_defineProperty(T,"alS","alignSelf"),_defineProperty(T,"alI","alignItems"),_defineProperty(T,"w","width"),_defineProperty(T,"h","height"),_defineProperty(T,"minH","minHeight"),_defineProperty(T,"maxH","maxHeight"),_defineProperty(T,"minW","minWidth"),_defineProperty(T,"maxW","maxWidth"),_defineProperty(T,"ftF","fontFamily"),_defineProperty(T,"ftSz","fontSize"),_defineProperty(T,"ftS","fontStyle"),_defineProperty(T,"ftWt","fontWeight"),_defineProperty(T,"lnH","lineHeight"),_defineProperty(T,"ltrS","letterSpacing"),_defineProperty(T,"txAl","textAlign"),_defineProperty(T,"txDc","textDecoration"),_defineProperty(T,"txDL","textDecorationLine"),T),$={OS:"web",select:function(e){return d(e)&&e.web},Version:"ReTheme"},getRNPlatform=function(){return j||$},setRNPlatform=function(e){j=e},buildPlatforms=function(e){var r,t,n=Object.keys(e).filter((function(r){return e[r]}));return(r=getRNPlatform(),t=["$"+v(r,"OS")],"web"!==v(r,"OS")&&t.push("$native"),t.concat([_.PLATFORM.ALL])).reduce((function(r,t){return!1!==e[t]&&-1===r.indexOf(t)&&r.unshift(t),r}),n)},C=function buildSizedThemes(e,r,t){return y(e,(function(r,n,o){if(A[r]&&(h(e,r),e[A[r]]=n),!d(n))return o;if(r===t){var i=m(o,n);return h(e,[t]),i}var a=buildSizedThemes(n,o[r]||{},t);return b(a)||(o[r]=a),o}),r)},updatePlatformTheme=function(e,r,t){if(!d(t))return t;var n=t.$class,o=t.$className,i=_objectWithoutProperties(t,["$class","$className"]),a=getPlatformTheme(function(e,r){var t=getSizeMap(),n=[],o=Object.keys(e).reduce((function(o,i){return"$"!==i[0]||t.hash[i]?o[i]=e[i]:-1!==r.indexOf(i)&&n.push(e[i]),o}),{});return n.length?m.apply(void 0,n):o}(i,e),e,r),u=o||n;return u&&(a.$class=u),a},getPlatformTheme=function(e,r){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return e?y(e,(function(e,n,o){return o[e]=updatePlatformTheme(r,t,n),o}),e):e},L={},getCurrentTheme=function(){return L},getTheme=function(){for(var e=getCurrentTheme(),r=arguments.length,t=new Array(r),n=0;n<r;n++)t[n]=arguments[n];return m.apply(void 0,_toConsumableArray(t.reduce((function(r,t){var n=d(t)?t:g(t)||a(t)?v(e,t):null;return n&&r.push(n),r}),[])))},k={},mergeWithDefault=function(e,r,t){return function(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=getRNPlatform();return Object.keys(getSizeMap().hash).reduce((function(r,t){var n=C(e,e[t]||{},t);return b(n)||(r[t]=n),r}),getPlatformTheme(e,buildPlatforms(r),t))}(m(r&&e!==r?r:{},e),t)},buildTheme=function(e,r,t,n,o){if(!d(e))return e;d(o)||(o={});var i=_slicedToArray(getSize(r),2),a=i[0],u={key:a,size:i[1],width:r,height:t};if(k&&e===k.theme)return useCachedTheme(k,u);var f=mergeWithDefault(e,n,o);f.$xsmall,f.$small,f.$medium,f.$large,f.$xlarge;var c=_objectWithoutProperties(f,["$xsmall","$small","$medium","$large","$xlarge"]);return configureBuiltTheme(k={extraTheme:c,mergedTheme:f,theme:e,key:a},u)},useCachedTheme=function(e,r){return r.key!==e.key?configureBuiltTheme(e,r):o((function(){var e=getCurrentTheme();return fireThemeEvent(_.BUILD_EVENT,e),e}))},configureBuiltTheme=function(e,r){var t=e.mergedTheme,n=e.extraTheme;k.key=r.key;var o=r.size?function(e,r){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=getMergeSizes(r);return m.apply(void 0,[t].concat(_toConsumableArray(n.reduce((function(r,t){return e[t]&&r.push(e[t]),r}),[]))))}(t,r.key,n):n;return o.get=getTheme,o.RTMeta=_objectSpread2(_objectSpread2({},o.RTMeta),r),L=o,fireThemeEvent(_.BUILD_EVENT,o),o},I={},setDefaultTheme=function(e){var r=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(!d(e))return console.warn("setDefaultTheme method requires an theme object as the first argument. Received: ",e);I=r?m(I,e):e;var t=x.get("window"),n=buildTheme(I,t.width,t.height);return n},getDefaultTheme=function(){return I},R=e.createContext(getDefaultTheme()),useTheme=function(){return r(R)};export{_ as C,x as D,R,_slicedToArray as _,_extends as a,buildTheme as b,getDefaultTheme as c,getCurrentTheme as d,_defineProperty as e,_toConsumableArray as f,getSize as g,_objectSpread2 as h,getSizeMap as i,getMergeSizes as j,setSizes as k,addThemeEvent as l,fireThemeEvent as m,setDefaultTheme as n,_objectWithoutProperties as o,removeThemeEvent as r,setRNPlatform as s,useTheme as u};
//# sourceMappingURL=useTheme-dc2e75a2.js.map