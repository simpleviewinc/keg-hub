import{get as n,isObj as t,isEmptyColl as o,checkCall as c,isColl as l,deepMerge as v,isFunc as m,noPropObj as p}from"@keg-hub/jsutils";import{D as w,R as E,b as T,g as S,a as b,c as D,u as M,C as y}from"./useTheme-c9dd1c2e.js";export{R as ReThemeContext,h as addThemeEvent,i as fireThemeEvent,a as getDefaultTheme,e as getMergeSizes,g as getSize,d as getSizeMap,r as removeThemeEvent,j as setDefaultTheme,s as setRNPlatform,f as setSizes,u as useTheme}from"./useTheme-c9dd1c2e.js";import{_ as z,a as L,b as _}from"./_rollupPluginBabelHelpers-cd4ddb53.js";import x,{useState as C,useEffect as N,useMemo as P,useCallback as V,useRef as k,useLayoutEffect as A}from"react";var setRNDimensions=function(e){},useDimensions=function(){var e=C(w.get("window")),n=z(e,2),t=n[0],r=n[1],onChange=function(e){var n=e.window,t=n.width,o=n.height,u=n.scale,i=n.fontScale;r({width:t,height:o,scale:u,fontScale:i})};return N((function(){return w.addEventListener("change",onChange),function(){return onChange.shouldUnmount=!0,w.removeEventListener("change",onChange)}}),[]),t},withTheme=function(e){return function(n){return x.createElement(E.Consumer,null,(function(t){return x.createElement(e,L({theme:t},n))}))}},ReThemeProvider=function(e){var t=e.children,r=e.theme,o=e.merge,u=e.platforms,i=Boolean(o||!o&&!1!==o)||!1,a=C(w.get("window")),f=z(a,2),c=f[0],s=f[1],onChange=function(e){var t=e.window,r=t.width,o=t.height,u=t.scale,i=t.fontScale,a=S(r);if(a){var f=a[0],c=D();f!==n(c,["RTMeta","key"])&&s({width:r,height:o,scale:u,fontScale:i})}};N((function(){return w.addEventListener("change",onChange),function(){w.removeEventListener("change",onChange)}}),[]);var h=P((function(){return T(r,c.width,c.height,i&&b(),u)}),[r,c.width,c.height,i,u]);return x.createElement(E.Provider,{value:h},t)},useStylesCallback=function(e,n,r){var u=V(e,n||[]),i=!(!r||!t(r)||o(r))&&r,a=M();return P((function(){return c.apply(void 0,[u,a,i].concat(_(n)))||{}}),[a,u,i])},updateListeners=function(e,n,r,o){if(!t(e)||!m(e[n]))return null;e[n](r.on,o.on),e[n](r.off,o.off)},createCBRef=function(e,n,t,r){return V((function(r){e.current&&updateListeners(e.current,y.REMOVE_EVENT,n,t),e.current=r,e.current&&updateListeners(e.current,y.ADD_EVENT,n,t),!e.current&&t.cleanup()}),[t.on,t.off])},createMethods=function(e,n,t){var r=[n,e];return{off:V((function(){return t(e)}),r),on:V((function(){return t(n)}),r),cleanup:function(r){r&&(m(r.on)&&r.on(void 0),m(r.off)&&r.off(void 0),n=void 0,e=void 0,t=void 0,r=void 0)}}},getOptions=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return e&&!t(e)?{}:e},checkJoinValues=function(e,n,t,r){return!r&&l(n)&&l(e)?v(e,n):t},hookFactory=function(e){return function(n,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=getOptions(r),u=o.ref,i=o.noMerge,a=u||k(),f=C(n),s=z(f,2),h=s[0],d=s[1],l=C(t),v=z(l,2),g=v[0],p=v[1],w=C(checkJoinValues(n,g,g,i)),E=z(w,2),T=E[0],S=E[1];A((function(){t!==g&&(p(t),S(checkJoinValues(n,t,t,i)))}),[t,g,n,i]);var b=createCBRef(a,e,createMethods(n,T,d)),R=h===n?h:h===T?T:n;return m(u)?c((function(){return[function(e){u(e),b(e)},R,d]})):[b,R,d]}},B=hookFactory({on:"pointerover",off:"pointerout"}),H=hookFactory({on:"mousedown",off:"mouseup"}),O=hookFactory({on:"focus",off:"blur"}),useStyle=function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];var r=M();return P((function(){return r.get.apply(r,n)||p}),[r].concat(n))};export{ReThemeProvider,setRNDimensions,useDimensions,useStyle,useStylesCallback,H as useThemeActive,O as useThemeFocus,B as useThemeHover,withTheme};
//# sourceMappingURL=index.js.map
