"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("@keg-hub/jsutils"),r=require("./_rollupPluginBabelHelpers-dd04b2bb.js"),getStyleContent=function(t){var s=r._toConsumableArray(t.matchAll(/\{(.+?)\}/gi));return e.isArr(s)&&e.isArr(s[0])?s[0][1]:""},cssToJs=function(t){var s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=getStyleContent(t).trim().split(";");return a.reduce((function(t,s){if(-1===s.indexOf(":"))return t;var a=s.split(":"),c=r._slicedToArray(a,2),n=c[0],l=c[1];return n=e.camelCase(n.trim()),l=l.trim(),e.exists(n)&&e.exists(l)&&""!==n&&""!==l?r._objectSpread2(r._objectSpread2({},t),{},r._defineProperty({},n,l)):t}),s)};exports.styleSheetParser=function(t){var s=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return r.hasDomAccess()&&e.isArr(t.classNames)?e.isFunc(t.callback)?t:(console.error("[ Error ] styleSheetParser requires a function callback.\nIt received:",t.callback),{valid:!1}):(console.error("[ Error ] styleSheetParser requires Dom Access and an array of class names!"),{valid:!1})}(t),a=s.classNames,c=s.callback,n=s.toDom,l=void 0===n||n;if(!1===s.valid)return{};var i,o,u=e.isArr(a)&&Array.from(document.styleSheets).reduce((function(r,t){return function(r,t,s,a){return Array.from(t.cssRules).reduce((function(r,t){if(!t.selectorText||!t.cssText)return r;var c=t.selectorText.split(" ").shift();return s.includes(c)?e.checkCall(a,t,c,r,cssToJs):r}),r)}(r,t,a,c)}),{asStr:""});return l&&e.isObj(u)&&u.asStr&&(i=u.asStr,(o=document.createElement("style")).styleSheet?o.styleSheet.cssText=i:o.appendChild(document.createTextNode(i)),document.getElementsByTagName("head")[0].appendChild(o)),u};
//# sourceMappingURL=styleParser.js.map
